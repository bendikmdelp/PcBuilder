export default function navigateToPage() {
	const homeLogo = document.querySelector('.header__logo');
	const homeLogoMobile = document.querySelector('.header-mobile__logo');
	const builderButton = document.querySelectorAll('.button-container__builder');
	const browseProductsButton = document.querySelectorAll('.button-container__completed-builds');
	const completedBuildsButton = document.querySelectorAll('.button-container__browse-products');

	homeLogo.addEventListener('click', handleNavigateToHome);
	homeLogoMobile.addEventListener('click', handleNavigateToHome);
	builderButton.forEach(button => {
		button.addEventListener('click', handleNavigiationClick);
	})
	browseProductsButton.forEach(button => {
		button.addEventListener('click', handleNavigiationClick);
	})
	completedBuildsButton.forEach(button => {
		button.addEventListener('click', handleNavigiationClick);
	})

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
		console.log(clickedLink)

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