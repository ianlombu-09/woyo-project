import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <div>
            <Card style={{ marginBottom: '40px' }}>
                <Card.Body>
                    <Card.Img src={product.image} />

                    <Card.Title style={{ fontSize: '15px', marginTop:'10px' }}>
                        {product.name}
                    </Card.Title>

                    <Card.Text>
                        <Rating 
                            value={product.rating}
                        />
                        <p className='text-light' style={{ fontSize: '15px' }}>{product.numReviews} reviews</p>
                    </Card.Text>
                    <Card.Text>$<strong>{product.price}</strong></Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
