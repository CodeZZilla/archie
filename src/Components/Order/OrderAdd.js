import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {
    Accordion,
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Spinner,
    Table,
    ToggleButton
} from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Order from "../../Store/Order";
import {
    saveObject,
    getAllObject,
    getAllObjectByRelationField,
    getRelObject,
    getRelObjectDepth1, getRelObjectDepth1All
} from "../../Business/BackendlessRequest"
import {BsPlusLg} from "react-icons/all";
import LocationAddEdit from "../Location/LocationAddEdit";
import PatientAdd from "../Patient/PatientAdd";
import SpectaclePrescriptionForm from "../Prescriptions/SpectaclePrescriptionForm";
import ContactLensPrescription from "../../Store/ContactLensPrescription";
import ContactLensPrescriptionForm from "../Prescriptions/ContactLensPrescriptionForm";
import InsuranceForm from "../Insurance/InsuranceForm";
import Backendless from "backendless";
import OrderContactLensPrescription from "./OrderContactLensPrescription";
import OrderSpectaclePrescription from "./OrderSpectaclePrescription";
import SpectacleLensInfo from "../Prescriptions/SpectacleLensInfo";
import Patient from "../../Store/Patient";
import SpectacleLens from "../../Store/SpectacleLens";
import OrderAddProduct from "./OrderAddProduct";


const OrderAdd = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [location, setLocation] = useState(null)
    const [showModalAddClient, setShowModalAddClient] = useState(false)
    const [clients, setClients] = useState([])

    const [radioValue, setRadioValue] = useState(null);

    const radios = [
        {name: 'Spectacles', value: 'Spectacles'},
        {name: 'Contacts', value: 'Contacts'},
        {name: 'Both', value: 'Both'},
    ];

    useEffect(async () => {
        //setLocation(await getRelObject())
        //Order.edit('location', )
        setClients(await getAllObject('Client'))
        let userCurrent = await Backendless.UserService.getCurrentUser()
        let allLocations = await getRelObjectDepth1All("Location")
        let tmp = false
        for await (let item of allLocations) {
            if (tmp) break
            for await (let user of item.other_users) {
                if (tmp) break
                if (userCurrent.objectId === user.objectId) {
                    setLocation(item)
                    tmp = true
                }
            }
        }

        let curr = new Date();
        curr.setDate(curr.getDate());
        let date = curr.toISOString().substr(0, 10);
        Order.edit('date', date)
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
            <div className="mt-5 mb-5">
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <h1 className="text-center">Create new order</h1>
                            <Button className="d-flex justify-content-end" disabled type="button" variant="success"
                                    size="lg">
                                Save Only
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col className="col-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Date order</Form.Label>
                                <Form.Control type="date" placeholder="Date order" defaultValue={Order.object.date}
                                              disabled/>
                            </Form.Group>
                        </Col>
                        <Col className="col-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                {/*<Form.Select className="me-sm-2" value={Order.object.location}*/}
                                {/*             onChange={(obj) => Order.edit('location', obj.target.value)}>*/}
                                {/*    <option value="null">Unselected</option>*/}
                                {/*    {*/}
                                {/*        locations.map(value => {*/}
                                {/*            return <option key={value.objectId}*/}
                                {/*                           value={value.objectId}>{value.name_location} {value.street_address}</option>*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*</Form.Select>*/}
                                <Form.Control type="text" placeholder="Location" defaultValue={location.name_location}
                                              disabled/>
                            </Form.Group>
                        </Col>
                        <Col className="col-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Client</Form.Label>
                                <div className="d-flex">
                                    <Form.Select className="me-sm-2" value={Order.object.client}
                                                 onChange={(obj) => Order.edit('client', obj.target.value)}>
                                        <option value={null}>Unselected</option>
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
                                <Form.Label>Doctor</Form.Label>
                                <Form.Control type="text" placeholder="John Doe"/>
                            </Form.Group>
                        </Col>
                        <Row className="mt-1 mb-1 justify-content-md-around">
                            <Col className="col-3 ">
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
                        </Row>
                        <Col className="col-12">
                            {
                                radioValue === "Spectacles" ?
                                    <>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Insurance information</Accordion.Header>
                                                <Accordion.Body>
                                                    <InsuranceForm fun={(insurance) => {
                                                        Order.edit('insurance', insurance)
                                                    }}/>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        <Accordion>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Spectacle Prescription Form</Accordion.Header>
                                                <Accordion.Body>
                                                    <OrderSpectaclePrescription/>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        <Accordion>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>Spectacle Lens Info</Accordion.Header>
                                                <Accordion.Body>
                                                    <SpectacleLensInfo/>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        <Accordion>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header>Products</Accordion.Header>
                                                <Accordion.Body>
                                                    <OrderAddProduct/>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </>
                                    :
                                    radioValue === "Contacts" ?
                                        <>
                                            <Accordion>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Insurance information</Accordion.Header>
                                                    <Accordion.Body>
                                                        <InsuranceForm fun={(insurance) => {
                                                            Order.edit('insurance', insurance)
                                                        }}/>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>Contact Lens Prescription Form</Accordion.Header>
                                                    <Accordion.Body>
                                                        <OrderContactLensPrescription/>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>Spectacle Lens Info</Accordion.Header>
                                                    <Accordion.Body>
                                                        <SpectacleLensInfo/>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </> :
                                        radioValue === "Both" ?
                                            <>
                                                <Accordion>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Insurance information</Accordion.Header>
                                                        <Accordion.Body>
                                                            <InsuranceForm fun={(insurance) => {
                                                                Order.edit('insurance', insurance)
                                                            }}/>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                                <Accordion>
                                                    <Accordion.Item eventKey="1">
                                                        <Accordion.Header>Spectacle Prescription Form</Accordion.Header>
                                                        <Accordion.Body>
                                                            <OrderSpectaclePrescription/>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                                <Accordion>
                                                    <Accordion.Item eventKey="2">
                                                        <Accordion.Header>Contact Lens Prescription
                                                            Form</Accordion.Header>
                                                        <Accordion.Body>
                                                            <OrderContactLensPrescription/>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                                <Accordion>
                                                    <Accordion.Item eventKey="2">
                                                        <Accordion.Header>Spectacle Lens Info</Accordion.Header>
                                                        <Accordion.Body>
                                                            <SpectacleLensInfo/>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </> : null
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

    )
})


export default OrderAdd