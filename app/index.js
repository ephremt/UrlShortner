var middleware = require("./middleware.js");
var api = require("express")();
var url_shortener = require("./url_shortener");

module.exports = api;

api.use(middleware.bodyParser);
api.use("/url_shortener", url_shortener);
