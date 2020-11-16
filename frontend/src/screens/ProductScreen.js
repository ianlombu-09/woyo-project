import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Form, ListGroupItem } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ match, history }) => {
    const dispatch = useDispatch()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const { 
        success: successProductReview, 
        error: errorProductReview 
    } = productReviewCreate

    useEffect(() => {
        if(successProductReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating, 
            comment
        }))
    }

    return (    
        <div className='product__screen'>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={4}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>

                        <Col md={5}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>{product.name}</h4>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} />
                                    <p className='text-light' style={{ fontSize: '15px', marginBottom: '0' }}>
                                        {product.numReviews} Reviews
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <p className='text-light' style={{ fontSize: '15px', marginBottom: '0' }}>
                                        Price: 
                                        <span style={{ color:'blue', fontSize: '20px', marginLeft: '6px'}}>
                                            ${product.price}
                                        </span>
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h4 style={{ fontSize: '19px', fontWeight: 'bold' }}>Description :</h4>
                                    <p>{product.description}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                        <ListGroup>
                            <ListGroup.Item variant='secondary'>
                                <p className='text-light' style={{ fontSize: '15px', marginBottom: '0' }}>
                                    Price: 
                                    <span style={{ color:'black', fontSize: '16px', marginLeft: '6px'}}>
                                        ${product.price}
                                    </span>
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item variant='secondary'>
                                <p className='text-light' style={{ fontSize: '15px', marginBottom: '0' }}>
                                    Status: 
                                    <span style={{ color:'black', fontSize: '16px', marginLeft: '6px'}}>
                                        {product.countInStock === 0 ? 'Out of Stock' : 'In Stock'}
                                    </span>
                                </p>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item variant='secondary'>
                                    <Row>
                                        <Col md={2} className='text-light'>qty</Col>
                                        <Col md={5}>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange ={(e) => setQty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            
                            <Button 
                                className='btn-block' 
                                type='button'
                                variant='primary'
                                disabled={product.countInStock === 0}
                                style={{ marginTop: '20px' }}
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </Button>
                        </ListGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <h4>Reviews</h4>
                            <ListGroup variant='flush'>
                                
                                {product.reviews.map((review) => (
                                    <ListGroup.Item>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                    <h4 className='text-light'>Write a Customer Review</h4>
                                    {errorProductReview && (
                                        <Message variant='danger'>{errorProductReview}</Message>
                                    )}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group>
                                                <Form.Label className='text-light'>Rating</Form.Label>
                                                <Form.Control 
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label className='text-light'>Comment</Form.Label>
                                                <Form.Control 
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            
                                            <Button type='submit'>
                                                SUBMIT
                                            </Button>
                                    </Form>
                                    ) : (
                                        <Message variant='danger'>
                                            Please <Link to='/login'>Sign In </Link> to write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    )
}

export default ProductScreen
