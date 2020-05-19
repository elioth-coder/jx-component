const GenerateRandomNumber = function(min=0, max=9) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GenerateRandomNumber;