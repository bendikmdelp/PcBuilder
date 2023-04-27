export default {
	title: 'Completed Build',
	name: 'completedBuild',
	type: 'document',
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name'
			}
		},
		{
			title: 'Images',
			name: 'images',
			type: 'array',
			of: [{ type: 'image' }]
		},
		{
			title: 'CPU',
			name: 'CPU',
			type: 'reference',
			to: { type: 'product' },
		},
		{
			title: 'Motherboard',
			name: 'motherboard',
			type: 'reference',
			to: { type: 'product' },
		},
		{
			title: 'Cooler',
			name: 'cooler',
			type: 'reference',
			to: { type: 'product' },
		},
		{
			title: 'Memory',
			name: 'memory',
			type: 'reference',
			to: { type: 'product' },
		},
		{
			title: 'Gpu',
			name: 'gpu',
			type: 'reference',
			to: { type: 'product' },
		},
		{
			title: 'Power supply',
			name: 'powerSupply',
			type: 'reference',
			to: { type: 'product' },
		},
		{
			title: 'Case',
			name: 'case',
			type: 'reference',
			to: { type: 'product' },
		}
		

	]
}