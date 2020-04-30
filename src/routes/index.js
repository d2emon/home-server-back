var express = require('express');
var router = express.Router();

var news = require('../data/news.json');
var tours = require('../data/tours.json');
var events = require('../data/events.json');
var videos = require('../data/videos.json');
var article = require('../data/article.json');
var stores = require('../data/stores.json');
var albums = require('../data/albums.json');
var slides = require('../data/slides.json');
var videosFull = require('../data/videosFull.json');
var images = require('../data/images.json');
var toursFull = require('../data/toursFull.json');
var toursPast = require('../data/toursPast.json');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/index.html');
});

router.get('/index.:format?', function(req, res) {
  res.render('index', {
    title: 'About',
    slides,
    news,
    tours,
    events,
    videos,
    article,
    stores: stores.image
  });
});

router.get('/audio.:format?', function(req, res) {
  res.render('audio', {
    title: 'Audio',
    albums,
  });
});

router.get('/video.:format?', function(req, res) {
  res.render('video', {
    title: 'Video',
    videos: videosFull,
  });
});

router.get('/gallery.:format?', function(req, res) {
  res.render('gallery', {
    title: 'Gallery',
    images,
  });
});

router.get('/tour-dates.:format?', function(req, res) {
  res.render('tours', {
    title: 'Tour Dates',
    tours: toursFull,
    past: toursPast,
  });
});

router.get('/contacts.:format?', function(req, res) {
  res.render('contacts', {
    title: 'Contacts'
  });
});

module.exports = router;
