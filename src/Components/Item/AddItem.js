import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Col,
    Container, DropdownButton,
    Form, FormControl,
    InputGroup,
    Row,
    Spinner,
    Table,
    Dropdown
} from "react-bootstrap";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import Item from "../../Store/Item";


const AddItem = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [radioType, setRadioType] = useState(null);

    const radiosType = [
        {name: 'Frame', value: 'Frame'},
        {name: 'Contact', value: 'Contact'},
        {name: 'Lens', value: 'Lens'},
        {name: 'Goods', value: 'Goods'}
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
                    <Row className="mt-4">
                        <Col className="col-5">
                            <Table borderless>
                                <tbody>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Type
                                    </th>
                                    <td className="col-8 text-start ">
                                        <ButtonGroup className="w-100">
                                            <DropdownButton as={ButtonGroup} className="w-50" title="Product" id="bg-nested-dropdown">
                                                {radiosType.map((radioType, idx) => (
                                                    <Dropdown.Item
                                                        className="w-100"
                                                        key={idx}
                                                        id={`radioType-${idx}`}
                                                        name="radio"
                                                        value={radioType.value}
                                                        checked={radioType === radioType.value}
                                                        onChange={(e) => setRadioType(e.currentTarget.value)}
                                                    >
                                                        {radioType.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                            <Button>Service</Button>
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
                    <Row className="mt-4">
                        <Col className="col-5">
                            <Table borderless>
                                <tbody>
                                <tr className="row">
                                    <th className="col-6 text-start align-self-center">
                                        <h4>Sales information</h4>
                                    </th>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Selling Price
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <InputGroup>
                                                    <FormControl placeholder="100.00"/>
                                                    <InputGroup.Text>USD</InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Account
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <Form.Select>
                                                    <option>Discount</option>
                                                    <option>General Income</option>
                                                    <option>Interest Income</option>
                                                    <option>Late Fee Income</option>
                                                    <option>Other Charges</option>
                                                    <option>Sales</option>
                                                    <option>Shipping Charge</option>
                                                </Form.Select>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Sales
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <FormControl
                                                    aria-label="Dollar amount (with dot and two decimal places)"
                                                    placeholder="Sales"/>
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
                                    <th className="col-6 text-start align-self-center">
                                        <h4>Purchase information</h4>
                                    </th>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Cost Price
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <InputGroup>
                                                    <FormControl placeholder="120.00"/>
                                                    <InputGroup.Text>USD</InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Account
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <Form.Select>
                                                    <option>Some options</option>
                                                    <option>Some options</option>
                                                    <option>Some options</option>
                                                    <option>Some options</option>
                                                    <option>Some options</option>
                                                    <option>Some options</option>
                                                    <option>Some options</option>

                                                </Form.Select>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start mt-2">
                                        Description
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group>
                                            <Form.Control as="textarea" rows={1} placeholder="Lorem ipsum"/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="col-5">
                            <Table borderless>
                                <tbody>
                                <tr className="row">
                                    <th className="col-8 text-start align-self-center">
                                        <h4>Track Inventory For This Item</h4>
                                    </th>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Inventory Account
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <Form.Select>
                                                    <option>Some Account</option>
                                                    <option>Some Account</option>
                                                    <option>Some Account</option>
                                                </Form.Select>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-5">
                            <Table borderless>
                                <tbody>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Opening Stock
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <FormControl placeholder="smth about Opening Stock"/>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Reorder Point
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <FormControl placeholder="smth about Reorder Point"/>
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
                                    <th className="col-4 text-start align-self-center flex-wrap">
                                        Opening Stock Rate per Unit
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <FormControl placeholder="smth about Opening Stock ..."/>
                                            </div>
                                        </Form.Group>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Preferred Vendor
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group className="d-flex">
                                            <div className="d-flex w-100">
                                                <Form.Select>
                                                    <option>Some options</option>
                                                    <option>Some options</option>
                                                    <option>Some options</option>
                                                </Form.Select>
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