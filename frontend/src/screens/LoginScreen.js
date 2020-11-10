import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
      }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    
    return (
        <div className='login__container '>
            <Card className='login__body'>
                <Card.Title className='login__signIn'>Sign-In</Card.Title>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}   
                        />
                    </Form.Group>
                    
                    <Button 
                        className='btn btn-block' 
                        style={{ marginTop: '30px', marginBottom: '20px' }}
                        type='submit'
                    >
                        SIGN-IN
                    </Button>

                    <Card.Body className='text-center'>New Customer ? {' '} 
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ color: 'Blue' }}>
                            Register
                        </Link>
                    </Card.Body>
                </Form>
            </Card>
        </div>
    )
}

export default LoginScreen
