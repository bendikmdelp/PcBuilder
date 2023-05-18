import { getProducts } from "../util/get-from-db.js";

export default async function builder() {
	const productsAddedToBuilder = getProductsFromLocalStorage();

	const addComponentButtons = document.querySelectorAll('.main-container__add-selection-button');

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
			renderHTML();
		} else {
			//console.log('nothing added')
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
		if(localStorage.getItem('products')) {
			return localStorage.getItem('products');
		}else {
			return null;
		}
	}

}