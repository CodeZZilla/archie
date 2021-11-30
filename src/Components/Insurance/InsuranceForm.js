import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import {getAllObject, getAllObjectByRelationField} from "../../Business/BackendlessRequest";
import React, {useEffect, useState} from "react";
import InsuranceAdd from "./InsuranceAdd";
import Order from "../../Store/Order";
import Select from "react-select";


const InsuranceForm = observer(({fun}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [insurance, setInsurance] = useState([]);
    const [selectInsurance, setSelectInsurance] = useState([]);
    const [show, setShow] = useState(false)


    useEffect(async () => {
        await setOptions()
        setIsLoading(false)
        Order.reset()
    }, [])

    let setOptions = async () =>{
        let insurance = await getAllObject('InsuranceCompany')
        let options = []
        for (let item of insurance) {
            options.push({
                value: item.objectId,
                label: item.name + ' ' + item.policy_number
            })
        }
        setInsurance(options)
    }


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
                <Col className="col-6">
                    <Form.Group className="mb-3 w-100" controlId="hobbies">
                        <Form.Label>Insurance</Form.Label>
                        <div className="d-flex">
                            <Select  isMulti className="m-2 w-75" options={insurance} onChange={(array)=>Order.edit("selectedInsurance",array)}  />
                            <Button className="m-2" variant="outline-primary" onClick={() => setShow(true)}>Add</Button>
                            <Modal
                                show={show}
                                onHide={() => setShow(false)}
                                dialogClassName="w-75"
                                size="lg"
                                aria-labelledby="example-custom-modal-styling-title">
                                <Modal.Header closeButton/>
                                <Modal.Body>
                                    <InsuranceAdd fun={ async () => {
                                        setShow(false)
                                        await setOptions()
                                    }}/>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </Form.Group>
                    {/*<Form.Group className="mb-3">
                        <Form.Label>Insurance</Form.Label>
                        <div className="d-flex">
                            <Form.Select className="me-sm-2" value={Order.object.insurance}
                                         onChange={(obj) => setSelectInsurance(obj.target.value)}>
                                <option value="null">Unselected</option>
                                {
                                    insurance.map(value => {
                                        return <option key={value.objectId}
                                                       value={value.objectId}>{value.name}</option>
                                    })
                                }
                            </Form.Select>
                        </div>
                    </Form.Group>*/}
                </Col>
                <Col className="col-3 m-2">
                    <Form.Group className="mb-3">
                        <Form.Label>Doctor</Form.Label>
                        <Form.Control type="text" placeholder="John Doe"/>
                    </Form.Group>
                </Col>
            </Row>
    )
})

export default InsuranceForm