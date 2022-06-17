import { expect, it } from 'vitest';
import * as index from './index';

// eslint-disable-next-line @typescript-eslint/no-empty-function
it('index', () => {
    expect(index.indexOutput).toBeTypeOf('number');
});
