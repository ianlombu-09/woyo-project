import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Check, Close } from '@material-ui/icons';
import { listUsers } from '../actions/userActions'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users} = userList 

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin 

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])
    return (
        <div className='userlist__container'>
            <h4>User List</h4>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (
                                        <Check style={{ color: 'green' }} />
                                    ) : (
                                        <Close style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to=''>
                                        <Button
                                            variant='warning btn-sm'
                                        >
                                            Edit
                                        </Button>
                                    </LinkContainer>

                                    <LinkContainer to='' style={{ marginLeft: '5px' }}>
                                        <Button
                                            
                                            variant='danger btn-sm'
                                        >
                                            Delete
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default UserListScreen
