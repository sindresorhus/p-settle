export interface Options {
	/**
	 * Number of concurrently pending promises. Minimum: `1`.
	 *
	 * @default Infinity
	 */
	readonly concurrency?: number;
}

// TODO: replace with types from p-reflect
export interface PromiseFulfilledResult<ValueType> {
	isFulfilled: true;
	isRejected: false;
	value: ValueType;
}

// TODO: replace with types from p-reflect
export interface PromiseRejectedResult {
	isFulfilled: false;
	isRejected: true;
	reason: unknown;
}

// TODO: replace with types from p-reflect
export type SettledResult<ValueType> =
	| PromiseFulfilledResult<ValueType>
	| PromiseRejectedResult;

/**
 * Settle promises concurrently and get their fulfillment value or rejection reason.
 *
 * @returns Is fulfilled when all promises in `input` are settled.
 */
export default function pSettle<ValueType>(
	input: Iterable<ValueType | PromiseLike<ValueType>>,
	options?: Options
): Promise<SettledResult<ValueType>[]>;
