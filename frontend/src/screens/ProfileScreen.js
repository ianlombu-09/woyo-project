import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const ProfileScreen = () => {
    return (
        <div className='login__container '>
            <Card className='login__body'>
                <Card.Title className='login__signIn'>User Profile</Card.Title>
                <Form>
                    <Form.Group>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter name" 
                            required
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            required
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            required
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}   
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            required
                            // value={confirmPassword}
                            // onChange={(e) => setConfirmPassword(e.target.value)}   
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
