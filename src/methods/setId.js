const { GenerateRandomId } = require('../utils/index.js');

const setId = function(id=GenerateRandomId('cid')) {
    this.id = id;

    return this;
}

module.exports = setId;