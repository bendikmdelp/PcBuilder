export function createBuildFigureDOM(build) {
	const figureElement = document.createElement('figure');
	const imageElement = document.createElement('img');
	const figCaptionElement = document.createElement('figcaption');

	imageElement.src = build.images[0];
	imageElement.alt = ''
	figCaptionElement.innerText = build.name;

	figureElement.append(
		imageElement,
		figCaptionElement
	);

	return figureElement;
}