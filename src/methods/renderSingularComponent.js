const { GenerateRandomId } = require('../utils/index.js');

const renderSingularComponent = function (replaced) {
    let { id, component, attributes } = replaced;
    component = Object.create(component);
    let componentData;
    let dataExpression = attributes['data-bind'];

    if(dataExpression) {
        let { data } = this;
        let generateComponentData = function(dataExpression, data) {
            dataExpression = dataExpression.trim();
            let componentData;
            let hasEqualSign = dataExpression.search('[=]') + 1;
    
            if (hasEqualSign) {
                let valueExpression = dataExpression.split("=")[0].trim();
                let script = `
                    (function () {
                        let { ${Object.keys(data).join(", ")} } = data;
                        let fn = function () {
                            let ${dataExpression};
        
                            return ${valueExpression};
                        }
        
                        return fn();
                    })()
                `;
                componentData = eval(script);
            }
            if (!hasEqualSign) {
                let key = dataExpression;
                componentData = {};
                componentData[key] = data[key];
            }
            if(typeof componentData !== 'object') {
                componentData = {};
            }
            return componentData;
        }
    
        componentData = generateComponentData(dataExpression, data);
    }

    delete attributes['component-alias'];
    delete attributes['data-list'];
    delete attributes['data-bind'];

    component
        .setAttributes(attributes)
        .setId(GenerateRandomId('cid'))
        .setParent(this);

    if(componentData) {
        component.setData(componentData);
    }

    component.render({
        targetElement: document.getElementById(id),
    });
}

module.exports = renderSingularComponent;