import test from 'ava';
import delay from 'delay';
import m from './';

test('main', async t => {
	t.deepEqual(
		await m([delay(100).then(() => 1), 2, Promise.reject(3)]),
		[
			{value: 1},
			{value: 2},
			{reason: 3}
		]
	);
});

test('handles empty iterable', async t => {
	t.deepEqual(await m([]), []);
});
