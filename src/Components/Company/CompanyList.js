import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Backendless from "backendless";
import CompanyTable from "./CompanyTable";


export default function CompanyList() {
    let [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Backendless.Data.of("Company").find({}).then(arr => {
            setData(arr)
            setIsLoading(false)
        }).catch(() => {
            setData([])
            setIsLoading(false)
        })
    }, []);


    return (
        isLoading ?
            <div>
                <h1>Companies List</h1>
                <Spinner className="my-load-spinner mt-5" animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> :
            <div>
                <h1>Companies List</h1>
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <CompanyTable data={data}/>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}