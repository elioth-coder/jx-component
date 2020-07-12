const debounce = require('lodash/debounce');

const registerEvents = function() {
    let { id, events } = this;
    let $self = $(`#${id}`);
    let domEvents = [
        "blur,focus,load,resize,scroll,unload,beforeunload,",
        "click,dblclick,mousedown,mouseup,mousemove,mouseover,",
        "mouseout,mouseenter,mouseleave,change,select,submit,",
        "keydown,keypress,keyup"
    ].join("").split(",");

    let addEventToElements = function(eventName, elements) {
        for(let i=0; i<elements.length; i++) {
            let element = $(elements[i]);
            let fnName = element.attr(`on-${eventName}`);
            let fn = events[fnName];
            let debounceAttribute = element.attr('debounce') + '';
            let [ evt, wait ] = debounceAttribute.split(",");
                evt = evt + ''.trim();
                wait = parseInt(wait + ''.trim());
                wait = (isNaN(wait) || wait < 0) ? 0 : wait;
            
            if(typeof fn !== 'function') {
                continue;
            }					
            element.removeAttr(`on-${eventName}`);	
            element.removeAttr('debounce');	

            if(evt == eventName && wait > 0 ) {
                fn = debounce(fn, wait, { 
                    leading: false, 
                    trailing: true 
                });
                element[0].addEventListener(eventName, fn.bind(this));										

                continue;
            }		
            element[0].addEventListener(eventName, fn.bind(this));										
        }				
    }.bind(this);

    for(let i=0; i<domEvents.length; i++) {
        let eventName = domEvents[i];
        let elements = $self.find(`[on-${eventName}]`);

        if($self.attr(`on-${eventName}`)) {
            elements = (elements && elements.length) ? [...elements, $self] : [$self];
        }
        if(elements.length) {
            addEventToElements(eventName, elements);
        }
    }
}

module.exports = registerEvents;