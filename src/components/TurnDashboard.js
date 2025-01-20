import React, { useState, useEffect } from "react";

export default function TurnDashboard({playerState, isCurrentPlayer}) {
    if (!playerState) {
        return null;
    }

    if (!isCurrentPlayer){
        return (<div className="turn-dashboard"></div>);
    }
    return (
        <div className="turn-dashboard">
            <div className="turn-dashboard-item">
                <h3>Actions Remaining: </h3>
                <p>{playerState.numberOfActions}</p>
            </div>
            <div className="turn-dashboard-item">
                <h3>Buys Remaining: </h3>
                <p>{playerState.numberOfBuys}</p>
            </div>
            <div className="turn-dashboard-item">
                <h3>Treasure Available: </h3>
                <p>{playerState.treasureAvailable}</p>
            </div>
        </div>
    );

}