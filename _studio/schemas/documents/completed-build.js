// export default {
// 	title: 'Completed Build',
// 	name: 'completedBuild',
// 	type: 'document',
// 	fields: [
// 		{
// 			title: 'Name',
// 			name: 'name',
// 			type: 'string',
// 		},
// 		{
// 			title: 'Slug',
// 			name: 'slug',
// 			type: 'slug',
// 			options: {
// 				source: 'name'
// 			}
// 		},
// 		{
// 			title: 'CPU',
// 			name: 'CPU',
// 			type: 'reference',
// 			to: { type: 'product' },
// 			options: {
// 				filter: 'product == $product',
// 				filterParams: {product: 'CPU'}
// 			}
// 		},
// 		{
// 			title: 'Motherboard',
// 			name: 'motherboard',
// 			type: 'reference',
// 			to: { type: 'product' },
// 			options: {
// 				filter: 'product == $product',
// 				filterParams: {product: 'motherboard'}
// 			}
// 		},

// 	]
// }