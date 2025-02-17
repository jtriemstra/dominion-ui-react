export default class Utility {
    static apiServer() {
            return process.env.REACT_APP_API_ROOT;
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

