const ComponentException = require('../ComponentException.js');
const { GenerateRandomId } = require('../utils/index.js');

const renderListComponent = function(replaced) {
    let { attributes, id } = replaced;
    let bindExpression = attributes['data-bind'];
    let listExpression = attributes['data-list'];
    let [currentItem, items] = listExpression.split(" in ");
        currentItem = currentItem.trim();
        items = items.trim();
    let listItems = this.data[items];

    delete attributes['component-alias'];
    delete attributes['data-list'];
    delete attributes['data-bind'];

    if(!(listItems && listItems.length)) {
        throw new ComponentException([ 
            `'${items}' is empty or not an array or undefined.`
        ].join(" "));
    }		
    let targetElement = document.getElementById(id); 

    let config = {
        targetElement: targetElement.parentNode,
        renderType: 'append',
    }
    let renderListItem = function(replaced, componentData, config) {
        let { attributes, component } = replaced;
            component = Object.create(component);


        component
            .setAttributes(attributes)
            .setId(GenerateRandomId('cid'))
            .setParent(this)
            .setData(componentData)
            .render(config);	

    }.bind(this);
    let extractComponentData = function(item) {
        let componentData = {};
        let script = `
            (function() { 
                let ${bindExpression} = item;
                return ${bindExpression}
            })()
        `;
        let data = eval(script);

        if(currentItem == bindExpression) {
            componentData[currentItem] = data;
        } 

        if(currentItem != bindExpression) {
            Object.assign(componentData, data);
        }

        return componentData;
    }

    for(let i=0; i<listItems.length; i++) {
        let componentData = extractComponentData(listItems[i]);
            componentData.index = i;
            
        renderListItem(replaced, componentData, config);
    }

    $(targetElement).remove();					
}

module.exports = renderListComponent;