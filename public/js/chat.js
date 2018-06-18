var socket = io();

function scrollToBottom(){
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHight= newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }

}


socket.on('connect', function() {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err){
            alert(err);
            window.location.href = "/";
        }else{
            console.log('No error');

        }
    });
   });
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    console.log('users list' , users)
    var ol = jQuery('<ol></ol>');
    users.forEach( function (user) {
        ol.append($('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
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
    scrollToBottom();
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
    scrollToBottom();
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
        var messageTextbox = $('[name=message]')
    socket.emit('createMessage', {

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

