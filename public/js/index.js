var socket = io();

socket.on('connect', function() {
    console.log('Connected to user');

    socket.emit('CreateMessage', {
        from: "DimeGayko@yahoo.com",
        text: " mi se izlaga be gay ajde da ideme"
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('New Message', message);
});

