import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row, Spinner, Table} from "react-bootstrap";

import SpectaclePrescription from "../Store/SpectaclePrescription";
import Backendless from "backendless";
import Patient from "../Store/Patient";
import {useParams} from "react-router-dom/cjs/react-router-dom";


const SpectaclePrescriptionForm = observer(({read = false}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)
    const [doctors, setDoctors] = useState([])
    const [clients, setClients] = useState([])
    let {id} = useParams();

    useEffect(async () => {
        if (!read) {
            SpectaclePrescription.reset()
            let loadRelationsQueryBuilder = Backendless.LoadRelationsQueryBuilder.create();
            loadRelationsQueryBuilder.setRelationName("users_role");
            // Optician
            let arrOpticians = await Backendless.Data.of('Roles').loadRelations({objectId: "0243FCB6-D04E-4F3D-AD5F-3FDA300A58C0"}, loadRelationsQueryBuilder)
            // Optometrist
            let arrOptometrists = await Backendless.Data.of('Roles').loadRelations({objectId: "1DE37DEA-91E2-4502-B24B-A593D0E8AA68"}, loadRelationsQueryBuilder)
            setDoctors([...arrOpticians, ...arrOptometrists])

            let clientsAll = await Backendless.Data.of('Client').find({})
            setClients(clientsAll)

        } else {
            let spectaclePrescription = await Backendless.Data.of('SpectaclePrescription').findById(id)
            SpectaclePrescription.create(spectaclePrescription)
        }

        setIsLoading(false)
    })

    let save = async (e) => {
        setBtnSpinnerShow(true)
        e.preventDefault()
        await Backendless.Data.of("SpectaclePrescription").save(SpectaclePrescription.object)
        SpectaclePrescription.reset()
        setBtnSpinnerShow(false)
    }

    return (
        isLoading ?
            <div>
                <h1>Add Spectacle Prescription</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div> :
            <div>
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <h1 className="text-center">Add Patient</h1>
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
                                Save
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Table bordered>
                            <tbody className="container">
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center">Client Name</th>
                                <th className="col d-flex align-items-center justify-content-md-center">Prescription
                                    Date
                                </th>
                                <th className="col d-flex align-items-center justify-content-md-center">Doctor</th>
                                <th className="col d-flex align-items-center justify-content-md-center">Order Type</th>
                                <th className="col d-flex align-items-center justify-content-md-center">Spectacle
                                    Prescription Image
                                </th>
                            </tr>
                            <tr className="row">
                                <td className="col">
                                    <Form.Select className="me-sm-2" value={SpectaclePrescription.object.client}
                                                 onChange={(obj) => SpectaclePrescription.edit('client', obj.target.value)}>
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
                                    <Form.Control type="date" value={SpectaclePrescription.object.prescription_date}
                                                  onChange={(obj) => SpectaclePrescription.edit('prescription_date', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Select className="me-sm-2" value={SpectaclePrescription.object.doctor}
                                                 onChange={(obj) => SpectaclePrescription.edit('doctor', obj.target.value)}>
                                        <option value="null">Unselected</option>
                                        {
                                            doctors.map(value => {
                                                return <option key={value.objectId}
                                                               value={value.objectId}>{value.first_name} {value.last_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.order_type}
                                                  onChange={(obj) => SpectaclePrescription.edit('order_type', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <p className="d-flex align-items-center justify-content-md-center text-danger">in
                                        progress</p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row className="mt-5">
                        <Table bordered className="my-table">
                            <tbody className="container">
                            <tr className="row">
                                <th className="col"></th>
                                <th className="col">Sphere</th>
                                <th className="col">Cylinder</th>
                                <th className="col">Axis</th>
                                <th className="col">Decentration</th>
                                <th className="col">Prism 1</th>
                                <th className="col">Base 1</th>
                                <th className="col">Prism 2</th>
                                <th className="col">Base 2</th>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center">R</th>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_sphere}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_sphere', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_cylinder}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_cylinder', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_axis}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_axis', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.decentration_r}
                                                  onChange={(obj) => SpectaclePrescription.edit('decentration_r', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_prism_1}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_prism_1', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_base_1}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_base_1', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_prism_2}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_prism_2', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_base_2}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_base_2', obj.target.value)}/>
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center">L</th>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_sphere}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_sphere', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_cylinder}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_cylinder', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_axis}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_axis', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.decentration_l}
                                                  onChange={(obj) => SpectaclePrescription.edit('decentration_l', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_prism_1}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_prism_1', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_base_1}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_base_1', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_prism_2}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_prism_2', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_base_2}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_base_2', obj.target.value)}/>
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center">Add R</th>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_add}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_add', obj.target.value)}/>
                                </td>
                                <th className="col d-flex align-items-center justify-content-md-center">R Height</th>
                                <th className="col d-flex align-items-center justify-content-md-center">L Height</th>
                                <th className="col d-flex align-items-center justify-content-md-center">Inset</th>
                                <th className="col d-flex align-items-center justify-content-md-center">Total Dec</th>
                                <th className="col d-flex align-items-center justify-content-md-center">R PD</th>
                                <th className="col d-flex align-items-center justify-content-md-center">L PD</th>
                                <td className="col"></td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center">Add L</th>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_add}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_add', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_height}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_height', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_height}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_height', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.inset}
                                                  onChange={(obj) => SpectaclePrescription.edit('inset', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.total_dec}
                                                  onChange={(obj) => SpectaclePrescription.edit('total_dec', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.r_pd}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_pd', obj.target.value)}/>
                                </td>
                                <td className="col">
                                    <Form.Control value={SpectaclePrescription.object.l_pd}
                                                  onChange={(obj) => SpectaclePrescription.edit('l_pd', obj.target.value)}/>
                                </td>
                                <td className="col"></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
    )
})


export default SpectaclePrescriptionForm