import { getClickedCategoryObjectKeys, getObjectKeys } from "./sort-filter.js";
import { clickedCategoryBuilder } from "../modules/browse-products.js";

let productsArray = null

export function renderProductList(array, productListContainer) {
	productsArray = null;
	const productList = getClickedCategoryObjectKeys(array);
	productsArray = productList;
	const productKeys = getObjectKeys(productList[0]);
	const sorterDiv = createSorterDivDOM(productKeys);
	const productListDom = createProductListDOM(productList, array, productKeys);

	productListContainer.innerHTML = ''
	productListContainer.append(sorterDiv, productListDom);
}

function createProductListDOM(productArray, baseArray, productKeys) {

	const productList = productArray;
	const productContainer = document.createElement('tbody');
	productContainer.className = 'product-list__product-list-container'


	for(let index = 0; index < productList.length; index++) {
		const productObject = productList[index]
		const productListItem = document.createElement('tr');
		// const productCard = document.createElement('td');
		const productName = document.createElement('td');
		const productImageContainer = document.createElement('td')
		const productImage = document.createElement('img');
		const productPrice = document.createElement('td');
		const addButtonContainer = document.createElement('td');
		const productAddButton = document.createElement('button');

		productListItem.className = 'product-list-container__product-item';
		// productCard.className = 'product-list-container__product-card';
		productName.className = 'product-card__product-name';
		productPrice.className = 'product-card__product-price';
		productImage.className = 'product-card__product-image';
		productAddButton.className = 'product-card__product-add-button';

		productAddButton.dataset.index = index;

		productName.innerText = baseArray[index].name;
		productImage.src = baseArray[index].images[0];
		productPrice.innerText = baseArray[index].price/100;
		productAddButton.innerText = 'ADD';

		productArray[index].name = baseArray[index].name;
		productArray[index].images = baseArray[index].images;
		productArray[index].price = baseArray[index].price;
		
		productImageContainer.append(productImage);
		addButtonContainer.append(productAddButton);
		productListItem.append(productImageContainer, productName);
		createDOMElementFromObject(productObject, productListItem, productKeys);
		productListItem.append(productPrice, addButtonContainer);
		productAddButton.addEventListener('click', handleProductAddButtonClick);
		// productListItem.append(productCard);
		productContainer.append(productListItem);
	}
	return productContainer;
}

function handleProductAddButtonClick(event) {
	addClickedProductToBuilder(event);
}

function addClickedProductToBuilder(event) {
	const clickedElement = event.currentTarget.dataset.index;
	let product = productsArray[clickedElement];
	product.category = clickedCategoryBuilder;
	let chosenProductsArray = []
	if (localStorage.getItem('chosenProducts')) {
		chosenProductsArray = JSON.parse(localStorage.getItem('chosenProducts'));
		const categoryAlreadyInList = checkCategoryAlreadyInList(chosenProductsArray, product);
		if(!categoryAlreadyInList) {
			chosenProductsArray.push(product);
		}
		localStorage.setItem('chosenProducts', JSON.stringify(chosenProductsArray));
		localStorage.removeItem('clickedComponent');
	} else {
		chosenProductsArray.push(product);
		chosenProductsArray[clickedElement].category = clickedCategoryBuilder;
		localStorage.setItem('chosenProducts', JSON.stringify(chosenProductsArray));
		localStorage.removeItem('clickedComponent');
	}

}

function createSorterDivDOM(productKeys) {
	const sorterDiv = document.createElement('thead');
	const tableTr = document.createElement('tr')

	const nameButton = document.createElement('th');
	const priceButton = document.createElement('th');
	const emptyStart = document.createElement('th');
	const emptyEnd = document.createElement('th');

	sorterDiv.className = 'product-list__sorter-container';
	nameButton.className = 'sorter-container__name';
	priceButton.className = 'sorter-container__price';

	nameButton.innerText = 'Name';
	priceButton.innerText = 'price';


	tableTr.append(emptyStart, nameButton);
	for(const key of productKeys) {
		const sortKeyButton = document.createElement('th');

		sortKeyButton.className = `sorter-container__${key}`;

		sortKeyButton.innerText = key;

		tableTr.append(sortKeyButton);
	}
	tableTr.append(priceButton, emptyEnd);
	sorterDiv.append(tableTr);

	return sorterDiv
}

function createDOMElementFromObject(object, element, productKeys) {

	for(const property of productKeys) {
		const productProperty = document.createElement('td');

		productProperty.className = `product-card__product-${property}`

		productProperty.innerText = object[property]

		element.append(productProperty);
	}
}

function getClickedCategoryFromLocalStorage() {
	if(localStorage.getItem('clickedComponent')) {
		return localStorage.getItem('clickedComponent');
	}else {
		return null;
	}
}

function checkCategoryAlreadyInList(savedList, currentProduct) {
	if (savedList){
		let checkIfItemExist = savedList.some(item =>{
			return item.category === currentProduct.category;
		});
		return checkIfItemExist;
	} else{
		return false;
	}	
}