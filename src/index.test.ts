import { expect, it } from 'vitest';
import * as index from './index';

console.log('FORCE_COLOR', process.env.FORCE_COLOR)

it('index', () => {
    expect(index.indexOutput).toBeTypeOf('number');
});
