import {expectType} from 'tsd-check';
import pSettle, {SettledResult} from '.';

expectType<Promise<SettledResult<number>[]>>(pSettle([1, Promise.resolve(2)]));
expectType<Promise<SettledResult<number>[]>>(
	pSettle(new Set([1, Promise.resolve(2)]))
);
expectType<Promise<SettledResult<number>[]>>(
	pSettle([1, Promise.resolve(2)], {concurrency: 1})
);
