export default class Api {
    apiServer() {
             return process.env.REACT_APP_API_ROOT;
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