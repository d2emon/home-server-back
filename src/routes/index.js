var express = require('express');
var router = express.Router();

var news = require('../data/news.json');
var tours = require('../data/tours.json');
var events = require('../data/events.json');
var videos = require('../data/videos.json');
var article = require('../data/article.json');
var stores = require('../data/stores.json');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express',
    news,
    tours,
    events,
    videos,
    article,
    stores: stores.image
  });
});

module.exports = router;
