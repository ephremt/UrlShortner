var utils = require("../utils");
var url = require("../../models/url");
var config = require("../../config.js");
var httpStatus = require("http-status-codes");

exports.shortenUrl =  function shortenUrl(req, res) {
    var longUrl = req.body.long_url;
    var shortUrl = "";

    // check if url already exists in database
    url.findOne({long_url: longUrl}, function (err, doc) {
        if (doc) {
            shortUrl = config.apihost + utils.computeShortUrl(doc._id);

            return res
                .status(httpStatus.OK)
                .send({
                    shortUrl: shortUrl
                });
        }
    });

    var newUrl = url({
        long_url: longUrl
    });

    // Save the Url
    newUrl
        .save()
        .then(function(doc) {
            shortUrl = config.apihost + utils.computeShortUrl(doc._id);

            return res
                .status(httpStatus.CREATED)
                .send({
                    shortUrl: shortUrl
                });
        }, function(err) {
            if (!err.status) {
                err.status = 500;
            }

            res.status(err.status);

            return res.send({
                message: err.message,
                details: err.details || "",
                status: err.status
            });
    });
};

exports.getLongUrl =  function getLongUrl(req, res) {
    var shortenedUrl = req.params.short_url;
    var id = utils.computeIdForLongUrl(shortenedUrl);

    // check if url already exists in database
    url.findOne({_id: id}, function (err, doc) {
        if (!doc || err) {
            err = err || new Error("No long url record found for :${shortenedUrl}");

            if (!err.status) {
                err.status = 404;
            }

            res.status(err.status);

            return res.send({
                message: err.message,
                details: err.details || "",
                status: err.status
            });
        }

        return res
            .status(httpStatus.OK)
            .send({
                long_url: doc.long_url
            });
  });
};
