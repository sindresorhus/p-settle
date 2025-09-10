import pReflect from 'p-reflect';
import pLimit from 'p-limit';

export default async function pSettle(array, options = {}) {
	const {concurrency = Number.POSITIVE_INFINITY, mapper} = options;
	
	if (mapper && typeof mapper !== 'function') {
		throw new TypeError('Mapper must be a function');
	}

	const limit = pLimit(concurrency);

	const processElement = (element, index) => {
		if (mapper) {
			return pReflect(limit(() => mapper(element, index)));
		}

		if (element && typeof element.then === 'function') {
			return pReflect(element);
		}

		if (typeof element === 'function') {
			return pReflect(limit(() => element()));
		}

		return pReflect(Promise.resolve(element));
	};

	return Promise.all(array.map(processElement));
}

export {isFulfilled, isRejected} from 'p-reflect';
