import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import Backendless from "backendless";
import {NavLink} from "react-router-dom";


const SuperUserPatients = observer(({fun, addStatus, indexLocation}) => {
    let [isLoading, setIsLoading] = useState(true)
    let [listPatients, setListPatients] = useState([])

    useEffect(async () => {
        let patients = await Backendless.Data.of("Client").find({})
        setListPatients(patients)
        setIsLoading(false)
    })

    return (
        isLoading ?
            <div>

            </div>
            :
            <div className="mt-4">
                <h1>All Patients in Archie OS</h1>
                <Container>
                    <Row className="mt-4">
                        <Col>
                            <NavLink className="w-100 btn btn-primary" to='/home'>
                                New client/patient
                            </NavLink>
                        </Col>
                        <Col>
                            <NavLink className="w-100 btn btn-primary" to='/home'>
                                Open
                            </NavLink>
                        </Col>
                    </Row>
                    <Row>
                        <Table>

                        </Table>
                    </Row>
                </Container>
            </div>

    )
})

export default SuperUserPatients