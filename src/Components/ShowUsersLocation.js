import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Company from "../Store/Company";
import {BsFillTrashFill} from "react-icons/all";
import Backendless from "backendless";


const ShowUsersLocation = observer(({indexLocation}) => {
    const [otherUsers, setOtherUsers] = useState([])


    useEffect(async () => {
        let arr = []
        let index = 0
        for await (let item of Company.getLocation(indexLocation).otherUsers) {
            try {
                let role = await Backendless.Data.of("Roles").findById(item.objectIdRole)
                arr.push({
                    i: index++,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    email: item.email,
                    phone: item.phone,
                    role: role.role
                })
            } catch (ex) {
                continue
            }
        }
        setOtherUsers(arr)
    }, [])


    return (
        <div>
            <Form>
                <Container className="mt-5">
                    <Row>
                        <Col className="d-flex justify-content-between">
                            <h1 className="text-center">
                                {'Users in ' + Company.getLocation(indexLocation).name_location}</h1>
                        </Col>
                    </Row>
                    <Row className="mt-5 justify-content-md-center">
                        <Col className="col-11">
                            <h3>Admin</h3>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Company.getLocation(indexLocation).userAdmin.objectIdRole === 'null' ?
                                    <tr>
                                        <td colSpan="6">
                                            <h3 className="text-center">There is no admin in this location</h3>
                                        </td>
                                    </tr> :
                                        Company.getLocation(indexLocation).userAdmin.first_name !== undefined ?
                                            <tr>
                                                <td>{Company.getLocation(indexLocation).userAdmin.first_name}</td>
                                                <td>{Company.getLocation(indexLocation).userAdmin.last_name}</td>
                                                <td>{Company.getLocation(indexLocation).userAdmin.email}</td>
                                                <td>{Company.getLocation(indexLocation).userAdmin.phone}</td>
                                                <td>
                                                    <Button variant="danger" onClick={() => {
                                                        Company.removeListLocationAdminUser(indexLocation)
                                                    }}>
                                                        <BsFillTrashFill/>
                                                    </Button>
                                                </td>
                                            </tr> :
                                            <tr>
                                                <td colSpan="6">
                                                    <h3 className="text-center">There is no admin in this location</h3>
                                                </td>
                                            </tr>
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-5 justify-content-md-center">
                        <Col className="col-11">
                            <h3>Other users</h3>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Company.getLocation(indexLocation).otherUsers.length === 0 ?
                                    <tr>
                                        <td colSpan="7">
                                            <h3 className="text-center">There is no users in this location</h3>
                                        </td>
                                    </tr> :
                                    Array.from(otherUsers).map((value) => {
                                        return <tr>
                                            <td>{value.i + 1}</td>
                                            <td>{value.first_name}</td>
                                            <td>{value.last_name}</td>
                                            <td>{value.email}</td>
                                            <td>{value.phone}</td>
                                            <td>{value.role}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => {
                                                    setOtherUsers(otherUsers.filter((value, i) => i !== value.i))
                                                    Company.removeListLocationOtherUsers(indexLocation, value.i)
                                                }}>
                                                    <BsFillTrashFill/>
                                                </Button>
                                            </td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    )
})

export default ShowUsersLocation