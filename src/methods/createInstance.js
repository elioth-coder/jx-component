const createInstance = function(parent) {
    let createdInstance = Object.create(this);
        createdInstance
            .setParent(parent)
            .setId();

    return createdInstance;
}

module.exports = createInstance;