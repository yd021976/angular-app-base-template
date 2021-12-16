import { loginModel } from './models/login.js'

var AppView = Backbone.View.extend({
    // el - stands for element. Every view has an element associated with HTML content, will be rendered. 
    el: '#app',

    // It's the first function called when this view is instantiated.
    initialize: function () {
        this.login = new loginModel()
        this.render();
    },

    // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content.

    //Like the Hello TutorialsPoint in this case.
    render: function () {
        this.$el.html(`Hello, you are ${this.loginModel.userName}`);
    }
});


/**
 * Start the main app
 */
var appView = new AppView();