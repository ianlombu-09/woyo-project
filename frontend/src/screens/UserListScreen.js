import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Check, Close } from '@material-ui/icons';
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users} = userList 

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin 

    const userDelete = useSelector((state) => state.userDelete)
    const { success } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, success])

    const deleteHandler = (id) => {
        if(window.confirm('Are You Sure ?')) {
            dispatch(deleteUser(id))
        }
    }

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
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <Check style={{ color: 'green' }} />
                                    ) : (
                                        <Close style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`} style={{ marginRight: '5px' }}>
                                        <Button
                                            variant='warning btn-sm'
                                        >
                                            Edit
                                        </Button>
                                    </LinkContainer>

                                    <Button
                                        variant='danger btn-sm'
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        Delete
                                    </Button>
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
