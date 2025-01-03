const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const app = express();

const PORT = 9000;
const server = http.createServer(app);
const io = new Server(server);


//* Socket.io 
io.on("connection", (socket) => {
    //? console.log("A new user has connected", socket.id);
    socket.on("clientMessage", (clientMsg) => {
        console.log(`A new user message : ${clientMsg}`);

        io.emit("message", clientMsg);
    });
});


let staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));


app.get("/", (req, res) => {
    let htmlFilePath = path.join(__dirname, "/public/index.html");
    return res.sendFile(htmlFilePath);
});


server.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
});