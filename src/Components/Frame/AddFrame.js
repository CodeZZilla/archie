import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";

const AddFrame = observer(() => {
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
            <div className="mb-3">
                <Container>
                    {/*<Row>*/}
                    {/*    <Col className="d-flex justify-content-between">*/}
                    {/*        <h2 className="text-center">Add frame product</h2>*/}
                    {/*        <Button className="d-flex justify-content-end" type="button" variant="success"*/}
                    {/*                size="lg">*/}
                    {/*            Save*/}
                    {/*        </Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <Row>
                        <Col className="col-8 p-5">
                            <h4>Product Information</h4>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Manufacturer
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Collection
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Brand
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Style
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Model
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Price
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        SKU
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame Type
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame A
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame DBL
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame B
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame ED
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Frame Color
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Eye Size
                                    </th>
                                    <td className="col">
                                        <Form.Control placeholder="mm"/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Bridge Size
                                    </th>
                                    <td className="col">
                                        <Form.Control placeholder="mm"/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Temple Length
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Circumference
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-4 p-5">
                            <h4>Pricing</h4>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Taxable
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Wholesale Price
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Retail Price*
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <h4 className="mt-5">Inventory</h4>
                            <Table bordered>
                                <tbody>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Available Stock
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                <tr className="row">
                                    <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                        Threshold value
                                    </th>
                                    <td className="col">
                                        <Form.Control/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="mt-1 mb-3 justify-content-md-around">
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
                                        <Form.Control disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control disabled/>
                                    </td>
                                    <td className="col">
                                        <Form.Control disabled/>
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

export default AddFrame