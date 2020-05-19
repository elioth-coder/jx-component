const SetDefaultConfig = function(defaultConfig, suppliedConfig) {
	let defaultConfigKeys = Object.keys(defaultConfig);

	for(let i=0; i<defaultConfigKeys.length; i++) {
		let key = defaultConfigKeys[i];

		if(suppliedConfig[key] === undefined) {
			suppliedConfig[key] = defaultConfig[key];
		}
	}

	return suppliedConfig;
}

module.exports = SetDefaultConfig;