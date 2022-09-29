import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../AuthenticationFolder/authConfig'
import { callForUser, callForEvent } from "./GraphCalls"
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
                        console.log(user.displayName)
                    }
                })
            })
        })

        return(
            <></>
            )

    }

export function GetUsers(props){
    //creates an object with instance and accounts that are authenticated.
    let eventArr = [];
    const { instance, accounts } = useMsal();
    //console.log(currentUser);
    const request = {
        ...loginRequest,
        account: accounts[0]
    };
    //uses instance to acquire an access token, and takes out request, and reponds with an access token if one is available.
    instance.acquireTokenSilent(request).then((res) => { //Pass the response into an arrow function that calls the callForUser-function and passes the accesstoken as an argument.
        callForUser(res.accessToken).then((res) => { //Pass the reponse from callForUsers into an arrow functio and passes the response, instance and account as arguments.
            GetEvent(res.value, instance, accounts).then((res) => {
                eventArr.push(res);
            })
            .catch((e) => console.log("an error has occured"));
        })
    }).catch((e) =>{
    //if we cant acquire silently, then we acquire one by popup.
    instance.acquireTokenPopup(request).then((res) => {
        callForUser(res.accessToken).then((res) => {
            GetEvent(res.value, instance, accounts).then((res) => {
                eventArr.push(res);
            });
        })
    })
    })

    return(
        <>
        <h1>hej</h1>
        </>
    )
}