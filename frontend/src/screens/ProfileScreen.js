import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, dispatch, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <div className='login__container '>
            <Card className='login__body'>
                <Card.Title className='login__signIn'>User Profile</Card.Title>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                {success && <Message variant='success'>Profile Updated</Message>}
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
                        <Form.Label>Email Address</Form.Label>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}   
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}   
                        />
                    </Form.Group>
                    
                    <Button 
                        className='btn btn-block' 
                        style={{ marginTop: '30px', marginBottom: '20px' }}
                        type='submit'
                    >
                        UPDATE
                    </Button>

                </Form>
            </Card>
        </div>
    )
}

export default ProfileScreen
