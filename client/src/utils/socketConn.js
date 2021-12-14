const io = require("socket.io-client");
const URL = "http://localhost:5000/";

const socket = {
  _instance: null,

  getInstance: function (name) {
    !this._instance &&
      (this._instance = io(URL, {
        transports: ["websocket"],
        upgrage: false,
        withCredentials: true,
        query: { token: localStorage.getItem("token"), name },
      }));

    this._instance.disconnected && this._instance.connect();

    return this._instance;
  },
};

export default socket;
