import { createBuildFigureDOM } from "../util/create-html-dom.js";
import { getCompletedBuilds } from "../util/get-from-db.js";

const builds = await getCompletedBuilds();

export default function completedBuilds() {
	//Queryselector
	const completedBuildsContainer = document.querySelector('.completed-builds__builds-container');	

	//runs on page load
	if(completedBuildsContainer) {
		onload();
	}


	//function to run on page load
	function onload() {
		renderHTML();
	}

	//goes through each element in builds to render each
	function renderCompletedBuildList() {
		for(const build of builds) {
			const buildCard = createBuildFigureDOM(build);
			completedBuildsContainer.appendChild(buildCard);
		}
	}

	//renderes completed builds
	function renderHTML() {
		renderCompletedBuildList();
	}
}