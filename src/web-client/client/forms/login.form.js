var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');

var ExtendedInput = InputView.extend({
    template: require('../../templates/jade/includes/login.form.input.jade')
});

module.exports = FormView.extend({
    fields: function () {
        return [
            new ExtendedInput({
                label: 'User name',
                name: 'username',
                value: '',
                placeholder: 'Your user name',
                parent: this
            }),
            new ExtendedInput({
                label: 'Password',
                type: 'password',
                name: 'password',
                value: '',
                placeholder: 'Password',
                parent: this
            }),
        ];
    },
    initialize: function (...args) {
        this.on('change:username', function (...data) {
            let a = 0;
        });
    }
});
