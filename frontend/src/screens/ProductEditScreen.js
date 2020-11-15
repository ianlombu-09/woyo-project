import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

const ProductEditScreen = ({ history, match }) => {
    const productId = match.params.id 

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        if(!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInSock)
            setDescription(product.description)
        }
    }, [dispatch, history, product, productId])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className='productedit__container'>
            {loading ? (
                <Loader />
            ): error ?(
                <Message variant='danger'>{error}</Message>
            ):(
                <>
                    <h4 style={{ marginTop: '50px', marginBottom: '30px' }}>Product Edit</h4>

                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Sample Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="100" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Image Url" 
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>   

                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Sample Brand" 
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="0" 
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Sample Category" 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Sample Description" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            UPDATE
                        </Button>
                    </Form>
                </>
            )}
        </div>
    )
}

export default ProductEditScreen
