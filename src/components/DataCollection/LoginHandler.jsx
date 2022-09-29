import React from "react";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../AuthenticationFolder/authConfig'
import Button from "react-bootstrap/Button"
import { callForUser, callForEvent } from "./GraphCalls"
import { RenderMeeting } from "../RenderComponents/RenderMeeting";

function handleLogin(instance) {
    //Handles login and catches exceptions
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}


export const ReqUsers = () => {
    //Use Msal (Microsfot Authentication Library.)
    const { instance } = useMsal();
    return (
        //Button class imported from react-boostrap
        <Button className="ml-auto" onClick={() => handleLogin(instance)}>Sign in using Redirect</Button>
    );
}