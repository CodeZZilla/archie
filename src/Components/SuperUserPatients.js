import React from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const SuperUserPatients = () => {
    return (
        <div className="mt-4">
            <h1>Patients menu</h1>
            <Container>
                <Row className="mt-4 justify-content-md-around">
                    <NavLink className="col-5 btn btn-primary" to='/new-patient'>
                        New client/patient
                    </NavLink>

                    <NavLink className="col-5 btn btn-primary" to='/patient-tables'>
                        All patient
                    </NavLink>
                </Row>
            </Container>
        </div>
    )
}

export default SuperUserPatients