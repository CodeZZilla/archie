import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Form, Image, Row, Button, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import AuthStore from "../../Store/AuthStore";


const Login = observer(() => {
    //const auth = useContext(AuthContext);
    //const [submitted, setSubmitted] = useState(false);

    useEffect(async () => {
        AuthStore.reset()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        await AuthStore.login()
        //await Backendless.UserService.login(email, password, false)
    }

    return (
        AuthStore.inProgress ?
            <div>
                <h1>Login Archie OS</h1>
                <Container className="mt-3 mb-3">
                    <Row className="justify-content-md-center">
                        <Spinner className="my-load-spinner" animation="border" variant="secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div> :
        <Container>
            <Row className="d-flex justify-content-md-center">
                <Col className="col-4 border border-secondary mt-5 p-4">
                    <Image src="archie.png" rounded/>
                    <h5 className="mt-3">Archie Optician Software Staging </h5>
                    <Form onSubmit={handleSubmit}>
                        <p className="h5 mt-3 font-weight-bold">Login Credentials Required.</p>
                        <Form.Group className="mt-4 justify-content-md-center" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" value={AuthStore.values.email}
                                          onChange={(e) => AuthStore.setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mt-4 justify-content-md-center" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" value={AuthStore.values.password}
                                          onChange={(e) => AuthStore.setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button className="mt-4 col-6" type="submit" size="lg">Sign in</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
})

export default Login