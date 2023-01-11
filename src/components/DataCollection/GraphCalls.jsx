import Moment from 'moment/moment';
// exports a function that takes an access token as argument.
export async function callForUser(accessToken){
    //calls an api with the header and method of call attached:
    const headers = new Headers();
    const bearer = `bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    //endpoint points to, users ordered by name, and returns each user with accountEnabled, start, end, name, email as elements within the objects.
    const endpoint = "https://graph.microsoft.com/v1.0/users?$orderby=displayName&$select=accountEnabled,start,end,displayName,userPrincipalName,department&$top=999";
    
    //returns the api response
    return fetch(endpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error))
}

// exports funciton that takes an acess token, a user and the accountEnabled bool. 
export async function callForEvent(accessToken, user){
    const headers = new Headers();
    const bearer = `bearer ${accessToken}`;
    headers.append("Authorization", bearer);
    const time = Moment().tz('Europe/Copenhagen').format('YYYY-MM-DDTHH:MM:ss');
    console.log(time)

    const options = {
        method: "GET",
        headers: headers
    };

    const endpoint = `https://graph.microsoft.com/v1.0/users/${user}/calendarview?startdatetime=${time}&enddatetime=2023-01-12&$top=1`;
    return fetch(endpoint, options, user)
    .then(response => {return response.json()});
    }
