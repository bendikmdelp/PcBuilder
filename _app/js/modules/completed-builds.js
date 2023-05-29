import { createBuildFigureDOM } from "../util/create-html-dom.js";
import { getCompletedBuilds } from "../util/get-from-db.js";

const builds = await getCompletedBuilds();

export default function completedBuilds() {
	const completedBuildsContainer = document.querySelector('.completed-builds__builds-container');	

	onload()

	function onload() {
		renderHTML()
	}

	function renderCompletedBuildList() {
		for(const build of builds) {
			const buildCard = createBuildFigureDOM(build);
			completedBuildsContainer.appendChild(buildCard);
		}
	}

	function renderHTML() {
		renderCompletedBuildList();
	}
}