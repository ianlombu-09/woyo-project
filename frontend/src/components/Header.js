import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Image, NavDropdown } from 'react-bootstrap'
import { ShoppingCart } from '@material-ui/icons';
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import LogoImage from '../assets/images/Logo.png'

const Header = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to ='/'>
                    <Image src={LogoImage} style={{width: '100px'}} />
                </Link>
                
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Route render={({ history }) => <SearchBox history={history} />} />
 
                    <Nav className="ml-auto">
                        {userInfo ? (
                            <NavDropdown title={ userInfo.name }>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to ='/login'>
                                <Nav.Link>
                                    Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>User List</NavDropdown.Item>
                                </LinkContainer>
                                
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Product List</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Order List</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                        
                        {userInfo ? (
                            <LinkContainer to='/account'>
                                <Nav.Link>Profile</Nav.Link>    
                            </LinkContainer>
                        ) : (
                            <LinkContainer to='/account'>
                            <Nav.Link disabled>Profile</Nav.Link>    
                            </LinkContainer>
                        )}

                        {userInfo ? (
                            <LinkContainer to='/orders'>
                                <Nav.Link>Orders</Nav.Link>    
                            </LinkContainer>
                        ) : (
                            <LinkContainer to='/orders'>
                            <Nav.Link disabled>Orders</Nav.Link>    
                            </LinkContainer>
                        )}
                        
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <ShoppingCart /> Cart
                            </Nav.Link>
                        </LinkContainer>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar> 
        </header>
    )
}

export default Header
