  var controller = require("../app/url_shortener/controller.js");
  var request = require("request");
  var expect = require("Chai").expect;
  var server = require("../server.js");
  var async = require("async");

  var alphabet =  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  describe("URL Shortner", function () {
      before(function () {
          server = require("../server.js");
      });

      after(function () {
          server.close();
      });
  });

  describe("shortenUrl", () => {
      it("should shorten return 201", function (done) {
          var randomString = getRandomString(200, alphabet);
          var url = "http://localhost:3001/" + randomString;
          var options = {
              url: "http://localhost:3001/url_shortener/shorten",
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              json: {"long_url": url}
          };

          request(options, function (err, res) {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.not.equal(null);
              done();
          });
      });

      it("should return 200 when already shortened url is posted.", function (done) {
          var randomString = getRandomString(200, alphabet);
          var url = "http://localhost:3001/" + randomString;
          var options = {
              url: "http://localhost:3001/url_shortener/shorten",
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              json: {"long_url": url }
          };

          async.series([
              function(callback) {
                  request(options, function (err, res) {
                      expect(res.statusCode).to.equal(201);
                      expect(res.body).to.not.equal(null);
                      callback(null, res.body.shortUrl);
                  });
              },
              function(callback) {
                  request(options, function (err, res) {
                      expect(res.statusCode).to.equal(200);
                      expect(res.body).to.not.equal(null);
                      callback(null, res.body.shortUrl);
                  });
              }
          ],
          function(err, results){
              expect(results[0]).to.equal(results[1]);
              done();
          });
      });
});

describe("getLongUrl", () => {
    it("should return longurl for corresponding shortUrl passed", function (done) {
        // create and store longurl.
        var randomString = getRandomString(
            200,
            alphabet
        );
        var host = "http://localhost:3001/";
        var longUrl = host + randomString;
        var postOptions = {
            url: "http://localhost:3001/url_shortener/shorten",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            json: {"long_url": longUrl}
        };

        request(postOptions, function (err, res) {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.not.equal(null);

            var shortUrl = res.body.shortUrl;
            var relativePath = shortUrl.substring(host.length, shortUrl.length);

            shortUrl = host + "url_shortener/" + relativePath;

            var getOptions = {
                url: shortUrl,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            };

            request(getOptions, function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.not.equal(null);
                expect(JSON.parse(res.body).long_url).to.equal(longUrl);
                done();
            });
        });
    });
});

function getRandomString(length, chars) {
    var result = "";

    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
}
