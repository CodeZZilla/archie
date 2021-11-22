import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import ContactLensPrescription from "../../Store/ContactLensPrescription";
import Backendless from "backendless";
import {saveObject, getAllObject, getAllObjectByRelationField} from "../../Business/BackendlessRequest"
import {useParams} from "react-router-dom";
import ContactLensTable from "./ContactLensTable";


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
                    <ContactLensTable/>
                </Container>
            </div>
    )
})


export default ContactLensPrescriptionForm