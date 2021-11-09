import {Col, Row, Button, Container, Form, Table, Modal, Spinner, Dropdown} from "react-bootstrap";
import React, {useState} from "react";
import Backendless from "backendless";
import LocationAddEdit from "./LocationAddEdit";
import {BsFillTrashFill, FaBeer} from "react-icons/all";
import UserAdd from "./UserAdd";
import InputFormCompany from "./Inputs/InputFormCompany";
import {observer} from "mobx-react-lite";
import Company from "../Store/Company";


const CompanyAdd = observer(() => {
        const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)
        const [show, setShow] = useState(false)
        const [showUsers, setShowUsers] = useState(false)
        const [showOwnerModal, setShowOwnerModal] = useState(false)
        const [locationEdit, setLocationEdit] = useState({})
        const [locationIndexEdit, setLocationIndexEdit] = useState(null)
        const [showEditLocation, setShowEditLocation] = useState(false)


        let onFormSubmit = async (e) => {
            setBtnSpinnerShow(true)
            e.preventDefault()
            let saveCompany = await Backendless.Data.of("Company").save(Company.object)
            if (Company.listLocation.length !== 0) {
                for (let location of Company.listLocation) {
                    let saveLocation = await Backendless.Data.of("Location").save(location)
                    let relation = await Backendless.Data.of("CompanyLocation").save({})
                    await Backendless.Data.of("CompanyLocation").setRelation(relation.objectId, "Location", [saveLocation.objectId])
                    await Backendless.Data.of("CompanyLocation").setRelation(relation.objectId, "Company", [saveCompany.objectId])
                }
            }
            Company.resetCompany()
            setBtnSpinnerShow(false)
        }

        return (
            <div>
                <Form onSubmit={onFormSubmit}>
                    <Container className="mt-5">
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <h1 className="text-center">Create Company</h1>
                                <Button className="d-flex justify-content-around" type="submit" variant="success"
                                        size="lg">
                                    {btnSpinnerShow ?
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            role="status"
                                            aria-hidden="true"
                                        /> : null
                                    }
                                    Create
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-lg-5 col-md-12">
                                <InputFormCompany value={Company.object.name_company} id="name_company" title="Company name"/>
                                <Row className="mt-3">
                                    <Form.Label className="col-4">
                                        Warehouse
                                    </Form.Label>
                                    <Col>
                                        <Form.Select className="me-sm-2"
                                                     onChange={(obj) => Company.edit('warehouse', Boolean(obj.target.value))}>
                                            <option value={false}>False</option>
                                            <option value={true}>True</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Form.Label className="col-4">
                                        <Button variant="primary" onClick={() => setShowOwnerModal(true)}>
                                            Add Admin
                                        </Button>
                                    </Form.Label>

                                    <Col className="d-flex">
                                        <p>{Company.adminCompany.objectIdRole === '' ? 'No Admin' :  Company.adminCompany.objectIdRole}</p>
                                    </Col>

                                    <Modal
                                        show={showOwnerModal}
                                        onHide={() => setShowOwnerModal(false)}
                                        dialogClassName="w-75"
                                        size="xl"
                                        aria-labelledby="modal-owner">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="modal-owner">
                                                Admin Company
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <UserAdd fun={() => setShowOwnerModal(false)} addStatus="addAdminCompany"/>
                                        </Modal.Body>
                                    </Modal>
                                </Row>
                                <InputFormCompany value={Company.object.main_contact} id="main_contact" title="Main contact"/>
                                <InputFormCompany value={Company.object.street_address} id="street_address"
                                                  title="Street address"/>
                                <InputFormCompany value={Company.object.street_address_extra} id="street_address_extra"
                                                  title="Street address (extra)"/>
                                <InputFormCompany value={Company.object.city_town} id="city_town" title="City/Town"/>
                                <InputFormCompany value={Company.object.state_province} id="state_province"
                                                  title="State/Province"/>
                                <InputFormCompany value={Company.object.zip_code} id="zip_code" title="Zip Code"/>
                                <InputFormCompany value={Company.object.phone} id="phone" title="Phone"/>
                                <InputFormCompany value={Company.object.email} id="email" title="Email Address"/>
                                <InputFormCompany value={Company.object.tax_id} id="tax_id" title="Tax Id"/>
                                <InputFormCompany value={Company.object.website_company} id="website_company" title="Website"/>
                            </Col>
                            <Col className="mt-3">
                                <Row className="justify-content-md-center">
                                    <Button className="col-4" variant="primary" type="button" onClick={() => setShow(true)}>
                                        Add new location
                                    </Button>

                                    <Modal
                                        show={show}
                                        onHide={() => setShow(false)}
                                        dialogClassName="w-75"
                                        size="lg"
                                        aria-labelledby="example-custom-modal-styling-title">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="example-custom-modal-styling-title">
                                                Modal
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <LocationAddEdit title="Create location" btnText="Create" indexLocation={null} location={null} fun={() => {
                                                setShow(false)
                                            }}/>
                                        </Modal.Body>
                                    </Modal>

                                    <Modal
                                        show={showEditLocation}
                                        onHide={() => setShowEditLocation(false)}
                                        dialogClassName="w-75"
                                        size="lg"
                                        aria-labelledby="edit-location">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="edit-location">
                                                Modal
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <LocationAddEdit title="Edit location" btnText="Save" indexLocation={locationIndexEdit} location={locationEdit} fun={() => {
                                                setShowEditLocation(false)
                                            }}/>
                                        </Modal.Body>
                                    </Modal>

                                    <Modal
                                        show={showUsers}
                                        onHide={() => setShowUsers(false)}
                                        dialogClassName="w-75"
                                        size="xl"
                                        aria-labelledby="example-custom-modal-styling-title">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="modal-users">
                                                Modal
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <UserAdd/>
                                            {/*<Location fun={(object)=>{*/}
                                            {/*    setLocations([...locations,object])*/}
                                            {/*    setShow(false)*/}
                                            {/*}}/>*/}
                                        </Modal.Body>
                                    </Modal>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Table striped bordered hover>
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
                                            {Company.listLocation.length > 0 ?
                                                <tbody>
                                                {Company.listLocation.length > 0 ? Company.listLocation.map((value, index) =>
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{value.name_location}</td>
                                                        <td>{value.street_address}</td>
                                                        <td>{value.city_town}</td>
                                                        <td>{value.state_province}</td>
                                                        <td>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                    <FaBeer/>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item>Add admin</Dropdown.Item>
                                                                    <Dropdown.Item>Add other user</Dropdown.Item>
                                                                    <Dropdown.Item>Show users</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => {
                                                                        setLocationIndexEdit(index)
                                                                        setLocationEdit(Company.getLocation(index))
                                                                        setShowEditLocation(true)
                                                                    }}>Edit location</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() =>  Company.removeListLocationItem(index)}>Remove location</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
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
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        )
    }
)

export default CompanyAdd