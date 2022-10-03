import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../AuthenticationFolder/authConfig'
import { callForUser } from "./GraphCalls"
import { GetEvent } from "./GetEvent";

export async function GetUsers(){
    //creates an object with instance and accounts that are authenticated.
    const { instance, accounts } = useMsal();
    //console.log(currentUser);
    const request = {
        ...loginRequest,
        account: accounts[0]
    };

    var tokenProm = instance.acquireTokenSilent(request).then(async (res) => {return res.accessToken});
    tokenProm = await tokenProm;

    var usersEvents = callForUser(tokenProm).then((res) => {
        GetEvent(res.value, instance, accounts);
    })

    
    return usersEvents

    /* //uses instance to acquire an access token, and takes out request, and reponds with an access token if one is available.
    instance.acquireTokenSilent(request).then((res) => { //Pass the response into an arrow function that calls the callForUser-function and passes the accesstoken as an argument.
        callForUser(res.accessToken).then(async (res) => { //Pass the reponse from callForUsers into an arrow functio and passes the response, instance and account as arguments.
           return await GetEvent(res.value, instance, accounts)
        })
    }).catch((e) =>{
    //if we cant acquire silently, then we acquire one by popup.
    console.log('popup')
    instance.acquireTokenPopup(request).then((res) => {
        callForUser(res.accessToken).then((res) => {
            console.log(GetEvent(res.value, instance, accounts).ok)
        })
    })
    }) */
}