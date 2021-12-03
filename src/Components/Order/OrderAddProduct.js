import {observer} from "mobx-react-lite";
import React, {Fragment, useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Col,
    Container, DropdownButton, Dropdown,
    Form,
    Modal,
    OverlayTrigger,
    Row,
    Spinner,
    Table,
    Tooltip, InputGroup, FormControl
} from "react-bootstrap";
import {getAllObject} from "../../Business/BackendlessRequest";
import Product from "../../Store/Product";
import {Highlighter, Typeahead} from "react-bootstrap-typeahead";
import {
    AiTwotoneDelete,
    FaBeer,
    HiOutlineDotsCircleHorizontal,
    IoIosRemoveCircleOutline,
    IoMdRemoveCircle
} from "react-icons/all";
import OrderProducts from "../../Store/OrderProducts";
import AddItemGroup from "../Item/AddItemGroup";
import AddItem from "../Item/AddItem";

const OrderAddProduct = observer(() => {
    const [allProduct, setAllProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showModalAddProduct, setShowModalAddProduct] = useState(false)
    const [showModalAddProductInOrder, setShowModalAddProductInOrder] = useState(false)
    const [modalTmpProduct, setModalTmpProduct] = useState({})
    const [products, setProducts] = useState([])
    const [modalNewItem, setModalNewItem] = useState(false)


    useEffect(async () => {
        setAllProduct(await getAllObject('Product'))
        setIsLoading(false)
        OrderProducts.resetAll()
    }, [])


    let addProductInOrderEvent = () => {
        setShowModalAddProductInOrder(false)
    }

    let renderItems = (option, {text}) => (
        <Fragment>
            <Highlighter search={text}>
                {option.name}
            </Highlighter>,
            <div>
                <small>
                    SKU: {option.sku} Rate: {option.rate}
                </small>
            </div>
        </Fragment>

    )

    return (
        isLoading ?
            <div>
                <h1>Spectacle Lens Info</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div> :
            <div className="mt-3">
                <Container>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                            <tr className="row">
                                <th className="col-5">
                                    <Row>
                                        <Col className="col-4 align-self-center">
                                            Item Details
                                        </Col>
                                        <Col className="col-4 align-self-center text-start">
                                            <Button variant="outline-primary" onClick={() => setModalNewItem(true)}>Add
                                                item</Button>
                                            <Modal
                                                show={modalNewItem}
                                                onHide={() => setModalNewItem(false)}
                                                dialogClassName="w-100"
                                                size="xl"
                                                fullscreen
                                                aria-labelledby="example-custom-modal-styling-title">
                                                <Modal.Header closeButton/>
                                                <Modal.Body>
                                                    <AddItem/>
                                                </Modal.Body>
                                            </Modal>
                                        </Col>
                                    </Row>
                                </th>
                                <th className="text-center align-self-center col-1">Quantity</th>
                                <th className="text-center align-self-center col-1">Rate</th>
                                <th className="text-center align-self-center col-2">Discount</th>
                                <th className="text-center align-self-center col-1">Amount</th>
                                <th className="text-center align-self-center col-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                Array.from(OrderProducts.array).map(((value, index) => {
                                    return <tr className="row">
                                        <td className="col-5">
                                            <Typeahead renderMenuItemChildren={renderItems}
                                                       id="rendering-example"
                                                       labelKey="info"
                                                       onChange={(obj) => {
                                                           if (obj[0] !== undefined) {
                                                               OrderProducts.edit(index, 'itemDetails', obj[0])
                                                           } else {
                                                               OrderProducts.edit(index, 'itemDetails', null)
                                                           }
                                                       }}
                                                       options={[
                                                           {
                                                               name: "Item 0",
                                                               sku: "SKU 0",
                                                               quantity: "20",
                                                               rate: "2100",
                                                               info: "Item 0 (SKU 0, 2100)"
                                                           },
                                                           {
                                                               name: "Item 1",
                                                               sku: "SKU 1",
                                                               quantity: "25",
                                                               rate: "1234",
                                                               info: "Item 1 (SKU 1, 1234)"
                                                           }
                                                       ]}
                                                       selected={OrderProducts.array[index].itemDetails !== null ? [OrderProducts.array[index].itemDetails] : []}
                                                       placeholder="Choose a item..."/>

                                        </td>
                                        <td className="col-1">
                                            <Form.Control className="text-end"
                                                          value={OrderProducts.array[index].quantity}
                                                          onChange={(e) => OrderProducts.edit(index, 'quantity', e.target.value)}
                                                          type="number"/>
                                        </td>
                                        <td className="col-1">
                                            <Form.Control className="text-end" value={OrderProducts.array[index].rate}
                                                          onChange={(e) => OrderProducts.edit(index, 'rate', e.target.value)}
                                                          type="number"/>
                                        </td>
                                        <td className="col-2 d-flex">
                                            <Form.Control className="text-end"
                                                          value={OrderProducts.array[index].discount}
                                                          onChange={(e) => OrderProducts.edit(index, 'discount', e.target.value)}
                                                          type="number"/>
                                            <Form.Select aria-label="Discount"
                                                         value={OrderProducts.array[index].discountTag}
                                                         onChange={(e) => OrderProducts.edit(index, 'discountTag', e.target.value)
                                                         }>
                                                <option value="$" selected>$</option>
                                                <option value="%">%</option>
                                            </Form.Select>
                                        </td>
                                        <td className="col-1">
                                            <p className="text-center">{OrderProducts.array[index].amount}$</p>
                                        </td>
                                        <td className="col-2 d-flex justify-content-around">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline-primary">
                                                    More
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        Add Additional Information
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => OrderProducts.cloneItem(index)}>
                                                        Clone
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Button variant="outline-danger"
                                                    onClick={() => OrderProducts.removeRow(index)}>Delete</Button>
                                        </td>
                                    </tr>
                                }))
                            }
                            </tbody>
                        </Table>
                    </Row>
                    <Row className="mt-3">
                        <Col className="text-start mb-3">
                            <Col className="col-12 text-start mb-5">
                                <ButtonGroup>
                                    <Button onClick={() => OrderProducts.addRow()}>Add another line</Button>
                                    <DropdownButton as={ButtonGroup} id="bg-nested-dropdown">
                                        <Dropdown.Item eventKey="1">Add Items In Bulk</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Add Item Header</Dropdown.Item>
                                    </DropdownButton>
                                </ButtonGroup>
                            </Col>
                            <Form.Group>
                                <Form.Label>Client Notes</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Notes user"/>
                            </Form.Group>
                            <Form.Check
                                inline
                                label="Use this in future."
                                name="group1"
                                type="checkbox"
                                id="checkbox-1"
                            />
                        </Col>
                        <Col className="col-6 p-2 bg-light">
                            <Row className="m-2">
                                <Row className="mb-3">
                                    <Col className="col-8 text-start">Sub Total</Col>
                                    <Col className="col-4 text-end">{OrderProducts.subTotal}</Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col className="col-4 text-start text-nowrap">Shipping Charges</Col>
                                    <Col className="col-4">
                                        <Row>
                                            <Col className="col-10">
                                                <Form.Control type="number" value={OrderProducts.shippingCharges}
                                                              onChange={(e) => OrderProducts.setShippingCharges(e.target.value)}/>
                                            </Col>
                                            <Col className="col-2 align-self-center">
                                                <OverlayTrigger overlay={<Tooltip>
                                                    Add any other +ve or -ve charges
                                                    that need to be applied to adjust the total amount of the
                                                    transaction
                                                    Eg. +10 or -10.</Tooltip>}>
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
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-4 text-end">{OrderProducts.shippingCharges}</Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col className="col-4">
                                        <Form.Control type="text" value={OrderProducts.otherField.text}
                                                      onChange={(e) => OrderProducts.editOtherField('text', e.target.value)}/>
                                    </Col>
                                    <Col className="col-4">
                                        <Row>
                                            <Col className="col-10">
                                                <Form.Control type="number" value={OrderProducts.otherField.price}
                                                              onChange={(e) => OrderProducts.editOtherField('price', e.target.value)}/>
                                            </Col>
                                            <Col className="col-2 align-self-center">
                                                <OverlayTrigger overlay={<Tooltip>
                                                    Add any other +ve or -ve charges that need to be applied to adjust
                                                    the total amount of the transaction Eg. +10 or -10.</Tooltip>}>
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
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-4 text-end">{OrderProducts.otherField.price}</Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col className="col-6 text-start h6">Total ( $ )</Col>
                                    <Col className="col-6 text-end h6">{OrderProducts.total}</Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
})


export default OrderAddProduct