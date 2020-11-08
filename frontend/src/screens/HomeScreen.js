import React from 'react'
import { Row, Col } from 'react-bootstrap'
import productJSON from '../data/productsJSON'
import Product from '../components/Product'

const HomeScreen = () => {
    return (
        <>
            <Row>
                {productJSON.map((product) => (
                    <Col md={3} key={product._id}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
