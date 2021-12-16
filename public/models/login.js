export var loginModel = Backbone.Model.extend({
    userName: "",
    token: null,

    initialize: () => {
        this.userName = ""
        this.token = null
    }
})