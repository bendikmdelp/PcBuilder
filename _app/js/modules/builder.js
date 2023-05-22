import { getProducts } from "../util/get-from-db.js";

export default async function builder() {
	const productsAddedToBuilder = getProductsFromLocalStorage();

	const addComponentButtons = document.querySelectorAll('.main-container__add-selection-button');
	const chosenComponentContainer = document.querySelectorAll('.main-container__selection');

	addComponentButtons.forEach(element => {
		element.addEventListener('click', handleAddComponentButtonClick);
	});
	handlePageLoad();

	function handleAddComponentButtonClick(event) {
		saveClickedComponentToLocalStorage(event);
		navigateToBrowseProductsPage();
	}

	function handlePageLoad() {
		if(productsAddedToBuilder) {
			renderHTML(productsAddedToBuilder);
		} else {
			console.log('nothing added')
		}
	}

	function saveClickedComponentToLocalStorage(event) {
		const clickedComponent = event.currentTarget.dataset.component;
		localStorage.setItem('clickedComponent', clickedComponent);
	}

	function navigateToBrowseProductsPage() {
		window.location.href = "/_app/browse-products";
	}

	function getProductsFromLocalStorage() {
		if(localStorage.getItem('chosenProducts')) {
			return JSON.parse(localStorage.getItem('chosenProducts'));
		}else {
			return null;
		}
	}

	function renderAddedProducts(products) {
		console.log(products)
		for(let index = 1; index < chosenComponentContainer.length; index++) {
			const product = products.find(item => {
				return item.category === chosenComponentContainer[index].dataset.component;
			})
			if(product) {
				if(chosenComponentContainer[index].dataset.component === product.category) {

					renderAddedProduct(index, product);
				}
			}
			
		}
	}

	function renderAddedProduct(index, product) {

		chosenComponentContainer[index].innerText = '';
		const productElement = createProductDOMElement(product);
		chosenComponentContainer[index].append(productElement);
		
	}

	function createProductDOMElement(product) {
		const chosenProductContainer = document.createElement('div');
		const chosenProductName = document.createElement('p');
		const chosenProductCategory = document.createElement('p');
		const chosenProductImage = document.createElement('img');
		const chosenProductPrice = document.createElement('p');
		const removeProductButton = document.createElement('button');

		chosenProductContainer.className = `main-container__${product.category}-selection`;
		chosenProductName.className = `${product.category}-selection__product-name`;
		chosenProductCategory.className = `${product.category}-selection__product-category`;
		chosenProductPrice.className = `${product.category}-selection__product-price`;
		chosenProductImage.className = `${product.category}-selection__product-image`;
		removeProductButton.className = `${product.category}-selection__remove-button`;

		chosenProductName.innerText = product.name;
		chosenProductCategory.innerText = product.category;
		chosenProductImage.src = product.images[0];
		chosenProductPrice.innerText = product.price;
		removeProductButton.innerText = 'Remove';

		chosenProductContainer.append(
			chosenProductCategory,
			chosenProductImage,
			chosenProductName,
			chosenProductPrice,
			chosenProductImage,
			removeProductButton
			);
		return chosenProductContainer;
	}

	function renderHTML(products) {
		renderAddedProducts(products);
	}

}