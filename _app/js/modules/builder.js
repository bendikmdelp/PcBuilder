import { getProducts } from "../util/get-from-db.js";

export default async function builder() {
	const productsAddedToBuilder = getProductsFromLocalStorage();

	const chosenComponentContainer = document.querySelectorAll('.main-container__selection');

	handlePageLoad();

	function handleAddComponentButtonClick(event) {
		saveClickedComponentToLocalStorage(event);
		navigateToBrowseProductsPage();
	}

	function handlePageLoad() {
			renderHTML(productsAddedToBuilder);
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
		for(let index = 1; index < chosenComponentContainer.length; index++) {
			const product = products.find(item => {
				return item.category === chosenComponentContainer[index].dataset.component;
			})
			if(product) {
				if(chosenComponentContainer[index].dataset.component === product.category) {

					renderAddedProduct(index, product);
				}
			} else {
				
				const category = chosenComponentContainer[index].dataset.component;
				renderCategoryButton(category, index);
			}
			
		}
	}

	function renderCategoryButton(category, index) {
		createAddComponentButtonDom(category, chosenComponentContainer[index])
	}

	function createAddComponentButtonDom(category, element) {
		const categoryName = document.createElement('td');
		const addComponentButtonContainer = document.createElement('td');
		const addComponentButton = document.createElement('button'); 

		categoryName.className = 'selection__category-name';
		addComponentButtonContainer.className = 'selection__button-container';
		addComponentButton.classList = 'selection__button';

		categoryName.innerText = category;
		addComponentButton.dataset.component = category;
		addComponentButton.innerText = 'Add Component';

		addComponentButton.addEventListener('click', handleAddComponentButtonClick)

		addComponentButtonContainer.append(addComponentButton);
		element.append(
			categoryName,
			addComponentButtonContainer
		);
	}

	function renderAddedProduct(index, product) {

		createProductDOMElement(product, chosenComponentContainer[index]);
		
	}

	function createProductDOMElement(product, element) {
		const chosenProductName = document.createElement('td');
		const chosenProductCategory = document.createElement('td');
		const chosenProductImageContainer = document.createElement('td');
		const chosenProductImage = document.createElement('img');
		const chosenProductPrice = document.createElement('td');
		const removeButtonContainer = document.createElement('td');
		const removeProductButton = document.createElement('button');

		chosenProductName.className = `${product.category}-selection__product-name`;
		chosenProductCategory.className = `${product.category}-selection__product-category`;
		chosenProductPrice.className = `${product.category}-selection__product-price`;
		chosenProductImage.className = `${product.category}-selection__product-image`;
		removeProductButton.className = `${product.category}-selection__remove-button`;

		chosenProductName.innerText = product.name;
		chosenProductCategory.innerText = product.category;
		chosenProductImage.src = product.images[0];
		chosenProductPrice.innerText = `${product.price/100}Kr`;
		removeProductButton.innerText = 'Remove';

		chosenProductImageContainer.append(chosenProductImage);
		removeButtonContainer.append(removeProductButton);
		element.append(
			chosenProductCategory,
			chosenProductImageContainer,
			chosenProductName,
			chosenProductPrice,
			removeButtonContainer
			);
	}

	function renderHTML(products) {
		renderAddedProducts(products);
	}

}