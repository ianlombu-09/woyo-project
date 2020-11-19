import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col, Row, Image } from 'react-bootstrap'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps  from '../components/CheckoutSteps.js'
import ShippingImage from '../assets/images/Shipping.png'

const ShippingScreen = ({ history}) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <div className='shipping__container'>
            <CheckoutSteps step1 step2 />
            <h4 style={{ marginBottom: '30px' }}>Shipping Address</h4>
            <Row>
                <Col md={6}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter address" 
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter city" 
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter postal code" 
                                value={postalCode}
                                required
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter country" 
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </Form>
                </Col>

                <Col md={6}>
                    <Image src={ShippingImage} fluid />
                </Col>

            </Row>

        </div>
    )
}

export default ShippingScreen
