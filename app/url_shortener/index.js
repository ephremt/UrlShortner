var routes = module.exports = require("express").Router();
var urlController = require("./controller.js");

routes.post("/shorten", urlController.shortenUrl)
routes.get("/:short_url", urlController.getLongUrl)
