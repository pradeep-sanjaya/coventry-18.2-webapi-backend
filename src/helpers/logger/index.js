import winston from 'winston'

require('winston-daily-rotate-file');

export default function log() {
    let transport = new (winston.transports.DailyRotateFile)({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    });

    return  winston.createLogger({
        transports: [
            transport
        ]
    });

}
