const { SetDefaultConfig } = require('../utils/index.js');

const renderTemplate = function(config) {
    let { id } = this;
    let defaultConfig = {
        targetElement: document.body, 
        renderType: 'replaceWith',
    };
    let { targetElement, renderType } = SetDefaultConfig(defaultConfig, config);
    let template = this.generateTemplate();
    let $targetElement = $(targetElement);

    if(!$targetElement.length) {
        throw new ComponentException([
            `'targetElement' does not exists.`,
        ].join(" "));
    }
    if(renderType == 'replaceWith') {
        let $onInitElement = $(`[on_init_${id}]`);

        if($onInitElement.length) {
            $targetElement = $onInitElement;
        }
    }

    $targetElement[renderType](template);		
}	

module.exports = renderTemplate;