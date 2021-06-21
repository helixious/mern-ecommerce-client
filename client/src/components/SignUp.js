import React, { useState, useRef } from "react";
import {BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Button, Alert, Breadcrumb, Card, Form, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from "../services/auth.service";

const SignUp = (props) => {
    const form = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
 
    const handleSignup = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        AuthService.signUp(username, email, password).then(
            (result) => {
                if(result.message){
                    setMessage(result.message);
                    setLoading(false);
                } else {
                    props.onChange(1);
                    props.history.push("/profile");
                }
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                
                props.onChange(0);
                setLoading(false);
                setMessage(resMessage);
            }
        );
    }

    return (
        <Card className="align-items-center">
            <h3 className="navbar-brand mt-3">Create Account</h3>
        <Card.Body>
        
            <Form className="card align-items-center p-4" onSubmit={handleSignup} ref={form}>
                <Row>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={onChangeUsername}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={onChangeEmail}></Form.Control>
                        <Form.Text className="muted">We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="Password" placeholder="Password" value={password} onChange={onChangePassword}></Form.Control>
                        <Form.Text className="muted">Enter Password with 6 characters or more</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        {/* <Form.Label>Confirm Password</Form.Label> */}
                        <Form.Control type="Password" placeholder="Confirm password" value={confirmPassword} onChange={onChangeConfirmPassword}></Form.Control>
                        
                    </Form.Group>
                </Row>

                
                {loading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                ) : 
                (
                (<Button variant="success" type="submit" size="md" disabled={!(password.length >= 6 && password == confirmPassword)}>Sign up</Button>)
                )}
            </Form>
            
            {/* <span className="spinner-border spinner-border-sm"></span> */}
            {message ? (<Alert variant="warning">{message}</Alert>) : null}
        </Card.Body>
    </Card>
    )
}

export default SignUp;