const WebSocket = require("ws");
const express = require("express");
const app = express();
const path = require("path");
const PORT = 7001;



//* Displaying the HTML file 
app.get("/", (req, res) => {
    let filePath = path.join(__dirname, "/public/index.html");
    res.sendFile(filePath);
});



//* Creating a simple http server  
const httpServer = app.listen(PORT, () => {
    console.log("Listening on PORT number 7001");
});



//* Creating a web socket server 
const wss = new WebSocket.Server({
    server : httpServer
});



//* Now, we are going to establish a connection using web socket server and pass a 'ws' object in it 
wss.on("connection", (ws) => {

    //* What you want me to do, when i get a open request from the web socket connection 
    ws.on("open", () => {
        console.log(`A new connection is opened!!!!`);
    });
    
    //* What you want me to do when i get a message from the client 
    ws.on("message", (msg) => {

        //* I want to broadcast that msg to all the connected clients 
        wss.clients.forEach((client) => {
            if(client != ws)
            client.send(msg.toString());
        });
    });

    //* What you want me to do, when i receive close request 
    ws.on("close", () => {
        console.log("A client is lost");
    });


    console.log("A new client is connected");

});