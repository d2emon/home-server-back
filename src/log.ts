import log from 'winston';
import config from './config';

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

export default log;
