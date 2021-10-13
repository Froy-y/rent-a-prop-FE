import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const NavBar = props => {
    return(
        <>
            <h2>hi</h2>
            <Navbar collapseOnSelect expand="lg" className="navbar" variant="dark">
                <Container>
                <Navbar.Brand href="/">Rent-A-Prop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Rental Properties" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/renta">View your Properties!</NavDropdown.Item>
                        <NavDropdown.Item href="/renta/new">Add a Property!</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link href="#deets">Login</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar