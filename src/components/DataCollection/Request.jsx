import { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../AuthenticationFolder/authConfig'
import { callForUser } from "./GraphCalls"
import { GetEvent } from "./GetEvent";
import { useEffect } from "react";

import Moment from 'moment/moment';
import MomentTimezone from 'moment-timezone';
import '../../stylesheets/event-box.css'
import moment from 'moment/moment';

export function GetUsers() {
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

    const events = async () => {
        var tokenProm = instance.acquireTokenSilent(request).then(async (res) => { return res.accessToken });
        tokenProm = await tokenProm;

        const users = await callForUser(tokenProm);

        const response = await GetEvent(users, instance, accounts);
        setEvent(await response);
    }

    function handleChange(event) {
        setTeam(event.target.value);
    }

    function checkStatus(event) {

        var timeArr = {
            'name': '',
            'start': [],
            'end': [],
            'between': [],
            'wholeDay': false
        };

        timeArr['name'] = (event[1]);

        event[0].forEach(element => {

            if (element.isAllDay === true && element.showAs === ("oof")) {
                timeArr['between'].push(true)
                timeArr['wholeDay'] = true

            }else if(element.showAs == "busy"){
                timeArr['start'].push(Moment(element.start.dateTime).utcOffset(2).format('YYYY-MM-DDTHH:mm'));
                timeArr['end'].push(Moment(element.end.dateTime).utcOffset(2).format('YYYY-MM-DDTHH:mm'));
            }

        });



        for (var i = 0; i < timeArr['start'].length; i++) {
            timeArr['between'].push(isInMeeting(timeArr['start'][i], timeArr['end'][i]));
            //return isBetween(timeArr['start'][i], timeArr['end'][i])
        }

        return timeArr;
        // timeArr['start'].forEach(element => {
        //     console.log(element);
        //     console.log(timeArr['end'][]);
        // })   



    }

    function isInMeeting(start, end) {
        if (moment().isBetween(start, end)) {
            return true
        } else {
            return false
        }
    }

    function nextMeeting(startList){
        var stateList = [];
        startList.forEach(startPoint => {
            stateList.push(Moment().isBefore(startPoint))
        })
        
        var index = stateList.indexOf(true);
        if(index < 0){
            return -1
        } else {
            return index
        }
    }

    const [team, setTeam] = useState(["alle"]);

    return (
        <div style={{ marginTop: '100px' }}>
            <div>
                <form>
                    <label style={{marginRight: "10px"}}> Vælg Team </label>
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
                        var displayNext = nextMeeting(checkStatus(data)['start']);
                        console.log(nextMeeting(["2023-02-01T09:00","2023-02-01T09:00"]))
                        var currentMeeting = checkStatus(data)['between'].indexOf(true);
                        if(checkStatus(data)['between'].includes(true) && checkStatus(data)['wholeDay'] !== true){
                            return (
                                <div className="personBox NA" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                    <div>
                                        <p className="list-group-event"><strong>{data[1]}</strong></p>
                                        {<p>Møde klokken: {Moment(checkStatus(data)['start'][currentMeeting]).format('HH:mm')} - {Moment(checkStatus(data)['end'][currentMeeting]).format('HH:mm')}</p>}
                                        <p>{data[2]}</p>
                                        <br></br>
                                    </div>
                                </div>
                            )
                        } else if(checkStatus(data)['between'].includes(true) && checkStatus(data)['wholeDay'] === true){
                            return (
                                <div className="personBox NA" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                    <div>
                                        <p className="list-group-event"><strong>{data[1]}</strong></p>
                                        {<p>Væk hele dagen!</p>}
                                        <p>{data[2]}</p>
                                        <br></br>
                                    </div>
                                </div>
                            )
                        }else if(!checkStatus(data)['between'].includes(true) && displayNext !== -1){
                            return (
                                <div className="personBox today" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                    <div>
                                        <p className="list-group-event"><strong>{data[1]}</strong></p>
                                        {<p>Næste møde: {Moment(checkStatus(data)['start'][displayNext]).format('HH:mm')}</p>}
                                        <p>{data[2]}</p>
                                        <br></br>
                                    </div>
                                </div>
                            )
                        }else{
                            return(
                                <div className="personBox nToday" id={data[2]} key={index} hidden={data[2] === team || team === "alle" ? false : true}>
                                    <div>
                                        <p className="list-group-event"><strong>{data[1]}</strong></p>
                                        <p>Ingen møder i dag</p>
                                        <p>{data[2]}</p>
                                        <br></br>
                                    </div>
                                </div>
                                )
                        }
                    })}
            </div>
        </div>
    )
}