//Derived from: https://medium.com/samsung-internet-dev/building-an-internet-connected-phone-with-peerjs-775bd6ffebec
const express = require("express");
const https = require('https');
const path = require('path');
const app = express();
var fs     = require('fs');
var options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};
const server = https.createServer(options, app);

const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || "443";

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/myapp',
    secure:true,
    ssl: {
        options
    }
});

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

server.listen(port);
console.log('Listening on: ' + port);
