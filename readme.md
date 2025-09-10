# p-settle

> Settle promises concurrently and get their fulfillment value or rejection reason with optional limited concurrency

## Install

```sh
npm install p-settle
```

## Usage

```js
import fs from 'node:fs/promises';
import pSettle from 'p-settle';

const files = [
	'a.txt',
	'b.txt' // Doesn't exist
].map(filename => fs.readFile(filename, 'utf8'));

console.log(await pSettle(files));
/*
[
	{
		status: 'fulfilled',
		value: '🦄',
		isFulfilled: true,
		isRejected: false,
	},
	{
		status: 'rejected',
		reason: [Error: ENOENT: no such file or directory, open 'b.txt'],
		isFulfilled: false,
		isRejected: true,
	}
]
*/
```

With a `mapper` function:

```js
import fs from 'node:fs/promises';
import pSettle from 'p-settle';

const files = ['a.txt', 'b.txt']; // Filenames

console.log(await pSettle(files, {
	mapper: filename => fs.readFile(filename, 'utf8'),
	concurrency: 2
}));
/*
[
	{
		status: 'fulfilled',
		value: '🦄',
		isFulfilled: true,
		isRejected: false,
	},
	{
		status: 'rejected',
		reason: [Error: ENOENT: no such file or directory, open 'b.txt'],
		isFulfilled: false,
		isRejected: true,
	}
]
*/
```

## API

### pSettle(array, options?)

Returns a `Promise<object[]>` that is fulfilled when all promises from the `array` argument are settled.

The objects in the array have the following properties:

- `status` *(`'fulfilled'` or `'rejected'`, depending on how the promise resolved)*
- `value` or `reason` *(Depending on whether the promise fulfilled or rejected)*
- `isFulfilled`
- `isRejected`

#### array

Type: `Array<ValueType | PromiseLike<ValueType> | ((...args: any[]) => PromiseLike<ValueType>)>`

The array can contain a mix of any value, promise, and async function. Promises are awaited. Async functions are executed and awaited. The `concurrency` option only works for elements that are async functions.

When using the `mapper` option, `array` can be of any type since the `mapper` function will transform each element.

#### options

Type: `object`

##### concurrency

Type: `number` (Integer)\
Default: `Infinity`\
Minimum: `1`

The number of concurrently pending promises.

**Note:** This only limits concurrency for elements that are async functions, not promises. When using the `mapper` option, concurrency applies to the mapped functions.

##### mapper

Type: `Function`

Function which is called for every item in `array`. Expected to return a promise or value.

The mapper function receives two arguments:
- `element` - The current element being processed
- `index` - The index of the element in the source array

When provided, the `mapper` function transforms each element in the array before settling it. This allows you to work with arrays of any type of data.

### isFulfilled(object)

This is a type guard for TypeScript users.

This is useful since `await pSettle(promiseArray)` always returns a `PromiseResult[]`. This function can be used to determine whether `PromiseResult` is `PromiseFulfilledResult` or `PromiseRejectedResult`.

### isRejected(object)

This is a type guard for TypeScript users.

This is useful since `await pSettle(promiseArray)` always returns a `PromiseResult[]`. This function can be used to determine whether `PromiseResult` is `PromiseRejectedResult` or `PromiseFulfilledResult`.

## Related

- [p-reflect](https://github.com/sindresorhus/p-reflect) - Make a promise always fulfill with its actual fulfillment value or rejection reason
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)
