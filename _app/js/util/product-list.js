import { getClickedCategoryObjectKeys, getObjectKeys } from "./sort-filter.js";

export function renderProductList(array, productListContainer) {
	const productList = getClickedCategoryObjectKeys(array);
	const productKeys = getObjectKeys(productList[0]);
	const sorterDiv = createSorterDivDOM(productKeys);
	const productListDom = createProductListDOM(productList, productKeys);

	productListContainer.innerHTML = ''
	productListContainer.append(sorterDiv, productListDom);
}

function createProductListDOM(productArray, productKeys) {
	const productList = productArray;
	const productContainer = document.createElement('ul');
	productContainer.className = 'product-list__product-item'


	for(let index = 0; index < productList.length; index++) {
		const productObject = productList[index]
		const productListItem = document.createElement('li');

		createDOMElementFromObject(productObject, productListItem);

		productContainer.append(productListItem);
	}

	return productContainer;
}

function createSorterDivDOM(productKeys) {
	const sorterDiv = document.createElement('div');

	const nameButton = document.createElement('button');
	const priceButton = document.createElement('button');

	sorterDiv.className = 'product-list__sorter-container';
	nameButton.className = 'sorter-container__name';
	priceButton.className = 'sorter-container__price';

	nameButton.innerText = 'Name';
	priceButton.innerText = 'price';

	sorterDiv.append(nameButton);
	for(const key of productKeys) {
		const sortKeyButton = document.createElement('button');

		sortKeyButton.className = `sorter-container__${key}`;

		sortKeyButton.innerText = key;

		sorterDiv.append(sortKeyButton);
	}
	sorterDiv.append(priceButton);

	return sorterDiv
}

function createDOMElementFromObject(object, element) {
	console.log(object)

	for(const property of Object.entries(object)) {
		const productProperty = document.createElement('p');
		console.log(property[1])

		productProperty.innerText = property[1]

		element.append(productProperty);
	}
}