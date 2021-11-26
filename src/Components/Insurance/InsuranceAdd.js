import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Order from "../../Store/Order";
import {saveObject} from "../../Business/BackendlessRequest";


const InsuranceAdd = observer(({fun}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)
    const [nameInsurance, setNameInsurance] = useState("")
    const [policy, setPolicy] = useState("")

    useEffect(async () => {
        setIsLoading(false)
    }, [])

    let save = async () => {
        setBtnSpinnerShow(true)
        await saveObject("InsuranceCompany", {
            name: nameInsurance,
            policy_number: policy
        })
        setBtnSpinnerShow(false)
        await fun()
    }

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
                            <Button className="d-flex justify-content-around" onClick={save} disabled={btnSpinnerShow} type="button"
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
                                <Form.Group className="mb-3">
                                    <Form.Label>Insurance Company</Form.Label>
                                    <Form.Control type="text" placeholder="Insurance" value={nameInsurance}
                                                  onChange={(obj) => {
                                                      setNameInsurance(obj.target.value)
                                                  }}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Insurance Policy Number</Form.Label>
                                    <Form.Control type="text" placeholder="Policy Number" value={policy}
                                                  onChange={(obj) => {
                                                      setPolicy(obj.target.value)
                                                  }}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    id="add-insurance"
                                    label="Check if use primary insurance"
                                    onChange={(e) => Order.edit(Order.object.primary, e.target.checked)}
                                />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

    )
})

export default InsuranceAdd