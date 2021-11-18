import React, {useState, useEffect} from 'react';
import {Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";


export default function CompanyTable({data}) {
    const [myData, setMyData] = useState([])

    useEffect(() => {
        setMyData(data)
    })

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name Company</th>
                <th>Street Address</th>
                <th>City/Town</th>
                <th>State/Province</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {myData.length>0?myData.map(value =>
                <tr key={value.id_company}>
                    <td>{value.id_company}</td>
                    <td>{value.name_company}</td>
                    <td>{value.street_address}</td>
                    <td>{value.city_town}</td>
                    <td>{value.state_province}</td>
                    <td>
                        <NavLink className="w-75 btn btn-primary" to={'/company-item/' + value.objectId}>
                            Open
                        </NavLink>
                        {/*<Button className="w-25 m-1" variant="danger">Delete</Button>*/}
                    </td>
                </tr>
            ):null}
            </tbody>
        </Table>

    )
}