import Debug from 'debug';
import app from './app';

const serverName = process.env.SERVER_NAME || 'home-server';
const port = process.env.PORT || 3000;

const debug = Debug(serverName);

app.set('port', port);
app.listen(
    app.get('port'),
    () => debug(`Express server listening on port ${port}`),
);
