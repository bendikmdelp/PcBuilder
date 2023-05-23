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

	function renderHTML(defined) {
		if(defined === 'products') {
			const randomProductNames = getRandomProductNames();
			renderMostPopularProducts(randomProductNames);
		} else if (defined === 'builds') {
			const randomCompletedBuilds = getRandomCompletedBuilds();
			renderCompletedBuilds(randomCompletedBuilds);
		}
	}
}