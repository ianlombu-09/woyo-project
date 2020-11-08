import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { Search, ShoppingCart } from '@material-ui/icons';

const Header = () => {
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to ='/'>
                    <Navbar.Brand>WOYO</Navbar.Brand>
                </Link>
                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Form inline>
                        <input type='text' placeholder='Search...' className='header__search' />
                        <Button type="submit" className='btn btn-secondary'>
                            <Search style={{ color: 'black' }} />
                        </Button>
                    </Form>

                    <Nav className="ml-auto">
                        <Nav.Link href="#features">Profile</Nav.Link>
                        <Nav.Link href="#features">Orders</Nav.Link>
                        <Nav.Link href="#features">
                            <ShoppingCart /> Cart
                        </Nav.Link>
                        <Nav.Link href="#pricing">Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> 
        </header>
    )
}

export default Header
