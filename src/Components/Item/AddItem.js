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
    Dropdown, Accordion
} from "react-bootstrap";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import Item from "../../Store/Item";
import {saveObject} from "../../Business/BackendlessRequest";
import AddFrame from "../Frame/AddFrame";


const AddItem = observer(({fun}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [radioType, setRadioType] = useState('Service');
    const [dropdownButtonValue, setDropdownButtonValue] = useState('Product')

    const radiosType = [
        {name: 'Frame', value: 'Frame'},
        {name: 'Contact', value: 'Contact'},
        {name: 'Lens', value: 'Lens'},
        {name: 'Goods', value: 'Goods'}
    ];

    const accountArray = [
        {name: "Discount", value: "Discount"},
        {name: "General Income", value: "General Income"},
        {name: "Interest Income", value: "Interest Income"},
        {name: "Late Fee Income", value: "Late Fee Income"},
        {name: "Other Charges", value: "Other Charges"},
        {name: "Sales", value: "Sales"},
        {name: "Shipping Charge", value: "Shipping Charge"},
    ]

    const accountArray1 = [
        {name: "Discount1", value: "Discount1"},
        {name: "General Income1", value: "General Income1"},
        {name: "Interest Income1", value: "Interest Income1"},
        {name: "Late Fee Income1", value: "Late Fee Income1"},
        {name: "Other Charges1", value: "Other Charges1"},
        {name: "Sales1", value: "Sales1"},
        {name: "Shipping Charge1", value: "Shipping Charge1"},
    ]

    const accountArray2 = [
        {name: "Discount2", value: "Discount2"},
        {name: "General Income2", value: "General Income2"},
        {name: "Interest Income2", value: "Interest Income2"},
        {name: "Late Fee Income2", value: "Late Fee Income2"},
        {name: "Other Charges2", value: "Other Charges2"},
        {name: "Sales2", value: "Sales2"},
        {name: "Shipping Charge2", value: "Shipping Charge2"},
    ]

    const accountArray3 = [
        {name: "Discount3", value: "Discount3"},
        {name: "General Income3", value: "General Income3"},
        {name: "Interest Income3", value: "Interest Income3"},
        {name: "Late Fee Income3", value: "Late Fee Income3"},
        {name: "Other Charges3", value: "Other Charges"},
        {name: "Sales3", value: "Sales3"},
        {name: "Shipping Charge3", value: "Shipping Charge3"},
    ]

    useEffect(async () => {
        Item.reset()
        setIsLoading(false)
    }, [])

    const handleSaveItem = async () => {
        await saveObject("Item", Item.object)
        Item.reset()
        await fun()
    }

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
                                    size="lg" onClick={handleSaveItem}>
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
                                            <Button variant={radioType === 'Service' ? 'primary' : 'outline-primary'}
                                                    onClick={() => {
                                                        Item.edit('type', 'Service')
                                                        setDropdownButtonValue('Product')
                                                        setRadioType('Service')
                                                    }}>
                                                Service
                                            </Button>
                                            <DropdownButton
                                                variant={radioType === 'Product' ? 'primary' : 'outline-primary'}
                                                as={ButtonGroup}
                                                className="w-50"
                                                title={dropdownButtonValue}
                                                id="bg-nested-dropdown">
                                                {radiosType.map((radioType, idx) => (
                                                    <Dropdown.Item
                                                        className="w-100"
                                                        key={idx}
                                                        id={`radioType-${idx}`}
                                                        name="radio"
                                                        value={radioType.value}
                                                        checked={radioType === radioType.value}
                                                        onClick={(e) => {
                                                            Item.edit('type', e.target.text)
                                                            setRadioType('Product')
                                                            setDropdownButtonValue(e.target.text)
                                                        }}
                                                    >
                                                        {radioType.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col-4 text-start align-self-center">
                                        Description
                                    </th>
                                    <td className="col-8 text-start">
                                        <Form.Group>
                                            <Form.Control as="textarea"
                                                          onChange={(e) => Item.edit('description', e.target.value)}
                                                          rows={3} placeholder="Description"/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                {
                                    dropdownButtonValue === 'Frame' && radioType === 'Product' ?
                                        <tr className="row">
                                            <th className="col-4 text-start align-self-center">

                                            </th>
                                            <td className="col-4 text-start">
                                                <Form.Check
                                                    onChange={(e) => Item.edit('returnable_item', e.target.checked)}
                                                    inline
                                                    label="Returnable Item"
                                                    name="group1"
                                                    type="checkbox"
                                                    id="checkbox-1"
                                                />
                                            </td>
                                        </tr> : null
                                }
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
                                                    <FormControl placeholder="100.00"
                                                                 onChange={(e) => Item.edit('selling_price', e.target.value)}/>
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
                                                <Form.Select
                                                    onChange={(e) => Item.edit('account', e.target.value)}>
                                                    {
                                                        Array.from(accountArray).map((val, index) =>
                                                            <option value={val.value}
                                                                    key={index + val.value}>{val.name}</option>
                                                        )
                                                    }
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
                                                    onChange={(e) => Item.edit('sales', e.target.value)}
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
                                                    <FormControl placeholder="120.00"
                                                                 onChange={(e) => Item.edit('cost_price', e.target.value)}/>
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
                                                <Form.Select
                                                    onChange={(e) => Item.edit('account_purchase', e.target.value)}>
                                                    {
                                                        Array.from(accountArray1).map((val, index) =>
                                                            <option value={val.value}
                                                                    key={index + val.value}>{val.name}</option>
                                                        )
                                                    }
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
                                            <Form.Control as="textarea" rows={1} placeholder="Lorem ipsum"
                                                          onChange={(e) => Item.edit('description_purchase', e.target.value)}/>
                                        </Form.Group>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    {
                        radioType === 'Product' ?
                            <>
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
                                                            <Form.Select
                                                                onChange={(e) => Item.edit('account_inventory', e.target.value)}>
                                                                {
                                                                    Array.from(accountArray2).map((val, index) =>
                                                                        <option value={val.value}
                                                                                key={index + val.value}>{val.name}</option>
                                                                    )
                                                                }
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
                                                            <FormControl placeholder="smth about Opening Stock"
                                                                         onChange={(e) => Item.edit('opening_stock', e.target.value)}/>
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
                                                            <FormControl placeholder="smth about Reorder Point"
                                                                         onChange={(e) => Item.edit('reorder_point', e.target.value)}/>
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
                                                            <FormControl placeholder="smth about Opening Stock ..."
                                                                         onChange={(e) => Item.edit('opening_stock_rate_per_unit', e.target.value)}/>
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
                                                            <Form.Select
                                                                onChange={(e) => Item.edit('preferred_vendor', e.target.value)}>
                                                                {
                                                                    Array.from(accountArray3).map((val, index) =>
                                                                        <option value={val.value}
                                                                                key={index + val.value}>{val.name}</option>
                                                                    )
                                                                }
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
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>{dropdownButtonValue} information</Accordion.Header>
                                            <Accordion.Body>
                                                {
                                                    dropdownButtonValue === 'Frame' ?
                                                        <AddFrame/> : null
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Row>
                            </> : null
                    }
                </Container>
            </div>
    )
})

export default AddItem