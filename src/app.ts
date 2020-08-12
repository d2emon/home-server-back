import express from 'express'
import path from 'path'

// import cors from 'cors';
// import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import lessMiddleware from 'less-middleware'

// import logger from 'morgan'

import config from './config'
import menu from './data/menu'
import connectMongo from './db/mongo'
import defaultError, {
  error404,
} from './errorHandlers'
import log from './log'

// Routes
import indexRouter from './routes'
import fillRouter from './routes/fill'
import generatorsRouter from './routes/generators'

const app =express();

// Locals setup
const publicPath = path.join(__dirname, '..', 'public');
app.locals.siteName = "Home Server";
app.locals.siteDescription = "Мой домашний сервер";
app.locals.companyName = "Dmitry Kutsenko";
app.locals.companyEmail = "d2emonium@gmail.com";
app.locals.companyAdress = [
    "30, ул. Бетховена",
    "г. Луганск, ЛНР"
];
app.locals.menu = menu;

log.debug(`Public path: ${publicPath}`);
log.debug(`Locals: ${JSON.stringify(app.locals)}`);
log.debug(`Menu: ${JSON.stringify(menu)}`);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
// app.use(cors());
// app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(cookieParser());
// app.use(lessMiddleware({ src: publicPath }));
app.use(express.static(publicPath));

// Routes setup
app.use('/', indexRouter);
app.use('/fill', fillRouter);
app.use('/generator', generatorsRouter);

app.use(error404);
app.use(defaultError);

connectMongo(config.get('MONGO_URI'))
    .then(() => log.info(`MongoDb connected to ${config.get('MONGO_URI')}`));

export default app;
