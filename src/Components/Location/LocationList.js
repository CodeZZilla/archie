import {Col, Container, Row, Spinner, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Backendless from "backendless";
import {NavLink} from "react-router-dom";


const LocationList = () => {
    let [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Backendless.Data.of("Location").find({}).then(arr => {
            setData(arr)
            setIsLoading(false)
        }).catch(() => {
            setData([])
            setIsLoading(false)
        })
    }, []);

    return(
        isLoading ?
            <div>
                <h1>Location List</h1>
                <Spinner className="my-load-spinner mt-5" animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> :
            <div>
                <h1>Location List</h1>
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name Location</th>
                                    <th>Street Address</th>
                                    <th>City/Town</th>
                                    <th>State/Province</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.length>0?data.map((value, num) =>
                                    <tr key={value.id_location}>
                                        <td>{value.id_location}</td>
                                        <td>{value.name_location}</td>
                                        <td>{value.street_address}</td>
                                        <td>{value.city_town}</td>
                                        <td>{value.state_province}</td>
                                        <td>
                                            <NavLink className="w-75 btn btn-primary" to={'/location-item/' + value.objectId}>
                                                Open
                                            </NavLink>
                                            {/*<Button className="w-25 m-1" variant="danger">Delete</Button>*/}
                                        </td>
                                    </tr>
                                ):null}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default LocationList