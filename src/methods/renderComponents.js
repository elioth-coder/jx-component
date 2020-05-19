const renderComponents = function() {
    let { components } = this;
    let keys = Object.keys(components);

    if(!keys.length) {
        return;
    }
    let replacedComponentTags = this.replaceComponentTags();

    for(let i=0; i<replacedComponentTags.length; i++) {
        let replaced = replacedComponentTags[i];

        this.renderComponent(replaced);
    }
}

module.exports = renderComponents;