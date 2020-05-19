const { removeStyle } = require('../helpers/index.js');

const destroy = function() {
    let { styleId } = this;
    let { $self } = this.$refs;

    $self[0].remove();
    let similarComponents = $(`[${styleId}]`);

    if(!similarComponents.length) {
        removeStyle(styleId);
    }
}

module.exports = destroy;
