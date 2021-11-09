import {Col, Form, Row} from "react-bootstrap";
import React from "react";
import Company from "../../Store/Company";
import {observer} from "mobx-react-lite";


const InputFormCompany = observer(({value, id, title}) => {
        return (
            <Row className="mt-3">
                <Form.Label className="col-4">
                    {title}
                </Form.Label>
                <Col>
                    {id === 'email' ?
                        <Form.Control type="email" placeholder={title} id={id} value={value}
                                      onChange={(obj) => Company.edit(id, obj.target.value)}/>
                        :
                        <Form.Control type="text" placeholder={title} id={id} value={value}
                                      onChange={(obj) => Company.edit(id, obj.target.value)}/>
                    }
                </Col>
            </Row>
        )
    }
)

export default InputFormCompany