import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap'
import CheckoutSteps  from '../components/CheckoutSteps.js'
import Message from '../components/Message'

const PlaceOrderScreen = () => {

    const cart = useSelector((state) => state.cart)
    const { cartItems, shippingAddress, paymentMethod } = cart

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice) 
    ).toFixed(2)

    const placeOrderHandler = () => {
        
    }


    return (
        <div className='placeOrder__container'>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h6 className='text-light'>SHIPPING</h6>
                            <strong>Address : </strong> 
                            {shippingAddress.address}, {' '}
                            {shippingAddress.city} {shippingAddress.postalCode}, {' '} {' '}
                            {shippingAddress.country} {' '}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h6 className='text-light'>PAYMENT METHOD</h6>
                            <strong>Method : </strong> 
                            {paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h6 className='text-light'>ORDER ITEMS</h6>
                            {cartItems === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
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

                                                {/* <Col md={4}>
                                                    {item.qty} ({item.qty < 2 ? 'item' : 'items'}) x ${item.price} = <strong>${item.qty * item.price}</strong>
                                                </Col> */}
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
                                    ${cart.itemsPrice}
                                </Col>
                            </Row>
                        </Card.Body>

                        <Card.Body>
                            <Row>
                                <Col >
                                    Shipping
                                </Col>
                                <Col className='text-right'>
                                    ${cart.shippingPrice}
                                </Col>
                            </Row>
                        </Card.Body>

                        <Card.Body>
                            <Row>
                                <Col >
                                    Tax
                                </Col>
                                <Col className='text-right'>
                                    ${cart.taxPrice}
                                </Col>
                            </Row>
                        </Card.Body>

                        <Card.Body >
                            <Row>
                                <Col>
                                    <strong>TOTAL</strong>
                                </Col>
                                <Col className='text-right'>
                                    <strong>${cart.totalPrice}</strong>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Button
                        variant='primary'
                        className='btn btn-block'
                        style={{ marginTop: '10px' }}
                        disabled={cartItems.length === 0}
                        onClick={placeOrderHandler}
                    >
                        PLACE ORDER
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
