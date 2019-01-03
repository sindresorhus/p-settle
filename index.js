'use strict';
const pReflect = require('p-reflect');
const pLimit = require('p-limit');

module.exports = (iterable, mapper, options) => {
	if (typeof mapper !== 'function') {
		options = mapper;
		mapper = false;
	}
	options = Object.assign({
		concurrency: Infinity
	}, options);

	if (!(typeof options.concurrency === 'number' && options.concurrency >= 1)) {
		throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${options.concurrency}\` (${typeof options.concurrency})`);
	}
	if (iterable.find(item => typeof item.then === 'function') && options.concurrency) {
		throw new Error('Cannot limit concurrency for thenable objects')
	}

	const limit = pLimit(options.concurrency);

	return Promise.all(iterable.map(item => {
		if (typeof item.then === 'function') {
			return pReflect(item);
		} else if (mapper) {
			return pReflect(limit(() => mapper(item)));
		} else {
			return pReflect(limit(() => item()));
		}
	}));
};
