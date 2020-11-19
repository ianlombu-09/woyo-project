import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Payment, VerifiedUser, ShoppingBasket } from '@material-ui/icons';

const AccountScreen = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div className='account__container'>
            <h3 style={{ marginBottom: '30px' }}>Hey, {userInfo.name} </h3>
            <Row>
                <Col md={4} style={{ cursor: 'pointer' }} className='text-center account_items'>
                    <Link to='/orders'>
                        <ShoppingBasket 
                            style={{ fontSize: '80px', color: ' #1bb9ce' }}
                        />
                        <h4>Your Orders</h4>
                        <h6 className='text-light'>Track, return, or buy things again</h6>
                    </Link>
                </Col>

                <Col md={4} style={{ cursor: 'pointer' }} className='text-center account_items'>
                    <Link to='/profile'>
                        <VerifiedUser 
                            style={{ fontSize: '80px', color: ' #1bb9ce' }}
                        />
                        <h4>Login & Security</h4>
                        <h6 className='text-light'>Your Profile Account</h6>
                    </Link>
                </Col>

                <Col md={4} style={{ cursor: 'pointer' }} className='text-center account_items' >
                    <Link to='/paymentmethod'>
                        <Payment 
                            style={{ fontSize: '80px', color: ' #1bb9ce' }}
                        />
                        <h4>Payment</h4>
                        <h6 className='text-light'>Manage Payment Method</h6>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default AccountScreen
