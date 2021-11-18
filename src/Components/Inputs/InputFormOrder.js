import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import Order from "../../Store/Order";


const InputFormOrder = observer(({value, id, title}) => {
        const [isInvalid, setIsInvalid] = useState(false)
        const [valueMiddle, setValueMiddle] = useState('')

        return (
            <Form.Group className="mb-3" controlId={id}>
                <Form.Label>{title}</Form.Label>
                <div className="d-flex">
                {id === 'email' ?
                    <Form.Control type="email" placeholder={title} value={valueMiddle} isInvalid={isInvalid}
                                  onChange={(obj) => setValueMiddle(obj.target.value)}
                                  onBlur={(obj) => {
                                      if (/.+@.+\.[A-Za-z]+$/.test(obj.target.value)) {
                                          Order.edit(id, valueMiddle)
                                          setIsInvalid(false)
                                      } else {
                                          setIsInvalid(true)
                                      }
                                  }}
                    />
                    : id === 'password' ?
                        <Form.Control type="password" placeholder={title} value={value}
                                      onChange={(obj) => Order.edit(id, obj.target.value)}/>
                        : <Form.Control type="text" placeholder={title}  value={value}
                                        onChange={(obj) => {
                                            Order.edit(id, obj.target.value)
                                        }}/>
                }
                <Button variant="outline-primary">Add</Button>
                <Form.Control.Feedback type="invalid">
                    Please choose a {title}.
                </Form.Control.Feedback>
                </div>
            </Form.Group>
        )
    }
)

export default InputFormOrder