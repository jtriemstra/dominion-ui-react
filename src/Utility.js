class Utility {
    static apiServer() {
       // if (process.env.APP_ENV === 'prod'){
       //     return "https://jtriemstra-dominion-api.herokuapp.com/v3";
       // }
       // else {
            return "http://localhost:8080/v3";
            //return "http://jtriemstradominionapi-env.eba-wcyvhkpu.us-east-2.elasticbeanstalk.com";
       // }
        
    }

    static getPlayerName() {
        if (document.cookie) {
            const cookies = document.cookie.split(";");
            for (var i=0; i<cookies.length; i++){
                if (cookies[i].startsWith("playerName=")){
                    return cookies[i].substring(11);                    
                }
            }
        }
    }

    static clearPlayerName() {
        document.cookie = "playerName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

export default Utility;
