import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useParams } from "react-router-dom"

const NavBar = props => {
    const { userId } = useParams()
    const path = props.location.pathname

    return(
        <>
            <Navbar collapseOnSelect expand="lg" className="navbar" variant="dark">
                <Container fluid>
                <Navbar.Brand href="#">Rent-A-Prop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {
                        (path === '/') ? (
                            <Nav className="ms-auto">
                            <Nav.Link eventKey={2} href="/register">Register</Nav.Link>
                            </Nav>
                        ) : (path === '/register') ? (
                            <>
                                <Nav className="ms-auto">
                                <Nav.Link href="/">Login</Nav.Link>
                                </Nav>
                            </>
                        ) : (
                            <>
                                <Nav className="me-auto">
                                <Nav.Link href="#">Home</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link>
                                <NavDropdown title="Rental Properties" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href={`/${userId}/renta/`}>View your Properties!</NavDropdown.Item>
                                    <NavDropdown.Item href={`/${userId}/renta/new`}>Add a Property!</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                </Nav>
                                <Nav>
                                <Nav.Link eventKey={2} href="/">Logout</Nav.Link>
                                </Nav>
                            </>
                        )
                    }
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar