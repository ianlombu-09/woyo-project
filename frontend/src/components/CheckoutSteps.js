import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4' style={{ borderBottom: '1px solid  rgb(207, 204, 204)' }}>
            <Nav.Item>
                {step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link style={{ color: 'red' }}>Sign In</Nav.Link>
                </LinkContainer>
                ) : (
                <Nav.Link disabled>Sign In</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link style={{ color: ' #f01818' }}>Shipping</Nav.Link>
                </LinkContainer>
                ) : (
                <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link style={{ color: ' #f01818' }}>Payment</Nav.Link>
                </LinkContainer>
                ) : (
                <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link style={{ color: ' #f01818' }}>Place Order</Nav.Link>
                </LinkContainer>
                ) : (
                <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
