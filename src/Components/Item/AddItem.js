import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Container, Form, Modal, Row, Spinner, Table, ToggleButton} from "react-bootstrap";


const AddItem = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [radioValue, setRadioValue] = useState(null);
    const [showModalAddGroup, setShowModalAddGroup] = useState(false)

    const radios = [
        {name: 'Service', value: 'Service'},
        {name: 'Product', value: 'Product'},
    ];

    useEffect(async () => {
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
                            <h1 className="text-center">New Item</h1>
                            <Button className="d-flex justify-content-end " disabled type="button" variant="success"
                                    size="lg">
                                Save Only
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="col-6">
                            <Table borderless>
                                <tbody>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Type
                                    </th>
                                    <td className="col-8 text-start">
                                        <ButtonGroup>
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
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Item Group Name
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-75">
                                                <Form.Select className="me-sm-2">
                                                    <option>Spectacle</option>
                                                    <option>Contact Lens</option>
                                                    <option>Lens</option>
                                                    <option>Frame</option>
                                                    <option>Other</option>
                                                </Form.Select>
                                                <Button variant="outline-primary"
                                                        onClick={() => setShowModalAddGroup(true)}>Add</Button>
                                                <Modal
                                                    show={showModalAddGroup}
                                                    onHide={() => setShowModalAddGroup(false)}
                                                    dialogClassName="w-50"
                                                    size="xl"
                                                    aria-labelledby="example-custom-modal-styling-title">
                                                    <Modal.Header closeButton/>
                                                    <Modal.Body>
                                                        <div>
                                                            Xyi
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Description
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group>
                                            <Form.Control as="textarea" rows={3} placeholder="Description"/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Returnable Item
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Check
                                            inline
                                            name="group1"
                                            type="checkbox"
                                            id="checkbox-1"
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-3">

                        </Col>
                    </Row>
                </Container>
            </div>
    )
})

export default AddItem