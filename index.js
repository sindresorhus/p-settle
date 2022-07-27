import pReflect from 'p-reflect';
import pLimit from 'p-limit';

export default async function pSettle(array, options = {}) {
	const {concurrency = Number.POSITIVE_INFINITY} = options;
	const limit = pLimit(concurrency);

	return Promise.all(array.map(element => {
		if (element && typeof element.then === 'function') {
			return pReflect(element);
		}

		if (typeof element === 'function') {
			return pReflect(limit(() => element()));
		}

		return pReflect(Promise.resolve(element));
	}));
}
