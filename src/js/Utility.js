class Utility {
    static apiServer() {
        console.log(process.env.APP_ENV);
        if (process.env.APP_ENV === 'prod'){
            return "https://jtriemstra-dominion-api.herokuapp.com";
        }
        else {
            return "http://localhost:8080";
            //return "http://jtriemstradominionapi-env.eba-wcyvhkpu.us-east-2.elasticbeanstalk.com";
        }
        
    }
}

export default Utility;
