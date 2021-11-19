import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import ContactLensPrescription from "../../Store/ContactLensPrescription";
import Backendless from "backendless";
import {saveObject, getAllObject, getAllObjectByRelationField} from "../../Business/BackendlessRequest"
import {useParams} from "react-router-dom";


const ContactLensPrescriptionForm = observer(({read = false}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)
    const [doctors, setDoctors] = useState([])
    const [clients, setClients] = useState([])
    let {id} = useParams();

    useEffect(async () => {
        if (!read) {
            ContactLensPrescription.reset()
        } else {
            let spectaclePrescription = await Backendless.Data.of('ContactLensPrescription').findById(id)
            ContactLensPrescription.create(spectaclePrescription)
        }

        // Optician
        let arrOpticians = await getAllObjectByRelationField('users_role', 'Roles', {objectId: "0243FCB6-D04E-4F3D-AD5F-3FDA300A58C0"})
        // Optometrist
        let arrOptometrists = await getAllObjectByRelationField('users_role', 'Roles', {objectId: "1DE37DEA-91E2-4502-B24B-A593D0E8AA68"})
        setDoctors([...arrOpticians, ...arrOptometrists])

        let clientsAll = await getAllObject('Client')
        setClients(clientsAll)
        setIsLoading(false)
    }, [])

    let save = async (e) => {
        setBtnSpinnerShow(true)
        e.preventDefault()
        await saveObject("ContactLensPrescription", ContactLensPrescription.object)
        ContactLensPrescription.reset()
        setBtnSpinnerShow(false)
    }

    return (
        isLoading ?
            <div>
                <h1>{read ? 'Update' : 'Add'} Contact Lens Prescription</h1>
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
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <h1 className="text-center">{read ? 'Update' : 'Add'} Contact Lens Prescription</h1>
                            <Button className="d-flex justify-content-around" type="button" variant="success"
                                    onClick={save} size="lg">
                                {btnSpinnerShow ?
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        role="status"
                                        aria-hidden="true"
                                    /> : null
                                }
                                {
                                    read ? 'Update' : 'Save'
                                }
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Table bordered>
                            <tbody className="container">
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">Client
                                    Name
                                </th>
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">Prescription
                                    Date
                                </th>
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">Doctor</th>
                            </tr>
                            <tr className="row">
                                <td className="col">
                                    <Form.Select className="me-sm-2" value={ContactLensPrescription.object.client}
                                                 onChange={(obj) => ContactLensPrescription.edit('client', obj.target.value)}>
                                        <option value="null">Unselected</option>
                                        {
                                            clients.map(value => {
                                                return <option key={value.objectId}
                                                               value={value.objectId}>{value.first_name} {value.last_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </td>
                                <td className="col">
                                    <Form.Control type="date" value={ContactLensPrescription.object.prescription_date}
                                                  onChange={(obj) => ContactLensPrescription.edit('prescription_date', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Select className="me-sm-2" value={ContactLensPrescription.object.doctor}
                                                 onChange={(obj) => ContactLensPrescription.edit('doctor', obj.target.value)}>
                                        <option value="null">Unselected</option>
                                        {
                                            doctors.map(value => {
                                                return <option key={value.objectId}
                                                               value={value.objectId}>{value.first_name} {value.last_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Row>
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
                </Container>
            </div>
    )
})


export default ContactLensPrescriptionForm