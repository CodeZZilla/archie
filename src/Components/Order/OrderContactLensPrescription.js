import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import ContactLensPrescription from "../../Store/ContactLensPrescription";
import {getRelObjectDepth1} from "../../Business/BackendlessRequest"
import Order from "../../Store/Order";
import ContactLensTable from "../Prescriptions/ContactLensTable";


const OrderContactLensPrescription = observer(() => {
    const [contactLensPrescriptionCheck, setContactLensPrescriptionCheck] = useState(false)

    let save = async (e) => {
        e.preventDefault()
        ContactLensPrescription.reset()
    }

    return (
        <div className="mt-5">
            <Container>
                <Row className="mt-5">
                    <Col className="col-2">
                        <Form>
                            <div key="add-checkbox" className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id="add-checkbox"
                                    label="Use user prescriptions"
                                    onChange={(e) => setContactLensPrescriptionCheck(e.target.checked)}
                                />
                            </div>
                        </Form>
                    </Col>
                    <Col className="col-4">
                        <Table bordered>
                            <tbody className="container">
                            <tr>
                                <th className="d-flex align-items-center justify-content-md-center bg-light">
                                    Prescription
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Select className="me-sm-2" value={Order.contactLensPrescriptionId} disabled={!contactLensPrescriptionCheck}
                                                 onChange={(obj) => Order.setContactLensPrescriptionId(obj.target.value)}>
                                        <option value={null}>Unselected</option>
                                        {
                                            Order.contactLensPrescriptionByUser.map(value => {
                                                return <option key={value.objectId}
                                                               value={value.objectId}>{value.prescription_date}</option>
                                            })
                                        }
                                    </Form.Select>

                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <ContactLensTable/>
            </Container>
        </div>
    )
})


export default OrderContactLensPrescription