import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../AuthenticationFolder/authConfig'
import Button from "react-bootstrap/Button"
import { callForUser, callForEvent } from "./GraphCalls"
import RenderMeeting from "../RenderComponents/RenderMeeting";

function handleLogin(instance) {
    //Handles login and catches exceptions
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

export function GetEvent(data, instance, accounts){
    const request = {
        ...loginRequest,
        account: accounts[0]
    };  

        data.map((user) => {
        instance.acquireTokenSilent(request).then((res) => {
                callForEvent(res.accessToken, user.userPrincipalName, user.accountEnabled).then((res) => {
                    if(res.value === undefined || res === false){
                    } else{
                        return(
                            console.log(res)
                        )
                    }
                })
            })
        })

    }

export function GetUsers(props){
    //creates an object with instance and accounts that are authenticated.
    const { instance, accounts } = useMsal();
    console.log(CallUser());
    function CallUser(){
        const request = {
            ...loginRequest,
            account: accounts[0]
        };
        //uses instance to acquire an access token, and takes out request, and reponds with an access token if one is available.
        instance.acquireTokenSilent(request).then((res) => { //Pass the response into an arrow function that calls the callForUser-function and passes the accesstoken as an argument.
            callForUser(res.accessToken).then((res) => { //Pass the reponse from callForUsers into an arrow functio and passes the response, instance and account as arguments.
                return GetEvent(res.value, instance, accounts)
            })
        }).catch((e) =>{
        //if we cant acquire silently, then we acquire one by popup.
        instance.acquireTokenPopup(request).then((res) => {
            callForUser(res.accessToken).then((res) => {
                return GetEvent(res.value);
            })
        })
        })
    }
    return(
        <>
            <h1>{CallUser}</h1>
        </>
    )
}

export const ReqUsers = () => {
    //Use Msal (Microsfot Authentication Library.)
    const { instance } = useMsal();
    return (
        //Button class imported from react-boostrap
        <Button className="ml-auto" onClick={() => handleLogin(instance)}>Sign in using Redirect</Button>
    );
}