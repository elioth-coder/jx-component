const Component = require('./Component.js');
const { 
	GenerateRandomId,
	SetDefaultConfig,
} = require('./utils/index.js');

const ComponentConstructor = {
	create(config = {}) {
		const defaultConfig = {
			styleId: GenerateRandomId('css'),
			template: `
				<div>
					<h1> Component rendered. </h1>
				</div>
			`,
			data: {},
			events: {},
			methods: {},
			lifeCycle: {},
			components: {},
			attributes: {},
			parent: null,
		};
		config = SetDefaultConfig(defaultConfig, config);
		let { name } = config;
		
		return new Component(config);
	},
}

module.exports = ComponentConstructor;