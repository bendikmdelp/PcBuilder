import { createBuildFigureDOM } from "../util/create-html-dom.js";
import { getCompletedBuilds } from "../util/get-from-db.js";

const builds = getCompletedBuilds;

export default function completedBuilds() {
	const completedBuildsContainer = document.querySelector('.completed-builds__builds-container');	

	onload()

	function onload() {
		renderHTML()
	}

	function renderCompletedBuildList() {
		builds.forEach(build => {
			const buildCard = createBuildFigureDOM(build);
			completedBuildsContainer.appendChild(buildCard);
		})
	}

	function renderHTML() {
		renderCompletedBuildList();
	}
}