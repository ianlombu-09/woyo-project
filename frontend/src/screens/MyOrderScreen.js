import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyOrders } from '../actions/orderActions'

const MyOrderScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading, error, orders} = orderListMy

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            dispatch(listMyOrders())
        }
        
    }, [dispatch, history, userInfo])

    return (
        <div className='myorderscreen__container'>
            {loading ? (
                <Loader />
            ): error ? (
                <Message variant='danger'>{error}</Message>
            ): (
                <>
                    {/* <h4 style={{ marginBottom: '30px' }}>Hey, {userInfo.name}</h4> */}
                    <h5 
                        className='text-light'
                        style={{ marginBottom: '20px' }}
                    >
                        My Orders
                    </h5>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td style={{ color: 'red'}}>
                                        {order.isPaid ? order.paidAt.substring(0, 10) : 'Not Paid'}
                                    </td>
                                    <td style={{ color: 'red'}}>
                                        {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Not Delivered'}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='info'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    )
}

export default MyOrderScreen
