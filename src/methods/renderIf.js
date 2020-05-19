const renderIf = function() {
    let { id, data } = this;
    let $self = $(`#${id}`);
    let renderWhileExists = function() {
        let elements = $self.find(`[data-if]`);

        if(!elements.length) {
            return;
        }
        let $element0 = $(elements[0]);
        let expression = $element0.attr('data-if');
        
        let script = `
        (function(){
            let { ${Object.keys(data).join(",")} } = data;

            return ${expression}
        })()
        `;
        expression = Boolean(eval(script));

        if(expression == true) {
            $element0.removeAttr('data-if');
        } 
        if(expression != true) {
            $element0.remove();
        }
        elements = $self.find(`[data-if]`);

        if(elements.length) {
            renderWhileExists();
        }										
    }

    renderWhileExists();
}

module.exports = renderIf;