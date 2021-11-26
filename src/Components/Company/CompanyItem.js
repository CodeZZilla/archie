import {useParams} from "react-router-dom";
import {Container, Row, Spinner, Col, Table, Accordion, Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Backendless from "backendless";
import Company from "../../Store/Company";
import LocationAddEdit from "../Location/LocationAddEdit";
import CustomAlert from "../Alerts/CustomAlert";
import AlertStatus from "../../Store/AlertStatus";
import {getAllObjectByRelationField} from "../../Business/BackendlessRequest";
import CompanyAdd from "./CompanyAdd";
import UserAdd from "../User/UserAdd";


const CompanyItem = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [company, setCompany] = useState({})
    const [locations, setLocations] = useState([])
    const [usersOfCompany, setUsersOfCompany] = useState([])
    const [newEditLocation, setNewEditLocation] = useState(false)
    const [editCompany, setEditCompany] = useState(false)
    const [showOwnerModal, setShowOwnerModal] = useState(false)
    const [editLocationObjectId, setEditLocationObjectId] = useState('')
    let {id} = useParams();

    useEffect(async () => {
        try {
            AlertStatus.setStatus(false)
            let company = await Backendless.Data.of("Company").findById(id)
            let locations = await getAllObjectByRelationField("locations", "Company", company)
            setLocations(locations)

            let users = []
            for await (let item of locations){
                let itemUsers = await getAllObjectByRelationField("other_users", "Location", item)
                for await (let usr of itemUsers){
                    users.push(usr)
                }
            }
            console.log(users)
            setUsersOfCompany(users)
            setCompany(company)
        } catch (error) {
            AlertStatus.setAll(true, "Oh snap! You got an error!", error.message, "danger")
        } finally {
            setIsLoading(false)
        }
    }, []);

    return (
        isLoading ?
            <div>
                <h1>Company Item</h1>
                <Spinner className="my-load-spinner mt-5" animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> :
            <Container>
                <Row>
                    <Col className="col-12">
                        <CustomAlert/>
                    </Col>
                    <Col className="col-12">
                        <h1>Company {company.name_company}</h1>
                        <Button variant="outline-dark" onClick={() => {
                            setEditCompany(true)
                        }}>
                            Edit company info
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col className="col-6 p-4">
                        <Table bordered>
                            <tbody>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Name Company
                                </th>
                                <td className="col">
                                    {company.name_company}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Warehouse
                                </th>
                                <td className="col">
                                    {company.warehouse.toString()}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Main contact
                                </th>
                                <td className="col">
                                    {company.main_contact}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Street address
                                </th>
                                <td className="col">
                                    {company.street_address}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Street address (extra)
                                </th>
                                <td className="col">
                                    {company.street_address_extra}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    City/Town
                                </th>
                                <td className="col">
                                    {company.city_town}
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col className="col-6 p-4">
                        <Table bordered>
                            <tbody>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    State/Province
                                </th>
                                <td className="col">
                                    {company.state_province}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Zip Code
                                </th>
                                <td className="col">
                                    {company.zip_code}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Phone
                                </th>
                                <td className="col">
                                    {company.phone}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Email Address
                                </th>
                                <td className="col">
                                    {company.email}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Tax Id
                                </th>
                                <td className="col">
                                    {company.tax_id}
                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Website
                                </th>
                                <td className="col">
                                    {company.website_company}
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Locations</Accordion.Header>
                            <Accordion.Body>
                                <Button variant="outline-dark" onClick={() => setNewEditLocation(true)}>
                                    Add new location
                                </Button>
                                <Table className="mt-3" striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Street Address</th>
                                        <th>City/Town</th>
                                        <th>State/Province</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    {locations.length > 0 ?
                                        <tbody>
                                        {locations.length > 0 ? locations.map((value, index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{value.name_location}</td>
                                                <td>{value.street_address}</td>
                                                <td>{value.city_town}</td>
                                                <td>{value.state_province}</td>
                                                <td className="row">
                                                    <Button className="col-4 p-1" disabled variant="outline-success">Open</Button>
                                                    <Button className="col-4 p-1" disabled variant="outline-primary" onClick={() => {
                                                        setEditLocationObjectId(value.objectId.toString())
                                                        console.log(editLocationObjectId)
                                                        setNewEditLocation(true)
                                                    }}>Edit</Button>
                                                    <Button className="col-4 p-1" disabled variant="outline-danger" onClick={() => {
                                                        setEditLocationObjectId(value.objectId.toString())
                                                        console.log(editLocationObjectId)
                                                        setNewEditLocation(true)
                                                    }}>Delete</Button>
                                                </td>
                                            </tr>
                                        ) : null}
                                        </tbody> :
                                        <tbody>
                                        <tr>
                                            <td colSpan="6">
                                                <h3 className="text-center">There is no data</h3>
                                            </td>
                                        </tr>
                                        </tbody>
                                    }
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Users</Accordion.Header>
                            <Accordion.Body>
                                <Button variant="outline-dark" onClick={() => setShowOwnerModal(true)}>Add new user</Button>
                                <Table className="mt-3" striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Full Name</th>
                                        <th>Location</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    {usersOfCompany.length > 0 ?
                                        <tbody>
                                        {usersOfCompany.length > 0 ? usersOfCompany.map((value, index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{value.first_name} {value.last_name}</td>
                                                <td>UserLocation</td>
                                                <td>{value.email}</td>
                                                <td>{value.phone}</td>
                                                <td className="row">
                                                    <Button className="col-4 p-1" disabled
                                                            variant="outline-success">Open</Button>
                                                    <Button className="col-4 p-1" disabled variant="outline-primary"
                                                            onClick={() => {
                                                                setEditLocationObjectId(value.objectId.toString())
                                                                console.log(editLocationObjectId)
                                                                setNewEditLocation(true)
                                                            }}>Edit</Button>
                                                    <Button className="col-4 p-1" disabled variant="outline-danger"
                                                            onClick={() => {
                                                                setEditLocationObjectId(value.objectId.toString())
                                                                console.log(editLocationObjectId)
                                                                setNewEditLocation(true)
                                                            }}>Delete</Button>
                                                </td>
                                            </tr>
                                        ) : null}
                                        </tbody> :
                                        <tbody>
                                        <tr>
                                            <td colSpan="7">
                                                <h3 className="text-center">There is no users in this location</h3>
                                            </td>
                                        </tr>
                                        </tbody>
                                    }
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>

                {/* modal add location in company*/}
                <Modal
                    show={newEditLocation}
                    onHide={() => setNewEditLocation(false)}
                    dialogClassName="w-75"
                    size="xl"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            editLocationObjectId === "" ?
                                <LocationAddEdit title="Create location" btnText="Create" companyId={company.objectId}
                                                 fun={async () => {
                                                     setNewEditLocation(false)
                                                     setLocations(await getAllObjectByRelationField("locations", "Company", company))
                                                 }}/> :
                                <LocationAddEdit title="Update location" btnText="Update"
                                                 objectIdLocation={editLocationObjectId}
                                                 fun={async () => {
                                                     setNewEditLocation(false)
                                                     setLocations(await getAllObjectByRelationField("locations", "Company", company))
                                                 }}/>
                        }
                    </Modal.Body>
                </Modal>

                {/* modal edit company */}
                <Modal
                    show={editCompany}
                    onHide={() => setEditCompany(false)}
                    dialogClassName="w-75"
                    size="xl"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <CompanyAdd idCompany={id}
                                    fun={async () => {
                                        setEditCompany(false)
                                        setCompany(await Backendless.Data.of("Company").findById(id))
                                    }}/>
                    </Modal.Body>
                </Modal>


                {/* modal add company users*/}
                <Modal
                    show={showOwnerModal}
                    onHide={() => setShowOwnerModal(false)}
                    dialogClassName="w-75"
                    size="lg"
                    aria-labelledby="modal-owner">
                    <Modal.Header closeButton>
                        <Modal.Title id="modal-owner">
                            Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UserAdd fun={  async () => {
                            let users = []
                            for await (let item of locations){
                                let itemUsers = await getAllObjectByRelationField("other_users", "Location", item)
                                for await (let usr of itemUsers){
                                    users.push(usr)
                                }
                            }
                            setUsersOfCompany(users)
                            setShowOwnerModal(false)
                        }} addStatus="addOther" idCompany={company.objectId}/>
                    </Modal.Body>
                </Modal>

            </Container>


    )
}

export default CompanyItem