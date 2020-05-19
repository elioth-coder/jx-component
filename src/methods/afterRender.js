const { IsThenable } = require('../utils/index.js');
const ComponentException = require('../ComponentException.js');
const ComponentCollection = require('../ComponentCollection.js');

const afterRender = function() {
    let { afterRender } = this.lifeCycle;
    let returnValue;
    
    if(afterRender) {
        returnValue = this.lifeCycle.afterRender();
    }
    if(IsThenable(returnValue)) {
        returnValue.then(function() {
            this.renderComponents();
        }.bind(this))
        .catch(function(e) {
            throw new ComponentException(e.message);
        });

        return;
    }

    this.renderComponents();
    this.removeOnInitElement();
    ComponentCollection.add(this);
}

module.exports = afterRender;