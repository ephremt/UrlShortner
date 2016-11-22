var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ?=&+.-";
var base = alphabet.length;

module.exports.computeShortUrl = function computeShortUrl(id) {
    var short_url = "";

    while (id) {
        var remainder = id % base;

        id = Math.floor(id / base);
        short_url = alphabet[remainder].toString() + short_url;
    }

    return short_url;
}

module.exports.computeIdForLongUrl = function computeIdForLongUrl(shortUrl) {
    var id = 0;

    while (shortUrl) {
        var index = alphabet.indexOf(shortUrl[0]);
        var power = shortUrl.length - 1;

        id += index * (Math.pow(base, power));
        shortUrl = shortUrl.substring(1);
    }

    return id;
}
