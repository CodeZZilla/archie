import {Col, Row, Button, Container, Form, Table, Modal, Spinner, Dropdown} from "react-bootstrap";
import React, {useState} from "react";
import Backendless from "backendless";
import LocationAddEdit from "./LocationAddEdit";
import {BsFillTrashFill, FaBeer} from "react-icons/all";
import UserAdd from "./UserAdd";
import InputFormCompany from "./Inputs/InputFormCompany";
import {observer} from "mobx-react-lite";
import Company from "../Store/Company";
import ShowUsersLocation from "./ShowUsersLocation";


const CompanyAdd = observer((parent, query) => {
        const [btnSpinnerShow, setBtnSpinnerShow] = useState(false)
        const [show, setShow] = useState(false)
        const [showUserAdminLocation, setShowUserAdminLocation] = useState(false)
        const [showOwnerModal, setShowOwnerModal] = useState(false)
        const [locationEdit, setLocationEdit] = useState({})
        const [locationIndexEdit, setLocationIndexEdit] = useState(null)
        const [showEditLocation, setShowEditLocation] = useState(false)
        const [isLoadAdminUser, setIsLoadAdminUser] = useState(false)
        const [adminUser, setAdminUserRole] = useState({})
        const [indexLocation, setIndexLocation] = useState(null)
        const [showUsersOtherLocation, setShowUsersOtherLocation] = useState(false)
        const [showUsersAllLocation, setShowUsersAllLocation] = useState(false)


        let loadUserByObjectId = async () => {
            setIsLoadAdminUser(true)
            let userRole = await Backendless.Data.of("Roles").findById(Company.adminCompany.objectIdRole)
            setAdminUserRole(userRole)
            setIsLoadAdminUser(false)
        }


        let onFormSubmit = async (e) => {
            setBtnSpinnerShow(true)
            e.preventDefault()
            if (Company.adminCompany.email !== '' && Company.adminCompany.objectIdRole !== 'null') {
                let saveCompany = await Backendless.Data.of("Company").save(Company.object)
                let userAdminCompanyObject = {
                    city: Company.adminCompany.city,
                    street: Company.adminCompany.street,
                    state: Company.adminCompany.state,
                    first_name: Company.adminCompany.first_name,
                    email: Company.adminCompany.email,
                    zip: Company.adminCompany.zip,
                    last_name: Company.adminCompany.last_name,
                    phone: Company.adminCompany.phone,
                    login: Company.adminCompany.login,
                    password: Company.adminCompany.password,
                    status: Company.adminCompany.status
                }
                let userAdminCompany = await Backendless.UserService.register(userAdminCompanyObject)

                //получение обьектов связи и перезапись их
                let loadRelationsQueryBuilder = Backendless.LoadRelationsQueryBuilder.create();
                loadRelationsQueryBuilder.setRelationName("users_role");
                let arrUsersAdminsCompany = await Backendless.Data.of('Roles').loadRelations({objectId: Company.adminCompany.objectIdRole}, loadRelationsQueryBuilder)
                await Backendless.Data.of("Roles").setRelation({objectId: Company.adminCompany.objectIdRole},
                    "users_role", [...arrUsersAdminsCompany, {objectId: userAdminCompany.objectId}])

                //admin company запись в компани его
                await Backendless.Data.of("Company").setRelation({objectId: saveCompany.objectId}, 'owner_company', [{objectId: userAdminCompany.objectId}])

                //добавление локаций в бд
                if (Company.listLocation.length !== 0) {
                    for await (let location of Company.listLocation) {
                        let saveLocationObject = {
                            name_location: location.name_location,
                            city_town: location.city_town,
                            email: location.email,
                            main_contact: location.main_contact,
                            street_address: location.street_address,
                            street_address_extra: location.street_address_extra,
                            state_province: location.state,
                            zip_code: location.zip_code,
                            phone: location.phone,
                            tax_id: location.tax_id,
                            website: location.website,
                        }
                        let saveLocation = await Backendless.Data.of("Location").save(saveLocationObject)
                        // 1 к многому через дополнительную таблицу (к таблице Коспани)
                        let relation = await Backendless.Data.of("CompanyLocation").save({})
                        await Backendless.Data.of("CompanyLocation").setRelation(relation.objectId, "Location", [saveLocation.objectId])
                        await Backendless.Data.of("CompanyLocation").setRelation(relation.objectId, "Company", [saveCompany.objectId])

                        //admin location запись в location его если есть
                        if (location.userAdmin.first_name === '' || location.userAdmin.email === '') {
                            let userAdminLocationObject = {
                                city: location.userAdmin.city,
                                street: location.userAdmin.street,
                                state: location.userAdmin.state,
                                first_name: location.userAdmin.first_name,
                                email: location.userAdmin.email,
                                zip: location.userAdmin.zip,
                                last_name: location.userAdmin.last_name,
                                phone: location.userAdmin.phone,
                                login: location.userAdmin.login,
                                password: location.userAdmin.password,
                                status: location.userAdmin.status
                            }
                            let userAdminLocation = await Backendless.UserService.register(userAdminLocationObject)
                            await Backendless.Data.of("Location").setRelation({objectId: saveLocation.objectId}, 'admin_location', [{objectId: userAdminLocation}])
                        } else {
                            alert('Admin User location: ' + location.name_location + '\ndid not sign up')
                        }

                        //save other users
                        for await (let otherUser of location.otherUsers){
                            let userLocationObject = {
                                city: otherUser.city,
                                street: otherUser.street,
                                state: otherUser.state,
                                first_name: otherUser.first_name,
                                email: otherUser.email,
                                zip: otherUser.zip,
                                last_name: otherUser.last_name,
                                phone: otherUser.phone,
                                login: otherUser.login,
                                password: otherUser.password,
                                status: otherUser.status
                            }
                            let userAdminLocation = await Backendless.UserService.register(userLocationObject)

                            //получение обьектов связи и перезапись их
                            let loadRelationsQueryBuilder0 = Backendless.LoadRelationsQueryBuilder.create();
                            loadRelationsQueryBuilder0.setRelationName("users_role");
                            let arrUsersRole = await Backendless.Data.of('Roles').loadRelations({objectId: otherUser.objectIdRole},
                                loadRelationsQueryBuilder0)
                            await Backendless.Data.of("Roles").setRelation({objectId: otherUser.objectIdRole},
                                "users_role", [...arrUsersRole, {objectId: userAdminLocation.objectId}])

                            //получение обьектов связи и перезапись их
                            let loadRelationsQueryBuilder = Backendless.LoadRelationsQueryBuilder.create();
                            loadRelationsQueryBuilder.setRelationName("other_users");
                            let arrUsersOtherLocation = await Backendless.Data.of('Location').loadRelations({objectId: saveLocation.objectId}, loadRelationsQueryBuilder)
                            await Backendless.Data.of("Location").setRelation({objectId: saveLocation.objectId},
                                "other_users", [...arrUsersOtherLocation, {objectId: userAdminLocation.objectId}])
                        }

                    }
                }
                Company.resetCompany()
            }

            setBtnSpinnerShow(false)
        }


        return (
            <div>
                <Form onSubmit={onFormSubmit}>
                    <Container className="mt-5 mb-5">
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
                                <InputFormCompany value={Company.object.name_company} id="name_company"
                                                  title="Company name"/>
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
                                            Set Admin
                                        </Button>
                                    </Form.Label>

                                    <Col className="d-flex">
                                        {
                                            isLoadAdminUser ?
                                                <Spinner
                                                    as="span"
                                                    variant="primary"
                                                    animation="border"
                                                    role="status"
                                                    aria-hidden="true"
                                                /> :
                                                <p>{Company.adminCompany.objectIdRole === 'null' ?
                                                    'No Admin' :
                                                    Company.adminCompany.last_name + ' ' + Company.adminCompany.first_name}</p>
                                        }
                                    </Col>

                                    {/* modal add admin company user*/}
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
                                            <UserAdd fun={async () => {
                                                setShowOwnerModal(false)
                                                await loadUserByObjectId()
                                            }} addStatus="addAdminCompany"/>
                                        </Modal.Body>
                                    </Modal>

                                </Row>
                                <InputFormCompany value={Company.object.main_contact} id="main_contact"
                                                  title="Main contact"/>
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
                                <InputFormCompany value={Company.object.website_company} id="website_company"
                                                  title="Website"/>
                            </Col>
                            <Col className="mt-3">
                                <Row className="justify-content-md-center">
                                    <Button className="col-4" variant="primary" type="button" onClick={() => setShow(true)}>
                                        Add new location
                                    </Button>

                                    {/* modal add location in company*/}
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
                                            <LocationAddEdit title="Create location" btnText="Create" indexLocation={null}
                                                             location={null} fun={() => {
                                                setShow(false)
                                            }}/>
                                        </Modal.Body>
                                    </Modal>

                                    {/* modal edit location in company*/}
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
                                            <LocationAddEdit title="Edit location" btnText="Save"
                                                             indexLocation={locationIndexEdit} location={locationEdit}
                                                             fun={() => {
                                                                 setShowEditLocation(false)
                                                             }}/>
                                        </Modal.Body>
                                    </Modal>

                                    {/* modal add location admin */}
                                    <Modal
                                        show={showUserAdminLocation}
                                        onHide={() => setShowUserAdminLocation(false)}
                                        dialogClassName="w-75"
                                        size="lg"
                                        aria-labelledby="company-add-admin">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="company-add-admin">
                                                Modal
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <UserAdd fun={async () => {
                                                setShowUserAdminLocation(false)
                                            }} addStatus="addAdminLocation" indexLocation={indexLocation}/>
                                        </Modal.Body>
                                    </Modal>

                                    {/* modal add location other users*/}
                                    <Modal
                                        show={showUsersOtherLocation}
                                        onHide={() => setShowUsersOtherLocation(false)}
                                        dialogClassName="w-75"
                                        size="lg"
                                        aria-labelledby="company-add-other">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="company-add-other">
                                                Modal
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <UserAdd fun={async () => {
                                                setShowUsersOtherLocation(false)
                                            }} addStatus="addOther" indexLocation={indexLocation}/>
                                        </Modal.Body>
                                    </Modal>

                                    {/* modal add location show users*/}
                                    <Modal
                                        show={showUsersAllLocation}
                                        onHide={() => {
                                            setShowUsersAllLocation(false)
                                        }}
                                        dialogClassName="w-75"
                                        size="lg"
                                        aria-labelledby="company-add-other">
                                        <Modal.Header closeButton>
                                            <Modal.Title id="company-add-other">
                                                Modal
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <ShowUsersLocation indexLocation={indexLocation}/>
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
                                                                    <Dropdown.Item onClick={() => {
                                                                        setShowUserAdminLocation(true)
                                                                        setIndexLocation(index)
                                                                    }}>
                                                                        Add admin
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => {
                                                                        setShowUsersOtherLocation(true)
                                                                        setIndexLocation(index)
                                                                    }}>
                                                                        Add other user
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => {
                                                                        setShowUsersAllLocation(true)
                                                                        setIndexLocation(index)
                                                                    }}>
                                                                        Show users
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => {
                                                                        setLocationIndexEdit(index)
                                                                        setLocationEdit(Company.getLocation(index))
                                                                        setShowEditLocation(true)
                                                                    }}>
                                                                        Edit location
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item
                                                                        onClick={() => Company.removeListLocationItem(index)}>
                                                                        Remove location
                                                                    </Dropdown.Item>
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