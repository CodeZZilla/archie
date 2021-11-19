import {useParams} from "react-router-dom";
import {Container, Row, Spinner, Col, Table, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Backendless from "backendless";
import ContactLensPrescription from "../../Store/ContactLensPrescription";

const CompanyItem = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [company, setCompany] = useState({})
    let {id} = useParams();

    useEffect(() => {
        Backendless.Data.of("Company").findById(id).then(company => {
            setCompany(company)
            setIsLoading(false)
        }).catch(() => {
            setCompany({})
            setIsLoading(false)
        })
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
                        <h1>Company {company.name_company}</h1>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="col-5">
                        <Table bordered>
                            <tbody>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Name Company
                                </th>
                                <td className="col">

                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                    Warehouse
                                </th>
                                <td className="col">

                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">AXIS
                                    Left
                                    (OS)
                                </th>
                                <td className="col">

                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">BC
                                    Left
                                    (OS)
                                </th>
                                <td className="col">

                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">DIA
                                    Left
                                    (OS)
                                </th>
                                <td className="col">

                                </td>
                            </tr>
                            <tr className="row">
                                <th className="col d-flex align-items-center justify-content-md-center bg-light">

                                </th>
                                <td className="col">

                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
    )
}

export default CompanyItem