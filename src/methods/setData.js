const { MergeObject } = require('../utils/index.js');

const setData = function(passedData) {
    let { data } = this;
        this.data = MergeObject(passedData, data);

    return this;
}	

module.exports = setData;