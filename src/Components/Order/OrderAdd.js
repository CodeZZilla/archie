import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Accordion, Button, ButtonGroup, Col, Container, Form, Modal, Row, Spinner, ToggleButton} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Order from "../../Store/Order";
import {saveObject, getAllObject, getAllObjectByRelationField} from "../../Business/BackendlessRequest"
import {BsPlusLg} from "react-icons/all";
import LocationAddEdit from "../Location/LocationAddEdit";
import PatientAdd from "../Patient/PatientAdd";
import SpectaclePrescriptionForm from "../Prescriptions/SpectaclePrescriptionForm";
import ContactLensPrescription from "../../Store/ContactLensPrescription";
import ContactLensPrescriptionForm from "../Prescriptions/ContactLensPrescriptionForm";
import InsuranceForm from "../Insurance/InsuranceForm";


const OrderAdd = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [clients, setClients] = useState([])
    const [locations, setLocations] = useState([])
    const [showModalAddClient, setShowModalAddClient] = useState(false)
    const [radioValue, setRadioValue] = useState(null);

    const radios = [
        {name: 'Spectacles', value: 'Spectacles'},
        {name: 'Contacts', value: 'Contacts'},
        {name: 'Both', value: 'Both'},
    ];

    useEffect(async () => {
        setLocations(await getAllObject('Location'))
        setClients(await getAllObject('Client'))
        setIsLoading(false)
    }, [])

    return (
        isLoading ?
            <div>
                <h1>Create Order</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div> :
            <div className="mt-5">
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <h1 className="text-center">Create new order</h1>
                            <Button className="d-flex justify-content-end" type="button" variant="success" size="lg">
                                Save Only
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col className="col-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Date order</Form.Label>
                                <Form.Control type="date" placeholder="Birthday"
                                              value={Order.object.date}
                                              onChange={(obj) => Order.edit('date', obj.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col className="col-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Client</Form.Label>
                                <div className="d-flex">
                                    <Form.Select className="me-sm-2" value={Order.object.client}
                                                 onChange={(obj) => Order.edit('client', obj.target.value)}>
                                        <option value="null">Unselected</option>
                                        {
                                            clients.map(value => {
                                                return <option key={value.objectId}
                                                               value={value.objectId}>{value.first_name} {value.last_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                    <Button variant="outline-primary"
                                            onClick={() => setShowModalAddClient(true)}>Add</Button>
                                    <Modal
                                        show={showModalAddClient}
                                        onHide={() => setShowModalAddClient(false)}
                                        dialogClassName="w-75"
                                        size="xl"
                                        aria-labelledby="example-custom-modal-styling-title">
                                        <Modal.Header closeButton/>
                                        <Modal.Body>
                                            <PatientAdd btnText="Save" fun={async () => {
                                                setShowModalAddClient(false)
                                                setClients(await getAllObject('Client'))
                                            }}/>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col className="col-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Select className="me-sm-2" value={Order.object.location}
                                             onChange={(obj) => Order.edit('location', obj.target.value)}>
                                    <option value="null">Unselected</option>
                                    {
                                        locations.map(value => {
                                            return <option key={value.objectId}
                                                           value={value.objectId}>{value.name_location} {value.street_address}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col className="col-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Order type</Form.Label>
                                <ButtonGroup className="mb-2">
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="outline-primary"
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Form.Group>
                        </Col>
                        <Col className="col-12">
                            {
                                radioValue === "Spectacles" ?
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Insurance information</Accordion.Header>
                                            <Accordion.Body>
                                                <InsuranceForm fun={(insurance, doctor) => {
                                                    Order.edit('insurance', insurance)
                                                    Order.edit('doctor', doctor)
                                                }}/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Spectacle Prescription Form</Accordion.Header>
                                            <Accordion.Body>
                                                <SpectaclePrescriptionForm/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion> :
                                    radioValue === "Contacts" ?
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Insurance information</Accordion.Header>
                                                <Accordion.Body>
                                                    <InsuranceForm fun={(insurance, doctor) => {
                                                        Order.edit('insurance', insurance)
                                                        Order.edit('doctor', doctor)
                                                    }}/>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Contact Lens Prescription Form</Accordion.Header>
                                                <Accordion.Body>
                                                    <ContactLensPrescriptionForm/>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion> :
                                        radioValue === "Both" ?
                                            <Accordion>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Insurance information</Accordion.Header>
                                                    <Accordion.Body>
                                                        <InsuranceForm fun={(insurance, doctor) => {
                                                            Order.edit('insurance', insurance)
                                                            Order.edit('doctor', doctor)
                                                        }}/>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>Spectacle Prescription Form</Accordion.Header>
                                                    <Accordion.Body>
                                                        <SpectaclePrescriptionForm/>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>Contact Lens Prescription Form</Accordion.Header>
                                                    <Accordion.Body>
                                                        <ContactLensPrescriptionForm/>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion> : null
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

    )
})


export default OrderAdd