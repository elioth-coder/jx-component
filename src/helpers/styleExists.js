const styleExists = function(id) {
	return $(`style[itemid="${id}"]`).length;
}

module.exports = styleExists;