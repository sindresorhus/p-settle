'use strict';
const pReflect = require('p-reflect');
const pLimit = require('p-limit');

module.exports = async (array, options = {}) => {
	const {concurrency = Infinity} = options;

	if (array.find(element => typeof element.then === 'function') && concurrency) {
		throw new Error('Cannot limit concurrency for promises')
	}

	const limit = pLimit(concurrency);

	return Promise.all(promises.map(item => pReflect(limit(() => item))));
};
