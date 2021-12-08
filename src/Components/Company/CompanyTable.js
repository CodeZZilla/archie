import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Col, Container, Form, InputGroup, Modal, Row, Table} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {Button, Checkbox, IconButton, SvgIcon} from "@mui/material";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import CompanyAdd from "./CompanyAdd";
import {Add, Visibility} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled, {keyframes} from 'styled-components';
import {getAllObject, getAllObjectByRelationField} from "../../Business/BackendlessRequest";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const CustomLoader = () => (
    <div style={{padding: '24px'}}>
        <Spinner/>
        <div>Fancy Loader...</div>
    </div>
);

const CompanyTable = () => {
    const [data, setData] = useState([]);
    const [modeNewCompany, setModelNewCompany] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [pending, setPending] = useState(true);


    useEffect(async () => {
        let allCompany = await getAllObject("Company")
        for await (let item of allCompany) {
            item["locations"] = await getAllObjectByRelationField("locations", "Company", item)
            item["owner_company"] = await getAllObjectByRelationField("owner_company", "Company", item)
        }
        setData(allCompany)
        setPending(false)
    })

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {

            if (window.confirm(`Are you sure you want to delete: ${selectedRows.map(r => r.name_company).join(" ")}`)) {
                setToggleCleared(!toggleCleared);
                // setData(differenceBy(data, selectedRows, 'title'));
            }
        };

        return (
            <Button key="delete" onClick={handleDelete} color="error" variant="outlined" icon>
                Delete
            </Button>
        );
    }, [data, selectedRows, toggleCleared]);

    const columns = [
        {
            name: 'Show',
            button: true,
            cell: () =>
                <IconButton aria-label="show" size="small">
                    <SvgIcon component={Visibility} color="secondary"/>
                </IconButton>,
        },
        {
            name: "ID",
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
            sortable: true,
            cell: d => <Link
                to={"/user/" + d.owner_company[0].objectId}>{d.owner_company[0].first_name + " " + d.owner_company[0].last_name}</Link>
        },
        {
            name: "Locations",
            selector: "locations",
            sortable: true,
            cell: d => <span>{d.locations.name_location}</span>
        },
        {
            name: "Warehouse",
            selector: "warehouse",
            sortable: true,
            button: true,
            cell: (d) => <Checkbox checked={d.warehouse} disabled size="small"/>
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
                    <SvgIcon component={DeleteIcon} color="error"/>
                </IconButton>,
        }
    ];

    const tableData = {
        columns,
        data
    };

    return (
        <Container fluid>
            <Row lg>
                <Col>
                    <Button variant="outlined" startIcon={<Add/>}
                            onClick={() => setModelNewCompany(true)}>
                        Add new company
                    </Button>
                    <Modal
                        show={modeNewCompany}
                        onHide={() => setModelNewCompany(false)}
                        dialogClassName="w-100"
                        size="xl">
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
                        title="Company list"
                        selectableRows
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        progressPending={pending}
                        progressComponent={<CustomLoader/>}
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination

                    />
                </DataTableExtensions>
            </Row>
        </Container>
    )
}

export default CompanyTable