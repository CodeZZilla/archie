import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import {getAllObject, getAllObjectByRelationField} from "../../Business/BackendlessRequest";
import React, {useEffect, useState} from "react";
import InsuranceAdd from "./InsuranceAdd";
import Order from "../../Store/Order";


const InsuranceForm = observer(({fun}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [insurance, setInsurance] = useState([]);
    const [selectInsurance, setSelectInsurance] = useState(null);
    const [show, setShow] = useState(false)


    useEffect(async () => {
        setInsurance(await getAllObject('InsuranceCompany'))
        setIsLoading(false)
        Order.reset()
    })

    return (
        isLoading ?
            <div>
                <h1>Insurance</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div> :
            <Row className="d-flex justify-content-md-center">
                <Col className="col-4">
                    <Form.Group className="mb-3">
                        <Form.Label>Client insurance</Form.Label>
                        <div className="d-flex">
                            <Form.Select className="me-sm-2" value={selectInsurance}
                                         onChange={(obj) => setSelectInsurance(obj.target.value)}>
                                <option value="null">Unselected</option>
                                {
                                    insurance.map(value => {
                                        return <option key={value.objectId}
                                                       value={value.objectId}>{value.name}</option>
                                    })
                                }
                            </Form.Select>
                            <Button variant="outline-primary" onClick={() => setShow(true)}>Add</Button>
                            <Modal
                                show={show}
                                onHide={() => setShow(false)}
                                dialogClassName="w-75"
                                size="lg"
                                aria-labelledby="example-custom-modal-styling-title">
                                <Modal.Header closeButton/>
                                <Modal.Body>
                                    <InsuranceAdd/>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </Form.Group>
                </Col>
                <Col className="col-4" controlId="doctor">
                    <Form.Group className="mb-3">
                        <Form.Label>Doctor</Form.Label>
                        <div className="d-flex">
                            <Form.Control type="text" placeholder="John Doe" className="me-sm-2"
                                          value={Order.object.doctor}
                                          onChange={(obj) => {
                                              Order.edit("doctor", obj.target.value)
                                          }}/>
                            <Button variant="outline-primary"
                                    onClick={() => {
                                        setShow(true)
                                    }}>Add</Button>
                        </div>
                    </Form.Group>
                </Col>
            </Row>
    )
})

export default InsuranceForm