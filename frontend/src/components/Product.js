import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <div>
            <Card style={{ marginBottom: '40px' }}>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Img src={product.image} alt={product.name} />
                    
                        <Card.Title as='div' style={{ fontSize: '15px', marginTop:'10px' }}>
                            {product.name}
                        </Card.Title>
                    </Link>

                    <Card.Text as='div'>
                        <Rating 
                            value={product.rating}
                        />
                        <p className='text-light' style={{ fontSize: '15px' }}>{product.numReviews} reviews</p>
                    </Card.Text>
                    <Card.Text as='div'>$<strong>{product.price}</strong></Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
