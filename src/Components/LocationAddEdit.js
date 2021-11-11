import {Col, Row, Button, Container, Form} from "react-bootstrap";
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import Company from "../Store/Company";
import Location from "../Store/Location";
import InputFormLocation from "./Inputs/InputFormLocation";


const LocationAddEdit = observer(({title, btnText, location, indexLocation, fun}) => {
        useEffect(() => {
            if (location !== null) {
                Location.create(location)
            }else {
                Location.reset()
            }
        },[])

        let onSaveCompany = async (e) => {
            e.preventDefault()
            if(indexLocation !== null){
                Company.editLocationByIndex(indexLocation, Location.object)
            }else {
                Company.addListLocationItem(Location.object)
            }
            Location.reset()
            fun()
        }

        return (
            <div>
                <Form>
                    <Container>
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <h1 className="text-center">{title}</h1>
                                <Button type="button" variant="success" onClick={(e) => onSaveCompany(e)} size="lg">
                                    {btnText}
                                </Button>
                            </Col>
                        </Row>
                        <Row className="m-3 justify-content-md-center">
                            <Col className="col-11">
                                <InputFormLocation value={Location.object.name_location} id="name_location" title="Location name"/>
                                <InputFormLocation value={Location.object.main_contact} id="main_contact" title="Main contact"/>
                                <InputFormLocation value={Location.object.street_address} id="street_address"
                                                   title="Street address"/>
                                <InputFormLocation value={Location.object.street_address_extra} id="street_address_extra"
                                                   title="Street address (extra)"/>
                                <InputFormLocation value={Location.object.city_town} id="city_town" title="City/Town"/>
                                <InputFormLocation value={Location.object.state_province} id="state_province"
                                                   title="State/Province"/>
                                <InputFormLocation value={Location.object.zip_code} id="zip_code" title="Zip Code"/>
                                <InputFormLocation value={Location.object.phone} id="phone" title="Phone"/>
                                <InputFormLocation value={Location.object.email} id="email" title="Email Address"/>
                                <InputFormLocation value={Location.object.website} id="website" title="Website"/>
                                <InputFormLocation value={Location.object.tax_id} id="tax_id" title="Tax Id"/>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        )
    }
)

export default LocationAddEdit