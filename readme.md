# p-settle [![Build Status](https://travis-ci.org/sindresorhus/p-settle.svg?branch=master)](https://travis-ci.org/sindresorhus/p-settle)

> Settle promises concurrently and get their fulfillment value or rejection reason

## Install

```
$ npm install p-settle
```

## Usage

```js
const {promises: fs} = require('fs');
const pSettle = require('p-settle');

(async () => {
	const files = [
		'a.txt',
		'b.txt' // Doesn't exist
	].map(fileName => fs.readFile(fileName, 'utf8'));

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
	*/
})();
```

## API

### pSettle(promises, options?)

Returns a `Promise<Object[]>` that is fulfilled when all promises in `promises` are settled.

The objects in the array have the following properties:

- `isFulfilled`
- `isRejected`
- `value` or `reason` *(Depending on whether the promise fulfilled or rejected)*

#### promises

Type: `Promise<unknown>[]`

#### options

Type: `object`

##### concurrency

Type: `number` (Integer)\
Default: `Infinity`\
Minimum: `1`

Number of concurrently pending promises.

## Related

- [p-reflect](https://github.com/sindresorhus/p-reflect) - Make a promise always fulfill with its actual fulfillment value or rejection reason
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)
