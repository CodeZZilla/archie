import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import Select from 'react-select'
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import InputFormPatient from "../Inputs/InputFormPatient";
import Patient from "../../Store/Patient";
import Backendless from "backendless";
import InputForm from "../Inputs/InputForm"
import FileUpload from "../Inputs/FileUpload";
import FilesClientAdd from "../../Store/FilesClientAdd";
import CustomAlert from "../Alerts/CustomAlert";
import AlertStatus from "../../Store/AlertStatus";
import Loader from "../Main/Loader";


const PatientAdd = observer(({title, btnText, patient, indexPatient, fun = null}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(async () => {
        try {
            AlertStatus.setStatus(false)
            FilesClientAdd.reset()
            let users = await Backendless.Data.of('Users').find({})
            setUsers(users)
            setIsLoading(false)
        } catch (error) {
            AlertStatus.setStatus(true)
            AlertStatus.setTitle("Oh snap! You got an error!")
            AlertStatus.setMsg(error.message)
        }

    }, [])

    let save = async (e) => {
        try {
            setBtnSpinnerShow(true)
            e.preventDefault()
            let patient = await Backendless.Data.of("Client").save(Patient.object)
            for await (let file of FilesClientAdd.getFiles()) {
                await Backendless.Files.upload(file.file, `patientData/patient-${patient.objectId}`, true)
            }
            AlertStatus.setAll(true, "Done", "Patient was added successful!", "success")
            if (fun != null) {
                await fun()
            }
        } catch (error) {
            AlertStatus.setAll(true, "Oh snap! You got an error!", error.message, "danger")
        } finally {
            Patient.reset()
            FilesClientAdd.reset()
            setBtnSpinnerShow(false)
        }
    }

    return (
        isLoading ?
            <div>
                <h1>Add PatientStore</h1>
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
                        <Col className="col-12">
                            <CustomAlert/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <h1 className="text-center">Add Patient</h1>
                            <Button className="d-flex justify-content-around" disabled={btnSpinnerShow} type="button"
                                    variant="success"
                                    onClick={save} size="lg">
                                {btnSpinnerShow ?
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        role="status"
                                        aria-hidden="true"
                                    /> : null
                                }
                                {btnText}
                            </Button>
                        </Col>
                    </Row>
                    <div className="border border-secondary p-md-4 mt-4 ">
                        <Row className="justify-content-md-center">
                            <Col>
                                <InputForm value={Patient.object.last_name} id="last_name" title="Last name"
                                           myKey="Patient"/>
                            </Col>
                            <Col>
                                <InputForm value={Patient.object.first_name} id="first_name" title="First name"
                                           myKey="Patient"/>
                            </Col>
                            <Col>
                                <InputForm value={Patient.object.middle_name} id="middle_name"
                                           title="Middle name" myKey="Patient"/>
                            </Col>
                            <Col>
                                <InputForm value={Patient.object.title} id="title" title="Title" myKey="Patient"/>
                            </Col>
                            <Col>
                                <InputForm value={Patient.object.suffix} id="suffix" title="Suffix" myKey="Patient"/>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Active</Form.Label>
                                    <Form.Select className="me-sm-2"
                                                 onChange={(obj) => Patient.edit('active', Boolean(obj.target.value))}>
                                        <option value={false}>False</option>
                                        <option value={true}>True</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Referred by</Form.Label>
                                    <Form.Select className="me-sm-2" value={Patient.object.referred_by}
                                                 onChange={(obj) => Patient.edit('referred_by', obj.target.value)}>
                                        <option value="null">Unselected</option>
                                        {
                                            users.map(value => {
                                                return <option key={value.objectId}
                                                               value={value.objectId}>{value.first_name} {value.last_name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputFormPatient value={Patient.object.nickname} id="nickname" title="Nickname"/>
                            </Col>
                            <Col>
                                <InputFormPatient value={Patient.object.gender} id="gender" title="Gender"/>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>D.O.B.</Form.Label>
                                    <Form.Control type="date" placeholder="Birthday"
                                                  value={Patient.object.date_of_birthday}
                                                  onChange={(obj) => Patient.edit('date_of_birthday', obj.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <InputFormPatient value={Patient.object.ssn} id="ssn" title="SSN"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputFormPatient value={Patient.object.phone_day} id="phone_day" title="Phone (day)"/>
                            </Col>
                            <Col>
                                <InputFormPatient value={Patient.object.phone_mobile} id="phone_mobile"
                                                  title="Phone (mobile)"/>
                            </Col>
                            <Col>
                                <InputFormPatient value={Patient.object.phone_work} id="phone_work"
                                                  title="Phone (work)"/>
                            </Col>
                            <Col>
                                <InputFormPatient value={Patient.object.ext} id="ext" title="Ext"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputFormPatient value={Patient.object.street_address} id="street_address"
                                                  title="Street Address"/>
                            </Col>
                            <Col>
                                <InputFormPatient value={Patient.object.street_address_extra} id="street_address_extra"
                                                  title="Street Address (extra)"/>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preferred contact method</Form.Label>
                                    <Form.Select className="me-sm-2" value={Patient.object.contact_method}
                                                 onChange={(obj) => Patient.edit('contact_method', obj.target.value)}>
                                        <option value="Email">Email</option>
                                        <option value="Call">Call</option>
                                        <option value="Text">Text</option>
                                    </Form.Select>
                                </Form.Group>
                                {/*<InputFormPatient value={Patient.object.contact_method} id="contact_method"*/}
                                {/*                  title="Preferred contact method"/>*/}
                            </Col>
                            <Col className="col-3">
                                <InputFormPatient value={Patient.object.email} id="email" title="Email Address"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputFormPatient value={Patient.object.city_town} id="city_town" title="City/Town"/>
                            </Col>
                            <Col>
                                <InputFormPatient value={Patient.object.state} id="state" title="State"/>
                            </Col>
                            <Col>
                                <InputFormPatient value={Patient.object.zip} id="zip" title="Zip Code"/>
                            </Col>
                            <Col className="col-3">
                                <InputFormPatient value={Patient.object.employment} id="employment" title="Employment"/>
                            </Col>
                            <Col className="col-3">
                                <Form.Group className="mb-3" controlId="hobbies">
                                    <Form.Label>Hobbies And Activities</Form.Label>
                                    <Select isMulti options={[
                                        {value: 'Soccer', label: 'Soccer'},
                                        {value: 'Football', label: 'Football'},
                                        {value: 'Golf', label: 'Golf'},
                                        {value: 'Hockey', label: 'Hockey'},
                                        {value: 'Dance', label: 'Dance'}
                                    ]}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <Row className="mt-3 mb-5 justify-content-md-between">
                        <Col className="col-12 ">
                            <h1>Files</h1>
                            <div>
                                <FileUpload/>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-5 justify-content-md-between">
                        <Col className="col-3">
                            <div className="border border-secondary p-md-4">
                                <Col>
                                    <InputFormPatient value={Patient.object.insurance_providers}
                                                      id="insurance_providers"
                                                      title="Insurance Providers"/>
                                </Col>
                                <Col>
                                    <InputFormPatient value={Patient.object.incurance_number} id="incurance_number"
                                                      title="Insurance Number"/>
                                </Col>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <Form.Group>
                                <Form.Label>Client Notes</Form.Label>
                                <Form.Control as="textarea" rows={5} value={Patient.object.notes}
                                              placeholder="Notes user"
                                              onChange={(obj) => Patient.edit('notes', obj.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col className="col-3">
                            <div className="border border-secondary p-md-4">
                                <Col className="col-12">
                                    <Form.Group className="mb-3">
                                        <Form.Label>HIPPA Consent</Form.Label>
                                        <Form.Select className="me-sm-2" value={Patient.object.hippa_consent}
                                                     onChange={(obj) => Patient.edit('hippa_consent', Boolean(obj.target.value))}>
                                            <option value={false}>False</option>
                                            <option value={true}>True</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="col-12">
                                    <Form.Group className="mb-3">
                                        <Form.Label>HIPPA Consent Date</Form.Label>
                                        <Form.Control type="date" placeholder="hippa_consent_date"
                                                      value={Patient.object.hippa_consent_date}
                                                      onChange={(obj) => Patient.edit('hippa_consent_date', obj.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
})

export default PatientAdd