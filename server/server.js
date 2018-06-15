const path = require('path');
const http =require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log('New user connected');


        socket.emit('newMessage', {
            from: 'ivannajdovski@hotmail.com',
            text: "Ti se izlaga li vecer",
            createdAt: 123
        });
        socket.on('CreateMessage', (Message) => {
            console.log('New message :', Message);
        });
        
        socket.on('disconnect', () => {
             console.log('User has disconnected');
});
});



server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

