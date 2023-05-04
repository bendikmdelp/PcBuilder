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
			efficencyRating,
			wattage,
			modular,
			caseType,
			sidePanel,
			colour
		 }`

	const products = await sanity.fetch(query)

	return products
}
