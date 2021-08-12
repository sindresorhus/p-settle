import {expectType} from 'tsd';
import pSettle, {PromiseResult} from './index.js';

expectType<Promise<Array<PromiseResult<number>>>>(pSettle([1, Promise.resolve(2)]));
expectType<Promise<Array<PromiseResult<number>>>>(
	pSettle([1, Promise.resolve(2)], {concurrency: 1}),
);
expectType<Promise<Array<PromiseResult<number>>>>(pSettle([async () => 2]));

expectType<Promise<[PromiseResult<number>, PromiseResult<string>]>>(pSettle([1, '2']));
expectType<Promise<[PromiseResult<string>, PromiseResult<number>]>>(pSettle([Promise.resolve('1'), Promise.resolve(2)]));
