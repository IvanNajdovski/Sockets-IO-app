const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Ivan',
            room: 'React'
        },{
            id: '2',
            name: 'Dime',
            room: 'Node'
        },{
            id: '3',
            name: 'Kriza',
            room: 'React'
        }]
    })


    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Ivan',
            room: 'Go Goats'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);

});

    it('shoould not remove user', () => {
        var removeUser = users.removeUser('4')
        expect(removeUser).toNotExist()
        expect(users.users.length).toBe(3)
})


    it('should remove user form array', () => {
        var userId = '2'
        var removeUser = users.removeUser(userId)
        expect(users.users.length).toBe(2)
        expect(removeUser[1].name).toBe('Kriza')
    })

    it('should return a user given the id', () =>{
        var userId = '2';
        var findUser = users.getUser(userId)
            expect(findUser.id).toBe(userId)

    });
    it('should not find user', () =>{
        var userId = '99';
        var user = users.getUser(userId)
    })



    it('should return names for react course', () => {
       var userList = users.getUserList('React');

       expect(userList).toEqual(['Ivan', 'Kriza']);


    });


})