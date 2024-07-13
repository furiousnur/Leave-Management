import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}] [leaveBalance]: ${message}`;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.File({ filename: 'leaveBalance.log', level: 'info' }) // Example: dedicated log file for leaveBalance
    ]
});

@Injectable()
export class LoggerService {
    error(message: string) {
        logger.error(message);
    }

    warn(message: string) {
        logger.warn(message);
    }

    log(message: string) {
        logger.info(message);
    }
}
