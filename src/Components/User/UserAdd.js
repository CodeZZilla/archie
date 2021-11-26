import {Col, Row, Button, Container, Form, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Company from "../../Store/Company";
import User from "../../Store/User";
import InputForm from "../Inputs/InputForm";
import Backendless from "backendless";
import {observer} from "mobx-react-lite";
import {
    getAllObjectByRelationField,
    getRelObjectDepth1,
    saveObject,
    setObjectRelationOneToMany
} from "../../Business/BackendlessRequest";


// my-status : addStatus => addSuperAdmin, addAdminCompany, addAdminLocation, addOther
const UserAdd = observer(({fun, addStatus, indexLocation, idCompany}) => {
    let [isLoading, setIsLoading] = useState(true)
    let [listRoles, setListRoles] = useState([])
    let [locationSelect, setLocationSelect] = useState(null)
    let [locations, setLocations] = useState([])


    useEffect(async () => {
        //Company.resetAdminCompany()
        User.reset()
        setLocations(await getAllObjectByRelationField("locations", "Company", {objectId: idCompany}))
        // let goodArr =  await Backendless.Data.of("Roles").find({})
        // for (let role of goodArr) {
        //     switch (addStatus) {
        //         case "addAdminCompany":
        //             if (role.role === "Company Admin") {
        //                 goodArr.push(role)
        //             }
        //             break
        //         case "addAdminLocation":
        //             if (role.role === "Location Admin (Manager)") {
        //                 goodArr.push(role)
        //             }
        //             break
        //         case "addOther":
        //             if (role.role !== "Location Admin (Manager)" && role.role !== "Company Admin") {
        //                 goodArr.push(role)
        //             }
        //             break
        //     }}
        //     setListRoles(goodArr)
        setIsLoading(false)
    }, [])


    let saveUser = async (e) => {
        e.preventDefault()
        // switch (addStatus) {
        //     case "addAdminCompany":
        //         Company.editAdminCompanyObject(User.object)
        //         User.reset()
        //         break
        //     case "addAdminLocation":
        //         Company.editLocationFieldByIndex(indexLocation, "userAdmin", User.object)
        //         User.reset()
        //         break
        //     case "addOther":
        //         let otherUsers = Company.getLocation(indexLocation).otherUsers
        //         if (otherUsers.length === 0) {
        //             Company.editLocationFieldByIndex(indexLocation, 'otherUsers', [User.object])
        //         } else {
        //             Company.editLocationFieldByIndex(indexLocation, 'otherUsers', [...otherUsers, User.object])
        //         }
        //         User.reset()
        //         break
        // }
        if(locationSelect !== null){
            let user = await Backendless.UserService.register(User.object)
            await setObjectRelationOneToMany("other_users", "Location", {objectId: locationSelect}, user)
            User.reset()
            await fun()
        }
    }

    let changeSelect = (event) => {
        setLocationSelect(event.target.value)
        // User.edit('objectIdRole', event.target.value)
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
                    <Container className="mt-3">
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <h1 className="text-center">Create User</h1>
                                <Button type="button" disabled={false} onClick={saveUser} variant="success"
                                        size="lg">Create</Button>
                            </Col>
                        </Row>
                        <Row className="mt-3 d-flex justify-content-md-center">
                            <Col className="col-12">
                                <div>
                                    <Form.Label className="col-4">Location</Form.Label>
                                    <Col className="mb-3">
                                        <Form.Select className="me-sm-2" defaultValue="null" value={locationSelect} onChange={changeSelect}>
                                            <option value="null">Unselected</option>
                                            {
                                                locations.map(value => {
                                                    return <option key={value.objectId}
                                                                   value={value.objectId}>{value.name_location}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Col>
                                </div>
                            </Col>
                            <Col className="col-6">
                                {/*<div>*/}
                                {/*    <Form.Label className="col-4">Role</Form.Label>*/}
                                {/*    <Col className="mb-3">*/}
                                {/*        <Form.Select className="me-sm-2" defaultValue="null" onChange={}>*/}
                                {/*            <option value="null">Unselected</option>*/}
                                {/*            <option value="0">UserLocation</option>*/}
                                {/*            /!*{*!/*/}
                                {/*            /!*    listRoles.map(value => {*!/*/}
                                {/*            /!*        return <option key={value.objectId}*!/*/}
                                {/*            /!*                       value={value.objectId}>{value.role}</option>*!/*/}
                                {/*            /!*    })*!/*/}
                                {/*            /!*}*!/*/}
                                {/*        </Form.Select>*/}
                                {/*    </Col>*/}
                                {/*</div>*/}
                                <InputForm value={User.object.first_name} id="first_name"
                                           title="First Name" myKey="User"/>
                                <InputForm value={User.object.last_name} id="last_name" title="Last Name" myKey="User"/>
                                <InputForm value={User.object.email} id="email" title="Email" myKey="User"/>
                                <InputForm value={User.object.phone} id="phone" title="Phone (optional)" myKey="User"/>
                                <InputForm value={User.object.street} id="street"
                                           title="Street (optional)" myKey="User"/>
                            </Col>
                            <Col className="col-6">
                                <InputForm value={User.object.city} id="city" title="City" myKey="User"/>
                                <InputForm value={User.object.state} id="state" title="State" myKey="User"/>
                                <InputForm value={User.object.zip} id="zip" title="Zip Code" myKey="User"/>
                                <InputForm value={User.object.login} id="login" title="Login" myKey="User"/>
                                <InputForm value={User.object.password} id="password" title="Password" myKey="User"/>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
    )
})

export default UserAdd