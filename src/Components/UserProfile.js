import React, {useState} from 'react';
import {Col, Container, Form, Image, Row, Button, Card, ListGroup} from "react-bootstrap";
import {useParams} from "react-router-dom";


export default function UserProfile() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [submitted, setSubmitted] = useState(false);
    let {id} = useParams();

    const handleSubmit = async e => {
        e.preventDefault()
        /*Backendless.UserService.login(email, password, false)
            .then(async loggedInUser => {

            })
            .catch(function (error) {
                alert(error.message)
            });*/
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col className="col-md-4 mb-3">
                    <Card>
                        <Card.Body>
                            <div className="d-flex flex-column align-items-center text-center">
                                <Image src="https://bootdey.com/img/Content/avatar/avatar7.png" width="150px" alt="User" roundedCircle/>
                                <div className="mt-3">
                                    <h4>John Doe</h4>
                                    <p className="text-secondary mb-1">Doctor</p>
                                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                    <div className="row justify-content-md-around">
                                        <Button className="col-5">Follow</Button>
                                        <Button className="col-5">Message</Button>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="2" y1="12" x2="22" y2="12"/>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                    </svg>
                                    Website
                                </h6>
                                <span className="text-secondary">https://bootdey.com</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round" className="feather feather-github mr-2 icon-inline">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                    </svg>
                                    Github
                                </h6>
                                <span className="text-secondary">bootdey</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="feather feather-twitter mr-2 icon-inline text-info">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                                    </svg>
                                    Twitter
                                </h6>
                                <span className="text-secondary">@bootdey</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col className="col-md-8">
                    <Card className="mb-3">
                        <Card.Body>
                            <Row>
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Full Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    Kenneth Valdez
                                </div>
                            </Row>
                            <hr/>
                            <Row>
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Street</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    Kenneth Valdez
                                </div>
                            </Row>
                            <hr/>
                            <Row>
                                <div className="col-sm-3">
                                    <h6 className="mb-0">City</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    City
                                </div>
                            </Row>
                            <hr/>
                            <Row>
                                <div className="col-sm-3">
                                    <h6 className="mb-0">State</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    Kenneth Valdez
                                </div>
                            </Row>
                            <hr/>
                            <Row>
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Zip Code</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    Kenneth Valdez
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
