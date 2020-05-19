const AttributesExtractor = function(element) {
	let extract = function() {
		let attributes = {};
		let nodeMap = this.element.attributes;

		for(let i=0; i<nodeMap.length; i++) {
			let { nodeName, nodeValue } = nodeMap[i];
			
			attributes[nodeName] = nodeValue;
		}

		return attributes;
	};
	let get = function(name) {
		let attributes = this.extract();

		return attributes[name];
	};

	return {
		element,
		extract,
		get,
	};
}

module.exports = AttributesExtractor;