import {observer} from "mobx-react-lite";
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import ContactLensPrescription from "../../Store/ContactLensPrescription";
import React, {useEffect} from "react";

const ContactLensTable = observer(() => {

    useEffect(() => {
        console.log("fdsf")
    })

    return(
        <div className="border border-secondary p-2 mb-5">
            <Row className="mt-3 justify-content-md-around">
                <Col className="col-5">
                    <Table bordered>
                        <tbody>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">PWR/SPH
                                Right (OD)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.pwr_right}
                                              onChange={(obj) => ContactLensPrescription.edit('pwr_right', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">CYL
                                Right
                                (OD)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.cyl_right}
                                              onChange={(obj) => ContactLensPrescription.edit('cyl_right', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">AXIS
                                Right
                                (OD)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.axis_right}
                                              onChange={(obj) => ContactLensPrescription.edit('axis_right', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">BC
                                Right
                                (OD)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.bc_right}
                                              onChange={(obj) => ContactLensPrescription.edit('bc_right', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">DIA
                                Right
                                (OD)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.dia_right}
                                              onChange={(obj) => ContactLensPrescription.edit('dia_right', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">ADD
                                Right
                                (OD)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.add_right}
                                              onChange={(obj) => ContactLensPrescription.edit('add_right', obj.target.value)}/>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col className="col-5">
                    <Table bordered>
                        <tbody>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">PWR/SPH
                                Left
                                (OS)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.pwr_left}
                                              onChange={(obj) => ContactLensPrescription.edit('pwr_left', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">CYL
                                Left
                                (OS)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.cyl_left}
                                              onChange={(obj) => ContactLensPrescription.edit('cyl_left', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">AXIS
                                Left
                                (OS)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.axis_left}
                                              onChange={(obj) => ContactLensPrescription.edit('axis_left', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">BC
                                Left
                                (OS)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.bc_left}
                                              onChange={(obj) => ContactLensPrescription.edit('bc_left', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">DIA
                                Left
                                (OS)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.dia_left}
                                              onChange={(obj) => ContactLensPrescription.edit('dia_left', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">ADD
                                Left
                                (OS)
                            </th>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.add_left}
                                              onChange={(obj) => ContactLensPrescription.edit('add_left', obj.target.value)}/>
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
                                Contact Design
                            </th>
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                Contact Lens Type
                            </th>
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                Contact Lens Brand
                            </th>
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                Contact Lens Model
                            </th>
                        </tr>
                        <tr className="row">
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.contact_desing}
                                              onChange={(obj) => ContactLensPrescription.edit('contact_desing', obj.target.value)}/>
                            </td>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.lens_type}
                                              onChange={(obj) => ContactLensPrescription.edit('lens_type', obj.target.value)}/>
                            </td>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.lens_brand}
                                              onChange={(obj) => ContactLensPrescription.edit('lens_brand', obj.target.value)}/>
                            </td>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.lens_model}
                                              onChange={(obj) => ContactLensPrescription.edit('lens_model', obj.target.value)}/>
                            </td>
                        </tr>
                        <tr className="row">
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                Contact Lens Color
                            </th>
                            <th className="col d-flex align-items-center justify-content-md-center bg-light"
                                colSpan={2}>
                                Contact Lens Modality
                            </th>
                            <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                Contact Lens Disinfection
                            </th>
                        </tr>
                        <tr className="row">
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.lens_color}
                                              onChange={(obj) => ContactLensPrescription.edit('lens_color', obj.target.value)}/>
                            </td>
                            <td className="col" colSpan={2}>
                                <Form.Control value={ContactLensPrescription.object.lens_modality}
                                              onChange={(obj) => ContactLensPrescription.edit('lens_modality', obj.target.value)}/>
                            </td>
                            <td className="col">
                                <Form.Control value={ContactLensPrescription.object.lens_disinfection}
                                              onChange={(obj) => ContactLensPrescription.edit('lens_disinfection', obj.target.value)}/>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
})

export default ContactLensTable