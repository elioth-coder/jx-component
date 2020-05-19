const removeStyle = function(id) {
	$(`style[itemid="${id}"]`).remove();
}

module.exports = removeStyle;