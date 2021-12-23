var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');

var ExtendedInput = InputView.extend({
    template: require('../../templates/jade/includes/login.jade')
});

module.exports = FormView.extend({
    password: '',
    fields: function () {
        return [
            new ExtendedInput({
                label: 'User name',
                name: 'username',
                value: this.model && this.model.username,
                placeholder: 'Your user name',
                parent: this
            }),
            new ExtendedInput({
                label: 'Password',
                name: 'password',
                value: this.password,
                placeholder: 'Password',
                parent: this
            }),
        ];
    }
});
