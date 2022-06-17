import { expect, it } from 'vitest';
import * as index from './index';

it('index', () => {
    expect(index.indexOutput).toBeTypeOf('number');
});
