export const loginModel = Backbone.Model.extend({
    initialize() {
        this.set("userName", "toto")
        this.set("token", "")
    }
});