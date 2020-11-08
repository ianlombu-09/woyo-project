import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import productJSON from '../data/productsJSON'
import Hero from '../components/Hero'
import Product from '../components/Product'

const HomeScreen = () => {
    return (
        <>
            <Hero />
            <Container>
                <Row>
                    {productJSON.map((product) => (
                        <Col md={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default HomeScreen
