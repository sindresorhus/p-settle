import {expectType} from 'tsd';
import pSettle = require('.');
import {PromiseResult} from '.';

expectType<Promise<Array<PromiseResult<number>>>>(pSettle([1, Promise.resolve(2)]));
expectType<Promise<Array<PromiseResult<number>>>>(
	pSettle([1, Promise.resolve(2)], {concurrency: 1})
);
