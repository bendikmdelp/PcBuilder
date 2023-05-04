import {sanity} from "../sanity.js"

export async function getProducts() {
	const query = `*[_type == "product"] {
		...,
		"images": images[].asset -> url,
		"manufacturer": manufacturer -> name,
		"category": category -> name
	 }`

	const products = await sanity.fetch(query)

	return products
}
