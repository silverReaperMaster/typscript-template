import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi, vitest } from 'vitest';

import { logger } from '../logger';

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
        it('winston String Console log output', () => {
            const date = new Date(2000, 1, 1, 14, 1, 1, 3);
            vi.setSystemTime(date);

            const spyStdout = vi.spyOn(global.console, 'warn');

            logger.warn('String to log out');
            expect(spyStdout).toBeCalledTimes(1);
            expect(spyStdout).toHaveBeenCalledWith('2000-02-01 14:01:01 -> String to log out');
            spyStdout.mockReset();
        });

        it('winston String + Object log output', () => {
            const date = new Date(2000, 1, 1, 14, 1, 1, 3);
            vi.setSystemTime(date);

            const spyStdout = vi.spyOn(global.console, 'warn');

            logger.warn('String to log out', { metadata: { output: 'some' } });
            expect(spyStdout).toBeCalledTimes(1);
            expect(spyStdout).toHaveBeenCalledWith('');
            spyStdout.mockReset();
            
        });
    });
});
