import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Row className='text-center'>
                <Col md={2}>
                    <h2 style={{ fontWeight: 'bold', letterSpacing: '5px' }}>WO|<span style={{ color:'Yellow' }}>YO</span></h2>
                </Col>
                    
                <Col md={3}>
                    <h5>Explore Us</h5>
                    <ul className='text-light'>
                        <li>Careers</li>
                        <li>About Us</li>
                        <li>Privacy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </Col>

                <Col md={3}>
                    <h5>Let Us Help You</h5>
                    <ul className='text-light'>
                        <li>Your Account</li>
                        <li>Your Orders</li>
                        <li>Return & Replacements</li>
                    </ul>
                </Col>

                <Col md={4}>
                    <h5>Social Media</h5>
                    <ul className='text-light'>
                        <li >Instagram</li>
                        <li>Facebook</li>
                        <li>Twitter</li>
                    </ul>
                </Col>

            </Row>
        </footer>
    )
}

export default Footer
