import {getProducts} from '../util/get-from-db.js'

const productList = await getProducts();

export default function browseProducts() {
	const categoryButtons = document.querySelectorAll('.category-select__component');
	const productPriceRange = document.querySelector('.product-container__product-sorter');
	const productPriceText = document.querySelector('.product-sorter__price')
	const productFilter = document.querySelector('.product-sorter__filters');
	const productListContainer = document.querySelector('.product-container__product-list');

	categoryButtons.forEach(element => {
		element.addEventListener('click', handleCategoryButtonClick)
	});

	function handleCategoryButtonClick(event) {
		const sortedProducts = sortProducts(event);
		renderHTMLDOM(sortedProducts);
	}

	function sortProducts(event) {
		const clickedCategory = event.currentTarget.dataset.category
		const sortedProduct = productList.filter(product => product.category.toLowerCase() === clickedCategory);
		return sortedProduct;
	}

	function renderPriceRange(products) {
		const priceRangeDom = createPriceRangeDOM(products);
		productPriceText.after(priceRangeDom);
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

	function getLowestPrice(products) {
		const getLowest = Math.min(...products.map(item => item.price));
		return getLowest/100
	}

	function getHighestPrice(products) {
		const getHighest = Math.max(...products.map(item => item.price));
		return getHighest/100
	}

	function renderProductFilter(products) {
		const reducedArrayObjects = getClickedCategoryObjectKeys(products);
		createProductFilterDOM(reducedArrayObjects);
	}

	function renderProductList(array) {
		const productList = getClickedCategoryObjectKeys(array);
		const productKeys = getObjectKeys(productList[0]);

		const sorterDiv = createSorterDivDOM(productKeys);

		const productListDom = createProductListDOM(productList);

		productListContainer.innerHTML = ''
		productListContainer.append(sorterDiv, productListDom);
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
							value: value,
							writable: true
						})
					};
					
				};
			};
			newArray.push(newObject)
		}
		return newArray;
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
		return Object.getOwnPropertyNames(object);
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

	function createProductListDOM(productArray) {
		const productList = productArray;

		const productContainer = document.createElement('div');
		productContainer.className = 'product-list__product-item'

		for(const product of productList) {
			//console.log(product)
			for(const productValue in product) {
				console.log('hei')
			}
		}
	}
	

	function renderHTMLDOM(products) {
		const productArray = products;
		renderPriceRange(productArray);
		renderProductFilter(productArray);
		renderProductList(productArray);
	}
}