export default {
	title: 'Brand',
	name: 'brand',
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
			title: 'Description',
			name: 'description',
			type: 'text',
		},
		{
			title: 'Logo',
			name: 'logo',
			type: 'image',
		}
	]
}