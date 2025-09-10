import pReflect, {PromiseResult, PromiseFulfilledResult, PromiseRejectedResult} from 'p-reflect';

type ReturnValue<T> = T extends (...args: any) => any ? ReturnType<T> : T;

// TODO: Use the native version in the next major version of this package.
type Awaited<T> = T extends undefined ? T : T extends PromiseLike<infer U> ? U : T;

export interface Options<T = unknown, R = unknown> {
	/**
	The number of concurrently pending promises.

	Must be an integer from 1 and up or `Infinity`.

	Note: This only limits concurrency for elements that are async functions, not promises. When using the `mapper` option, concurrency applies to the mapped functions.

	@default Infinity
	*/
	readonly concurrency?: number;

	/**
	Function which is called for every item in `array`. Expected to return a promise or value.

	The mapper function receives two arguments:
	- `element` - The current element being processed
	- `index` - The index of the element in the source array

	When provided, the `mapper` function transforms each element in the array before settling it. This allows you to work with arrays of any type of data.
	*/
	readonly mapper?: (element: T, index: number) => R | PromiseLike<R>;
}

/**
Settle promises concurrently and get their fulfillment value or rejection reason.

@param array - Can contain a mix of any value, promise, and async function. Promises are awaited. Async functions are executed and awaited. When using the `mapper` option, `array` can be of any type.
@returns A promise that is fulfilled when all promises from the `array` argument are settled.

@example
```
import fs from 'node:fs/promises';
import pSettle from 'p-settle';

const files = [
	'a.txt',
	'b.txt' // Doesn't exist
].map(filename => fs.readFile(filename, 'utf8'));

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

@example
```
import fs from 'node:fs/promises';
import pSettle from 'p-settle';

const files = ['a.txt', 'b.txt']; // Filenames

console.log(await pSettle(files, {
	mapper: filename => fs.readFile(filename, 'utf8'),
	concurrency: 2
}));
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

// Overload without mapper - preserves existing behavior
export default function pSettle<ValueType extends readonly any[]>(
	array: ValueType,
	options?: Options
): Promise<{-readonly [P in keyof ValueType]: PromiseResult<Awaited<ReturnValue<ValueType[P]>>>}>;

// Overload with mapper - new functionality
export default function pSettle<T, R>(
	array: readonly T[],
	options: Options<T, R> & {mapper: (element: T, index: number) => R | PromiseLike<R>}
): Promise<PromiseResult<Awaited<R>>[]>;

export {PromiseResult, isFulfilled, isRejected} from 'p-reflect';
