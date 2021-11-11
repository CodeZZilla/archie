import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import SpectaclePrescription from "../Store/SpectaclePrescription";


const Header = () => {
    return(
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/home">Archie OS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink className="my-link h5 text-secondary m-3" to="/home">
                        Home
                    </NavLink>
                    <NavDropdown className="my-link h5 text-secondary mt-2" title="Company" id="basic-nav-dropdown">
                        <NavLink className="my-link h5 text-secondary m-3" to="/company-add">
                            Add
                        </NavLink>
                        <NavDropdown.Divider/>
                        <NavLink className="my-link h5 text-secondary m-3" to="/company-list">
                            List
                        </NavLink>
                        <NavDropdown.Divider/>
                        <NavLink className="my-link h5 text-secondary m-3" to="/home">
                            Help
                        </NavLink>
                    </NavDropdown>
                    <NavLink className="my-link h5 text-secondary m-3" to="/patients-super-user">
                        Clients/Patients
                    </NavLink>
                    <NavLink className="my-link h5 text-secondary m-3" to="/spectacle-prescription">
                        Spectacle Prescription
                    </NavLink>
                    <NavLink className="my-link h5 text-secondary m-3" to="/spectacle-prescription-table">
                        Spectacle Prescription All
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default Header