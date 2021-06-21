import dotenv from 'dotenv'
import React, { useState, useEffect } from "react";
import {BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import AuthService from "./services/auth.service";

import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

dotenv.config();

const {REACT_APP_AUTH_API_HOST, REACT_APP_AUTH_API_HOST_PATH} = process.env;
console.log(REACT_APP_AUTH_API_HOST, REACT_APP_AUTH_API_HOST_PATH);

const App = () => {
  const [loginState, setLoginState] = useState(0);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    console.log('use-effect triggered');
    AuthService.profile(setCurrentUser);
    return () => {
      // console.log('cleanup')
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand="lg" className="px-3" variant="dark" bg="secondary" sticky="top">
        <Navbar.Brand as={Link} eventKey={0} to="/home">Helixious</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsivenavbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            {currentUser ? (
              <Nav className="justify-content-end" style={{width:"100%"}}>
                <Nav.Link as={Link} eventKey={1} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} eventKey={3} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} eventKey={2.2} to="/signout">Sign Out</Nav.Link>
              </Nav>
            ) : (
                <Nav className="justify-content-end" style={{width:"100%"}}>
                  <Nav.Link as={Link} eventKey={2.1} to="/signin">Sign In</Nav.Link>
                </Nav>
            )}
        </Navbar.Collapse>
      </Navbar>
      <Switch>Signup
          <Route exact path="/signin" render={(props) => <SignIn {...props} onChange={setLoginState} setCurrentUser={setCurrentUser}/>} />
          <Route exact path="/signout" render={(props) => <SignOut {...props} setCurrentUser={setCurrentUser}/>} />
          <Route exact path="/signup" render={(props) => <SignUp {...props} onChange={setLoginState} setCurrentUser={setCurrentUser}/>} />
          <Route exact path="/profile" render={(props) => <Profile {...props} currentUser={currentUser}/>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;