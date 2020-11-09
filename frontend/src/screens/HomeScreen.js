import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Hero from '../components/Hero'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'


const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            {/* <Hero /> */}
            <Container>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ): (
                    <Row>
                        {products.map((product) => (
                            <Col md={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    )
}

export default HomeScreen
