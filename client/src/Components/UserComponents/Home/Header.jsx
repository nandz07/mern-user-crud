import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/usernameReducer';


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token");
        dispatch(logout())
        navigate('/')
    }
    const user = useSelector((state) => state.user.value);
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand> <Link to='/home' className='link'
                        style={{
                            textDecoration: 'none',
                            color: '#36454F'
                        }}
                    >Home</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link ><Link
                                style={{ textDecoration: 'none', color: '#36454F' }}
                                to='/profile'>Profile</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav className="d-flex align-items-center">
                        <Nav.Link >
                                <img src={user.image} alt='hai' width='30px' />
                            </Nav.Link>
                            <Nav.Link ><Link
                                style={{ textDecoration: 'none', color: '#36454F' }}
                                onClick={handleLogout}
                            >Logout</Link></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header