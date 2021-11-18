import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import InputFormPatient from "../Inputs/InputFormPatient";
import Patient from "../../Store/Patient";
import Order from "../../Store/Order";


const InsuranceAdd = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)

    useEffect(async () => {
        setIsLoading(false)
    }, [])

    return (
        isLoading ?
            <div>
                <h1>Client Insurance</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div> :
            <div className="mt-1">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="d-flex justify-content-between">
                            <h1 className="text-center">Client Insurance</h1>
                            <Button className="d-flex justify-content-around" disabled={btnSpinnerShow} type="button"
                                    variant="success"
                                    size="lg">
                                {btnSpinnerShow ?
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        role="status"
                                        aria-hidden="true"
                                    /> : null
                                }
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <div className="border border-secondary p-md-4 mt-4 ">
                        <Row className="justify-content-md-center">
                            <Col>
                                <InputFormPatient value={Order.object.insurance} id="insurance" title="Insurance Company"/>
                            </Col>
                            <Col>
                                <InputFormPatient value={Order.object.policy} id="policy" title="Insurance Policy Number"/>
                            </Col>
                        </Row>
                        </div>
                </Container>
            </div>

)
})

export default InsuranceAdd