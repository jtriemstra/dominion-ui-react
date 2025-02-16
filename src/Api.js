export default class Api {
    apiServer() {
        // if (process.env.APP_ENV === 'prod'){
             return "https://jtriemstra-dominion-api.herokuapp.com/v3";
        // }
        // else {
             //return "http://localhost:8080/v3";
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
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
    
        var myInit = {
            method: 'GET',
            headers: myHeaders,
        };
    
        var myRequest = new Request(this.apiServer() + url);

        fetch(myRequest, myInit)
            .then(res => res.json())
            .then((result) => {
                callback(result);
            })
            .catch(error => {console.log(error);});
    }
}