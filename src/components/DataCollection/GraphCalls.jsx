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
    const endpoint = "https://graph.microsoft.com/v1.0/users?$orderby=displayName&$select=accountEnabled,start,end,displayName,userPrincipalName";
    
    //returns the api response
    return fetch(endpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error))
}

// exports funciton that takes an acess token, a user and the accountEnabled bool. 
export async function callForEvent(accessToken, user, accountEnabled){
    const headers = new Headers();
    const bearer = `bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    //points to a users events, ordered by start time and end time - and only returns the top 2 results.
    const endpoint = `https://graph.microsoft.com/v1.0/users/${user}/events?$orderby=start/dateTime,end/dateTime%20asc&$filter=start/dateTime%20ge%20'2022-09-19T11:00'&$top=2`;
    if(user.length > 12 || user.length < 11 || accountEnabled === false){
        return ('The user is out of Scope ');
    } else {
        return fetch(endpoint, options)
        .then(response => {
            //reponse.ok returns a boolean based on wether the response was successful or not.
            if(response.ok){
                console.log('it returned successfully. V');
                return response.json();
            } else {
                console.log('it did not return successfully!');
                return false;
            }})
    }
}