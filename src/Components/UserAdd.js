import {Col, Row, Button, Container, Form, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Company from "../Store/Company";
import User from "../Store/User";
import InputFormUser from "./Inputs/InputFormUser";
import Backendless from "backendless";
import {observer} from "mobx-react-lite";


// my-status : addStatus => addSuperAdmin, addAdminCompany, addAdminLocation, addOther
const UserAdd = observer(({fun, addStatus, indexLocation}) => {
        let [isLoading, setIsLoading] = useState(true)
        let [listRoles, setListRoles] = useState([])


        useEffect(() => {
            //Company.resetAdminCompany()
            User.reset()
            Backendless.Data.of("Roles").find({}).then(arr => {
                let goodArr = []
                for (let role of arr) {
                    switch (addStatus) {
                        case "addAdminCompany":
                            if (role.role === "Company Admin") {
                                goodArr.push(role)
                            }
                            break
                        case "addAdminLocation":
                            if (role.role === "Location Admin (Manager)") {
                                goodArr.push(role)
                            }
                            break
                        case "addOther":
                            if (role.role !== "Location Admin (Manager)" && role.role !== "Company Admin") {
                                goodArr.push(role)
                            }
                            break
                    }
                }
                setListRoles(goodArr)
                setIsLoading(false)
            }).catch(() => {
                setListRoles([])
                setIsLoading(false)
            })
        }, []);


        let saveUser = async (e) => {
            e.preventDefault()
            switch (addStatus) {
                case "addAdminCompany":
                    Company.editAdminCompanyObject(User.object)
                    User.reset()
                    break
                case "addAdminLocation":
                    Company.editLocationFieldByIndex(indexLocation, "userAdmin", User.object)
                    User.reset()
                    break
                case "addOther":
                    let otherUsers = Company.getLocation(indexLocation).otherUsers
                    if (otherUsers.length === 0){
                        Company.editLocationFieldByIndex(indexLocation, 'otherUsers', [User.object])
                    } else {
                        Company.editLocationFieldByIndex(indexLocation, 'otherUsers', [...otherUsers, User.object])
                    }
                    User.reset()
                    break
            }
            await fun()
        }

        let changeSelect = (event) => {
            User.edit('objectIdRole', event.target.value)
        }

        return (
            isLoading ?
                <div>
                    <h1>Add User</h1>
                    <Container className="mt-3 mb-3">
                        <Row className="justify-content-md-center">
                            <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Row>
                    </Container>
                </div> :
                <div>
                    <Form>
                        <Container className="mt-5">
                            <Row>
                                <Col className="d-flex justify-content-between">
                                    <h1 className="text-center">Create User</h1>
                                    <Button type="button" disabled={false} onClick={saveUser} variant="success"
                                            size="lg">Create</Button>
                                </Col>
                            </Row>
                            <Row className="mt-5 mb-5 justify-content-md-center">
                                <Col className="col-11">
                                    <InputFormUser value={User.object.first_name} id="first_name"
                                                   title="First Name"/>
                                    <InputFormUser value={User.object.last_name} id="last_name" title="Last Name"/>
                                    <Row className="mt-3">
                                        <Form.Label className="col-4">
                                            Role
                                        </Form.Label>
                                        <Col>
                                            <Form.Select className="me-sm-2" defaultValue="null" onChange={changeSelect}>
                                                <option value="null">Unselected</option>
                                                {
                                                    listRoles.map(value => {
                                                        return <option key={value.objectId} value={value.objectId}>{value.role}</option>
                                                    })
                                                }
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    <InputFormUser value={User.object.email} id="email" title="Email"/>
                                    <InputFormUser value={User.object.phone} id="phone" title="Phone (optional)"/>
                                    <InputFormUser value={User.object.street} id="street"
                                                   title="Street (optional)"/>
                                    <InputFormUser value={User.object.city} id="city" title="City"/>
                                    <InputFormUser value={User.object.state} id="state" title="State"/>
                                    <InputFormUser value={User.object.zip} id="zip" title="Zip Code"/>
                                    <InputFormUser value={User.object.login} id="login" title="Login"/>
                                    <InputFormUser value={User.object.password} id="password" title="Password"/>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
        )
    }
)

export default UserAdd