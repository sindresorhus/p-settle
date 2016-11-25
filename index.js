'use strict';
module.exports = iterable => Promise.all(iterable.map(el =>
	Promise.resolve(el).then(
		value => ({value}),
		reason => ({reason})
	)
));
