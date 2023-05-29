export default function header() {
	const mobileNavigationButton = document.querySelector('.header-mobile__navigation-button');
	const mobileNavigationButtonContainer = document.querySelector('.header-mobile__button-container');

	mobileNavigationButton.addEventListener('click', handleMobileNavigationButtonClick);

	function handleMobileNavigationButtonClick() {
		displayMobileNavigationButtonContainer();
	}

	function displayMobileNavigationButtonContainer() {
		const elementStyle = getComputedStyle(mobileNavigationButtonContainer);
		if(elementStyle.display === 'flex') {
			mobileNavigationButtonContainer.style.display = 'none';
		} else {
			mobileNavigationButtonContainer.style.display = 'flex';
		}

	}
}