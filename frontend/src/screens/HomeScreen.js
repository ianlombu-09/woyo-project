import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Hero from '../components/Hero'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async() => {
            const { data } = await axios.get('/api/products')
            console.log(data);

            setProducts(data)
        }
        
        fetchProducts()
    }, [])

    return (
        <>
            {/* <Hero /> */}
            <Container>
                <Row>
                    {products.map((product) => (
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
