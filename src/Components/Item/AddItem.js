import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Container, Form, Modal, Row, Spinner, Table, ToggleButton} from "react-bootstrap";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import Item from "../../Store/Item";


const AddItem = observer( () => {
    const [isLoading, setIsLoading] = useState(true)
    const [radioType, setRadioType] = useState(null);
    const [radioTax, setRadioTax] = useState(null);
    const [radioInv, setRadioInv] = useState(null);
    const [showModalAddGroup, setShowModalAddGroup] = useState(false)
    const [showModalAddManufacturer, setShowModalAddManufacturer] = useState(false)
    const [showModalAddBrand, setShowModalAddBrand] = useState(false)

    const radiosType = [
        {name: 'Service', value: 'Service'},
        {name: 'Product', value: 'Product'},
    ];

    const radiosTax = [
        {name: 'Taxable', value: 'Taxable'},
        {name: 'Not-Taxable', value: 'Not-Taxable'},
    ];

    const radiosInv = [
        {name: 'Inventory', value: 'Inventory'},
        {name: 'Not-Inventory', value: 'Not-Inventory'},
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
                            <h2 className="text-center">New Item</h2>
                            <Button className="d-flex justify-content-end" type="button" variant="success"
                                    size="lg">
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row  className="mt-4">
                        <Col className="col-5">
                            <Table borderless>
                                <tbody>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Type
                                    </th>
                                    <td className="col-8 text-start">
                                        <ButtonGroup className="w-100">
                                            {radiosType.map((radioType, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`radioType-${idx}`}
                                                    type="radio"
                                                    variant="outline-primary"
                                                    name="radio"
                                                    value={radioType.value}
                                                    checked={radioType === radioType.value}
                                                    onChange={(e) => setRadioType(e.currentTarget.value)}
                                                >
                                                    {radioType.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
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

                                    </th>
                                    <td className="col-4 text-start">
                                        <Form.Check
                                            inline
                                            label="Returnable Item"
                                            name="group1"
                                            type="checkbox"
                                            id="checkbox-1"
                                        />
                                    </td>
                                    <td className="col-4 text-start">
                                        <Form.Check
                                            inline
                                            label="Multiple Items?"
                                            name="group2"
                                            type="checkbox"
                                            id="checkbox-2"
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-1"> </Col>
                        <Col className="col-6">
                            <Dropzone
                                style={{minWidth: "505px"}}
                                onChange={(incommingFiles) => Item.setFiles(incommingFiles)}
                                value={Item.getFiles()}
                                maxFiles={20}
                                maxFileSize={20970000}
                            >
                                {Item.getFiles().map((file) =>
                                    <FileItem {...file}
                                              onDelete={(id) => Item.setFiles(Item.getFiles().filter((x) => x.id !== id))}
                                              preview info key={file.id}/>
                                )}
                            </Dropzone>
                        </Col>
                    </Row>
                    <Row  className="mt-4">
                        <Col className="col-5">
                            <Table borderless>
                                <tbody>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Tax Preference
                                    </th>
                                    <td className="col-8 text-start">
                                        <ButtonGroup className="w-100">
                                            {radiosTax.map((radioTax, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`radioTax-${idx}`}
                                                    type="radio"
                                                    variant="outline-primary"
                                                    name="radioTax"
                                                    value={radioTax.value}
                                                    checked={radioTax === radioTax.value}
                                                    onChange={(e) => setRadioTax(e.currentTarget.value)}
                                                >
                                                    {radioTax.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Manufacturer
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <Form.Select className="me-sm-2">
                                                    <option>Some Manufacturer</option>
                                                    <option>Some Manufacturer</option>
                                                    <option>Some Manufacturer</option>
                                                </Form.Select>
                                                <Button variant="outline-primary"
                                                        onClick={() => setShowModalAddManufacturer(true)}>Add</Button>
                                                <Modal
                                                    show={showModalAddManufacturer}
                                                    onHide={() => setShowModalAddManufacturer(false)}
                                                    dialogClassName="w-50"
                                                    size="xl"
                                                    aria-labelledby="example-custom-modal-styling-title">
                                                    <Modal.Header closeButton/>
                                                    <Modal.Body>
                                                        <div>
                                                            showModalAddManufacturer
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-1"> </Col>
                        <Col className="col-5">
                            <Table borderless>
                                <tbody>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Your Item Type
                                    </th>
                                    <td className="col-8 text-start">
                                        <ButtonGroup className="w-100">
                                            {radiosInv.map((radioInv, idx) => (
                                                <ToggleButton
                                                    key={idx}
                                                    id={`radio-${idx}`}
                                                    type="radio"
                                                    variant="outline-primary"
                                                    name="radioInv"
                                                    value={radioInv.value}
                                                    checked={radioInv === radioInv.value}
                                                    onChange={(e) => setRadioInv(e.currentTarget.value)}
                                                >
                                                    {radioInv.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Brand
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <Form.Select className="me-sm-2">
                                                    <option>Some Brand</option>
                                                    <option>Some Brand</option>
                                                    <option>Some Brand</option>
                                                </Form.Select>
                                                <Button variant="outline-primary"
                                                        onClick={() => setShowModalAddBrand(true)}>Add</Button>
                                                <Modal
                                                    show={showModalAddBrand}
                                                    onHide={() => setShowModalAddBrand(false)}
                                                    dialogClassName="w-50"
                                                    size="xl"
                                                    aria-labelledby="example-custom-modal-styling-title">
                                                    <Modal.Header closeButton/>
                                                    <Modal.Body>
                                                        <div>
                                                            showModalAddBrand
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
})

export default AddItem