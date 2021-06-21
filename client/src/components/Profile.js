import React, { useState } from "react";
// import {BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = (props) => {
    let profileCard = (
        <div></div>
    );

    if(!props.currentUser) {
        props.history.push('/home');
    } else {
        let {username, email, createdAt} = props.currentUser;
        createdAt = new Date(createdAt).toLocaleString();
        profileCard = (
            <Card className="card">
                <Card.Header>Profile</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Username: {username}</ListGroup.Item>
                    <ListGroup.Item>Email: {email}</ListGroup.Item>
                    <ListGroup.Item>Created: {createdAt} </ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
    return (
        <div>{profileCard}</div>
    )

};

export default Profile;