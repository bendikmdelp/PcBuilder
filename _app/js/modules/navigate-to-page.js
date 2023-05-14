export default function navigateToPage() {
	const homeLogo = document.querySelector('.header__logo');
	const builderButton = document.querySelector('.button-container__builder');
	const browseProductsButton = document.querySelector('.button-container__completed-builds');
	const completedBuildsButton = document.querySelector('.button-container__browse-products');

	homeLogo.addEventListener('click', handleNavigateToHome);
	builderButton.addEventListener('click', handleNavigiationClick);
	browseProductsButton.addEventListener('click', handleNavigiationClick);
	completedBuildsButton.addEventListener('click', handleNavigiationClick);

	function handleNavigateToHome() {
		redirectToHome();
	}

	function handleNavigiationClick(event) {
		redirectToPage(event);
	}

	function redirectToHome() {
		window.location.href = "/"
	}

	function redirectToPage(event) {
		const clickedLink = event.currentTarget.dataset.site;

		switch (clickedLink) {
			case "builder":
				window.location.href = "/_app/builder"
				break;
			case "browse":
				window.location.href = "/_app/browse-products"
				break;
			case "completed":
				
				break;
		
			default:
				break;
		}
	}
}