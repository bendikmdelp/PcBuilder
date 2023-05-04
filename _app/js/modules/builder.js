import { getProducts } from "../util/get-from-db.js";

export default async function builder() {
	const products = await getProducts();

}