import {sanity} from "../sanity.js"

export async function getProducts() {
	const query = `*[_type == "product"] {
			name,
			"images": images[].asset -> url,
			"manufacturer": manufacturer -> name,
			"category": category -> name,
			price,
			cores,
			threads,
			coreClock,
			socket,
			coolerSocket,
			watercooled,
			coolerheight,
			motherboardSocket,
			memoryType,
			wifi,
			RAMType,
			RAMCapacity,
			storageType,
			storageCapacity,
			GPUChipset,
			VRAM,
			coreClock,
			GPUMemoryType,
			efficiencyRating,
			wattage,
			modular,
			caseType,
			sidePanel,
			colour
		 }`

	const products = await getFromDbTryCatch(query);

	return products
}

export async function getCompletedBuilds() {
	const query = `*[_type == "completedBuild"] {
		name,
		"images": images[].asset -> url,
	}`;

	const builds = await getFromDbTryCatch(query);

	return builds;
}

async function getFromDbTryCatch(query) {
	try {
		const data = await sanity.fetch(query)
		return data;
	} catch (Error) {
		const errorDiv = document.querySelectorAll('.display-error-message');
		errorDiv.forEach(element => {
			element.innerText = Error.message;
			element.style.display = 'block';
		})
		

	}
}
