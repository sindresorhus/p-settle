# p-settle

> Settle promises concurrently and get their fulfillment value or rejection reason

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
].map(fileName => fs.readFile(fileName, 'utf8'));

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

#### options

Type: `object`

##### concurrency

Type: `number` (Integer)\
Default: `Infinity`\
Minimum: `1`

The number of concurrently pending promises.

**Note:** This only limits concurrency for elements that are async functions, not promises.

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
