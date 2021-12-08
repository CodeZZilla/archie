import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Product from "../../Store/Product";

const ProductAdd = observer(() => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        isLoading ?
            <div>
                <h1>Create Product</h1>
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
                            <h1 className="text-center">Add new product</h1>
                            <Button className="d-flex justify-content-end" type="button" variant="success"
                                    size="lg">
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6 p-5">
                            <h3>Product Information</h3>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        SKU
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.sku}
                                                      onChange={(obj) => Product.edit('sku', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Manufacturer
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.manufacturer}
                                                      onChange={(obj) => Product.edit('manufacturer', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        SKU Barcode
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.sku_barcode}
                                                      onChange={(obj) => Product.edit('sku_barcode', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Product Category
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.product_category}
                                                      onChange={(obj) => Product.edit('product_category', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Product Name
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.product_name}
                                                      onChange={(obj) => Product.edit('product_name', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Product Image
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.product_image}
                                                      onChange={(obj) => Product.edit('product_image', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Status
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.status}
                                                      onChange={(obj) => Product.edit('status', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Notes
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.notes}
                                                      onChange={(obj) => Product.edit('notes', obj.target.value)}/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-6 p-5">
                            <h3>Pricing</h3>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Taxable
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.taxable}
                                                      onChange={(obj) => Product.edit('taxable', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Wholesale Price
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.wholesale_price}
                                                      onChange={(obj) => Product.edit('wholesale_price', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Retail Price*
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.retail_price}
                                                      onChange={(obj) => Product.edit('retail_price', obj.target.value)}/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <h3 className="mt-5">Inventory</h3>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Available Stock
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.available_stock}
                                                      onChange={(obj) => Product.edit('available_stock', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Threshold value
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.threshold_value}
                                                      onChange={(obj) => Product.edit('threshold_value', obj.target.value)}/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <Table className="mt-5" bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Product 1 Qty
                                    </th>
                                    <td className="col">
                                        <Form.Control value={Product.object.product_1_qty}
                                                      onChange={(obj) => Product.edit('product_1_qty', obj.target.value)}/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-3 justify-content-md-around">
                        <Col className="col-10">
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Price Each
                                    </th>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Qty
                                    </th>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Tax
                                    </th>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Total
                                    </th>
                                </tr>
                                <tr className="row">
                                    <td className="col">
                                        <Form.Control value={Product.object.price_each} disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control value={Product.object.qty} disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control value={Product.object.tax} disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control value={Product.object.total} disabled/>
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

export default ProductAdd