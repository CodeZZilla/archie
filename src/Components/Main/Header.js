import React from "react";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import AuthStore from "../../Store/AuthStore";


const Header = ({role}) => {
    return (
        role === "SuperAdmin" ?
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Archie OS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/home">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <NavDropdown title="Company" id="company-dropdown">
                                <LinkContainer to="/company-add">
                                    <NavDropdown.Item>Add</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/company-list">
                                    <NavDropdown.Item>List</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item>Help</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Location" id="location-dropdown">
                                <LinkContainer to="/location-add">
                                    <NavDropdown.Item>Add</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/location-list">
                                    <NavDropdown.Item>List</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item>Help</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <div className="w-auto">
                        <Button className="float-right" type="button"
                                variant="outline-danger" onClick={() => AuthStore.logout()}>
                            Logout
                        </Button>
                    </div>
                </Container>
            </Navbar> :
            role === "UserLocation" ?
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/home">Archie OS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <LinkContainer to="/home">
                                    <Nav.Link>Home</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/inventory">
                                    <Nav.Link>Inventory</Nav.Link>
                                </LinkContainer>
                                <NavDropdown title="Orders" id="prescription-dropdown">
                                    <LinkContainer to="/order-add">
                                        <NavDropdown.Item>Create new order</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                                <NavDropdown title="Patients" id="patiens-dropdown">
                                    <LinkContainer to="/new-patient">
                                        <NavDropdown.Item>Add patient</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/patient-tables">
                                        <NavDropdown.Item>List</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                                <NavDropdown title="Prescription" id="prescription-dropdown">
                                    <NavDropdown.Header>Spectacle</NavDropdown.Header>
                                    <LinkContainer to="/spectacle-prescription">
                                        <NavDropdown.Item>Add</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/spectacle-prescription-table">
                                        <NavDropdown.Item>List</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Header>Contact Lens</NavDropdown.Header>
                                    <LinkContainer to="/contact-lens-prescription">
                                        <NavDropdown.Item>Add</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/contact-lens-prescription-table">
                                        <NavDropdown.Item>List</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <div className="w-auto">
                            <Button className="float-right" type="button"
                                    variant="outline-danger" onClick={() => AuthStore.logout()}>
                                Logout
                            </Button>
                        </div>
                    </Container>
                </Navbar> :
                null
    )
}

export default Header