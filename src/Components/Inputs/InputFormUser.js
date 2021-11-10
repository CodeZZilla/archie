import {Col, Form, Row} from "react-bootstrap";
import React from "react";
import Company from "../../Store/Company";
import {observer} from "mobx-react-lite";


const InputFormUser = observer(({value, id, title}) => {
        return (
            <Row className="mt-3">
                <Form.Label className="col-4">
                    {title}
                </Form.Label>
                <Col>
                    {id === 'email' ?
                        <Form.Control type="email" placeholder={title} id={id} value={value}
                                      onChange={(obj) => Company.editAdminCompany(id, obj.target.value)}/>
                        : id === 'password' ?
                            <Form.Control type="password" placeholder={title} id={id} value={value}
                                          onChange={(obj) => Company.editAdminCompany(id, obj.target.value)}/>
                            : <Form.Control type="text" placeholder={title} id={id} value={value}
                                            onChange={(obj) => {
                                                Company.editAdminCompany(id, obj.target.value)
                                            }}/>
                    }
                </Col>
            </Row>
        )
    }
)

export default InputFormUser