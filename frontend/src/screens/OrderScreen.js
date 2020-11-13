import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Image, Alert } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails      

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        const addPayPalScript = async() => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {    
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, orderId, order, successPay])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div className='placeOrder__container'>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h6 className='text-light'>SHIPPING</h6>
                            <p>
                                <strong>Name : </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email : </strong> {order.user.email}
                            </p>
                            <p>
                                <strong>Address : </strong> 
                                {order.shippingAddress.address}, {' '}
                                {order.shippingAddress.city} {order.shippingAddress.postalCode}, {' '} {' '}
                                {order.shippingAddress.country} {' '}
                            </p>

                            {order.isDelivered ? ( 
                                <Alert variant='success'>Delivered on {order.deliveredAt}</Alert>
                            ) : (
                                <Alert variant='danger'>Not Delivered</Alert>  
                            ) }
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h6 className='text-light'>PAYMENT METHOD</h6>
                            <p>
                                <strong>Method : </strong> 
                                {order.paymentMethod}
                            </p>
                            
                            {order.isPaid ? ( 
                                <Alert variant='success'>Paid on {order.paidAt}</Alert>
                            ) : (
                                <Alert variant='danger'>Paid Off</Alert>  
                            ) }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h6 className='text-light'>ORDER ITEMS</h6>
                            {order.orderItems === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col md={10} className='item__name'>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                    <p>{item.qty} ({item.qty < 2 ? 'item' : 'items'}) x ${item.price} = <strong>${item.qty * item.price}</strong></p>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4} className='ml-auto'>
                    <Card>
                        <Card.Header>
                            <h4 className='text-center'>
                                ORDER SUMMARY
                            </h4>
                        </Card.Header>

                        <Card.Body>
                            <Row>
                                <Col>
                                    Total Price
                                </Col>
                                <Col className='text-right' >
                                    ${order.itemsPrice}
                                </Col>
                            </Row>
                        </Card.Body>

                        <Card.Body>
                            <Row>
                                <Col >
                                    Shipping
                                </Col>
                                <Col className='text-right'>
                                    ${order.shippingPrice}
                                </Col>
                            </Row>
                        </Card.Body>

                        <Card.Body>
                            <Row>
                                <Col >
                                    Tax
                                </Col>
                                <Col className='text-right'>
                                    ${order.taxPrice}
                                </Col>
                            </Row>
                        </Card.Body>

                        <Card.Body >
                            <Row>
                                <Col>
                                    <strong>TOTAL</strong>
                                </Col>
                                <Col className='text-right'>
                                    <strong>${order.totalPrice}</strong>
                                </Col>
                            </Row>
                        </Card.Body>
                        
                        {!order.isPaid && (
                            <Card.Body>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </Card.Body>

                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
