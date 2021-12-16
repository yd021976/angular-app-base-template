import { loginModel } from "../models/login.js";

export const loginView = Backbone.View.extend({
    model : new loginModel(),
    initialize: function() {
    }
})