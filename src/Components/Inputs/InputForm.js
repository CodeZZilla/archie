import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Company from "../../Store/Company";
import Patient from "../../Store/Patient";
import Order from "../../Store/Order";
import User from "../../Store/User";
import Location from "../../Store/Location";
import {observer} from "mobx-react-lite";

const InputForm = observer(({value, id, title, myKey}) => {
        const [isInvalid, setIsInvalid] = useState(false)
        const [valueMiddle, setValueMiddle] = useState('')

        return (
            <Form.Group className="mb-3">
                <Form.Label>{title}</Form.Label>
                <div className="d-flex">
                    {id === 'email' ?
                        <Form.Control type="email" placeholder={title} value={valueMiddle} isInvalid={isInvalid}
                                      onChange={(obj) => setValueMiddle(obj.target.value)}
                                      onBlur={(obj) => {
                                          if (/.+@.+\.[A-Za-z]+$/.test(obj.target.value)) {
                                              if (myKey === "Company") {
                                                  Company.edit(id, valueMiddle)
                                              } else if (myKey === "Location") {
                                                  Location.edit(id, valueMiddle)
                                              } else if (myKey === "Order") {
                                                  Order.edit(id, valueMiddle)
                                              } else if (myKey === "Patient") {
                                                  Patient.edit(id, valueMiddle)
                                              } else if (myKey === "User") {
                                                  User.edit(id, valueMiddle)
                                              }
                                              setIsInvalid(false)
                                          } else {
                                              setIsInvalid(true)
                                          }
                                      }}
                        />
                        : id === 'password' ?
                            <Form.Control type="password" placeholder={title} value={value}
                                          onChange={(obj) => {
                                              if (myKey === "Company") {
                                                  Company.edit(id, obj.target.value)
                                              } else if (myKey === "Location") {
                                                  Location.edit(id, obj.target.value)
                                              } else if (myKey === "Order") {
                                                  Order.edit(id, obj.target.value)
                                              } else if (myKey === "Patient") {
                                                  Patient.edit(id, obj.target.value)
                                              } else if (myKey === "User") {
                                                  User.edit(id, obj.target.value)
                                              }
                                          }}/>
                            : <Form.Control type="text" placeholder={title} value={value}
                                            onChange={(obj) => {
                                                if (myKey === "Company") {
                                                    Company.edit(id, obj.target.value)
                                                } else if (myKey === "Location") {
                                                    Location.edit(id, obj.target.value)
                                                } else if (myKey === "Order") {
                                                    Order.edit(id, obj.target.value)
                                                } else if (myKey === "Patient") {
                                                    Patient.edit(id, obj.target.value)
                                                } else if (myKey === "User") {
                                                    User.edit(id, obj.target.value)
                                                }
                                            }}/>
                    }
                    <Form.Control.Feedback type="invalid">
                        Please choose a {title}.
                    </Form.Control.Feedback>
                </div>
            </Form.Group>
        )
    }
)

export default InputForm