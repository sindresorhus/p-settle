'use strict';
const pReflect = require('p-reflect');
const pLimit = require('p-limit');

const pSettle = async (promises, options) => {
	const {concurrency} = {
		concurrency: Infinity,
		...options
	};

	if (!(typeof concurrency === 'number' && concurrency >= 1)) {
		throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${concurrency}\` (${typeof concurrency})`);
	}

	const limit = pLimit(concurrency);

	return Promise.all(promises.map(item => pReflect(limit(() => item))));
};

module.exports = pSettle;
// TODO: Remove this for the next major release
module.exports.default = pSettle;
