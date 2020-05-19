const removeOnInitElement = function() {
    let { id } = this;
    
    $(`[on_init_${id}]`).remove();
}

module.exports = removeOnInitElement;