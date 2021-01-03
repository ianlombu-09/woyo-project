import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = () => {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])

    return (
        <div className='orderlist__container'>
            {loading ? (
                <Loader />
            ): error ? (
                <Message variant='danger'>{error}</Message>
            ):(
                <>
                    <h4>Order List</h4>

                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER NAME</th>
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
                                    <td>{order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td style={{ color:'red' }}>
                                        {order.isPaid ? (
                                            <span>{order.paidAt.substring(0, 10)}</span>
                                        ) : (
                                            'Not Paid'
                                        )}
                                    </td>
                                    <td style={{ color:'red' }}>
                                        {order.isDelivered ? (
                                            <span>{order.deliveredAt.substring(0, 10)}</span>
                                        ) : (
                                            'Not Delivered'
                                        )}
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

export default OrderListScreen
