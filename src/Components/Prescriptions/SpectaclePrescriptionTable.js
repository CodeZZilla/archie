import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Spinner, Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Backendless from "backendless";
import Loader from "../Main/Loader";
import loader from "../../assets/images/eye.gif";


export default function SpectaclePrescriptionTable() {
    const [isLoading, setIsLoading] = useState(true)
    const [myData, setMyData] = useState([])


    useEffect(async () => {
        let inputData = await Backendless.Data.of('SpectaclePrescription').find({})
        let outputData = []
        for await (let item of inputData) {
            try {
                let clientObject = await Backendless.Data.of('Client').findById(item.client)
                let doctorObject = await Backendless.Data.of('Users').findById(item.doctor)
                item.client = clientObject
                item.doctor = doctorObject
            }catch (error){
                await Backendless.Data.of( "SpectaclePrescription" ).remove(item)
                continue
            }finally {
                outputData.push(item)
            }
        }
        setMyData(outputData)
        setIsLoading(false)
    })

    return (
        isLoading ?
            <img src={loader} height={70}/> :
            <div>
                <h1>All Spectacle Prescriptions</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Col className="col-11">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Client</th>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Order type</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {myData.length > 0 ? myData.map((value, index)=>
                                    <tr key={value.objectId}>
                                        <td>{index + 1}</td>
                                        <td>{value.client.first_name} {value.client.last_name}</td>
                                        <td>{value.prescription_date}</td>
                                        <td>{value.doctor.first_name} {value.doctor.last_name}</td>
                                        <td>{value.order_type}</td>
                                        <td>
                                            <NavLink className="w-75 btn btn-primary"
                                                     to={'/spectacle-prescription-item/' + value.objectId}>
                                                Open
                                            </NavLink>
                                            {/*<Button className="w-25 m-1" variant="danger">Delete</Button>*/}
                                        </td>
                                    </tr>
                                ) : null}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}