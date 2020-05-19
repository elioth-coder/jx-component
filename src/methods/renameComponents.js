const { DashifySnakeCase } = require('../utils/index.js');

const renameComponents = function() {
    let { components } = this;

    for(let key in components) {
        let component = components[key];

        component.name = DashifySnakeCase(key);
        components[key] = component;
    }

    this.components = components;
}

module.exports = renameComponents;