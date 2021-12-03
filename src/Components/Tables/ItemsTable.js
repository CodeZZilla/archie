import {observer} from "mobx-react-lite";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import {Button, IconButton, SvgIcon} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Col, Container, Row} from "react-bootstrap";
import {Visibility} from "@mui/icons-material";
import {useCallback, useEffect, useMemo, useState} from "react";

const ItemsTable = observer(() => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            {
                id: 1,
                sku: "1234324234",
                category: "Frames",
                genres: "sdfdsf",
                manufacturer: "Tim Burton",
                brand: "apple",
                collection: "as12",
                code: "00000932",
                model: "AS 032-ds",
                retail: "ret",
                status: "true"
            }])
    }, [])

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = useMemo(() => {
        const handleDelete = () => {
            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
                setToggleCleared(!toggleCleared);
                //setData(differenceBy(data, selectedRows, 'title'));
            }
        };

        return (
            <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
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
                    <SvgIcon component={Visibility} color="secondary"></SvgIcon>
                </IconButton>,
        },
        {
            name: "SKU",
            selector: "sku",
            sortable: true
        },
        {
            name: "Category",
            selector: "category",
            sortable: true
        },
        {
            name: "Genres",
            selector: "genres",
            sortable: true
            //cell: d => <span>{d.genres.join(", ")}</span>
        },
        {
            name: "Manufacturer",
            selector: "manufacturer",
            sortable: true
        },
        {
            name: "Brand",
            selector: "brand",
            sortable: true
        },
        {
            name: "Collection",
            selector: "collection",
            sortable: true
        },
        {
            name: "Code/HCPCS",
            selector: "code",
            sortable: true
        },
        {
            name: "Model",
            selector: "model",
            sortable: true
        },
        {
            name: "Retail",
            selector: "retail",
            sortable: true
        },
        {
            name: "Status",
            selector: "status",
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
                    <Button>Add item</Button>
                </Col>
            </Row>
            <Row>
                <DataTableExtensions {...tableData}>
                    <DataTable
                        columns={columns}
                        data={data}
                        noHeader
                        selectableRows
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
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
})

export default ItemsTable