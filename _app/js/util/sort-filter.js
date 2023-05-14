export function getObjectKeys(object) {
	return Object.keys(object);
}

export function getClickedCategoryObjectKeys(products) {
	let newArray = []


	for(const product of products) {
		let newObject = {};
		for(const [key, value] of Object.entries(product)){
			if(value){
				if(key !== 'images' &&
				key !== 'manufacturer' &&
				key !== 'price' &&
				key !== 'category' &&
				key !== 'name'){
					Object.defineProperty(newObject, key, {
						enumerable: true,
						value: value,

					})
				};
				
			};
		};
		newArray.push(newObject)
	}
	return newArray;
}

export function getLowestPrice(products) {
	const getLowest = Math.min(...products.map(item => item.price));
	return getLowest/100
}

export function getHighestPrice(products) {
	const getHighest = Math.max(...products.map(item => item.price));
	return getHighest/100
}
