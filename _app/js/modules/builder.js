import { getProducts } from "../util/get-from-db.js";

export default async function builder() {
	const addComponentButtons = document.querySelectorAll('.main-container__add-selection-button');

	addComponentButtons.forEach(element => {
		element.addEventListener('click', handleAddComponentButtonClick);
	})


	function handleAddComponentButtonClick(event) {
		saveClickedComponentToLocalStorage(event);
		navigateToBrowseProductsPage();
	}

	function saveClickedComponentToLocalStorage(event) {
		const clickedComponent = event.currentTarget.dataset.component;
		localStorage.setItem('clickedComponent', clickedComponent);
	}

	function navigateToBrowseProductsPage() {
		window.location.href = "/_app/browse-products";
	}

}