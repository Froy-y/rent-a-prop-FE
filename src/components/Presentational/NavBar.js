import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useParams } from "react-router-dom"
import logo from './images/logo.png'

const NavBar = props => {
    const { userId } = useParams()
    const path = props.location.pathname

    return(
        <>
            <Navbar collapseOnSelect expand="lg" className="navbar" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="35"
                        className="d-inline-block align-top"
                    />
                        Rent-A-Prop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {
                            (path === '/login') ? (
                                <>
                                    <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link href="/about">About</Nav.Link>
                                    </Nav>
                                    <Nav className="ms-auto">
                                        <Nav.Link eventKey={2} href="/register">Register</Nav.Link>
                                    </Nav>
                                </>
                            ) : (path === '/register') ? (
                                <>
                                    <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                    </Nav>
                                    <Nav className="ms-auto">
                                        <Nav.Link href="/login">Login</Nav.Link>
                                    </Nav>
                                </>
                            ) : (path === '/' || path === '/about') ? (
                                <>
                                    <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                    </Nav>
                                    <Nav className="ms-auto">
                                        <Nav.Link href="/login">Login</Nav.Link>
                                        <Nav.Link eventKey={2} href="/register">Register</Nav.Link>
                                    </Nav>
                                </>
                            ) : (
                                <>
                                    <Nav className="me-auto">
                                        <Nav.Link href={`/${userId}/renta/`}>View your Properties!</Nav.Link>
                                        <Nav.Link href={`/${userId}/renta/new`}>Add a Property!</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link eventKey={2} href="/login">Logout</Nav.Link>
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