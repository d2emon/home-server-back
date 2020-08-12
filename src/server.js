const log = require('winston');
const db = require('./db/phrases');

db.connect();

const User = require('./user');

function run() {
  const users = {
    user1: new User('User 1'),
    user2: new User('User 2'),
  }

  users.user1.hello(users.user2);

  log.debug(db.getPhrase('Run successful'));
}

if (module.parent) {
  exports.run = run;
} else {
  run();
}
