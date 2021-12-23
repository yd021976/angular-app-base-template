var PageView = require('./base');

module.exports = PageView.extend({
    props: {},
    children: {},
    template: require('../../templates/jade/pages/login.jade'),
    subbviews: {
        form: {
            container: 'form',
            waitFor: 'model',
            prepareView: function (el) {
                return new PersonForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {
                        let a = 0;
                        // model.save(data, {
                        //     wait: true,
                        //     success: function () {
                        //         app.navigate('/collections');
                        //     }
                        // });
                    }
                });
            }
        },
    },
    initialize: function (authState) {
        // this.on("all", function (...data) {
        //     console.log(`Loginview state event => ${data[0]}`)
        // })
        // this.parent.on("all", function (...data) {
        //     console.log(`Loginview PARENT state event => ${data[0]}`)
        // })

        // setTimeout(() => {
        //     this.parent.isLoggedin = true;
        // }, 5000);
    },
})