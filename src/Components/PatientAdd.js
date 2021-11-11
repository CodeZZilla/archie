import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import InputFormPatient from "./Inputs/InputFormPatient";
import Company from "../Store/Company";
import Patient from "../Store/Patient";


const PatientAdd = observer(({title, btnText, patient, indexPatient, fun}) => {
    let [isLoading, setIsLoading] = useState(true)
    let [listRoles, setListRoles] = useState([])

    useEffect(() => {
        if (patient !== null) {
            Patient.create(patient)
        }else {
            Patient.reset()
        }
    },[])

    let save = async (e) => {
        e.preventDefault()
        if(indexPatient !== null){
            Company.editLocationByIndex(indexPatient, Location.object)
        }else {
            Company.addListLocationItem(Location.object)
        }
        Patient.reset()
        fun()
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-between">
                        <h1 className="text-center">{title}</h1>
                        <Button type="button" variant="success" onClick={save} size="lg">
                            {btnText}
                        </Button>
                    </Col>
                </Row>
                <Row className="m-3 justify-content-md-center">
                    <Col className="col-11">
                        <InputFormPatient value={Patient.object.last_name} id="last_name" title="Last name"/>
                        <InputFormPatient value={Patient.object.first_name} id="first_name" title="First name"/>
                        <InputFormPatient value={Patient.object.middle_name} id="middle_name" title="Middle name"/>
                        <InputFormPatient value={Patient.object.title} id="title" title="Title"/>
                        <InputFormPatient value={Patient.object.suffix} id="suffix" title="Suffix"/>

                        {/*Combo*/}
                        <InputFormPatient value={Patient.object.active} id="active" title="Active"/>
                        <InputFormPatient value={Patient.object.referred_by} id="referred_by" title="referred_by"/>


                        <InputFormPatient value={Patient.object.nickname} id="nickname" title="Nickname"/>
                        <InputFormPatient value={Patient.object.gender} id="gender" title="Gender"/>

                        {/*DOB*/}

                        <InputFormPatient value={Patient.object.ssn} id="ssn" title="SSN"/>
                        <InputFormPatient value={Patient.object.phone_day} id="phone_day" title="Phone (day)"/>
                        <InputFormPatient value={Patient.object.phone_mobile} id="phone_mobile" title="Phone (mobile)"/>
                        <InputFormPatient value={Patient.object.phone_work} id="phone_work" title="Phone (work)"/>
                        <InputFormPatient value={Patient.object.ext} id="ext" title="Ext"/>
                        <InputFormPatient value={Patient.object.street_address} id="street_address" title="Street Address"/>
                        <InputFormPatient value={Patient.object.street_address_extra} id="street_address_extra" title="Street Address (extra)"/>
                        <InputFormPatient value={Patient.object.contact_method} id="contact_method" title="Preferred contact method"/>

                        {/*Photo*/}

                        <InputFormPatient value={Patient.object.city_town} id="city_town" title="City/Town"/>
                        <InputFormPatient value={Patient.object.state} id="state" title="State"/>
                        <InputFormPatient value={Patient.object.zip} id="zip" title="Zip Code"/>

                        {/*File Uploads*/}

                        <InputFormPatient value={Patient.object.email} id="email" title="Email Address"/>
                        <InputFormPatient value={Patient.object.employment} id="employment" title="Employment"/>

                        {/*Hobbies and Activities*/}

                        {/*true false*/}
                        <InputFormPatient value={Patient.object.hippa_consent} id="hippa_consent" title="HIPPA Consent"/>
                        {/*hippa_consent_date*/}

                        <InputFormPatient value={Patient.object.insurance_providers} id="insurance_providers" title="Insurance Providers"/>
                        <InputFormPatient value={Patient.object.incurance_number} id="incurance_number" title="Insurance Number"/>

                        <InputFormPatient value={Patient.object.notes} id="notes" title="Client Notes"/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
})

export default PatientAdd