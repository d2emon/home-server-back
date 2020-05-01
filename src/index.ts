import Debug from 'debug';
import app from './app';
import config from './config';

const debug = Debug(config.get('APP_NAME'));
const port = config.get('PORT');

app.set('port', port);
app.listen(
    app.get('port'),
    () => debug(`Express server listening on port ${port}`),
);
