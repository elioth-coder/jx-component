const { styleExists } = require('../helpers/index.js');

const renderStyle = function() {
    let { styleId, style } = this;

    if(!style) {
        return;
    }
    if(!styleExists(styleId)) {
        let head0 = $('head')[0];
        let $head0 = $(head0);

        $head0.append(this.generateStyle());
    }			
}

module.exports = renderStyle;
