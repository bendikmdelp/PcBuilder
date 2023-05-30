import {getProducts} from '../util/get-from-db.js';

const productList = await getProducts();

export function browseProducts() {
	//Variables to hold clicked category and products
	let clickedCategoryBuilder = getClickedCategoryFromLocalStorage();
	let productsArray = null;
	let renderedArray = null;

	//QuerySelectors
	const categoryButtons = document.querySelectorAll('.category-select__component');
	const productPriceText = document.querySelector('.product-sorter__price');
	const productFilter = document.querySelector('.product-sorter__filters');
	const productListContainer = document.querySelector('.product-container__product-list');

	//Eventlisteners
	if(categoryButtons) {
		categoryButtons.forEach(element => {
			element.addEventListener('click', handleCategoryButtonClick);
		});
	}

	if(clickedCategoryBuilder) {
		displayChosenCategory(clickedCategoryBuilder);
	}

	//handlers
	function handleCategoryButtonClick(event) {
		const clickedCategory = event.currentTarget.dataset.category;
		const sortedProducts = sortProducts(clickedCategory);
		clickedCategoryBuilder = clickedCategory;
		renderHTMLDOM(sortedProducts);
	}
	
	function handleProductAddButtonClick(event) {
		addClickedProductToBuilder(event);
		navigateToBuilder();
	}

	function displayChosenCategory(clickedCategory) {
		const sortedProducts = sortProducts(clickedCategory);
		renderHTMLDOM(sortedProducts);

	}

	function handleMaxPriceInputChange(event) {
		const maxPriceOutput = getMaxPriceOutputElement();
		const newMaxPrice = updateMaxpriceOutput(event, maxPriceOutput);
		updateProductList(newMaxPrice, 'max');
	}

	function handleMinPriceInputChange(event) {
		const minPriceOutput = getMinPriceOutputElement();
		const newMinPrice = updateMinPriceOutput(event, minPriceOutput);
		updateProductList(newMinPrice, 'min');
	}

	function handleFilterCheckboxChange(event) {
		const isChecked = checkIfChecked(event);
		updateProductListFilter(event, isChecked);
	}

	function handleTableHeadRowClick(event) {
		const tableBody = getTableBody();
		const rows = getTableRows(tableBody);
		sortProductList(event, rows, tableBody);
	}

	//returns product list table for sorting
	function getTableBody() {
		return document.querySelector('.product-list__product-list-container');
	}

	//returns the rows from input table
	function getTableRows(tableBody) {
		const rows = Array.from(tableBody.rows);
		return rows;
	}

	//Sorts product table on category click
	function sortProductList(event, rows, tableBody) {
		const cellIndex = event.currentTarget.cellIndex;
		rows.sort((tr1, tr2) => {
			const tr1Text = tr1.cells[cellIndex].textContent;
			const tr2Text = tr2.cells[cellIndex].textContent;
			return tr1Text.localeCompare(tr2Text);
		});
		tableBody.append(...rows);
	}

	//Returns the status of clicked checkbox
	function checkIfChecked(event) {
		return event.currentTarget.checked;
	}

	//Shows only the products selected in filter
	function updateProductListFilter(event, isChecked) {
		const clickedBox = event.currentTarget.name;
		const clickedSpec = event.currentTarget.id;
		if(isChecked) {
			const filteredArray = renderedArray.filter(item => item[clickedSpec] == clickedBox);
			renderProductList(filteredArray, productListContainer);
		}else {
			renderProductList(renderedArray, productListContainer);
		}

	}

	//Returns element which displays max price
	function getMaxPriceOutputElement() {
		return document.querySelector('.max-price-container__price');
	}

	//updates max price element and Returns a new maxprice from input slider
	function updateMaxpriceOutput(event, element) {
		const newMaxPrice = event.currentTarget.value;
		element.innerText = newMaxPrice;
		return newMaxPrice;
	}

	//returns element which displays min price
	function getMinPriceOutputElement() {
		return document.querySelector('.min-price-container__price')
	}

	//updates min price element and returns a new min price from input slider.
	function updateMinPriceOutput(event, element) {
		const newMinPrice = event.currentTarget.value;
		element.innerText = newMinPrice;
		return newMinPrice;
	}

	//render products based on selected price range
	function updateProductList(price, range) {
		const newPrice = price;
		let filteredArray = null;
		if(range === 'min') {
			filteredArray = renderedArray.filter(item => item.price/100 >= newPrice);
			renderProductList(filteredArray, productListContainer);
		} else if (range === 'max') {
			filteredArray = renderedArray.filter(item => item.price/100 <= newPrice);
			renderProductList(filteredArray, productListContainer);
		}
	}

	//function to create a new array with category matching clicked category, returns the new array
	function sortProducts(clicked) {
		const clickedCategory = clicked;
		const sortedProduct = productList.filter(product => product.category.toLowerCase() === clickedCategory);
		return sortedProduct;
	}

	//Function to render pricerange filter
	function renderPriceRange(products) {
		const priceRangeDom = createPriceRangeDOM(products);
		productPriceText.innerText = '';
		productPriceText.append(priceRangeDom);
	}

	//Function to render product filter
	function renderProductFilter(products) {
		const reducedArrayObjects = getClickedCategoryObjectKeys(products);
		productFilter.innerText = '';
		createProductFilterDOM(reducedArrayObjects);
	}

	//function to create DOM elements for price filter section based on object from database
	// returns the container with all the html elements
	function createPriceRangeDOM(products) {
		//Create Elements
		const priceRangeContainer = document.createElement('div');

		const minPriceContainer = document.createElement('div');
		const minLabel = document.createElement('label');
		const minPrice = document.createElement('output');

		const maxPriceContainer = document.createElement('div');
		const maxLabel = document.createElement('label');
		const maxPrice = document.createElement('output');

		const rangeSliderContainer = document.createElement('div');
		const minPriceInput = document.createElement('input');
		const maxPriceInput = document.createElement('input');

		//Set element value and classes
		priceRangeContainer.className = 'product-sorter__price-slider';

		minPriceContainer.className = 'price-slider__min-price-container';
		minLabel.className = 'min-price-container__label';
		minPrice.className = 'min-price-container__price';

		maxPriceContainer.className = 'price-slider__max-price-container';
		maxLabel.className = 'max-price-container__label';
		maxPrice.className = 'max-price-container__price';

		rangeSliderContainer.className = 'price-slider__range-container';
		minPriceInput.className = 'range-container__min-input';
		maxPriceInput.className = 'range-container__max-input';

		minLabel.innerText = 'Min ';
		minLabel.for = 'min'
		minPrice.innerText = getLowestPrice(products);

		maxLabel.innerText = 'Max ';
		maxLabel.for = 'max'
		maxPrice.innerText = getHighestPrice(products);

		minPriceInput.type = 'range';

		minPriceInput.min = getLowestPrice(products);
		minPriceInput.max = getHighestPrice(products)+1;
		minPriceInput.value = getLowestPrice(products);
		minPriceInput.name = 'min';

		maxPriceInput.type = 'range';
		maxPriceInput.min = getLowestPrice(products);
		maxPriceInput.max = getHighestPrice(products)+1;
		maxPriceInput.value = getHighestPrice(products)+1;
		maxPriceInput.name = 'max';

		minPriceInput.addEventListener('input', handleMinPriceInputChange);
		maxPriceInput.addEventListener('input', handleMaxPriceInputChange);

		minPriceContainer.append(minLabel, minPrice);
		maxPriceContainer.append(maxLabel, maxPrice);

		rangeSliderContainer.append(minPriceInput, maxPriceInput);

		priceRangeContainer.append(minPriceContainer, maxPriceContainer, rangeSliderContainer);

		return priceRangeContainer;
	}

	//Function to create DOM for filter section based on object fram database
	function createProductFilterDOM(array) {
		const filterArray = array;
		const objectKeys = getObjectKeys(filterArray[0]);
		let arrayOfProductKeys = objectKeys.reduce((acc,curr) => (acc[curr] = [], acc), {});
		for(const product of filterArray) {
			for(const objectKey of objectKeys){
				arrayOfProductKeys[objectKey].push( product[objectKey]);
			}
		}

		const filterContainer = document.createElement('div');
		let current = null;

		for(const key of objectKeys) {
			const filterCategory = document.createElement('h5');

			filterCategory.className = 'filters__category-name';
			filterCategory.innerText = key;
			filterContainer.append(filterCategory);
			for(const arrayItem of arrayOfProductKeys[key]) {

				if(current !== arrayItem){
					const inputKey = document.createElement('input');
					const inputLabel = document.createElement('label');

					inputKey.className = 'filters__input';
					inputKey.name = arrayItem;
					inputKey.id = key;
					inputLabel.className = 'filters__label';

					inputKey.type = 'checkbox';
					inputLabel.for = arrayItem;

					inputLabel.innerText = arrayItem;
					inputKey.addEventListener('change', handleFilterCheckboxChange);

					filterContainer.append(inputKey, inputLabel);
				}
				current = arrayItem;
			}
			current = null;
		}
		productFilter.append(filterContainer);
		
	}

	//Function which returns the keys from the entered object
	function getObjectKeys(object) {
		return Object.keys(object);
	}
	
	//function to get the needed keys from object
	//returns an array with the keys
	function getClickedCategoryObjectKeys(products) {
		let newArray = [];
	
	
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
			newArray.push(newObject);
		}
		return newArray;
	}
	
	//function to get the lowest price in array of objects
	//Returns the price
	function getLowestPrice(products) {
		const getLowest = Math.min(...products.map(item => item.price));
		return getLowest/100;
	}
	
	//function to get the higest price in array of objects
	//Returns the price
	function getHighestPrice(products) {
		const getHighest = Math.max(...products.map(item => item.price));
		return getHighest/100;
	}

	//function to render products corelating to clicked category
	function renderProductList(array, productListContainer) {
		productsArray = null;
		const productList = getClickedCategoryObjectKeys(array);
		productsArray = productList;
		const productKeys = getObjectKeys(productList[0]);
		const sorterDiv = createSorterDivDOM(productKeys);
		const productListDom = createProductListDOM(productList, array, productKeys);
	
		productListContainer.innerHTML = '';
		productListContainer.append(sorterDiv, productListDom);
	}
	
	//function which returns DOM ELement with elements and values from products
	//Returns the DOM element containing all the info elements
	function createProductListDOM(productArray, baseArray, productKeys) {
	
		const productList = productArray;
		const productContainer = document.createElement('tbody');
		productContainer.className = 'product-list__product-list-container';
	
	
		for(let index = 0; index < productList.length; index++) {
			const productObject = productList[index];
			const productListItem = document.createElement('tr');
			const productName = document.createElement('td');
			const productImageContainer = document.createElement('td')
			const productImage = document.createElement('img');
			const productPrice = document.createElement('td');
			const addButtonContainer = document.createElement('td');
			const productAddButton = document.createElement('button');
	
			productListItem.className = 'product-list-container__product-item';
			productName.className = 'product-card__product-name';
			productPrice.className = 'product-card__product-price';
			productImage.className = 'product-card__product-image';
			productAddButton.className = 'product-card__product-add-button';
	
			productAddButton.dataset.index = index;
	
			productName.innerText = baseArray[index].name;
			productImage.src = baseArray[index].images[0];
			productImage.alt = ''
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
			productContainer.append(productListItem);
		}
		return productContainer;
	}
	
	//Function which rededirects to builder page
	function navigateToBuilder() {
		window.location.href = "/_app/builder";
	}
	
	//Function which adds products to localstorage to be displayed on builder page
	function addClickedProductToBuilder(event) {
		const clickedElement = event.currentTarget.dataset.index;
		let product = productsArray[clickedElement];
		product.category = clickedCategoryBuilder;
		let chosenProductsArray = [];
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
	
	//Function which creates creates head DOM elements for products table
	//Returns a thead tag with tr and th elements
	function createSorterDivDOM(productKeys) {
		const sorterDiv = document.createElement('thead');
		const tableTr = document.createElement('tr');

		let thList = [];
	
		const nameButton = document.createElement('th');
		const priceButton = document.createElement('th');
		const emptyStart = document.createElement('th');
		const emptyEnd = document.createElement('th');
		thList.push(
			nameButton,
			priceButton,
		);
	
		sorterDiv.className = 'product-list__sorter-container';
		nameButton.className = 'sorter-container__name';
		priceButton.className = 'sorter-container__price';
	
		nameButton.innerText = 'Name';
		priceButton.innerText = 'price';
	
	
		tableTr.append(emptyStart, nameButton);
		if(window.innerWidth > 426) {
			for(const key of productKeys) {
				const sortKeyButton = document.createElement('th');
		
				thList.push(sortKeyButton);
				sortKeyButton.className = `sorter-container__${key}`;
		
				sortKeyButton.innerText = key;
		
				tableTr.append(sortKeyButton);
			}
		}
		tableTr.append(priceButton, emptyEnd);
		sorterDiv.append(tableTr);

		thList.forEach(element => {
			element.addEventListener('click', handleTableHeadRowClick);
		})

		return sorterDiv;
	}
	
	//function to create DOM elements for various object properties
	function createDOMElementFromObject(object, element, productKeys) {
	
		if(window.innerWidth > 426) {
			for(const property of productKeys) {
				const productProperty = document.createElement('td');
		
				productProperty.className = `product-card__product-${property}`;
		
				productProperty.innerText = object[property];
		
				element.append(productProperty);
			}
		}
		
	}
	
	//returns the component that was clicked on builder page
	function getClickedCategoryFromLocalStorage() {
		if(localStorage.getItem('clickedComponent')) {
			return localStorage.getItem('clickedComponent');
		}else {
			return null;
		}
	}
	
	//Checks if the clicked product has already been added to builder localstorage
	//returns true if item already in list
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

	//function to render various HTML Elements
	function renderHTMLDOM(products) {
		const productArray = products;
		renderedArray = productArray;
		renderPriceRange(productArray);
		renderProductFilter(productArray);
		renderProductList(productArray, productListContainer);
	}
}