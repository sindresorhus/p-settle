import {expectType} from 'tsd';
import pSettle = require('.');
import {PromiseResult} from '.';

expectType<Promise<Array<PromiseResult<number>>>>(pSettle([1, Promise.resolve(2)]));
expectType<Promise<Array<PromiseResult<number>>>>(
	pSettle([1, Promise.resolve(2)], {concurrency: 1})
);

expectType<Promise<[PromiseResult<number>, PromiseResult<string>]>>(pSettle([1, '2']));
expectType<Promise<[PromiseResult<string>, PromiseResult<number>]>>(pSettle([Promise.resolve('1'), Promise.resolve(2)]));
