var app = require('express')();
var express = require("express");
var http = require('http').createServer(app);
const bodyParser = require("body-parser");

var io = require('socket.io')(http);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req,res){
    res.sendFile(__dirname + "/public/index.html");
})


//connection/disconnect
io.on('connection', (socket) => {
    io.emit("user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })

// checks for messages
    socket.on("message", (data) => {
        io.emit("message", (data));
    }); 
});

//listens on port 3000
http.listen(3000, function(){
    console.log("server started :)");
})