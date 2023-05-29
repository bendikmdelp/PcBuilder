import { getCompletedBuilds, getProducts } from "../util/get-from-db.js";
import { createBuildFigureDOM } from "../util/create-html-dom.js";

const productList = await getProducts();
const buildsList = await getCompletedBuilds();

export default function frontPage() {

	//Queryselectors
	const mostPopularProductsList = document.querySelector('.popular-products__list');
	const completedBuildsContainer = document.querySelector('.main-container__completed-builds');

	//run function on page load
	if(mostPopularProductsList && completedBuildsContainer) {
		onPageLoad();
	}


	//Function to run on page load 
	function onPageLoad() {
		populateMostPopularProducts();
		populateCompletedBuilds();
	}

	//runs render for products
	function populateMostPopularProducts() {
		renderHTML('products');
	}

	//Runs render for builds
	function populateCompletedBuilds() {
		renderHTML('builds');
	}

	//gets 10 random product names and returns them
	function getRandomProductNames() {
		const products = productList;
		const randomIndex = getRandomIndexes(products)
		const productNames = getProductNames(randomIndex, products);
		return productNames;
	}

	//creates and array with 10 random numbers, returns the array
	function getRandomIndexes(products) {
		let array = []
		generateTenRandomNubers(products, array, 0);
		return array;
	}

	//generates 10 random unique numbers
	function generateTenRandomNubers(products, array, index) {
		if(array.length < 10) {
			for(index; array.length < 10; index++) {
				let number = getRandomNumber(products);
				if(array.includes(number)) {
					generateTenRandomNubers(products, array, index);
				} else {
					array.push(number);
				}
			}
		}

	}

	//returns a random number between 0 and array length
	function getRandomNumber(products) {
		return Math.floor(Math.random() * ((products.length-1) - 0 +1) + 0);
	}

	//Returns the product name corelating to the numbers in the random number array.
	function getProductNames(index, products) {
		let productNames = []
		for(const item of index) {
			productNames.push(products[item].name);
		}

		return productNames;
	}

	//render product names on frontpage
	function renderMostPopularProducts(randomProductNames) {
		const products = randomProductNames;
		for(const [index, product] of products.entries()) {
			const listItem = document.createElement('li');
			listItem.className = 'popular-products__list-item';
			listItem.innerText = `${index+1}: ${product}`;
			mostPopularProductsList.append(listItem);
		}
	}

	//render builds on frontpage
	function renderCompletedBuilds(builds) {
		const buildList = builds;
		for(const build of buildList) {
			const buildFigure = createBuildFigureDOM(build);
			completedBuildsContainer.append(buildFigure);
		}
	}

	//If products gets 10 random products and render those products
	//if builds renderes builds for database
	function renderHTML(defined) {
		if(defined === 'products') {
			const randomProductNames = getRandomProductNames();
			renderMostPopularProducts(randomProductNames);
		}else if (defined === 'builds') {
			renderCompletedBuilds(buildsList);
		}
	}
}