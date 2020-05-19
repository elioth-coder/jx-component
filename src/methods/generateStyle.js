const { InterpolateText, TrimWhiteSpace } = require('../utils/index.js');

const generateStyle = function() {
    let { styleId, style } = this;
    let styleTag = `
        <style itemid="${styleId}">
            ${InterpolateText({styleId}, style)}
        </style>
    `;

    return TrimWhiteSpace(styleTag);
}

module.exports = generateStyle;