import {Col, Row, Button, Container, Form, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Company from "../../Store/Company";
import Location from "../../Store/Location";
import InputForm from "../Inputs/InputForm";
import {
    findObjectByObjectId,
    getAllObject,
    saveObject,
    setObjectRelationOneToMany
} from "../../Business/BackendlessRequest";
import CustomAlert from "../Alerts/CustomAlert";
import AlertStatus from "../../Store/AlertStatus";
import Patient from "../../Store/Patient";
import {Redirect} from "react-router-dom";


const LocationAddEdit = observer(({title, btnText, objectIdLocation, fun, companyId, newFlag = false}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)
    const [companyNewFlag, setCompanyNewFlag] = useState({})
    const [allCompanys, setAllCompanys] = useState([])
    const [redirect, setRedirect] = useState(false)


    useEffect(async () => {
        if (newFlag) {
            setAllCompanys(await getAllObject("Company"))
        }

        if (objectIdLocation !== undefined) {
            console.log(objectIdLocation)
            Location.create(await findObjectByObjectId("Location", objectIdLocation))
        } else {
            Location.reset()
        }
        setIsLoading(false)
    }, [])

    let onSaveCompany = async (e) => {
        // if (indexLocation !== null) {
        //     //Company.editLocationByIndex(indexLocation, Location.object)
        // } else {
        //     //Company.addListLocationItem(Location.object)
        // }

        try {
            e.preventDefault()
            let saveLocationObject = {
                name_location: Location.object.name_location,
                city_town: Location.object.city_town,
                email: Location.object.email,
                main_contact: Location.object.main_contact,
                street_address: Location.object.street_address,
                street_address_extra: Location.object.street_address_extra,
                state_province: Location.object.state_province,
                zip_code: Location.object.zip_code,
                phone: Location.object.phone,
                tax_id: Location.object.tax_id,
                website: Location.object.website,
            }
            let saveLocation = await saveObject("Location", saveLocationObject)
            if (newFlag) {
                if (companyNewFlag === "null") {
                    AlertStatus.setAll(true, "Oh snap! You got an error!", "Please select a company", "danger")
                } else {
                    await setObjectRelationOneToMany("locations", "Company", {objectId: companyNewFlag}, saveLocation)
                    setRedirect(true)
                }
            } else {
                await setObjectRelationOneToMany("locations", "Company", {objectId: companyId}, saveLocation)
                await fun()
            }
        } catch (error) {
            AlertStatus.setAll(true, "Oh snap! You got an error!", error.message, "danger")
        } finally {
            Location.reset()
            setBtnSpinnerShow(false)
        }
    }

    return (
        redirect ?
            <Redirect to="/location-list"/>:
        isLoading ?
            <div>
                <h1>Location...</h1>
                <Spinner className="my-load-spinner mt-5" animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> :
            <div>
                <Form>
                    <Container className={newFlag ? "mt-4": null}>
                        <Row>
                            <Col className="col-12">
                                <CustomAlert/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <h1 className="text-center">{newFlag ? "Create location" : title}</h1>
                                <Button type="button" variant="success" disabled={btnSpinnerShow}
                                        onClick={(e) => onSaveCompany(e)} size="lg">
                                    {btnSpinnerShow ?
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            role="status"
                                            aria-hidden="true"
                                        /> : null
                                    }
                                    {newFlag ? "Create" : btnText}
                                </Button>
                            </Col>
                        </Row>
                        <Row className="m-3 justify-content-md-center">
                            <Col className="col-11">
                                {
                                    newFlag ?
                                        <Row>
                                            <Col className="col-4">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Company</Form.Label>
                                                    <Form.Select className="me-sm-2" value={companyNewFlag}
                                                                 onChange={(obj) => setCompanyNewFlag(obj.target.value)}>
                                                        <option value="null">Unselected</option>
                                                        {
                                                            allCompanys.map(value => {
                                                                return <option key={value.objectId}
                                                                               value={value.objectId}>{value.name_company} {value.street_address}</option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row> : null
                                }
                                <Row>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.name_location} id="name_location"
                                                   title="Location name" myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.main_contact} id="main_contact"
                                                   title="Main contact" myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.street_address} id="street_address"
                                                   title="Street address" myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.street_address_extra}
                                                   id="street_address_extra"
                                                   title="Street address (extra)" myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.city_town} id="city_town" title="City/Town"
                                                   myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.state_province} id="state_province"
                                                   title="State/Province" myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.zip_code} id="zip_code" title="Zip Code"
                                                   myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.phone} id="phone" title="Phone"
                                                   myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.email} id="email" title="Email Address"
                                                   myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.website} id="website" title="Website"
                                                   myKey="Location"/>
                                    </Col>
                                    <Col className="col-3">
                                        <InputForm value={Location.object.tax_id} id="tax_id" title="Tax Id"
                                                   myKey="Location"/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
    )
})

export default LocationAddEdit