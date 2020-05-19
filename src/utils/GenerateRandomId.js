const GenerateRandomNumber = require('./GenerateRandomNumber.js');

const GenerateRandomId = function(prefix = "rnd") {
	let id = [
		prefix,
		GenerateRandomNumber(1000, 9999),
		(Date.now() + '').substr(5),
	].join("_");

	return id;
}

module.exports = GenerateRandomId;