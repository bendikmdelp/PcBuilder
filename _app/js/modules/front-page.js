import { getCompletedBuilds, getProducts } from "../util/get-from-db.js";

const productList = await getProducts();
const buildsList = await getCompletedBuilds();

export default function frontPage() {
	console.log(buildsList)

	const mostPopularProductsList = document.querySelector('.popular-products__list');
	const completedBuildsContainer = document.querySelector('.main-container__completed-builds');

	if(mostPopularProductsList && completedBuildsContainer) {
		onPageLoad();
	}



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

	// function getRandomCompletedBuilds() {
	// 	const builds = buildsList;
	// 	const randomIndex = getRandomIndexes(builds)
	// 	const productNames = getBuildInfo(randomIndex, builds);
	// 	return productNames;
	// }

	function renderCompletedBuilds(builds) {
		const buildList = builds;
		console.log(buildList)
		for(const build of buildList) {
			const buildFigure = createBuildFigureDOM(build);
			completedBuildsContainer.append(buildFigure);
		}
	}

	function createBuildFigureDOM(build) {
		const figureElement = document.createElement('figure');
		const imageElement = document.createElement('img');
		const figCaptionElement = document.createElement('figcaption');

		imageElement.src = build.images[0];
		figCaptionElement.innerText = build.name;

		figureElement.append(
			imageElement,
			figCaptionElement
		);

		return figureElement;
	}



	function renderHTML(defined) {
		if(defined === 'products') {
			const randomProductNames = getRandomProductNames();
			renderMostPopularProducts(randomProductNames);
		}else if (defined === 'builds') {
			//const randomCompletedBuilds = getRandomCompletedBuilds();
			renderCompletedBuilds(buildsList);
		}
	}
}