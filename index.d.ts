import * as pReflect from 'p-reflect';

declare namespace pSettle {
	interface Options {
		/**
		Number of concurrently pending promises. Minimum: `1`.

		@default Infinity
		*/
		readonly concurrency?: number;
	}

	type PromiseResult<ValueType> = pReflect.PromiseResult<ValueType>;
	type PromiseFulfilledResult<ValueType> = pReflect.PromiseFulfilledResult<
		ValueType
	>;
	type PromiseRejectedResult = pReflect.PromiseRejectedResult;
}

declare const pSettle: {
	/**
	Settle promises concurrently and get their fulfillment value or rejection reason.

	@returns A promise that is fulfilled when all promises in `promises` are settled.

	@example
	```
	import {promisify} from 'util';
	import * as fs from 'fs';
	import pSettle = require('p-settle');

	const pReadFile = promisify(fs.readFile);

	(async () => {
		const files = [
			'a.txt',
			'b.txt' // Doesn't exist
		].map(fileName => pReadFile(fileName, 'utf8'));

		console.log(await pSettle(files));

		// [
		// 	{
		// 		isFulfilled: true,
		// 		isRejected: false,
		// 		value: '🦄'
		// 	},
		// 	{
		// 		isFulfilled: false,
		// 		isRejected: true,
		// 		reason: [Error: ENOENT: no such file or directory, open 'b.txt']
		// 	}
		// ]
	})();
	```
	*/
	<ValueType>(
		promises: ReadonlyArray<ValueType | PromiseLike<ValueType>>,
		options?: pSettle.Options
	): Promise<pSettle.PromiseResult<ValueType>[]>;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function pSettle<ValueType>(
	// 	promises: ReadonlyArray<ValueType | PromiseLike<ValueType>>,
	// 	options?: pSettle.Options
	// ): Promise<pSettle.PromiseResult<ValueType>[]>;
	// export = pSettle;
	default: typeof pSettle;
};

export = pSettle;
