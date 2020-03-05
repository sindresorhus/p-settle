import * as pReflect from 'p-reflect';

declare namespace pSettle {
	interface Options {
		/**
		Number of concurrently pending promises.

		Must be an integer from 1 and up or `Infinity`.

		@default Infinity
		*/
		readonly concurrency?: number;
	}

	type PromiseResult<ValueType> = pReflect.PromiseResult<ValueType>;
	type PromiseFulfilledResult<ValueType> = pReflect.PromiseFulfilledResult<
		ValueType
	>;
	type PromiseRejectedResult = pReflect.PromiseRejectedResult;
}

/**
Settle promises concurrently and get their fulfillment value or rejection reason.

@returns A promise that is fulfilled when all input `promises` are settled.

@example
```
import {promises as fs} from 'fs';
import pSettle = require('p-settle');

(async () => {
	const files = [
		'a.txt',
		'b.txt' // Doesn't exist
	].map(fileName => fs.readFile(fileName, 'utf8'));

	console.log(await pSettle(files));
	// [
	// 	{
	// 		isFulfilled: true,
	// 		isRejected: false,
	// 		value: '🦄'
	// 	},
	// 	{
	// 		isFulfilled: false,
	// 		isRejected: true,
	// 		reason: [Error: ENOENT: no such file or directory, open 'b.txt']
	// 	}
	// ]
})();
```
*/
declare function pSettle<ValueType>(
	promises: ReadonlyArray<ValueType | PromiseLike<ValueType>>,
	options?: pSettle.Options
): Promise<pSettle.PromiseResult<ValueType>[]>;

export = pSettle;
