const log = require('winston');
const db = require('../db/phrases');

function User(name) {
  this.name = name;
}

User.prototype.hello = function(who) {
  log.debug(db.getPhrase('Hello') + ', ' + who.name);
};

module.exports = User;
