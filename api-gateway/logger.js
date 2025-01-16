import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.printf(
            ({ level, message, timestamp, stack }) =>
                `${timestamp} [${level.toUpperCase()}]: ${message || stack}`
        )
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: "logs/%DATE%-info.log",
            datePattern: "YYYY-MM-DD",
            level: "info",
            maxSize: "20m",
            maxFiles: "14d",
        }),
        new DailyRotateFile({
            filename: "logs/%DATE%-warn.log",
            datePattern: "YYYY-MM-DD",
            level: "warn",
            maxSize: "20m",
            maxFiles: "14d",
        }),
        new DailyRotateFile({
            filename: "logs/%DATE%-error.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxSize: "20m",
            maxFiles: "14d",
        }),
        new DailyRotateFile({
            filename: "logs/%DATE%-combined.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
    exceptionHandlers: [
        new DailyRotateFile({
            filename: "logs/%DATE%-exceptions.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});

export default logger;
