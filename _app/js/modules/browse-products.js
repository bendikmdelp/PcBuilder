import {getProducts} from '../util/get-from-db.js'

const productList = await getProducts();

export function browseProducts() {
	let clickedCategoryBuilder = getClickedCategoryFromLocalStorage();
	let productsArray = null

	const categoryButtons = document.querySelectorAll('.category-select__component');
	const productPriceRange = document.querySelector('.product-container__product-sorter');
	const productPriceText = document.querySelector('.product-sorter__price')
	const productFilter = document.querySelector('.product-sorter__filters');
	const productListContainer = document.querySelector('.product-container__product-list');

	if(categoryButtons) {
		categoryButtons.forEach(element => {
			element.addEventListener('click', handleCategoryButtonClick)
		});
	}


	if(clickedCategoryBuilder) {
		displayChosenCategory(clickedCategoryBuilder);
	}

	function handleCategoryButtonClick(event) {
		const clickedCategory = event.currentTarget.dataset.category
		const sortedProducts = sortProducts(clickedCategory);
		clickedCategoryBuilder = clickedCategory;
		renderHTMLDOM(sortedProducts);
	}

	function displayChosenCategory(clickedCategory) {
		const sortedProducts = sortProducts(clickedCategory);
		renderHTMLDOM(sortedProducts);

	}

	function sortProducts(clicked) {
		const clickedCategory = clicked
		const sortedProduct = productList.filter(product => product.category.toLowerCase() === clickedCategory);
		return sortedProduct;
	}

	function renderPriceRange(products) {
		const priceRangeDom = createPriceRangeDOM(products);
		productPriceText.after(priceRangeDom);
	}

	function renderProductFilter(products) {
		const reducedArrayObjects = getClickedCategoryObjectKeys(products);
		createProductFilterDOM(reducedArrayObjects);
	}

	function createPriceRangeDOM(products) {
		const priceRangeContainer = document.createElement('div');

		const minPriceContainer = document.createElement('div');
		const minLabel = document.createElement('label');
		const minPrice = document.createElement('p');

		const maxPriceContainer = document.createElement('div');
		const maxLabel = document.createElement('label');
		const maxPrice = document.createElement('p');

		const rangeSliderContainer = document.createElement('div');
		const minPriceInput = document.createElement('input');
		const maxPriceInput = document.createElement('input');

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

		minLabel.innerText = 'Min';
		minPrice.innerText = getLowestPrice(products);

		maxLabel.innerText = 'Max';
		maxPrice.innerText = getHighestPrice(products);

		minPriceInput.type = 'range';

		minPriceInput.min = getLowestPrice(products);
		minPriceInput.max = getHighestPrice(products);
		minPriceInput.value = getLowestPrice(products);

		maxPriceInput.type = 'range';
		maxPriceInput.min = getLowestPrice(products);
		maxPriceInput.max = getHighestPrice(products);
		maxPriceInput.value = getHighestPrice(products);

		minPriceContainer.append(minLabel, minPrice);
		maxPriceContainer.append(maxLabel, maxPrice);

		rangeSliderContainer.append(minPriceInput, maxPriceInput);

		priceRangeContainer.append(minPriceContainer, maxPriceContainer, rangeSliderContainer);

		return priceRangeContainer;
	}

	function createProductFilterDOM(array) {
		const filterArray = array;
		const objectKeys = getObjectKeys(filterArray[0])
		let arrayOfProductKeys = objectKeys.reduce((acc,curr) => (acc[curr] = [], acc), {})
		for(const product of filterArray) {
			for(const objectKey of objectKeys){
				arrayOfProductKeys[objectKey].push( product[objectKey])
			}
		}

		const filterContainer = document.createElement('div');
		let current = null

		for(const key of objectKeys) {
			const filterCategory = document.createElement('h5');

			filterCategory.className = 'filters__category-name'
			filterCategory.innerText = key;
			filterContainer.append(filterCategory)
			for(const arrayItem of arrayOfProductKeys[key]) {

				if(current !== arrayItem){
					const inputKey = document.createElement('input');
					const inputLabel = document.createElement('label');

					inputKey.className = 'filters__input';
					inputKey.id = arrayItem
					inputLabel.className = 'filters__label';

					inputKey.type = 'checkbox';
					inputLabel.for = arrayItem;

					inputLabel.innerText = arrayItem;

					filterContainer.append(inputKey, inputLabel);
				}
				current = arrayItem
			}
			current = null
		}
		productFilter.append(filterContainer);
		
	}

	function getObjectKeys(object) {
		return Object.keys(object);
	}
	
	function getClickedCategoryObjectKeys(products) {
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
	
	function getLowestPrice(products) {
		const getLowest = Math.min(...products.map(item => item.price));
		return getLowest/100
	}
	
	function getHighestPrice(products) {
		const getHighest = Math.max(...products.map(item => item.price));
		return getHighest/100
	}

	function renderProductList(array, productListContainer) {
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
		navigateToBuilder();
	}
	
	function navigateToBuilder() {
		window.location.href = "/_app/builder";
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


	function renderHTMLDOM(products) {
		const productArray = products;
		renderPriceRange(productArray);
		renderProductFilter(productArray);
		renderProductList(productArray, productListContainer);
	}
}