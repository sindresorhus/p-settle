'use strict';
const pReflect = require('p-reflect');
const pLimit = require('p-limit');

module.exports = (iterable, options) => {
	options = Object.assign({
		concurrency: Infinity
	}, options);

	if (!(typeof options.concurrency === 'number' && options.concurrency >= 1)) {
		throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${options.concurrency}\` (${typeof options.concurrency})`);
	}

	const limit = pLimit(options.concurrency);

	return Promise.all(iterable.map(item => pReflect(limit(() => item))));
};
