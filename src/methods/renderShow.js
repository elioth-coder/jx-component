const renderShow = function() {
    let { id, data } = this;
    let $self = $(`#${id}`);
    let renderWhileExists = function() {
        let elements = $self.find(`[data-show]`);

        if(!elements.length) {
            return;
        }
        let $element0 = $(elements[0]);
        let expression = $element0.attr('data-show');
        
        let script = `
        (function(){
            let { ${Object.keys(data).join(",")} } = data;

            return ${expression}
        })()
        `;

        if(!eval(script)) {
            $element0.css({ display: 'none' });
        }
        $element0.removeAttr('data-show');
        elements = $self.find(`[data-show]`);

        if(elements.length) {
            renderWhileExists();
        }										
    }

    renderWhileExists();		
}

module.exports = renderShow;