const { GenerateRandomId, AttributesExtractor } = require('../utils/index.js');

const replaceComponentTags = function() {
    let { components } = this;
    let { $self } = this.$refs;
    let replacedComponentTags = [];
    let findComponents = function(name) {
        let elements = [
            ...$self.find(name), 
            ...$self.find(`[component-alias="${name}"]`)
        ];

        return elements;
    }
    let replace = function(elements, component) {
        let id = GenerateRandomId('rid');
        let element0 = elements[0];
        let tableElements = "thead,tbody,tfoot,tr,th,td";
        let tagName = element0.tagName.toLowerCase();
        let tag = (
            tableElements
                .split(",")
                .includes(tagName)
        ) ? tagName : "temporary";
        let $element0 = $(element0);

        replacedComponentTags.push({
            id,
            component: Object.create(component),
            attributes: AttributesExtractor(element0).extract(),
        });
        $element0.replaceWith(`<${tag} id="${id}"/>`);
    }
    let replaceWhileExists = function(component) {
        let { name } = component;
        let elements = findComponents(name);

        if(!elements.length) {
            return;
        }
        replace(elements, component);

        elements = findComponents(name);

        if(!elements.length) {
            return;
        }
        replaceWhileExists(component);
    }

    for(let key in components) {
        let component = components[key];

        if(!component) {
            continue;
        }
        replaceWhileExists(component);
    }

    return replacedComponentTags;
}

module.exports = replaceComponentTags;