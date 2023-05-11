import { getClickedCategoryObjectKeys, getObjectKeys } from "./sort-filter.js";

export function renderProductList(array, productListContainer) {
	const productList = getClickedCategoryObjectKeys(array);
	const productKeys = getObjectKeys(productList[0]);
	const sorterDiv = createSorterDivDOM(productKeys);
	const productListDom = createProductListDOM(productList, array, productKeys);

	productListContainer.innerHTML = ''
	productListContainer.append(sorterDiv, productListDom);
}

function createProductListDOM(productArray, baseArray, productKeys) {
	const productList = productArray;
	const productContainer = document.createElement('ul');
	productContainer.className = 'product-list__product-list-container'


	for(let index = 0; index < productList.length; index++) {
		const productObject = productList[index]
		const productListItem = document.createElement('li');
		const productCard = document.createElement('a');
		const productName = document.createElement('p');
		const productImage = document.createElement('img');
		const productPrice = document.createElement('p');
		const productAddButton = document.createElement('button');

		productListItem.className = 'product-list-container__product-item';
		productCard.className = 'product-list-container__product-card';
		productName.className = 'product-card__product-name';
		productPrice.className = 'product-card__product-price';
		productImage.className = 'product-card__product-image';
		productAddButton.className = 'product-card__product-add-button';

		productName.innerText = baseArray[index].name;
		productImage.src = baseArray[index].images[0];
		productPrice.innerText = baseArray[index].price/100;
		productAddButton.innerText = 'ADD'

		productCard.append(productImage, productName);
		createDOMElementFromObject(productObject, productCard, productKeys[index]);
		productCard.append(productPrice, productAddButton);
		productListItem.append(productCard);
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

function createDOMElementFromObject(object, element, productKey) {

	for(const property of Object.entries(object)) {
		const productProperty = document.createElement('p');

		productProperty.className = `product-card__product-${productKey}`

		productProperty.innerText = property[1]

		element.append(productProperty);
	}
}