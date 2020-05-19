const { InterpolateText } = require('../utils/index.js');
const ComponentException = require('../ComponentException.js');

const generateTemplate = function() {
    let { id, name, styleId, template, data, attributes } = this;
    let $template0;

    template = $.parseHTML(InterpolateText(data, template));
    $template0 = $(template[0]);

    if(template.length <= 0) {
        throw new ComponentException([
            `Component do not have a template.`,
        ].join(" "));
    }
    if(template.length > 1) {
        throw new ComponentException([
            `template must be enclosed in a`,
            `single block-level element.`,
        ].join(" "));
    }
    if(template[0].nodeType !== 1) {
        throw new ComponentException([
            `template must be enclosed in a`,
            `single block-level element.`,
        ].join(" "));
    }

    $template0
        .attr(attributes)
        .attr('component-name', name)
        .attr(styleId, '')
        .attr('id', id);
        
    return template;
}

module.exports = generateTemplate;