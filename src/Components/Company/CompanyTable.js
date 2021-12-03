import React, {useState, useEffect} from 'react';
import {Col, Container, Form, InputGroup, Modal, Row, Table} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {Button, IconButton, SvgIcon} from "@mui/material";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import CompanyAdd from "./CompanyAdd";
import {Visibility} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";


export default function CompanyTable({data}) {
    const [modeNewCompany, setModelNewCompany] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [dataCompany, setDataCompany] = useState([]);

    useEffect(() => {
        setDataCompany(data)
        console.log(dataCompany)
    })

    const columns = [
        {
            name: 'Show',
            button: true,
            cell: () =>
                <IconButton aria-label="show" size="small">
                    <SvgIcon component={Visibility} color="secondary"></SvgIcon>
                </IconButton>,
        },
        {
            name: "Company ID",
            selector: "id_company",
            sortable: true
        },
        {
            name: "Company Name",
            selector: "name_company",
            sortable: true
        },
        {
            name: "Owner",
            selector: "owner_company",
            sortable: true
            //cell: d => <span>{d.genres.join(", ")}</span>
        },
        {
            name: "Locations",
            selector: "locations",
            sortable: true,
            cell: d => <span>{d.locations.name_location.join(", ")}</span>
        },
        {
            name: "Warehouse",
            selector: "warehouse",
            sortable: true,
            button: true,
            cell: () =>
                <Form.Check
                    inline
                    defaultValue={this.selector}
                    name="warehouse"
                    type="checkbox"
                    id="warehouse"
                />
        },
        {
            name: "Main Contact",
            selector: "main_contact",
            sortable: true
        },
        {
            name: "Street Address",
            selector: "street_address",
            sortable: true
        },
        {
            name: "Email Address",
            selector: "email",
            sortable: true
        },
        {
            name: "Website",
            selector: "website_company",
            sortable: true
        },
        {
            name: "Tax ID",
            selector: "tax_id",
            sortable: true
        },
        {
            name: "Social Media Links",
            selector: "facebook_url",
            sortable: true
        },
        {
            name: 'Delete',
            button: true,
            cell: () =>
                <IconButton aria-label="delete" size="small">
                    <SvgIcon component={DeleteIcon} color="error"></SvgIcon>
                </IconButton>,
        }
    ];

    const tableData = {
        columns,
        data
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Button onClick={() => setModelNewCompany(true)}>Add item</Button>
                    <Modal
                        show={modeNewCompany}
                        onHide={() => setModelNewCompany(false)}
                        dialogClassName="w-100"
                        size="xl"
                        fullscreen>
                        <Modal.Header closeButton/>
                        <Modal.Body>
                            <CompanyAdd/>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
            <Row>
                <DataTableExtensions {...tableData}>
                    <DataTable
                        columns={columns}
                        data={data}
                        noHeader
                        selectableRows
                        /*contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}*/
                        clearSelectedRows={toggleCleared}
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                    />
                </DataTableExtensions>
            </Row>
        </Container>
    )
}