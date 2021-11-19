import React, {useState, useEffect} from 'react';
import {Button, Col, Container, Modal, Row, Spinner, Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Backendless from "backendless";
import LocationAddEdit from "../Location/LocationAddEdit";


export default function PatientsTable() {
    const [isLoading, setIsLoading] = useState(true)
    const [currentObject, setCurrentObject] = useState({})
    const [showPrescriptions, setShowPrescriptions] = useState(false)
    const [myData, setMyData] = useState([])


    useEffect(async () => {
        let patients = await Backendless.Data.of('Client').find({})
        let contactLensPrescriptions = await Backendless.Data.of('ContactLensPrescription').find()
        let spectaclePrescription = await Backendless.Data.of('SpectaclePrescription').find()
        for await (let item of patients) {
            item['contactLensPrescriptions'] = contactLensPrescriptions.filter(i => i.client === item.objectId)
            item['spectaclePrescription'] = spectaclePrescription.filter(i => i.client === item.objectId)
        }
        setMyData(patients)
        setIsLoading(false)
    })

    return (
        isLoading ?
            <div>
                <h1>All Patients</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div> :
            <div>
                <h1>All Patients</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Col className="col-11">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First</th>
                                    <th>Last</th>
                                    <th>Created</th>
                                    <th>City</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {myData.length > 0 ? myData.map((value, index)=>
                                    <tr key={value.objectId}>
                                        <td>{index + 1}</td>
                                        <td>{value.first_name}</td>
                                        <td>{value.last_name}</td>
                                        <td>{Number.parseInt(value.created)}</td>
                                        <td>{value.city_town}</td>
                                        <td>
                                            <Button className="w-75 btn btn-primary" variant="primary" type="button" onClick={() => {
                                                setShowPrescriptions(true)
                                                setCurrentObject(value)
                                            }}>
                                                Prescriptions
                                            </Button>

                                        </td>
                                    </tr>
                                ) : null}
                                </tbody>
                            </Table>
                            <Modal
                                show={showPrescriptions}
                                onHide={() => setShowPrescriptions(false)}
                                dialogClassName="w-75"
                                size="lg"
                                aria-labelledby="modal-prescriptions">
                                <Modal.Header closeButton>
                                    <Modal.Title id="modal-prescriptions">
                                        Prescriptions
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row className="mt-4">
                                        <Col className="col-11">
                                            <h3>Spectacle Prescriptions</h3>
                                            <Table striped bordered hover>
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First</th>
                                                    <th>Last</th>
                                                    <th>Created</th>
                                                    <th>City</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="col-11">
                                            <h3>Spectacle Prescriptions</h3>
                                            <Table striped bordered hover>
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First</th>
                                                    <th>Last</th>
                                                    <th>Created</th>
                                                    <th>City</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}