const { InterpolateText, SetDefaultConfig } = require('../utils/index.js');
const ComponentException = require('../ComponentException.js');

const generateTemplate = function(template, data, id) {
    let $template0;

    template = $.parseHTML(InterpolateText(data, template));
    $template0 = $(template[0]);

    if(template.length <= 0) {
        throw new ComponentException([
            `.onInit() do not have a template.`,
        ].join(" "));
    }
    if(template.length > 1) {
        throw new ComponentException([
            `.onInit() template must be enclosed in a`,
            `single block-level element.`,
        ].join(" "));
    }
    if(template[0].nodeType !== 1) {
        throw new ComponentException([
            `.onInit() template must be enclosed in a`,
            `single block-level element.`,
        ].join(" "));
    }

    $template0.attr(`on_init_${id}`, '');
        
    return template;
}

const renderOnInitElement = function(template) {
    let { data, id } = this;
    template = generateTemplate(template, data, id);
    let { renderConfig } = this;
    let defaultConfig = {
        targetElement: document.body, 
        renderType: 'replaceWith',
    };
    let { targetElement, renderType } = SetDefaultConfig(defaultConfig, renderConfig);

    $(targetElement)[renderType](template);
}

module.exports = renderOnInitElement;