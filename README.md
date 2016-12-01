# Url-Shortener
A Nodejs REST API to shorten a url

Instructions:

 Clone the repository,  `git clone https://github.com/ephremt/UrlShortner.git`
 
To run the tests:

1. cd to  `UrlShortner` folder
2. run `npm install`
3. run `npm test` to run functional tests.

To run the application locally:

1. cd to `UrlShortner` folder
2. run `node server.js`

At this point you can use tools like postman (a google chrome extension) to make a POST request to send a long url and get shortened one or do a GET request to get a long version of a shortened url.

Exmaples:

POST:

Post request url: ` http://localhost:3001/url_shortener/shorten`

Request Body: ``` {"long_url":"http://localhost:3001?somequery=somevalues&anonerlongquesry=verrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalue"}```

Reponse Body: ```{
"shortUrl": "http://localhost:3001/qUz"
}```

GET:

Get request url: ` http://localhost:3001/url_shortener/qUz`

Response body: ```{
"long_url": "http://localhost:3001?somequery=somevalues&anonerlongquesry=verrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalueverrylongvalue"
}```
