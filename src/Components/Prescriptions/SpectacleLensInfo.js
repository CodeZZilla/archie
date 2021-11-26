import {observer} from "mobx-react-lite";
import {Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import ContactLensPrescription from "../../Store/ContactLensPrescription";
import Company from "../../Store/Company";
import SpectacleLens from "../../Store/SpectacleLens";


const SpectacleLensInfo = observer(() => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])

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
                    <div className="border border-secondary p-2 mb-5">
                        <Row className="mt-3 justify-content-md-around">
                            <Col className="col-5">
                                <Table bordered>
                                    <tbody>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Lens Type
                                        </th>
                                        <td className="col">
                                            <Form.Select className="me-sm-2"
                                                         onChange={(obj) => SpectacleLens.edit('lens_type', obj.target.value)}>
                                                <option value="EOS KBco Wrap"> EOS KBco Wrap</option>
                                                <option value="EOS KBco">EOS KBco</option>
                                                <option value="SV Digital Trifocal">SV Digital Trifocal</option>
                                                <option value="Single Vision">Single Vision</option>
                                                <option value="Progressive">Progressive</option>
                                                <option value="Occ Double">Occ Double</option>
                                                <option value="Bifocal RD">Bifocal RD</option>
                                                <option value="Bifocal FT">Bifocal FT</option>
                                                <option value="Bifocal">Bifocal</option>
                                                <option value="Hoya Amp">Hoya Amp</option>
                                                <option value="Hoya Amp Mini">Hoya Amp Mini</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Lens Style
                                        </th>
                                        <td className="col">
                                            <Form.Select className="me-sm-2"
                                                         onChange={(obj) => SpectacleLens.edit('lens_style', obj.target.value)}>
                                                <option value="n/a">n/a</option>
                                                <option value="28 mm">28 mm</option>
                                                <option value="35 mm">35 mm</option>
                                                <option value="45 mm">45 mm</option>
                                                <option value="40 mm">40 mm</option>
                                                <option value="54 mm">54 mm</option>
                                                <option value="52 mm">52 mm</option>
                                                <option value="7x28 mm">7x28 mm</option>
                                                <option value="8x35 mm">8x35 mm</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Lens Material
                                        </th>
                                        <td className="col">
                                            <Form.Select className="me-sm-2"
                                                         onChange={(obj) => SpectacleLens.edit('lens_material', obj.target.value)}>
                                                <option value="Plastic">Plastic</option>
                                                <option value="Glass (photochromatic)">Glass (photochromatic)</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Lens Color
                                        </th>
                                        <td className="col">
                                            <Form.Select className="me-sm-2"
                                                         onChange={(obj) => SpectacleLens.edit('lens_color', obj.target.value)}>
                                                <option value="n/a">n/a</option>
                                                <option value="blue">blue</option>
                                                <option value="red">red</option>
                                                <option value="black">black</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col className="col-5">
                                <Table bordered>
                                    <tbody>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Anti-Reflective Type
                                        </th>
                                        <td className="col">
                                            <Form.Select className="me-sm-2"
                                                         onChange={(obj) => SpectacleLens.edit('anti_reflective_type', obj.target.value)}>
                                                <option value="No">No</option>
                                                <option value="Anti-Reflective">Anti-Reflective</option>
                                                <option
                                                    value="Scratch-ResistantTransitions">Scratch-ResistantTransitions
                                                </option>
                                                <option value="®UV-blocking">®UV-blocking</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Scratch Resistant Type
                                        </th>
                                        <td className="col">
                                            <Form.Select className="me-sm-2"
                                                         onChange={(obj) => SpectacleLens.edit('scratch_resistant_type', obj.target.value)}>
                                                <option value={false}>False</option>
                                                <option value={true}>True</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Transitions® Type
                                        </th>
                                        <td className="col">
                                            <Form.Select className="me-sm-2"
                                                         onChange={(obj) => SpectacleLens.edit('transitions_type', obj.target.value)}>
                                                <option value={false}>False</option>
                                                <option value={true}>True</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Other
                                        </th>
                                        <td className="col">
                                            <Form.Select className="me-sm-2"
                                                         onChange={(obj) => SpectacleLens.edit('other', obj.target.value)}>
                                                <option value={false}>False</option>
                                                <option value={true}>True</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row className="mt-3 mb-3 justify-content-md-around">
                            <Col className="col-3">
                                <Table bordered>
                                    <tbody>
                                    <tr className="row">
                                        <th className="col d-flex align-items-center justify-content-md-center bg-light">
                                            Price
                                        </th>

                                    </tr>
                                    <tr className="row">
                                        <td className="col">
                                            <Form.Control className="text-center" value={SpectacleLens.object.price}
                                                          onChange={(obj) => SpectacleLens.edit('price', obj.target.value)}/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
    )
})

export default SpectacleLensInfo