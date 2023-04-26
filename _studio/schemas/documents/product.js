export default {
	title: 'Products',
	name: 'product',
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
			of: { type: 'image' }
		},
		{
			title: 'Manufacturer',
			name: 'manufacturer',
			type: 'reference',
			to: { type: 'brand' }
		},
		{
			title: 'Category',
			name: 'category',
			type: 'reference',
			to: { type: 'category' }
		},
		{
			title: 'Price',
			name: 'price',
			type: 'number',
		},
		{
			title: 'Cores',
			name: 'cores',
			type: 'string',
		},
		{
			title: 'Threads',
			name: 'threads',
			type: 'string',
		},
		{
			title: 'Coreclock',
			name: 'coreclock',
			type: 'string',
		},
		{
			title: 'Socket',
			name: 'socket',
			type: 'string',
		},
		{
			title: 'Socket',
			name: 'socket',
			type: 'string',
		},
		{
			title: 'Watercooled',
			name: 'watercooled',
			type: 'boolean',
		},
		{
			title: 'Coolerheight',
			name: 'coolerheight',
			type: 'string',
		},
		{
			title: 'Motherboad socket',
			name: 'motherboadSocket',
			type: 'string',
		},
		{
			title: 'Memory type',
			name: 'memoryType',
			type: 'string',
		},
		{
			title: 'Wifi',
			name: 'wifi',
			type: 'boolean',
		},
		{
			title: 'RAM type',
			name: 'RAMType',
			type: 'string',
		},
		{
			title: 'RAM capacity',
			name: 'RAMCapacity',
			type: 'string',
		},
		{
			title: 'Storage type',
			name: 'storageType',
			type: 'string',
		},
		{
			title: 'Storage capacity',
			name: 'storageCapacity',
			type: 'number',
		},
		{
			title: 'GPU chipset',
			name: 'GPUChipset',
			type: 'string',
		},
		{
			title: 'VRAM',
			name: 'VRAM',
			type: 'number',
		},
		{
			title: 'Core clock',
			name: 'coreClock',
			type: 'number',
		},
		{
			title: 'GPU memory type',
			name: 'GPUMemoryType',
			type: 'string',
		},
		{
			title: 'Efficiency rating',
			name: 'efficiencyRating',
			type: 'string',
		},{
			title: 'Wattage',
			name: 'wattage',
			type: 'number',
		},
		{
			title: 'Modular',
			name: 'modular',
			type: 'array',
			of: [{type: 'string'}],
			options: {
				list: [
					{title: 'Full', value: 'full'},
					{title: 'Semi', value: 'semi'},
					{title: 'No', value: 'no'},
				]
			}
		},
		{
			title: 'Case type',
			name: 'caseType',
			type: 'string',
		},
		{
			title: 'Side panel',
			name: 'sidePanel',
			type: 'string',
		},
		{
			title: 'Colour',
			name: 'colour',
			type: 'string',
		}
	]
}