import express from 'express'
import path from 'path'

import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import cors from 'cors';
// import favicon from 'serve-favicon'
// import lessMiddleware from 'less-middleware'
import logger from 'morgan'

import config from './config'
import connectMongo from './db/mongo'
import defaultError, {
  error404,
} from './errorHandlers'
import log from './log'
import menu from './data/menu'
import owner from './owner'

import indexRouter from './routes'
import categoriesRouter from './routes/categories'
import fillRouter from './routes/fill'
import generatorsRouter from './routes/generators'

const app =express();

// Locals setup
const publicPath = path.join(__dirname, '..', 'public');
app.locals.siteName = owner.siteName;
app.locals.siteDescription = owner.siteDescription;
app.locals.companyName = owner.companyName;
app.locals.companyEmail = owner.companyEmail;
app.locals.companyAdress = owner.companyAddress;
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
app.use(logger('dev'));
app.use(express.static(publicPath));

// Routes setup
app.use('/', indexRouter);
app.use('/fill', fillRouter);
app.use('/categories', categoriesRouter);
app.use('/generator', generatorsRouter);

app.use(error404);
app.use(defaultError);

connectMongo(config.get('MONGO_URI'))
    .then(() => log.info(`MongoDb connected to ${config.get('MONGO_URI')}`));

export default app;
