import test from 'ava';
import delay from 'delay';
import mock from 'mock-require';
import realPLimit from 'p-limit';
import m from './';

let limitCalls = [];
mock('p-limit', concurrency => {
	const limit = realPLimit(concurrency);
	const mockLimit = itemFunction => {
		limitCalls.push({
			concurrency,
			item: itemFunction()
		});
		return limit(itemFunction);
	};
	return mockLimit;
});

test('main', async t => {
	t.deepEqual(
		await m([delay(100).then(() => 1), 2, Promise.reject(3)]),
		[
			{
				isFulfilled: true,
				isRejected: false,
				value: 1
			},
			{
				isFulfilled: true,
				isRejected: false,
				value: 2
			},
			{
				isFulfilled: false,
				isRejected: true,
				reason: 3
			}
		]
	);
});

test('concurrency and item are passed to p-limit', async t => {
	limitCalls = [];

	const arraySize = 100;
	const concurrency = 4;
	const array = new Array(arraySize).fill(0).map((_, i) => Promise.resolve(i));
	const resolvedCalls = new Array(arraySize).fill(0).map(() => ({concurrency}));

	await m(array, {concurrency});

	await limitCalls.map(limitCall => limitCall.item).forEach((item, index) => {
		item.then(data => {
			resolvedCalls[index].item = data;
		});
	});

	await t.deepEqual(resolvedCalls, new Array(arraySize).fill(0).map((_, item) => ({
		concurrency,
		item
	})));
});

test('handles empty iterable', async t => {
	t.deepEqual(await m([]), []);
});
