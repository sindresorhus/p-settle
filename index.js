'use strict';
module.exports = input => new Promise(resolve => {
	if (input.length === 0) {
		resolve([]);
		return;
	}

	const ret = [];
	let i = 0;
	let doneCount = 0;

	const run = (el, i) => {
		Promise.resolve(el)
			.then(
				value => {
					ret[i] = {value};
				},
				reason => {
					ret[i] = {reason};
				}
			).then(() => {
				if (++doneCount === input.length) {
					resolve(ret);
				}
			});
	};

	for (const el of input) {
		run(el, i++);
	}
});
