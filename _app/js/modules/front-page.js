import { getProducts } from "../util/get-from-db.js";

const productList = await getProducts();

export default function frontPage() {

	const mostPopularProductsList = document.querySelector('.popular-products__list');
	const completedBuildsContainer = document.querySelector('.main-container__completed-builds');

	onPageLoad();

	function onPageLoad() {
		populateMostPopularProducts();
		populateCompletedBuilds();
	}

	function populateMostPopularProducts() {
		renderHTML('products');
	}

	function populateCompletedBuilds() {
		renderHTML('builds');
	}

	function getRandomProductNames() {
		const products = productList;
		const randomIndex = getRandomIndexes(products)
		const productNames = getProductNames(randomIndex, products);
		return productNames;
	}

	function getRandomIndexes(products) {
		let array = []
		generateTenRandomNubers(products, array, 0);
		return array;
	}

	function generateTenRandomNubers(products, array, index) {
		for(index; array.length < 10; index++) {
			let number = getRandomNumber(products);
			if(array.includes(number)) {
				generateTenRandomNubers(products, array, index);
			} else {
				array.push(number);
			}
		}
	}

	function getRandomNumber(products) {
		return Math.floor(Math.random() * ((products.length-1) - 0 +1) + 0);
	}

	function getProductNames(index, products) {
		let productNames = []
		for(const item of index) {
			productNames.push(products[item].name);
		}

		return productNames;
	}

	function renderMostPopularProducts(randomProductNames) {
		const products = randomProductNames;
		for(const [index, product] of products.entries()) {
			const listItem = document.createElement('li');
			listItem.className = 'popular-products__list-item';
			listItem.innerText = `${index+1}: ${product}`;
			mostPopularProductsList.append(listItem);
		}
	}

	function renderHTML(defined) {
		if(defined === 'products') {
			const randomProductNames = getRandomProductNames();
			renderMostPopularProducts(randomProductNames);
		}
		// } else if (defined === 'builds') {
		// 	const randomCompletedBuilds = getRandomCompletedBuilds();
		// 	renderCompletedBuilds(randomCompletedBuilds);
		// }
	}
}