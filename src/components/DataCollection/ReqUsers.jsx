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
                        console.log(user.displayName + " # " + user.userPrincipalName + " | " + res?.value[0].subject + " _ " + res?.value[1].subject)
                        console.log(res.value[0])
                        
                    }
                })
            })
        })
        return(
           <div>
                <h1>hej1</h1>
           </div>
        )
    }

export function GetUsers(props){
    const { instance, accounts } = useMsal();
    CallUser();
    function CallUser(){
        const request = {
            ...loginRequest,
            account: accounts[0]
        };
    
        instance.acquireTokenSilent(request).then((res) => {
            callForUser(res.accessToken).then((res) => {
                GetEvent(res.value, instance, accounts)
            })
        }).catch((e) =>{
        instance.acquireTokenPopup(request).then((res) => {
            callForUser(res.accessToken).then((res) => {
                GetEvent(res.value);
            })
        })
        })
    }
    return(
        <div>
            <GetEvent />
        </div>
    )
}

export const ReqUsers = () => {
    //Bruger Msal (Microsfot Authentication Library.)
    const { instance } = useMsal();
    return (
        //Button class imported from react-boostrap
        <Button className="ml-auto" onClick={() => handleLogin(instance)}>Sign in using Redirect</Button>
    );
}