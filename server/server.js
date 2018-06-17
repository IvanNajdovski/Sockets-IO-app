const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const {isRealString} = require('./utils/validation');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log('New user connected');


            socket.on('join', (params, callback) => {
                if(!isRealString(params.name) || !isRealString(params.room)){
                    callback('Name and Room name are required')
            }

            socket.join(params.room);
            socket.leave

            socket.to(params.room).emit('newMessage', generateMessage('Admin', `Wellcome to the ${params.room} room`));

            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));


            callback();
            });

            socket.on('createMessage', (message,callback) => {
                console.log('New message :', message);

                io.emit('newMessage', generateMessage(message.from, message.text));
            callback();
                });

            socket.on('createLocationMessage', (coords) => {
                io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
            });
        
        socket.on('disconnect', () => {
             console.log('User has disconnected');
});
});



server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

