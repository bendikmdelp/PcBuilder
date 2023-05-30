export default function navigateToPage() {
	//Queryselectors
	const homeLogo = document.querySelector('.header__logo');
	const homeLogoMobile = document.querySelector('.header-mobile__logo');
	const builderButton = document.querySelectorAll('.button-container__builder');
	const browseProductsButton = document.querySelectorAll('.button-container__completed-builds');
	const completedBuildsButton = document.querySelectorAll('.button-container__browse-products');

	//EventListeners
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

	//handlers
	function handleNavigateToHome() {
		redirectToHome();
	}

	function handleNavigiationClick(event) {
		redirectToPage(event);
	}

	//Redirects the user to home
	function redirectToHome() {
		window.location.href = "/";
	}

	//redirect the user to clicked page
	function redirectToPage(event) {
		const clickedLink = event.currentTarget.dataset.site;

		switch (clickedLink) {
			case "builder":
				window.location.href = "/builder";
				break;
			case "browse":
				window.location.href = "/browse-products";
				break;
			case "completed":
				window.location.href = "/completed-builds";
				break;
		
			default:
				break;
		}
	}
}