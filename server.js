var http = require('http'),
mongoose = require('mongoose'),
config = require('./config');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
var server = module.exports = http
      .createServer(require('./app'))
      .listen(3001, function(){
  console.log('Server listening on port 3001');
});
