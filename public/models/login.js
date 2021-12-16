export var loginModel = Backbone.Model.extend({
    userName: "titi",
    token: null,

    initialize: function() {
        this.userName = ""
        this.token = null
    }
})