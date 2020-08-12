// import config from '../config';

const categoriesPath = '/app/data/categories.json'; // config.get('categoriesPath')

export default () => new Promise((resolve) => {
    const categories = require(categoriesPath);
    return resolve(categories);
});

/*
var mongoose = require('db');

// moment.locale('ru');

var schema = mongoose.Schema({
  trackno: Number,
  title: String
});

exports.Track = mongoose.model('Track', schema);

 */