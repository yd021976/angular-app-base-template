var PageView = require('./base');
var LoginForm = require('../forms/login.form');


module.exports = PageView.extend({
    pageTitle: 'Login page',
    props: {},
    children: {},
    template: require('../../templates/jade/pages/login.jade'),
    subviews: {
        form: {
            container: 'form',
            // Add an instance of form view here because we need access events fired from it
            instance: null,
            // waitFor: true,
            prepareView: function (el) {
                this.subviews.form['instance'] = new LoginForm({
                    el: el,
                    // model: this.parent.model,
                    submitCallback: function (...data) {
                        let a = 0;
                    }
                });
                return this.subviews.form['instance'];
            }
        },
    },
    initialize: function (authState) {
        // this.subviews.form.on("all", function (data) {
        //     let a = 0;
        // });


        this.on("all", function (...data) {
            console.log(`Loginview state event => ${data[0]}`)
        })
        this.parent.on("all", function (...data) {
            console.log(`Loginview PARENT state event => ${data[0]}`)
        })

        setTimeout(() => {
            this.parent.isLoggedin = true;
        }, 5000);
    },
});