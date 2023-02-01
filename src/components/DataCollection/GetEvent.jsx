import { loginRequest } from '../../AuthenticationFolder/authConfig'
import { callForEvent } from './GraphCalls';

export async function GetEvent (data, instance, accounts){
  const request = {
      ...loginRequest,
      account: accounts[0]
  };  

  var tokenProm = instance.acquireTokenSilent(request).then(async (res) => {return res.accessToken});
  tokenProm = await tokenProm;

  var usersSorted = data.value.map((user) => {
    if(user.accountEnabled === true && user.userPrincipalName.length < 13 && user.userPrincipalName.length > 10){
      return user
    }
  })

 

  usersSorted = usersSorted.filter((elem) => {return elem !== undefined})


  var events = await Promise.all(usersSorted.map((user) => {
    return callForEvent(tokenProm, user.userPrincipalName).then((res) => {
      if(res.value !== undefined){
        return [res.value, user.displayName, user.department]
      }
      else{
        return [[], user.displayName, user.department]
      }
    })
  }))

  var bannedNames = ["Jesper Nygaard Nielsen", "Finn Vedersø", "Scan-k32", "Scan-reception", "Scan-Risskov", "Økonomiafdelingen - Indbakke"]

  events = events.filter((elem) => {return !bannedNames.includes(elem[1])})
  return events
}
