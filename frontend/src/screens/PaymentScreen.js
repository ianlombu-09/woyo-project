import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Image, Row, Col} from 'react-bootstrap'
import paypalImage from '../assets/images/paypal.png'
import bcaImage from '../assets/images/bca.png'
import bniImage from '../assets/images/bni.png'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps  from '../components/CheckoutSteps.js'

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    console.log(shippingAddress)

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div className='payment__container'>
            <CheckoutSteps step1 step2 step3 />
            <h4 style={{ marginBottom: '30px' }}>Payment Method</h4>
            <Form onSubmit={submitHandler}>
                <Form.Group> 
                    <Row>
                        <Col md={4} style={{ marginBottom: '20px' }}>
                            <Form.Check
                                type='radio'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <Image src={paypalImage} /> 
                        </Col>

                        <Col md={4} style={{ marginBottom: '20px' }}>
                            <Form.Check
                                type='radio'
                                label='BCA or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='BCA'
                                disabled
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <Image src={bcaImage} /> 
                        </Col>

                        <Col md={4} style={{ marginBottom: '20px' }}>
                            <Form.Check
                                type='radio'
                                label='BNI or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                disabled
                                value='BNI'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <Image src={bniImage} /> 
                        </Col>
                    </Row>
                     
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit"
                    style={{ marginTop: '0' }}
                >
                    Continue
                </Button>
            </Form>
        </div>
    )
}

export default PaymentScreen
