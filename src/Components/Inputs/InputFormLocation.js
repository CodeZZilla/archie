import {Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Location from "../../Store/Location";
import {observer} from "mobx-react-lite";


const InputFormCompany = observer(({value, id, title}) => {
        const [isInvalid, setIsInvalid] = useState(false)
        const [valueMiddle, setValueMiddle] = useState('')

        useEffect(() => {
            setValueMiddle(value)
        }, [])

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
                                                  Location.edit(id, valueMiddle)
                                                  setIsInvalid(false)
                                              } else {
                                                  setIsInvalid(true)
                                              }
                                          }}
                            />
                            :
                            <Form.Control type="text" placeholder={title} id={id} value={value}
                                          onChange={(obj) => Location.edit(id, obj.target.value)}/>
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

export default InputFormCompany