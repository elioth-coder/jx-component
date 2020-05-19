const ComponentCollection = require('../ComponentCollection.js');

const registerRemoveSelfEvent = function() {
    let self = this;
    let { id } = self;
    let $self = $(`#${id}`);
    
    $self.on('DOMNodeRemoved', function(e) {
        ComponentCollection.filter();        
    });
}

module.exports = registerRemoveSelfEvent;