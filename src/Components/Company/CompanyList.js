import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import CompanyTable from "./CompanyTable";
import {getAllObject, getRelObjectDepth1All} from "../../Business/BackendlessRequest";


export default function CompanyList() {
    let [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect( () => {
       getRelObjectDepth1All("Company").then(arr=>{
           setData(data)
       })

        console.log(data)
    }, []);

    return (
        isLoading ?
            <div>
                <h1>Companies List</h1>
                <Spinner className="my-load-spinner mt-5" animation="border" variant="secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> :
            <div className="mt-3">
                <h1>Company List</h1>
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