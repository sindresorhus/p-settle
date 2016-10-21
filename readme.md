# p-settle [![Build Status](https://travis-ci.org/sindresorhus/p-settle.svg?branch=master)](https://travis-ci.org/sindresorhus/p-settle)

> Settle promises concurrently and get their fulfillment value or rejection reason


## Install

```
$ npm install --save p-settle
```


## Usage

```js
const pSettle = require('p-settle');
const promisify = require('pify');
const fs = promisify(require('fs'));

const files = [
	'a.txt',
	'b.txt' // doesn't exist
].map(x => fs.readFile(x, 'utf8'));

pSettle(files).then(result => {
	console.log(result);
	//=> [{value: 'unicorn'}, {reason: [Error: ENOENT: no such file or directory, open 'b.txt']}]
});
```


## API

### pSettle(input)

Returns a `Promise` that is fulfilled when all promises in `input` are settled. The fulfilled value is an array of objects with a `value` property if the promise fulfilled or `reason` property if the promise rejected.

#### input

Type: `Iterable<Promise|any>`


## Related

- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
