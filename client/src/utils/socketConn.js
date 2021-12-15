const {io} = require("socket.io-client");
const URL = "http://localhost:5000/";
const socketIO=(name) =>{
  return io(URL, {
    transports: ["websocket"],
    upgrage: false,
    withCredentials: true,
    query: { token: localStorage.getItem("token"), name },
  })
}

const socket = {
  _instance: null,

  getInstance: function (name) {
    !this._instance &&
      (this._instance = socketIO(name));

    this._instance.disconnected && this._instance.connect();

    return this._instance;
  },
};

export default socket;
