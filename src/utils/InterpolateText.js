const TrimWhiteSpace = require('./TrimWhiteSpace.js');

const replace = function(str, find, replace) {
	return str.replace(new RegExp(`(${find})`, 'g'), replace); 
}

const InterpolateText = function(data, text) {
	if(typeof data !== 'object') {
		return text;
	}

	text = replace(text, '{{', '${');
	text = replace(text, '}}', '}');;

	let fnBody = `
		let { ${Object.keys(data).join(", ")} } = data;

		return \`${text}\`;
	`;
	let fn = new Function('data', fnBody);
	
	return TrimWhiteSpace(fn(data));
}

module.exports = InterpolateText;