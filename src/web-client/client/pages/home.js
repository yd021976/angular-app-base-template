var PageView = require('./base');



module.exports = PageView.extend({
    pageTitle: 'home',
    template: require("../../templates/jade/pages/home.jade")
});
