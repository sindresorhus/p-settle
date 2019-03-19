import {expectType} from 'tsd-check';
import pSettle, {PromiseResult} from '.';

expectType<Promise<PromiseResult<number>[]>>(pSettle([1, Promise.resolve(2)]));
expectType<Promise<PromiseResult<number>[]>>(
	pSettle([1, Promise.resolve(2)], {concurrency: 1})
);
