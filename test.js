import test from 'ava';
import delay from 'delay';
import m from '.';

test('main', async t => {
	t.deepEqual(
		// eslint-disable-next-line prefer-promise-reject-errors
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

test('handles empty iterable', async t => {
	t.deepEqual(await m([]), []);
});
