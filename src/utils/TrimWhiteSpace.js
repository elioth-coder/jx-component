const TrimWhiteSpace = function(str) {
	let chunks = str.split(/\s/);
	let chars = [];

	for(let i=0; i<chunks.length; i++) {
		let chunk = chunks[i];

		if(chunk=="") {
			continue;
		}

		chars.push(chunk);
	}

	return chars.join(" ");	
}

module.exports = TrimWhiteSpace;