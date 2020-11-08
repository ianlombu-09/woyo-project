import React from 'react'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import productsJSON from '../data/productsJSON'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
    const product = productsJSON.find((p) => p._id === match.params.id)

    return (    
        <div className='product__screen'>
            <Row>
                <Col md={4}>
                    <Image src={product.image} fluid />
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
                    <ListGroup.Item>
                        <p className='text-light' style={{ fontSize: '15px', marginBottom: '0' }}>
                            Price: 
                            <span style={{ color:'black', fontSize: '16px', marginLeft: '6px'}}>
                                ${product.price}
                            </span>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p className='text-light' style={{ fontSize: '15px', marginBottom: '0' }}>
                            Status: 
                            <span style={{ color:'black', fontSize: '16px', marginLeft: '6px'}}>
                                {product.countInStock === 0 ? 'Out of Stock' : 'In Stock'}
                            </span>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button 
                            className='btn-block' 
                            type='button'
                            variant='primary'
                            disabled={product.countInStock === 0}
                        >
                            Add to Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
