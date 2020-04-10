const serverName = process.env.SERVER_NAME || 'home-server';
const port = process.env.PORT || 3000;

const debug = require('debug')(serverName);
const app = require('../src/app');

app.set('port', port);

const server = app.listen(app.get('port'), () => {
    debug('Express server listening on port ' + server.address().port);
});
