import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions';
import SearchBox from './searchBox';


const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const LogoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>

            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Nav.Link as={Link} to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand></Nav.Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <SearchBox />
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to='/cart'><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                            {userInfo ? <NavDropdown title={userInfo.name} id='username' >
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={LogoutHandler}> Logout</NavDropdown.Item>
                            </NavDropdown> : (<Nav.Link as={Link} to='/login'><i className='fas fa-user'></i>Sign In</Nav.Link>)}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu' >
                                    <LinkContainer to='/admin/userList'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productList'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderList'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header