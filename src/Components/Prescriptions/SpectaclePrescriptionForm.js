import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import SpectaclePrescription from "../../Store/SpectaclePrescription";
import Backendless from "backendless";
import {useParams} from "react-router-dom";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import SpectacleTable from "./SpectacleTable";
import {saveObject, setObjectRelationOneToMany} from "../../Business/BackendlessRequest";
import ContactLensPrescription from "../../Store/ContactLensPrescription";


const SpectaclePrescriptionForm = observer(({read = false}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)
    const [clients, setClients] = useState([])
    const [clientSelect, setClientSelect] = useState("")
    let {id} = useParams();


    useEffect(async () => {

        if (!read) {
            SpectaclePrescription.reset()
        } else {
            let spectaclePrescription = await Backendless.Data.of('SpectaclePrescription').findById(id)
            SpectaclePrescription.create(spectaclePrescription)
        }

        let clientsAll = await Backendless.Data.of('Client').find({})
        setClients(clientsAll)
        setIsLoading(false)
    }, [])

    let save = async (e) => {
        setBtnSpinnerShow(true)
        e.preventDefault()
        let saveObj = await saveObject("SpectaclePrescription", SpectaclePrescription.object)
        await setObjectRelationOneToMany("spectacle_prescriptions", "Client", {objectId: clientSelect}, saveObj)
        //await Backendless.Data.of("SpectaclePrescription").save(SpectaclePrescription.object)
        SpectaclePrescription.reset()
        setBtnSpinnerShow(false)
    }

    return (
        isLoading ?
            <div>
                <h1>{read ? 'Update' : 'Add'} Spectacle Prescription</h1>
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
                            <h1 className="text-center">{read ? 'Update' : 'Add'} Spectacle Prescription</h1>
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
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">Order
                                    Type
                                </th>
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">Spectacle
                                    Prescription Image
                                </th>
                            </tr>
                            <tr className="row">
                                <td className="col">
                                    <Form.Select className="me-sm-2" value={clientSelect}
                                                 onChange={(obj) => setClientSelect(obj.target.value)}>
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
                                    <Form.Control type="text" value={SpectaclePrescription.object.doctor}
                                                  onChange={(obj) => SpectaclePrescription.edit('doctor', obj.target.value)}/>
                                    {/*<Form.Select className="me-sm-2" value={SpectaclePrescription.object.doctor}*/}
                                    {/*             onChange={(obj) => SpectaclePrescription.edit('doctor', obj.target.value)}>*/}
                                    {/*    <option value="null">Unselected</option>*/}
                                    {/*    {*/}
                                    {/*        doctors.map(value => {*/}
                                    {/*            return <option key={value.objectId}*/}
                                    {/*                           value={value.objectId}>{value.first_name} {value.last_name}</option>*/}
                                    {/*        })*/}
                                    {/*    }*/}
                                    {/*</Form.Select>*/}
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
                    <SpectacleTable addFlag={true}/>
                </Container>
            </div>
    )
})


export default SpectaclePrescriptionForm