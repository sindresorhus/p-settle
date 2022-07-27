import test from 'ava';
import delay from 'delay';
import inRange from 'in-range';
import timeSpan from 'time-span';
import pSettle from './index.js';

test('main', async t => {
	t.deepEqual(
		// eslint-disable-next-line prefer-promise-reject-errors
		await pSettle([delay(100, {value: 1}), 2, Promise.reject(3)]),
		[
			{
				status: 'fulfilled',
				value: 1,
				isFulfilled: true,
				isRejected: false,
			},
			{
				status: 'fulfilled',
				value: 2,
				isFulfilled: true,
				isRejected: false,
			},
			{
				status: 'rejected',
				reason: 3,
				isFulfilled: false,
				isRejected: true,
			},
		],
	);
});

test('concurrency option works', async t => {
	const fixture = [
		async () => {
			await delay(300);
			return 10;
		},
		async () => {
			await delay(200);
			return 20;
		},
		async () => {
			await delay(100);
			return 30;
		},
	];

	const end = timeSpan();

	t.deepEqual(
		await pSettle(fixture, {concurrency: 1}),
		[
			{
				status: 'fulfilled',
				value: 10,
				isFulfilled: true,
				isRejected: false,
			},
			{
				status: 'fulfilled',
				value: 20,
				isFulfilled: true,
				isRejected: false,
			},
			{
				status: 'fulfilled',
				value: 30,
				isFulfilled: true,
				isRejected: false,
			},
		],
	);

	t.true(inRange(end(), {start: 590, end: 760}));
});

test('handles empty iterable', async t => {
	t.deepEqual(await pSettle([]), []);
});

test('handles null and undefined', async t => {
	t.deepEqual(
		await pSettle([null, undefined]),
		[
			{
				status: 'fulfilled',
				value: null,
				isFulfilled: true,
				isRejected: false,
			},
			{
				status: 'fulfilled',
				value: undefined,
				isFulfilled: true,
				isRejected: false,
			},
		],
	);
});

test('compatible-with-PromiseSettledResult', async t => {
	const result = await pSettle([delay(100, {value: 1}), 2, Promise.reject(new Error('3'))], {concurrency: 2});
	t.truthy(result.every(item => item.status === 'fulfilled' || item.status === 'rejected'));
	t.truthy(result.every(item => (item.status === 'fulfilled' ? 'value' : 'reason') in item));
});
