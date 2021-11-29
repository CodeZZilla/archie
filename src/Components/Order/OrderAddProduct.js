import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Modal, Row, Spinner, Table} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import PatientAdd from "../Patient/PatientAdd";
import {getAllObject} from "../../Business/BackendlessRequest";
import Product from "../../Store/Product";
import ProductAdd from "../Product/ProductAdd";
import Order from "../../Store/Order";


const OrderAddProduct = observer(() => {
    const [allProduct, setAllProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showModalAddProduct, setShowModalAddProduct] = useState(false)
    const [showModalAddProductInOrder, setShowModalAddProductInOrder] = useState(false)
    const [modalTmpProduct, setModalTmpProduct] = useState({})

    const columns = [{
        dataField: 'item',
        text: 'Product',
        headerAlign: (column, colIndex) => 'left',
    }, {
        dataField: 'quantity',
        text: 'Quantity'
    }, {
        dataField: 'price',
        text: 'Price'
    }, {
        dataField: 'discount',
        text: 'Discount'
    }];

    useEffect(async () => {
        setAllProduct(await getAllObject('Product'))
        setIsLoading(false)
    }, [])

    let products = [
        {
            item: "2",
            quantity: "100",
            price: "200$",
            discount: "100%"
        }
    ]

    let addProductInOrderEvent = () => {
        products.push({
            item: modalTmpProduct.product_name,
            quantity: '1',
            price: modalTmpProduct.price_each,
            discount: "0%"
        })
        setShowModalAddProductInOrder(false)
    }

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
            <div className="mt-5">
                <Container>
                    <Row className="mb-4 justify-content-md-center">
                        <Button className="col-4 m-2" variant="outline-dark"
                                onClick={() => setShowModalAddProductInOrder(true)}>
                            Add product in order
                        </Button>
                        <Button className="col-4 m-2" variant="outline-dark"
                                onClick={() => setShowModalAddProduct(true)}>
                            Add new product
                        </Button>
                        <Modal
                            show={showModalAddProductInOrder}
                            onHide={() => setShowModalAddProductInOrder(false)}
                            dialogClassName="w-75"
                            size="md"
                            aria-labelledby="example-custom-modal-styling-title">
                            <Modal.Header closeButton/>
                            <Modal.Body>
                                <Row>
                                    <Col className="col-12">
                                        <h3>Add product in order</h3>
                                    </Col>
                                    <Col className="col-12">
                                        <Form.Select className="me-sm-2" value={modalTmpProduct}
                                                     onChange={(obj) => setModalTmpProduct(obj.target.value)}>
                                            <option value={null}>Unselected</option>
                                            {
                                                allProduct.map(value => {
                                                    return <option key={value.objectId}
                                                                   value={value.objectId}>{value.product_name}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Col className="col-6">
                                        <Button className="col-4 m-2" variant="outline-dark"
                                                onClick={addProductInOrderEvent}>
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                            </Modal.Body>
                        </Modal>

                        <Modal
                            show={showModalAddProduct}
                            onHide={() => setShowModalAddProduct(false)}
                            dialogClassName="w-75"
                            size="xl"
                            aria-labelledby="example-custom-modal-styling-title">
                            <Modal.Header closeButton/>
                            <Modal.Body>
                                <ProductAdd/>
                                {/*<PatientAdd btnText="Save" fun={async () => {
                                    setShowModalAddProduct(false)
                                    setClients(await getAllObject('Client'))
                                }}/>*/}
                            </Modal.Body>
                        </Modal>
                    </Row>
                    <BootstrapTable
                        keyField="id"
                        data={products}
                        columns={columns}
                        noDataIndication="Table is Empty"
                        cellEdit={cellEditFactory({mode: 'click', blurToSave: true})}
                    />

                    <Button className="col-4" variant="outline-dark" onClick={() => console.log(products)}>
                        save
                    </Button>
                </Container>
            </div>
    )
})


export default OrderAddProduct