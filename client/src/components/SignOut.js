import React, { useState, useRef } from "react";

import AuthService from "../services/auth.service";

const SignOut = (props) => {

    AuthService.signOut().then(() => {
        props.setCurrentUser(undefined);
        props.history.push("/home");
    })

    return (
        <div>
            Logging Off
            <span className="spinner-border spinner-border-sm"></span>
        </div>
        
    );
};

export default SignOut;