import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';
import pcBuildHelper from './structure/pc-build-helper.js';

export default {
	title: 'Studio',

	projectId: 'x8f548se',
	dataset: 'production',

	plugins: [deskTool({
		title: 'Pc Build Helper',
		name: 'pc-build-helper',
		structure: pcBuildHelper
	}), 
	
	visionTool()],

	schema: {
		types: schemas,
	},
};
