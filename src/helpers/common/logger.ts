/* eslint-disable no-console */
import { createLogger, format } from 'winston';

import { LEVEL } from 'triple-beam';

import Transport from 'winston-transport';

// inspired by https://github.com/winstonjs/winston/issues/1544#issuecomment-499362387
export class SimpleConsoleTransport extends Transport {
    private getLogMethod(level: string) {
        if (level === 'debug') {
            return console.debug;
        } else if (level === 'info') {
            return console.info;
        } else if (level === 'critical' || level === 'error') {
            return console.error;
        } else if (level === 'warning' || level === 'warn') {
            return console.warn;
        } else {
            return console.log;
        }
    }

    override log(info: any, callback: any): void {
        setImmediate(() => this.emit('logged', info));
        const logMethod = this.getLogMethod(info[LEVEL]);
        console.log(info);
        const { level, timestamp, service, message, logStack, ...metadata } = info;

        if (logStack) {
            logMethod(`${timestamp}`, message, logStack);
        } else {
            logMethod(`${timestamp} [${service}] -> message: [${message}]}`);
            if (Object.keys(metadata).length > 0) logMethod(metadata);
        }
        if (callback) {
            callback();
        }
    }
}

export const logger = createLogger({
    level: 'debug',
    format: format.combine(format.errors({ stack: true }), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.splat()),

    defaultMeta: { service: 'service-name' },
    transports: [
        new SimpleConsoleTransport({
            level: 'debug',
            format: format.combine(
                format((info) => {
                    info.level = info.level.toUpperCase();
                    return info;
                })()
            ),
        }),
    ],
});

// export class MyStreamer {
//     write(text: any) {
//         // console.log('g',text);
//         logger.info(text);
//     }
// }
