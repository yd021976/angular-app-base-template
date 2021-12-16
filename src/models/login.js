export const loginModel = Backbone.Model.extend({
    initialize: function() {
        this.set("userName", "toto")
        this.set("token", "")
    }
});