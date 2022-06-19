/* eslint-disable no-console */
import { createLogger, format } from 'winston';

import { LEVEL } from 'triple-beam';
import chalk from 'chalk';

import Transport from 'winston-transport';

class SimpleConsoleTransport extends Transport {
    private warning = chalk.hex('#FFA500');

    private getLogMethod(level: string) {
        if (level === 'info') {
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

        const { level, timestamp, service, message, stack, ...etc } = info;

        if (stack) {
            logMethod(
                `${timestamp} -> [${this.colorlevelStr(level, level)}]   message:[${this.colorlevelStr(message, level)}]`,
                this.colorlevelStr(stack, level)
            );
        } else {
            const etcObj = Object.entries(etc).reduce((prev, [keyName, value]) => {
                return { ...prev, [keyName]: value };
            }, {});

            logMethod(
                `${timestamp} -> [${this.colorlevelStr(level, level)}]  [${this.colorlevelStr(service, level)}]  message:[${this.colorlevelStr(
                    message,
                    level
                )}]${Object.keys(etcObj).length ? ' -> ' + this.colorlevelStr(JSON.stringify(etcObj), level) : ''}`
            );
        }
        if (callback) {
            callback();
        }
    }

    private colorlevelStr(str: string, level: string) {
        const upLevel = level.toLocaleUpperCase();
        let tempStr = str;
        switch (upLevel) {
            case 'INFO':
                tempStr = chalk.blue(str);
                break;
            case 'WARN':
                tempStr = this.warning(str);
                break;
            case 'ERROR':
                tempStr = chalk.red(str);
                break;
        }
        return tempStr;
    }
}

const logger = createLogger({
    level: 'debug',
    format: format.combine(format.errors({ stack: true }), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.splat()),

    defaultMeta: { service: 'service-name' },
    transports: [
        new SimpleConsoleTransport({
            level: 'debug',
            silent: false,
        }),
    ],
});

export default logger;