export async function callForUser(accessToken){

    const headers = new Headers();
    const bearer = `bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    const endpoint = "https://graph.microsoft.com/v1.0/users?$orderby=displayName&$select=accountEnabled,start,end,displayName,userPrincipalName";

    return fetch(endpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export async function callForEvent(accessToken, user, accountEnabled){
    const headers = new Headers();
    const bearer = `bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    const endpoint = `https://graph.microsoft.com/v1.0/users/${user}/events?$orderby=start/dateTime,end/dateTime%20asc&$filter=start/dateTime%20ge%20'2022-09-19T11:00'&$top=2`;
    if(user.length > 12 || user.length < 11 || accountEnabled === false){
        return ('The user is out of Scope ');
    } else {
        return fetch(endpoint, options)
        .then(response => {
            if(response.ok){
                console.log('it returned successfully. V');
                return response.json();
            } else {
                console.log('it did not return successfully!');
                return false;
            }})
    }
        

 
}