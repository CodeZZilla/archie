import {Col, Row, Button, Container, Form, Badge, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Company from "../Store/Company";
import InputFormUser from "./Inputs/InputFormUser";
import Backendless from "backendless";


// my-status : addStatus => addSuperAdmin, addAdminCompany, addAdminLocation, addOther
export default function UserAdd({fun, addStatus}) {
    let [isLoading, setIsLoading] = useState(true)
    let [listRoles, setListRoles] = useState([])
    let [roleUser, setRoleUser] = useState('') //ObjectId


    useEffect(() => {
        Backendless.Data.of("Roles").find({}).then(arr => {
            let goodArr = []
            for (let role of arr){
                switch (addStatus){
                    case "addAdminCompany":
                        if(role.role === "Company Admin"){
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
                Company.editAdminCompany('objectIdRole', roleUser)
                break
        }
        fun()
    }

    return (
        isLoading ?
            <div>
                <h1>Add User</h1>
                <Spinner className="my-load-spinner mt-5" animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
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
                        <Row className="mt-5 justify-content-md-center">
                            <Col className="col-6">
                                <InputFormUser value={Company.adminCompany.first_name} id="first_name"
                                               title="First Name"/>
                                <InputFormUser value={Company.adminCompany.last_name} id="last_name" title="Last Name"/>
                                <Row className="mt-3">
                                    <Form.Label className="col-4">
                                        Role
                                    </Form.Label>
                                    <Col>
                                        <Form.Select className="me-sm-2"
                                                     onChange={(obj) => setRoleUser(obj.target.value)}>
                                            {
                                                Array.from(listRoles).map(value => {
                                                    return <option key={value.objectId} value={value.objectId}>{value.role}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <InputFormUser value={Company.adminCompany.email} id="email" title="Email"/>
                                <InputFormUser value={Company.adminCompany.phone} id="phone" title="Phone (optional)"/>
                                <InputFormUser value={Company.adminCompany.street} id="street" title="Street (optional)"/>
                                <InputFormUser value={Company.adminCompany.city} id="city" title="City"/>
                                <InputFormUser value={Company.adminCompany.state} id="state" title="State"/>
                                <InputFormUser value={Company.adminCompany.zip} id="zip" title="Zip Code"/>
                                <InputFormUser value={Company.adminCompany.login} id="login" title="Login"/>
                                <InputFormUser value={Company.adminCompany.password} id="password" title="Password"/>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
    )
}