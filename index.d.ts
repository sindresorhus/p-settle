import pReflect, {PromiseResult, PromiseFulfilledResult, PromiseRejectedResult} from 'p-reflect';

type ReturnValue<T> = T extends (...args: any) => any ? ReturnType<T> : T;

// TODO: Use the native version in the next major version of this package.
type Awaited<T> = T extends undefined ? T : T extends PromiseLike<infer U> ? U : T;

export interface Options {
	/**
	The number of concurrently pending promises.

	Must be an integer from 1 and up or `Infinity`.

	Note: This only limits concurrency for elements that are async functions, not promises.

	@default Infinity
	*/
	readonly concurrency?: number;
}

/**
Settle promises concurrently and get their fulfillment value or rejection reason.

@param array - Can contain a mix of any value, promise, and async function. Promises are awaited. Async functions are executed and awaited. The `concurrency` option only works for elements that are async functions.
@returns A promise that is fulfilled when all promises from the `array` argument are settled.

@example
```
import fs from 'node:fs/promises';
import pSettle from 'p-settle';

const files = [
	'a.txt',
	'b.txt' // Doesn't exist
].map(fileName => fs.readFile(fileName, 'utf8'));

console.log(await pSettle(files));
// [
// 	{
// 		status: 'fulfilled',
// 		value: '🦄',
// 		isFulfilled: true,
// 		isRejected: false,
// 	},
// 	{
// 		status: 'rejected',
// 		reason: [Error: ENOENT: no such file or directory, open 'b.txt'],
// 		isFulfilled: false,
// 		isRejected: true,
// 	}
// ]
```
*/
export default function pSettle<ValueType extends readonly any[]>(
	array: ValueType,
	options?: Options
): Promise<{-readonly [P in keyof ValueType]: PromiseResult<Awaited<ReturnValue<ValueType[P]>>>}>;

export {PromiseResult, isFulfilled, isRejected} from 'p-reflect';
