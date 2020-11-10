import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history, location }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
      }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
    
    return (
        <div className='login__container '>
            <Card className='login__body'>
                <Card.Title className='login__signIn'>Sign-In</Card.Title>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter name" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

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

                    <Form.Group>
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}   
                        />
                    </Form.Group>
                    
                    <Button 
                        className='btn btn-block' 
                        style={{ marginTop: '30px', marginBottom: '20px' }}
                        type='submit'
                    >
                        REGISTER
                    </Button>

                    <Card.Body className='text-center'>Already have an account ? {' '} 
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ color: 'Blue' }}>
                            Login
                        </Link>
                    </Card.Body>
                </Form>
            </Card>
        </div>
    )
}

export default RegisterScreen
