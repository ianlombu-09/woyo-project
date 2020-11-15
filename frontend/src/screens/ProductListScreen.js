import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Add } from '@material-ui/icons';
import { listProducts } from '../actions/productActions'

const ProductListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if( userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    const createProductHandler = () => {

    }

    const deleteHandler = (id) => {
        // if(window.confirm('Are you sure ?')) {

        // }
    }

    return (
        <div className='productlist__container'>
            {loading ? (
                <Loader />
            ): error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col>
                            <h4>Product List</h4>
                        </Col>

                        <Col className='text-right'>
                            <Button className='my-3' onClick={createProductHandler}>
                                <Add />Add Product
                            </Button>
                        </Col>
                    </Row>

                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>PRODUCT NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`} style={{ marginRight: '5px' }}>
                                            <Button variant='warning btn-sm' >
                                                Edit
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger btn-sm' onClick={deleteHandler(product._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    )
}

export default ProductListScreen
