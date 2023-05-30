export default async function builder() {
	//constant to hold products added to builder
	const productsAddedToBuilder = getProductsFromLocalStorage();

	//Queryselectors
	const removeAllButton = document.querySelector('.main-container__remove-all-button')
	const chosenComponentContainer = document.querySelectorAll('.main-container__selection');

	//Eventlisteners
	if(removeAllButton) {
		removeAllButton.addEventListener('click', handleRemoveAllButtonClick);
	}

	handlePageLoad();

	//Handlers
	function handleAddComponentButtonClick(event) {
		saveClickedComponentToLocalStorage(event);
		navigateToBrowseProductsPage();
	}

	function handleRemoveAllButtonClick() {
		removeFromLocalStorage();
		renderHTML();
	}

	function handleRemoveComponentButtonClick(event) {
		removeClickedItem(event);
		const filteredArray = getProductsFromLocalStorage();
		renderHTML(filteredArray);
	}

	function handlePageLoad() {
			renderHTML(productsAddedToBuilder);
	}

	//removes specific
	function removeClickedItem(event) {
		const clickedItem = event.currentTarget.dataset.category;
		const filteredArray = productsAddedToBuilder.filter(item => {
			return item.category !== clickedItem;
		});

		localStorage.setItem('chosenProducts', JSON.stringify(filteredArray));
	}

	//Saves the clicked category to localstorage
	function saveClickedComponentToLocalStorage(event) {
		const clickedComponent = event.currentTarget.dataset.component;
		localStorage.setItem('clickedComponent', clickedComponent);
	}

	//redirect to browse products page
	function navigateToBrowseProductsPage() {
		window.location.href = "/browse-products";
	}

	//Returns products added to localstorage
	function getProductsFromLocalStorage() {
		if(localStorage.getItem('chosenProducts')) {
			return JSON.parse(localStorage.getItem('chosenProducts'));
		}else {
			return null;
		}
	}

	//renders products added to localstorage from browse products
	function renderAddedProducts(products) {
		
		for(let index = 0; index < chosenComponentContainer.length; index++) {
			chosenComponentContainer[index].innerText = ''
			if(products) {
				const product = products.find(item => {
					return item.category === chosenComponentContainer[index].dataset.component;
				})
				if(product) {
					if(chosenComponentContainer[index].dataset.component === product.category) {
	
						renderAddedProduct(index, product);
					}
				}
				else {
					const category = chosenComponentContainer[index].dataset.component;
					renderCategoryButton(category, index);
				}
				
			}else {	
				const category = chosenComponentContainer[index].dataset.component;
				renderCategoryButton(category, index);
			}
			
		}
	}

	//Renders add component button
	function renderCategoryButton(category, index) {
		createAddComponentButtonDom(category, chosenComponentContainer[index])
	}

	//Removes all products added to localstorage
	function removeFromLocalStorage() {
		localStorage.removeItem('chosenProducts')
	}

	//Creates DOM for add component buttons
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

	//renders products added to builder
	function renderAddedProduct(index, product) {

		createProductDOMElement(product, chosenComponentContainer[index]);
		
	}

	//creates DOM for added products
	function createProductDOMElement(product, element) {
		const chosenProductName = document.createElement('td');
		const chosenProductCategory = document.createElement('td');
		const chosenProductImageContainer = document.createElement('td');
		const chosenProductImage = document.createElement('img');
		const chosenProductPrice = document.createElement('td');
		const removeButtonContainer = document.createElement('td');
		const removeProductButton = document.createElement('button');

		chosenProductName.className = `product-selection__product-name`;
		chosenProductCategory.className = `product-selection__product-category`;
		chosenProductPrice.className = `product-selection__product-price`;
		chosenProductImage.className = `product-selection__product-image`;
		removeProductButton.className = `product-selection__remove-button`;

		chosenProductName.innerText = product.name;
		chosenProductCategory.innerText = product.category;
		chosenProductImage.src = product.images[0];
		chosenProductPrice.innerText = `${product.price/100}Kr`;
		removeProductButton.innerText = 'Remove';
		removeProductButton.dataset.category = product.category;

		removeProductButton.addEventListener('click', handleRemoveComponentButtonClick);

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

	//Function to add elements to HTML page
	function renderHTML(products) {
		renderAddedProducts(products);
	}

}