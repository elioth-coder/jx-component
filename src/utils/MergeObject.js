const MergeObject = function(dominantObject, weakObject) {
	let weakObjectKeys = Object.keys(weakObject);

	for(let i=0; i<weakObjectKeys.length; i++) {
		let key = weakObjectKeys[i];

		if(dominantObject[key] === undefined) {
			dominantObject[key] = weakObject[key];
		}
	}

	return dominantObject;
}

module.exports = MergeObject;