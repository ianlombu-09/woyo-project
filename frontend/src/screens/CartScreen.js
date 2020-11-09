import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Row, Col, Image, Form, Card, Button, ListGroup } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Delete, Add } from '@material-ui/icons';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const cartTotal = cartItems.reduce((acc, item) => acc + item.qty, 0)
    const priceTotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <div className='cart__screen'>
            {cartItems.length === 0 ? (
                <Message>
                    Your Shopping Cart is Empty
                    <Link to='/'> Go To Shopping</Link>
                </Message>
            ) : (
                <>
                <h4 style={{ marginBottom: '30px' }}>
                    Your Shopping Cart 
                    <Link to='/'>
                    <Button variant='info' style={{ marginLeft: '50px' }}>
                        <Add /> Add Item
                    </Button>
                </Link>
                </h4>

                    <Row>   
                        <Col md={8}>
                            <ListGroup variant='flush' style={{ borderBottom: '1px solid rgb(207, 204, 204)', borderTop: '1px solid rgb(207, 204, 204)' }}>
                                {cartItems.map((item) => (
                                    <ListGroup.Item key={item.product} as='div' >
                                        <Row>
                                            <Col md={3} key={item.product}>
                                                <Image src={item.image} fluid />
                                            </Col>

                                            <Col md={7} >
                                                <p style={{ color:'darkblue' }}>{item.name}</p>   
                                                <p className='text-light'>
                                                    {item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </p>                     
                                                <Row>
                                                    <Col md={3}>
                                                        <Form.Control
                                                            as='select'
                                                            value={item.qty}
                                                            onChange ={(e) => dispatch(
                                                                addToCart(item.product, Number(e.target.value))
                                                            )}
                                                        >
                                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Button 
                                                            className='btn__delete'
                                                            type='button'
                                                            onClick={() => removeFromCartHandler(item.product)}
                                                        >
                                                            <Delete style={{ color: 'black' }} />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                
                                            </Col>

                                            <Col md={1} className='ml-auto'>
                                                <p>$<span style={{ fontWeight: 'bold', fontSize:'20px' }}>
                                                    {item.price}
                                                </span></p>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>

                        <Col md={3} className='ml-auto'>
                            <Card className='text-center card__checkout'>
                                <Card.Body as='div'>
                                    <Card.Title>Subtotal ({cartTotal} {cartTotal > 1 ? 'items' : 'item'}):</Card.Title>
                                    <Card.Text style={{ fontSize: '20px', color: 'darkblue' }}>
                                        ${priceTotal}
                                    </Card.Text>
                                    <Button 
                                        type='button'
                                        className='btn-block' 
                                        variant='primary'   
                                        onClick={checkoutHandler}
                                        disabled={cartItems.lenght === 0}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Card.Body>
                                
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
            
        </div>
    )
}

export default CartScreen
