var mongoose = require('mongoose');
var config = require('back/src/config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;
