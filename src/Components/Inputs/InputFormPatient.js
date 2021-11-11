import {Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import User from "../../Store/Patient";


const InputFormPatient = observer(({value, id, title}) => {
        const [isInvalid, setIsInvalid] = useState(false)
        const [valueMiddle, setValueMiddle] = useState('')

        return (
            <Row className="mt-3">
                <Form.Label className="col-4">
                    {title}
                </Form.Label>
                <Col>
                    <InputGroup hasValidation>
                        {id === 'email' ?
                            <Form.Control type="email" placeholder={title} id={id} value={valueMiddle} isInvalid={isInvalid}
                                          onChange={(obj) => setValueMiddle(obj.target.value)}
                                          onBlur={(obj) => {
                                              if (/.+@.+\.[A-Za-z]+$/.test(obj.target.value)) {
                                                  User.edit(id, valueMiddle)
                                                  setIsInvalid(false)
                                              } else {
                                                  setIsInvalid(true)
                                              }
                                          }}
                            />
                            : id === 'password' ?
                                <Form.Control type="password" placeholder={title} id={id} value={value}
                                              onChange={(obj) => User.edit(id, obj.target.value)}/>
                                : <Form.Control type="text" placeholder={title} id={id} value={value}
                                                onChange={(obj) => {
                                                    User.edit(id, obj.target.value)
                                                }}/>
                        }
                        <Form.Control.Feedback type="invalid">
                            Please choose a {title}.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Row>
        )
    }
)

export default InputFormPatient