const express = require("express");
const connectDB = require("./config/db");

const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

const socketAuth = require("./middleware/socketAuth");
const connectedUsers = [];
//Connect to database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

io.use(socketAuth);

io.on("connection", (socket) => {
    const name = socket.handshake.query.name;
    console.log(name + " connected!");
    connectedUsers.push({
        name,
        socketid: socket.id,
    });

    socket.on("notification", async (data) => {
        // const index = connectedUsers.findIndex(({ name }) => name === data.name);
        // index > -1 &&
        //     io.to(connectedUsers[index].socketid).emit("notification", data);
        // // add to dB
        console.log('not rec', data)
        socket.broadcast.emit('notification', data);
    });

    socket.on("disconnect", (reason) => {
        console.log(`${name} disconnected, Reason: ${reason}`);
        const index = connectedUsers.findIndex((user) => user.name === name);
        index > -1 && connectedUsers.splice(index, 1);
    });
});

app.get("/", (req, res) => res.send("API running..."));

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/projects", require("./routes/api/projects"));

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
