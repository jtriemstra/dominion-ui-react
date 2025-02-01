class Api {
    apiServer() {
        // if (process.env.APP_ENV === 'prod'){
        //     return "https://jtriemstra-dominion-api.herokuapp.com/v3";
        // }
        // else {
             return "http://localhost:8080/v3";
             //return "http://jtriemstradominionapi-env.eba-wcyvhkpu.us-east-2.elasticbeanstalk.com";
        // }
         
     }

     fetchNull(url, callback) {
        fetch(this.apiServer() + url)
        .then(res => {
            if (res.ok) { return true; }
            else { res.text().then(text => {
                    console.error(text);
                });               
            }
        })
        .then((result) => {
            if (result){
                callback();
            }
        });
    }

    fetchJSON(url, callback) {

    }
}