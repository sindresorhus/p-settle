import {PromiseResult} from 'p-reflect';

export interface Options {
	/**
	Number of concurrently pending promises. Minimum: `1`.

	@default Infinity
	*/
	readonly concurrency?: number;
}

/**
Settle promises concurrently and get their fulfillment value or rejection reason.

@returns Is fulfilled when all promises in `promises` are settled.

@example
```
import {promisify} from 'util';
import * as fs from 'fs';
import pSettle from 'p-settle';

const pReadFile = promisify(fs.readFile);

(async () => {
	const files = [
		'a.txt',
		'b.txt' // Doesn't exist
	].map(fileName => pReadFile(fileName, 'utf8'));

	console.log(await pSettle(files));
	/*
	[
		{
			isFulfilled: true,
			isRejected: false,
			value: '🦄'
		},
		{
			isFulfilled: false,
			isRejected: true,
			reason: [Error: ENOENT: no such file or directory, open 'b.txt']
		}
	]
	*\/
})();
```
*/
export default function pSettle<ValueType>(
	promises: ReadonlyArray<ValueType | PromiseLike<ValueType>>,
	options?: Options
): Promise<PromiseResult<ValueType>[]>;

export {
	PromiseResult,
	PromiseFulfilledResult,
	PromiseRejectedResult
} from 'p-reflect';
