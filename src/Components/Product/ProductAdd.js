import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import ContactLensPrescription from "../../Store/ContactLensPrescription";

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
                            <h1 className="text-center">Create new product</h1>
                            <Button className="d-flex justify-content-end" type="button" variant="success"
                                    size="lg">
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-4 p-5">
                            <h3>Product Information</h3>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        SKU
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.pwr_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('pwr_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        SKU Barcode
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.cyl_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('cyl_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Product Category*
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.axis_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('axis_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Manufacturer
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.bc_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('bc_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        SKU Barcode
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.dia_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('dia_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Product Category*
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Product Name
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Product Image
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Status
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Notes
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-4 p-5">
                            <h3>Pricing</h3>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Taxable
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.pwr_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('pwr_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Wholesale Price
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.cyl_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('cyl_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Retail Price*
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.axis_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('axis_right', obj.target.value)}/>
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
                                        <Form.Control value={ContactLensPrescription.object.pwr_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('pwr_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Threshold value
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.cyl_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('cyl_right', obj.target.value)}/>
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
                                        <Form.Control value={ContactLensPrescription.object.pwr_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('pwr_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-4 p-5">
                            <h3>Frame Information</h3>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame Type
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.pwr_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('pwr_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame Color
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.cyl_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('cyl_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Eye Size
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.axis_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('axis_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Bridge Size
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.bc_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('bc_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Temple Length
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.dia_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('dia_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame A
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame B
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame ED
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame DBL
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame Circumference
                                    </th>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.add_right}
                                                      onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
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
                                        <Form.Control value={ContactLensPrescription.object.contact_desing} disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.lens_type} disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.lens_brand} disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control value={ContactLensPrescription.object.lens_model} disabled/>
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