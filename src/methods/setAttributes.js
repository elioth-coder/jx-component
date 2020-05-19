const setAttributes = function(DomAttributes = {}) {
    let { attributes } = this;

    if(typeof DomAttributes !== 'object') {
        DomAttributes = {};
    }
    this.attributes = Object.assign(attributes, DomAttributes);

    return this;
}

module.exports = setAttributes;