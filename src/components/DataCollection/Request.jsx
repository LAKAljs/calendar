import { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../AuthenticationFolder/authConfig'
import { callForUser } from "./GraphCalls"
import { GetEvent } from "./GetEvent";
import { useEffect } from "react";

import Moment from 'moment/moment';
import MomentTimezone from 'moment-timezone';
import '../../stylesheets/event-box.css'

export function GetUsers(){        
    //creates an object with instance and accounts that are authenticated.
    const { instance, accounts } = useMsal();

    const [event, setEvent] = useState([]);  

    var time = Moment().format('MMM DD, YYYY HH:mm:ss');

    const request = {
        ...loginRequest,
        account: accounts[0]
    };

    useEffect(() => {
        const interval = setInterval(() => {
            time = Moment().format('MMM DD, YYYY HH:mm:ss')
            events();
        }, 10000);
        return () => clearInterval(interval);
    });

    const events = async () =>{
        var tokenProm = instance.acquireTokenSilent(request).then(async (res) => {return res.accessToken});
        tokenProm = await tokenProm;
    
        const users = await callForUser(tokenProm);

        const response = await GetEvent(users, instance, accounts);
        setEvent(await response);
    }

    function handleChange(event){
        setTeam(event.target.value);
    }

    const [team, setTeam] = useState(["alle"]);
    
     return(
        <div>
            <div>
                <form>
                    <label> Vælg Team </label>
                    <select defaultValue={"alle"} onChange={handleChange}>
                        <option value="Dagpengeteam" >DP</option>
                        <option value="Kontaktcenter">KT</option>
                        <option value="IT-afdelingen">IT</option>
                        <option value="Administrationsafdelingen">Administration</option>
                        <option value="Konsulentteam">Konsulentteam</option>
                        <option value="Forsikringsteamet">Forsikringsteam</option>
                        <option value="Juridisk team">Juridisk team</option>
                        <option value="alle">Alle</option>
                    </select>
                </form>
            </div>
            <div className="grid">
             {event.map((data, index) => {
                console.log(data);
                if(data[2] !== null){
                    if(typeof data[0][0] === "object"){

                        var today = Moment(data[0][0].start.dateTime).utcOffset(2).isSame(Moment(), 'day') && Moment(data[0][0].start.dateTime).utcOffset(2).add(30,'minutes').isAfter(Moment().utcOffset(2));

                        var closeTo = Moment(data[0][0].start.dateTime).utcOffset(2).isSame(Moment(), 'day') && Moment(data[0][0].start.dateTime).utcOffset(2).isAfter(Moment().utcOffset(2).add(30, 'min'));  

                        var inSes = Moment(data[0][0].start.dateTime).utcOffset(2).isSame(Moment(), 'day') && (Moment(data[0][0].start.dateTime).utcOffset(2).isSameOrBefore(Moment().utcOffset(2)) && Moment(data[0][0].end.dateTime).utcOffset(2).isAfter(Moment().utcOffset(2))); 

                        var notToday = !Moment(data[0][0].start.dateTime).utcOffset(2).isSame(Moment(), 'day');
                        console.log(data[1] + " Tid: " + Moment(data[0][0].start.dateTime).utcOffset(2).isSameOrBefore(Moment().fo) + " Tiderne: " +  Moment(data[0][0].start.dateTime).utcOffset(2).format('HH:mm') + ", " + Moment().format('HH:mm'));

                        //Der er et møde i dag!
                        if(today){
                            return(
                                <div className="personBox today" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                    <div>
                                        <p className="list-group-event">{data[1]}</p>
                                        <p>Møde start klokken: {Moment(data[0][0].start.dateTime).utcOffset(2).format('HH:mm')}</p>
                                        <p>{data[2]}</p>
                                        <br></br>
                                    </div>
                                </div>
                            )
                        } else if(inSes){
                            return(
                                <div className="personBox NA" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                    <div>
                                        <p className="list-group-event">{data[1]}</p>
                                        <p>Møde start klokken: {Moment(data[0][0].start.dateTime).utcOffset(2).format('HH:mm')}</p>
                                        <p>Møde slutter: {Moment(data[0][0].end.dateTime).utcOffset(2).format('HH:mm')}</p>
                                        <br></br>
                                    </div>
                                </div>
                            )
                        } else if(notToday){
                            return(
                                <div className="personBox noEvents" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                    <div>
                                        <p className="list-group-event">{data[1]}</p>
                                        <p>Ingen møder i dag!</p>
                                        <p>{data[2]}</p>
                                        <br></br>
                                    </div>
                                </div>
                            )
                        } else if(closeTo){
                            return(
                                <div className="personBox closeTo" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                    <div>
                                        <p className="list-group-event">{data[1]}</p>
                                        <p>Møde start klokken: {Moment(data[0][0].start.dateTime).utcOffset(2).format('HH:mm')}</p>
                                        <p>{data[2]}</p>
                                        <br></br>
                                    </div>
                                </div>
                            )
                        } 
                    }else{
                        return(
                            <div className="personBox noEvents" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                <div>
                                    <p className="list-group-event">{data[1]}</p>
                                    <p>Ingen møder i dag!</p>
                                    <p>{data[2]}</p>
                                    <br></br>
                                </div>
                            </div>
                        )
                    }
                }
                
             })}
             </div>
     </div>
     )
}