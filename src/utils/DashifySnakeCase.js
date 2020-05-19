const DashifySnakeCase = function(str) {
	let chunks = str.split(/([A-Z])/);

	if(chunks[0]=="") {
		chunks.shift();
	}
	if(/^([A-Z]){1}$/.test(chunks[0])) {
		chunks[0] = chunks[0].toLowerCase();
	}
	str = chunks.join("");
	chunks = str.split(/([A-Z])/);
	chunks = chunks.map(function(item) {
		if(/^([A-Z]){1}$/.test(item)) {
			item = `-${item}`;
		}

		return item;
	});

	return chunks.join("").toLowerCase();
}

module.exports = DashifySnakeCase;