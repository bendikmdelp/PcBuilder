import {sanity} from "../sanity.js"

export async function getProducts() {
	const query = `*[_type == "product"]`

	const products = await sanity.fetch(query)

	return products
}
