var expect = require('expect');
var {generateMessage} = require('./message');


describe('generateMessage', () =>{
    it('should generate correct message object', () => {
        var from = 'Ivan';
        var text = 'sit sit';
        var message = generateMessage(from,text);
        expect(message).toInclude({from,text})
        expect(typeof message.createdAt).toBe('number')

    });
});