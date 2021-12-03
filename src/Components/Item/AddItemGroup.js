import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {
    Button, ButtonGroup, Col, Container, Form, Modal, OverlayTrigger, Row, Spinner, Table, ToggleButton, Tooltip
} from "react-bootstrap";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import Item from "../../Store/Item";


const AddItemGroup = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [radioType, setRadioType] = useState(null);
    const [radioTax, setRadioTax] = useState(null);
    const [radioInv, setRadioInv] = useState(null);
    const [showModalAddGroup, setShowModalAddGroup] = useState(false)
    const [showModalAddManufacturer, setShowModalAddManufacturer] = useState(false)
    const [showModalAddBrand, setShowModalAddBrand] = useState(false)

    const radiosType = [{name: 'Service', value: 'Service'}, {name: 'Product', value: 'Product'},];

    const radiosTax = [{name: 'Taxable', value: 'Taxable'}, {name: 'Not-Taxable', value: 'Not-Taxable'},];

    const radiosInv = [{name: 'Inventory', value: 'Inventory'}, {name: 'Not-Inventory', value: 'Not-Inventory'},];

    useEffect(async () => {
        setIsLoading(false)
    }, [])


    return (isLoading ? <div>
        <h1>Create Order</h1>
        <Container className="mt-3 mb-3">
            <Row className="justify-content-md-center">
                <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Row>
        </Container>
    </div> : <div className="mt-5 mb-5">
        <Container>
            <Row>
                <Col className="d-flex justify-content-between">
                    <h2 className="text-center">New Item Group</h2>
                    <Button className="d-flex justify-content-end" type="button" variant="success"
                            size="lg">
                        Save
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="col-5">
                    <Table borderless>
                        <tbody>
                        <tr className="row">
                            <th className="col-4 text-start align-self-center">
                                Type
                            </th>
                            <td className="col-8 text-start">
                                <ButtonGroup className="w-100">
                                    {radiosType.map((radioType, idx) => (<ToggleButton
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
                                    </ToggleButton>))}
                                </ButtonGroup>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col-4 text-start align-self-center">
                                Item Group Name
                            </th>
                            <td className="col-8 text-start">
                                <Form.Group className="d-flex ">
                                    <div className="d-flex w-100">
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

                            </th>
                            <td className="col-5 text-start">
                                <Form.Check
                                    inline
                                    label="Returnable Item"
                                    name="group1"
                                    type="checkbox"
                                    id="checkbox-1"
                                />
                                <OverlayTrigger overlay={
                                    <Tooltip>
                                        Add any other +ve or -ve charges
                                        that need to be applied to adjust the total amount of the
                                        transaction
                                        Eg. +10 or -10.
                                    </Tooltip>}
                                >
                                    <svg version="1.1" width={20} height={20} id="Layer_1"
                                         xmlns="http://www.w3.org/2000/svg" x="0"
                                         y="0" viewBox="0 0 512 512"
                                         className="icon icon-sm align-text-bottom text-muted cursor-pointer">
                                        <path
                                            d="M317.1 147.5c-15.1-13.8-35.5-20.8-60.5-20.8-23.7 0-43.1 6.5-57.7 19.4-14.6 12.9-23.5 31.5-26.4 55.5l-.6 4.9 40.4 4.8.7-4.6c2.5-15.8 7.7-27.5 15.4-34.7 7.7-7.2 17.1-10.7 28.7-10.7 12 0 21.9 3.9 30.1 11.9 8.2 8 12.2 16.9 12.2 27.3 0 5.6-1.3 10.7-4 15.4-2.8 4.9-9.3 11.9-19.3 20.7-10.7 9.4-17.9 16.5-22.1 21.5-5.8 7-10 14-12.6 20.8-3.5 9.1-5.3 19.9-5.3 32.3 0 2.1.1 5.1.2 9l.1 4.7h38.4l.1-4.8c.3-14.3 1.4-21.4 2.3-24.7 1.3-4.7 3.2-8.8 5.9-12.5 2.8-3.8 9-10 18.5-18.4 15.1-13.4 25.1-24.6 30.4-34.2 5.4-9.7 8.1-20.4 8.1-31.9 0-19.9-7.7-37-23-50.9zM256.3 385.3c12.1 0 22-9.8 22-22 0-12.1-9.8-22-22-22-12.1 0-22 9.8-22 22s9.8 22 22 22z"></path>
                                        <path
                                            d="M437.4 74.6C388.9 26.1 324.5-.5 256-.5S123.1 26.2 74.6 74.6C26.1 123.1-.5 187.5-.5 256s26.7 132.9 75.1 181.4c48.5 48.5 112.9 75.1 181.4 75.1s132.9-26.7 181.4-75.1c48.5-48.5 75.1-112.9 75.1-181.4s-26.6-132.9-75.1-181.4zm-22.6 340.2c-42.4 42.4-98.8 65.8-158.8 65.8s-116.4-23.4-158.8-65.8C54.8 372.4 31.5 316 31.5 256S54.8 139.6 97.2 97.2C139.6 54.8 196 31.5 256 31.5s116.4 23.4 158.8 65.8c42.4 42.4 65.8 98.8 65.8 158.8s-23.4 116.3-65.8 158.7z"></path>
                                    </svg>
                                </OverlayTrigger>
                            </td>
                            {/*<td className="col-4 text-start">*/}
                            {/*    <Form.Check*/}
                            {/*        inline*/}
                            {/*        label="Multiple Items?"*/}
                            {/*        name="group2"*/}
                            {/*        type="checkbox"*/}
                            {/*        id="checkbox-2"*/}
                            {/*    />*/}
                            {/*</td>*/}
                        </tr>
                        <tr className="row">
                            <th className="col-4 text-start align-self-center">
                                Unit
                            </th>
                            <td className="col-8 text-start">
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Unit"/>
                                </Form.Group>
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
                        {Item.getFiles().map((file) => <FileItem {...file}
                                                                 onDelete={(id) => Item.setFiles(Item.getFiles().filter((x) => x.id !== id))}
                                                                 preview info key={file.id}/>)}
                    </Dropzone>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="col-5">
                    <Table borderless>
                        <tbody>

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
                        <tr className="row">
                            <th className="col-4 text-start align-self-center">
                                Tax Preference
                            </th>
                            <td className="col-8 text-start">
                                <ButtonGroup className="w-100">
                                    {radiosTax.map((radioTax, idx) => (<ToggleButton
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
                                    </ToggleButton>))}
                                </ButtonGroup>
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
                        <tr className="row">
                            <th className="col-4 text-start align-self-center">
                                Your Item Type
                            </th>
                            <td className="col-8 text-start">
                                <ButtonGroup className="w-100">
                                    {radiosInv.map((radioInv, idx) => (<ToggleButton
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
                                    </ToggleButton>))}
                                </ButtonGroup>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </div>)
})

export default AddItemGroup