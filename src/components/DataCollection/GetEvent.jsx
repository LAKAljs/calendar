import React from 'react'
import { loginRequest } from '../../AuthenticationFolder/authConfig'
import { RenderMeeting } from '../RenderComponents/RenderMeeting';
import { callForEvent } from './GraphCalls';

export async function GetEvent (data, instance, accounts){
  const request = {
      ...loginRequest,
      account: accounts[0]
  };  

  var tokenProm = instance.acquireTokenSilent(request).then(async (res) => {return res.accessToken});
  tokenProm = await tokenProm;

  var usersSorted = data.map((user) => {
    if(user.accountEnabled === true && user.userPrincipalName.length < 13 && user.userPrincipalName.length > 10){
      return user
    }
  })

  usersSorted = usersSorted.filter((elem) => {return elem !== undefined})


  var events = await Promise.all(usersSorted.map((user) => {
    return callForEvent(tokenProm, user.userPrincipalName).then((res) => {
      return res.value
    })
  }))

  events = events.filter((elem) => {return elem !== undefined})

  return events
}
