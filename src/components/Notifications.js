import React, { useState, useEffect, useContext } from "react";
import Api from "../Api";

function getNotifications(api, setNotifications) {
    api.fetchJSON("/notifications?nocache=" + Date.now(), setNotifications);    
}

export default function Notifications({api = new Api()}) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        
        const interval = setInterval(() => {
            getNotifications(api, setNotifications);
        }, 2000);
 
        //Clearing the interval
        return () => clearInterval(interval);
    }, [notifications]);

    const output = notifications.map((n) => <p>{n}</p>);

    return <div>
        {output}
    </div>
}