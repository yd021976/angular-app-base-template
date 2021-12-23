var AmpersandModel = require('ampersand-model');

const server_url = 'http://localhost:3030';
const login_url = '/login'
const logout_url = '/logout'
const register_url = '/register'

module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        id: ['string'],
        firstName: ['string', true, ''],
        lastName: ['string', true, ''],
        username: ['string'],
        isLoggedin: {
            type: 'boolean',
            default: false
        },
        token: ['string', '']
    },
    derived: {
        fullName: {
            deps: ['firstName', 'lastName'],
            cache: true,
            fn: function () {
                return this.firstName + ' ' + this.lastName;
            }
        },
        initials: {
            deps: ['firstName', 'lastName'],
            cache: true,
            fn: function () {
                return (this.firstName.charAt(0) + this.lastName.charAt(0)).toUpperCase();
            }
        }
    },
    login: async function (usernanme, password) {
        const url = server_url + login_url
        const loginCredentials = {
            "username": usernanme,
            "password": password
        }
        const response = await fetch(url, {
            "method": "POST",
            "body": JSON.stringify(loginCredentials)
        })
        return response.json()
    },
    logout: function () { }
});
