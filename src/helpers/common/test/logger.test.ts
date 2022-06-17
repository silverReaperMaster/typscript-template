import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

import logger from '../logger';

describe('logger', () => {
    beforeEach(() => {
        //
    });

    afterEach(() => {
        //
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });
    describe('console', () => {
        beforeAll(() => {
            //
        });

        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        afterAll(() => {
            vi.restoreAllMocks();
        });

        it ('logger',()=>{
            expect(logger).not.toBeNull();
        });

        it('winston String Console log output', () => {
            const date = new Date(2000, 1, 1, 14, 1, 1, 3);
            vi.setSystemTime(date);

            const spyStdout = vi.spyOn(global.console, 'warn');

            logger.warn('String to log out');
            expect(spyStdout).toBeCalledTimes(1);
            spyStdout.mockReset();
        });

        it('winston String + Object log output', () => {
            const date = new Date(2000, 1, 1, 14, 1, 1, 3);
            vi.setSystemTime(date);

            const spyStdout = vi.spyOn(global.console, 'warn');

            logger.warn('String to log out', { output: 'some' });
            expect(spyStdout).toBeCalledTimes(1);
            spyStdout.mockReset();
        });

        it('winston log error', () => {
            const date = new Date(2000, 1, 1, 14, 1, 1, 3);
            vi.setSystemTime(date);
 
            const spyStdout = vi.spyOn(global.console, 'error');
            try {
                throw new Error('Error Message');
            } catch (error) {
                logger.error(error);
            }

            expect(spyStdout).toBeCalledTimes(1);
            spyStdout.mockReset();
        });

        it.each([{ level: 'error' }, { level: 'warn' }, { level: 'warning' }, { level: 'info' }, { level: 'critical' }, { level: 'log' }])(
            'winston String + Object log output %j',
            ({ level }): void => {
                const date = new Date(2000, 1, 1, 14, 1, 1, 3);
                vi.setSystemTime(date);
                let spyStdout: SpyInstance;

                switch (level) {
                    case 'error':
                    case 'critical':
                        spyStdout = vi.spyOn(global.console, <const>'error');
                        logger.error('String to log out');
                        break;
                    case 'warning':
                    case 'warn':
                        spyStdout = vi.spyOn(global.console, <const>'warn');
                        logger.warn('String to log out');
                        break;
                    case 'info':
                        spyStdout = vi.spyOn(global.console, <const>'info');
                        logger.info('String to log out');
                        break;
                    default:
                        spyStdout = vi.spyOn(global.console, <const>'log');
                        logger.debug('String to S out');
                }

                expect(spyStdout).toBeCalledTimes(1);
                spyStdout.mockReset();
            }
        );
    });
});
