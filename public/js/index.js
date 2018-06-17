var socket = io();


socket.on('connect', function() {
    console.log('Connected to user');
   });
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    var time = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: time
    });

    $('#messages').append(html);

});
socket.on('newLocationMessage', function (message) {
    var time = moment(message.createdAt).format('h:mm a')
    var template = $('#locationMessage-template').html();
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: time
    });
    $('#messages').append(html)
});

//     var li = $('<li></li>');
//     var a = $('<a target="_blank">My current location</a>');
//     var time = moment(message.createdAt).format('h:mm a')
//
//     li.text(`${message.from} ${time}: `);
//     a.attr('href', message.url);
//     li.append(a);
//     $('#messages').append(li);
// });


$('#message-form').on('submit', function(e) {
    e.preventDefault();
        var messageTextbox = $('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    },function () {
        messageTextbox.val('')
    });
});
var locationButton = $('#send-location');

locationButton.on('click',function() {
   if(!navigator.geolocation){
       return alert('Geolocation not supported by yout browser');
   }
   locationButton.attr('disabled', 'disabled').text('Sending location ...')

   navigator.geolocation.getCurrentPosition(function(position){
       locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      });
   }, function (){
       locationButton.removeAttr('disabled').text('Send location');
       alert('Unable to get location');
   });
});

