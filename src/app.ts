import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import cors from 'cors';
import express from 'express'
// import lessMiddleware from 'less-middleware'
import mongoose from 'mongoose'
import logger from 'morgan'
import path from 'path'
// import favicon from 'serve-favicon'
import log from 'winston'
import config from './config'
import HttpException from './exceptions';
import menu from './menu'
import routes from './routes'
// import routesUsers from './routes/users'
// import routesGames from './routes/gamers'
// import routesRock from './routes/rock'
import routesGenerators from './routes/generators'

log.configure({
    transports: [
        new log.transports.Console({
            format: log.format.simple(),
            level: config.get('LOG_LEVEL'),
        }),
        /*
        new log.transports.File({
            filename: config.get('LOG_FILENAME'),
            format: log.format.json(),
            level: config.get('LOG_LEVEL'),
        }),
         */
    ],
})

const publicPath = path.join(__dirname, '..', 'public');
log.debug(`Public path: ${publicPath}`);

const app =express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(favicon());
app.use(logger('dev'));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(cookieParser());
// app.use(lessMiddleware({ src: publicPath }));
app.use(express.static(publicPath));

app.locals.siteName = "Home Server";
app.locals.siteDescription = "Мой домашний сервер";
app.locals.companyName = "Dmitry Kutsenko";
app.locals.companyEmail = "d2emonium@gmail.com";
app.locals.companyAdress = [
  "30, ул. Бетховена",
  "г. Луганск, ЛНР"
];
app.locals.menu = menu;

log.debug(`Locals: ${JSON.stringify(app.locals)}`);
log.debug(`Menu: ${JSON.stringify(menu)}`);

app.use('/', routes);
// app.use('/users', users);
// app.use('/games', games);
// app.use('/rock', rock);
app.use('/generator', routesGenerators);

/// catch 404 and forwarding to error handler
app.use((req: express.Request, res: any, next: express.NextFunction) => {
    res
        .status(404)
        .send('Not Found');
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: HttpException, req: express.Request, res: express.Response) => {
        res
            .status(err.status || 500)
            .render('error', {
                message: err.message,
                error: err
            });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: HttpException, req: express.Request, res: express.Response) => {
    res
        .status(err.status || 500)
        .render('error', {
            message: err.message,
            error: {}
        });
});

export default app;
