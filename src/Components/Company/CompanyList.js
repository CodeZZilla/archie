import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import CompanyTable from "./CompanyTable";
import Backendless from "backendless";
import {getAllObject, getAllObjectByRelationField, getRelObjectDepth1All} from "../../Business/BackendlessRequest";


export default function CompanyList() {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {

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
                <h1>Admin panel for company management</h1>
                <CompanyTable/>
            </div>
    )
}