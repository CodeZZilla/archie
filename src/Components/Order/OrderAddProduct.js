import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';


const OrderAddProduct = observer(() => {

    const [isLoading, setIsLoading] = useState(true)

    const columns = [{
        dataField: 'item',
        text: 'Product',
        headerAlign: (column, colIndex) => 'left',
        editor: {
            type: Type.SELECT,
            getOptions: (setOptions, {row, column}) => {
                console.log(`current editing row id: ${row.id}`)
                console.log(`current editing column: ${column.dataField}`)
                return [{
                    value: 'A',
                    label: 'A'
                }, {
                    value: 'B',
                    label: 'B'
                }, {
                    value: 'C',
                    label: 'C'
                }, {
                    value: 'D',
                    label: 'D'
                }, {
                    value: 'E',
                    label: 'E'
                }];
            }
        }
    }, {
        dataField: 'quantity',
        text: 'Quantity'
    }, {
        dataField: 'price',
        text: 'Price'
    }, {
        dataField: 'discount',
        text: 'Discount'
    }

    ];

    useEffect(() => {
        setIsLoading(false)
    }, [])

    let products = [
        {
            item: "2",
            quantity: "100",
            price: "200$",
            discount: "100%"
        }
    ]

    return (
        isLoading ?
            <div>
                <h1>Spectacle Lens Info</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div> :
            <div className="mt-5">
                <Container>
                    <Row className="mb-4 justify-content-md-center">
                        <Button className="col-4" variant="outline-dark">
                            Add new product
                        </Button>
                    </Row>
                    <BootstrapTable
                        keyField="id"
                        data={products}
                        columns={columns}
                        cellEdit={cellEditFactory({mode: 'click', blurToSave: true})}
                    />
                </Container>
            </div>
    )
})


export default OrderAddProduct