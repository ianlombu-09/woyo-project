import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Image, Alert } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
    const orderID = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        if(!order || order._id !== orderID){
            dispatch(getOrderDetails(orderID))
        }
    }, [dispatch, orderID])

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
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
