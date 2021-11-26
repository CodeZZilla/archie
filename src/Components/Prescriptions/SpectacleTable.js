import {observer} from "mobx-react-lite";
import {Form, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Order from "../../Store/Order";
import {findObjectByObjectId} from "../../Business/BackendlessRequest";
import SelectAndSearch from "../Inputs/SelectAndSearch";
import SpectaclePrescription from "../../Store/SpectaclePrescription";
import generateSelectValues from "../../Business/GenerateSelectValues";

const SpectacleTable = observer(({addFlag = false}) => {
    const [flagDisable, setFlagDisable] = useState(false)

    useEffect(() => {
        SpectaclePrescription.reset()
        Order.setSpectaclePrescriptionId('Unselected')
    }, [])

    useEffect(async () => {
        console.log(Order.spectaclePrescriptionId)
        if (Order.spectaclePrescriptionId !== 'Unselected') {
            SpectaclePrescription.create(await findObjectByObjectId("SpectaclePrescription", Order.spectaclePrescriptionId))
            setFlagDisable(true)
        } else {
            SpectaclePrescription.reset()
            setFlagDisable(false)
        }
    }, [Order.spectaclePrescriptionId])

    return (
        <div>
            <Row className="mt-5">
                <Table bordered>
                    <tbody className="container">
                    <tr className="row">
                        <th className="col"></th>
                        <th className="col bg-light">Sphere</th>
                        <th className="col bg-light">Cylinder</th>
                        <th className="col bg-light">Axis</th>
                        <th className="col bg-light">Decentration</th>
                        <th className="col bg-light">Prism 1</th>
                        <th className="col bg-light">Base 1</th>
                        <th className="col bg-light">Prism 2</th>
                        <th className="col bg-light">Base 2</th>
                    </tr>
                    <tr className="row">
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">R</th>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_sphere}
                                             id="r_sphere"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(-30, 30, 0.13)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_cylinder}
                                             id="r_cylinder"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(-10, 10, 0.13)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_axis}
                                             id="r_axis"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0, 180, 1)}
                            />
                        </td>
                        <td className="col">
                            <Form.Control value={SpectaclePrescription.object.decentration_r} disabled={flagDisable}
                                          onChange={(obj) => SpectaclePrescription.edit('decentration_r', obj.target.value)}/>
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_prism_1}
                                             id="r_prism_1"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0, 10, 0.25)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_base_1}
                                             id="r_base_1"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : ["In", "Out", "Other"]}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_prism_2}
                                             id="r_prism_2"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0, 10, 0.25)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_base_2}
                                             id="r_base_2"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : ["Up", "Down", "Other"]}
                            />
                        </td>
                    </tr>
                    <tr className="row">
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">L</th>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_sphere}
                                             id="l_sphere"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(-30, 30, 0.13)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_cylinder}
                                             id="l_cylinder"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(-10, 10, 0.13)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_axis}
                                             id="l_axis"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0, 180, 1)}
                            />
                        </td>
                        <td className="col">
                            <Form.Control value={SpectaclePrescription.object.decentration_l} disabled={flagDisable}
                                          onChange={(obj) => SpectaclePrescription.edit('decentration_l', obj.target.value)}/>
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_prism_1}
                                             id="l_prism_1"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0, 10, 0.25)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_base_1}
                                             id="l_base_1"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : ["In", "Out", "Other"]}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_prism_2}
                                             id="l_prism_2"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0, 10, 0.25)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_base_2}
                                             id="l_base_2"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : ["Up", "Down", "Other"]}
                            />
                        </td>
                    </tr>
                    <tr className="row">
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">Add R
                        </th>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_add}
                                             id="r_add"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0.75, 4, 0.25)}
                            />
                            {/* <Form.Control value={SpectaclePrescription.object.r_add}
                                                  onChange={(obj) => SpectaclePrescription.edit('r_add', obj.target.value)}/>*/}
                        </td>
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">R
                            Height
                        </th>
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">L
                            Height
                        </th>
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">Inset</th>
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">Total
                            Dec
                        </th>
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">R PD
                        </th>
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">L PD
                        </th>
                        <td className="col"></td>
                    </tr>
                    <tr className="row">
                        <th className="col d-flex align-items-center justify-content-md-center bg-light">Add L
                        </th>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_add}
                                             id="l_add"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0.75, 4, 0.25)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_height}
                                             id="r_height"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0, 40.5, 0.5)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_height}
                                             id="l_height"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(0, 40.5, 0.5)}
                            />
                        </td>
                        <td className="col">
                            <Form.Control value={SpectaclePrescription.object.inset} disabled={flagDisable}
                                          onChange={(obj) => SpectaclePrescription.edit('inset', obj.target.value)}/>
                        </td>
                        <td className="col">
                            <Form.Control value={SpectaclePrescription.object.total_dec} disabled={flagDisable}
                                          onChange={(obj) => SpectaclePrescription.edit('total_dec', obj.target.value)}/>
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.r_pd}
                                             id="r_pd"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(15, 40.5, 0.5)}
                            />
                        </td>
                        <td className="col">
                            <SelectAndSearch key="SpectaclePrescription"
                                             value={SpectaclePrescription.object.l_pd}
                                             id="l_pd"
                                             disabled={flagDisable}
                                             options={flagDisable ? [] : generateSelectValues(15, 40.5, 0.5)}
                            />
                        </td>
                        <td className="col"></td>
                    </tr>
                    </tbody>
                </Table>
            </Row>
        </div>

    )
})

export default SpectacleTable