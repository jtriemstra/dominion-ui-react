import React, { useState, useEffect, useContext } from "react";
import Utility from "../Utility";

export function getNotifications(setNotifications) {
    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    var myInit = {
        method: 'GET',
        headers: myHeaders,
    };

    var myRequest = new Request(Utility.apiServer() + "/notifications?nocache=" + Date.now());

    fetch(myRequest, myInit)
    .then(res => res.json())
    .then((result) => {
        setNotifications(result);
    })
    .catch(error => {console.log(error);});
}

export default function Notifications({fetchMethod = getNotifications}) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        
        const interval = setInterval(() => {
            fetchMethod(setNotifications);
        }, 2000);
 
        //Clearing the interval
        return () => clearInterval(interval);
    }, [notifications]);

    const output = notifications.map((n) => <p>{n}</p>);

    return <div>
        {output}
    </div>
}