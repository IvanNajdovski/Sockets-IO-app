var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () =>{
    it('should generate correct message object', () => {
        var from = 'Ivan';
        var text = 'sit sit';
        var message = generateMessage(from,text);
        expect(message).toInclude({from,text})
        expect(typeof message.createdAt).toBe('number')

    });
});

describe('generateLocationMessage', () =>{
    it('should generate correct location message', () =>{
        var from = 'Ivan';
        var latitude = 1.111;
        var longitude = 2.222;
        var url = 'https://www.google.com/maps?q=1.111,2.222'
        var locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(typeof locationMessage.createdAt).toBe('number')
        expect(locationMessage.url).toBe(url)
        expect(locationMessage).toInclude({from, url});

    })
})