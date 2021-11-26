import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import SpectaclePrescription from "../../Store/SpectaclePrescription";
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import SpectacleTable from "../Prescriptions/SpectacleTable";
import Order from "../../Store/Order";


const OrderSpectaclePrescription = observer(() => {
    const [spectaclePrescriptionCheck, setSpectaclePrescriptionCheck] = useState(false)

    let save = async (e) => {
        e.preventDefault()
        SpectaclePrescription.reset()
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
                                    onChange={(e) => setSpectaclePrescriptionCheck(e.target.checked)}
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
                                    <Form.Select className="me-sm-2" value={Order.spectaclePrescriptionId} disabled={!spectaclePrescriptionCheck}
                                                 onChange={(obj) => Order.setSpectaclePrescriptionId(obj.target.value)}>
                                        <option value={null}>Unselected</option>
                                        {
                                            Order.spectaclePrescriptionByUser.map(value => {
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
                <SpectacleTable/>
            </Container>
        </div>
    )
})

export default OrderSpectaclePrescription