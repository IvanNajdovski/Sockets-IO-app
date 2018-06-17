const expect = require('expect');
const {isRealString} =  require('./validation');

describe('isRealStirng' , () => {
    it('should reject non-string values', () => {
        var str = 1
            expect(isRealString(str)).toBe(false)

});
    it('should reject stirng with only spaces', () => {
        var str = "    "
            expect(isRealString(str)).toBe(false)
    });
    it('should allow string witn non-space characters', () =>{
        var str = "Ivan";
            expect(isRealString(str)).toBe(true)
   });


})

