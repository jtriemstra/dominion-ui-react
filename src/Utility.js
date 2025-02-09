export default class Utility {
    static apiServer() {
       // if (process.env.APP_ENV === 'prod'){
       //     return "https://jtriemstra-dominion-api.herokuapp.com/v3";
       // }
       // else {
            return "http://localhost:8080/v3";
            //return "http://jtriemstradominionapi-env.eba-wcyvhkpu.us-east-2.elasticbeanstalk.com";
       // }
        
    }

    static disableNetwork() {
        return process.env.DISABLE_NETWORK ? true : false;
    }

    getPlayerName() {
        return localStorage.getItem("playerName");
    }

    static clearPlayerName() {
        localStorage.removeItem("playerName");
    }

    getGameId() {
        return localStorage.getItem("gameId");
    }

    static clearGameId() {
        localStorage.removeItem("gameId");
    }
}

