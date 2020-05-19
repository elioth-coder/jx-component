const hierarchy = function () {
    let { name } = this;
    let hierarchy = [];
    let whileParentExists = function (component) {
        let { parent } = component;

        if (!parent) {
            return;
        }
        let parentName = (parent.name) ? parent.name : 'root';

        hierarchy.push(parentName);
        whileParentExists(parent);
    }

    whileParentExists(this);

    if(hierarchy.length == 0 && name == undefined) {
        hierarchy.push('root');        
    } else {
        hierarchy.push(name);
    }

    return hierarchy;
}

module.exports = hierarchy;