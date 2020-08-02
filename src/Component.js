const { GenerateRandomId } = require('./utils/index.js');

class Component {
    constructor({
        name,
        styleId,
        style,
        template,
        data,
        events,
        methods,
        lifeCycle,
        components,
        attributes,
        parent,
    }) {
        this.id = GenerateRandomId('cid');
        this.name = name;
        this.styleId = styleId;
        this.style = style;
        this.template = template;
        this.data = data;
        this.events = events;
        this.methods = methods;
        this.lifeCycle = lifeCycle;
        this.components = components;
        this.attributes = attributes;
        this.$refs = {};
        this.parent = parent;
    }

    parentComponent(n = 0) {
        let repeatString = function (str = '0', n = 0) {
            let repeatedString = ``;

            for (let i = 0; i < n; i++) {
                repeatedString += str;
            }

            return repeatedString;
        }
        let self = this;
        let script = `
            (function(){
                return self${repeatString('.parent', n + 1)}
            })()
        `;
        let parent = eval(script);

        return parent;
    }

    createInstance(parent) {
        let createdInstance = Object.create(this);
        createdInstance
            .setParent(parent)
            .setId();

        return createdInstance;
    }

    render(config = {}) {
        let hierarchy = this.hierarchy().join(" > ");

        this.renderConfig = config;
        this.renameComponents();
        this.tweakLifeCycle();

        try {
            let { beforeRender, onInit, } = this.lifeCycle;
            let returnValue;

            if (onInit) {
                this.onInit();
            }
            if (beforeRender) {
                returnValue = this.beforeRender();
            }

            const { IsThenable } = require('./utils/index.js');
            if (IsThenable(returnValue)) {
                returnValue.then(function () {
                    this.onRender(config);
                    this.afterRender();
                }.bind(this))
                    .catch(function (e) {
                        const ComponentException = require('./ComponentException.js');
                        throw new ComponentException(e.message);
                    });

                return;
            }

            this.onRender(config);
            this.afterRender();
        } catch (e) {
            let errorMessage = [
                hierarchy,
                e.message,
                e.stack,
            ].join("\n");

            console.error(errorMessage);
        }
    }

    hierarchy() {
        let { name } = this;
        let hierarchy = [];
        let whileParentExists = function (component) {
            let { parent } = component;

            if (!parent) {
                return;
            }
            let parentName = (parent.name) ? parent.name : 'root';

            hierarchy.push(parentName);
            whileParentExists(parent);
        }

        whileParentExists(this);

        if (hierarchy.length == 0 && name == undefined) {
            hierarchy.push('root');
        } else {
            hierarchy.push(name);
        }

        return hierarchy;
    }

    renameComponents() {
        let { components } = this;

        for (let key in components) {
            let component = components[key];

            const { DashifySnakeCase } = require('./utils/index.js');
            component.name = DashifySnakeCase(key);
            components[key] = component;
        }

        this.components = components;
    }

    tweakLifeCycle() {
        let { lifeCycle } = this;
        let keys = Object.keys(lifeCycle);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let fn = lifeCycle[key];

            if (typeof fn !== 'function') {
                continue;
            }
            lifeCycle[key] = fn.bind(this);
        }

        this.lifeCycle = lifeCycle;
    }

    onInit() {
        return this.lifeCycle.onInit();
    }

    beforeRender() {
        return this.lifeCycle.beforeRender();
    }

    onRender(config) {
        this.renderStyle();
        this.renderTemplate(config);
        this.renderIf();
        this.renderShow();
        this.registerMethods();
        this.registerEvents();
        this.registerRemoveSelfEvent();
        this.registerDomRefs();
    }

    renderStyle() {
        let { style } = this;

        if (!style) {
            return;
        }
        if (!this.styleExists()) {
            let head0 = $('head')[0];
            let $head0 = $(head0);

            $head0.append(this.generateStyle());
        }
    }

    styleExists() {
        let { styleId } = this;

        return $(`style[itemid="${styleId}"]`).length;
    }

    generateStyle() {
        let { styleId, style } = this;
        const { InterpolateText, TrimWhiteSpace } = require('./utils/index.js');
        let styleTag = `
                    <style itemid="${styleId}">
                        ${InterpolateText({ styleId }, style)}
                    </style>
                `;

        return TrimWhiteSpace(styleTag);
    }

    renderTemplate(config) {
        let { id } = this;
        let defaultConfig = {
            targetElement: document.body,
            renderType: 'replaceWith',
        };
        const { SetDefaultConfig } = require('./utils/index.js');
        let { targetElement, renderType } = SetDefaultConfig(defaultConfig, config);
        let template = this.generateTemplate();
        let $targetElement = $(targetElement);

        if (!$targetElement.length) {
            const ComponentException = require('./ComponentException.js');
            throw new ComponentException([
                `'targetElement' does not exists.`,
            ].join(" "));
        }
        if (renderType == 'replaceWith') {
            let $onInitElement = $(`[on_init_${id}]`);

            if ($onInitElement.length) {
                $targetElement = $onInitElement;
            }
        }

        $targetElement[renderType](template);
    }

    generateTemplate() {
        let { id, name, styleId, template, data, attributes } = this;
        let $template0;

        const { InterpolateText } = require('./utils/index.js');
        template = $.parseHTML(InterpolateText(data, template));
        $template0 = $(template[0]);

        const ComponentException = require('./ComponentException.js');
        if (template.length <= 0) {
            throw new ComponentException([
                `Component do not have a template.`,
            ].join(" "));
        }
        if (template.length > 1) {
            throw new ComponentException([
                `template must be enclosed in a`,
                `single block-level element.`,
            ].join(" "));
        }
        if (template[0].nodeType !== 1) {
            throw new ComponentException([
                `template must be enclosed in a`,
                `single block-level element.`,
            ].join(" "));
        }

        $template0
            .attr(attributes)
            .attr('component-name', name)
            .attr(styleId, '')
            .attr('id', id);

        return template;
    }

    renderIf() {
        let { id, data } = this;
        let $self = $(`#${id}`);
        let renderWhileExists = function () {
            let elements = $self.find(`[data-if]`);

            if (!elements.length) {
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

            if (expression == true) {
                $element0.removeAttr('data-if');
            }
            if (expression != true) {
                $element0.remove();
            }
            elements = $self.find(`[data-if]`);

            if (elements.length) {
                renderWhileExists();
            }
        }

        renderWhileExists();
    }

    renderShow() {
        let { id, data } = this;
        let $self = $(`#${id}`);
        let renderWhileExists = function () {
            let elements = $self.find(`[data-show]`);

            if (!elements.length) {
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

            if (!eval(script)) {
                $element0.css({ display: 'none' });
            }
            $element0.removeAttr('data-show');
            elements = $self.find(`[data-show]`);

            if (elements.length) {
                renderWhileExists();
            }
        }

        renderWhileExists();
    }

    registerMethods() {
        let { methods } = this;
        let keys = Object.keys(methods);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let fn = methods[key];

            if (typeof fn !== 'function') {
                continue;
            }
            methods[key] = fn.bind(this);
        }

        this.methods = methods;
    }

    registerEvents() {
        let { id, events } = this;
        let $self = $(`#${id}`);
        let domEvents = [
            "blur,focus,load,resize,scroll,unload,beforeunload,",
            "click,dblclick,mousedown,mouseup,mousemove,mouseover,",
            "mouseout,mouseenter,mouseleave,change,select,submit,",
            "keydown,keypress,keyup"
        ].join("").split(",");

        let addEventToElements = function (eventName, elements) {
            for (let i = 0; i < elements.length; i++) {
                let element = $(elements[i]);
                let fnName = element.attr(`on-${eventName}`);
                let fn = events[fnName];
                let debounceAttribute = element.attr('debounce') + '';
                let [evt, wait] = debounceAttribute.split(",");
                evt = evt + ''.trim();
                wait = parseInt(wait + ''.trim());
                wait = (isNaN(wait) || wait < 0) ? 0 : wait;

                if (typeof fn !== 'function') {
                    continue;
                }
                element.removeAttr(`on-${eventName}`);
                element.removeAttr('debounce');

                if (evt == eventName && wait > 0) {
                    const debounce = require('lodash/debounce');
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

        for (let i = 0; i < domEvents.length; i++) {
            let eventName = domEvents[i];
            let elements = $self.find(`[on-${eventName}]`);

            if ($self.attr(`on-${eventName}`)) {
                elements = (elements && elements.length) ? [...elements, $self] : [$self];
            }
            if (elements.length) {
                addEventToElements(eventName, elements);
            }
        }
    }

    registerRemoveSelfEvent() {
        let self = this;
        let { id } = self;
        let $self = $(`#${id}`);

        $self.on('DOMNodeRemoved', function (e) {
            const ComponentCollection = require('./ComponentCollection.js');
            ComponentCollection.filter();
        });
    }

    registerDomRefs() {
        let { id } = this;
        let $refs = {};
        let $self = $(`#${id}`);
        let elements = $self.find(`[domref]`);

        for (let i = 0; i < elements.length; i++) {
            let $element = $(elements[i]);
            let domref = $element.attr('domref');

            $refs[`$${domref}`] = $element;
        }

        $refs[`$self`] = $self;
        this.$refs = $refs;
    }

    afterRender() {
        let { afterRender } = this.lifeCycle;
        let returnValue;

        if (afterRender) {
            returnValue = this.lifeCycle.afterRender();
        }

        const { IsThenable } = require('./utils/index.js');
        if (IsThenable(returnValue)) {
            returnValue.then(function () {
                this.renderComponents();
            }.bind(this))
                .catch(function (e) {
                    const ComponentException = require('./ComponentException.js');
                    throw new ComponentException(e.message);
                });

            return;
        }

        this.renderComponents();
        this.removeOnInitElement();
        const ComponentCollection = require('./ComponentCollection.js');
        ComponentCollection.add(this);
    }

    renderComponents() {
        let { components } = this;
        let keys = Object.keys(components);

        if (!keys.length) {
            return;
        }
        let replacedComponentTags = this.replaceComponentTags();

        for (let i = 0; i < replacedComponentTags.length; i++) {
            let replaced = replacedComponentTags[i];

            this.renderComponent(replaced);
        }
    }

    replaceComponentTags() {
        let { components } = this;
        let { $self } = this.$refs;
        let replacedComponentTags = [];
        let findComponents = function (name) {
            let elements = [
                ...$self.find(name),
                ...$self.find(`[component-alias="${name}"]`)
            ];

            return elements;
        }
        let replace = function (elements, component) {
            const { GenerateRandomId, AttributesExtractor } = require('./utils/index.js');
            let id = GenerateRandomId('rid');
            let element0 = elements[0];
            let tableElements = "thead,tbody,tfoot,tr,th,td";
            let tagName = element0.tagName.toLowerCase();
            let tag = (
                tableElements
                    .split(",")
                    .includes(tagName)
            ) ? tagName : "temporary";
            let $element0 = $(element0);

            replacedComponentTags.push({
                id,
                component: Object.create(component),
                attributes: AttributesExtractor(element0).extract(),
            });
            $element0.replaceWith(`<${tag} id="${id}"/>`);
        }
        let replaceWhileExists = function (component) {
            let { name } = component;
            let elements = findComponents(name);

            if (!elements.length) {
                return;
            }
            replace(elements, component);

            elements = findComponents(name);

            if (!elements.length) {
                return;
            }
            replaceWhileExists(component);
        }

        for (let key in components) {
            let component = components[key];

            if (!component) {
                continue;
            }
            replaceWhileExists(component);
        }

        return replacedComponentTags;
    }

    renderComponent(replaced) {
        let listExpression = replaced.attributes['data-list'];

        if (listExpression) {
            return this.renderListComponent(replaced);
        }
        this.renderSingularComponent(replaced);
    }

    renderListComponent(replaced) {
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

        if (!(listItems && listItems.length)) {
            const ComponentException = require('./ComponentException.js');
            throw new ComponentException([
                `'${items}' is empty or not an array or undefined.`
            ].join(" "));
        }
        let targetElement = document.getElementById(id);

        let config = {
            targetElement: targetElement.parentNode,
            renderType: 'append',
        }
        let renderListItem = function (replaced, componentData, config) {
            let { attributes, component } = replaced;
            component = Object.create(component);
            const { GenerateRandomId } = require('./utils/index.js');


            component
                .setAttributes(attributes)
                .setId(GenerateRandomId('cid'))
                .setParent(this)
                .setData(componentData)
                .render(config);

        }.bind(this);
        let extractComponentData = function (item) {
            let componentData = {};
            let script = `
                            (function() { 
                                let ${bindExpression} = item;
                                return ${bindExpression}
                            })()
                        `;
            let data = eval(script);

            if (currentItem == bindExpression) {
                componentData[currentItem] = data;
            }

            if (currentItem != bindExpression) {
                Object.assign(componentData, data);
            }

            return componentData;
        }

        for (let i = 0; i < listItems.length; i++) {
            let componentData = extractComponentData(listItems[i]);
            componentData.index = i;

            renderListItem(replaced, componentData, config);
        }

        $(targetElement).remove();
    }

    setAttributes(DomAttributes = {}) {
        let { attributes } = this;

        if (typeof DomAttributes !== 'object') {
            DomAttributes = {};
        }
        this.attributes = Object.assign(attributes, DomAttributes);

        return this;
    }

    setId(id = GenerateRandomId('cid')) {
        this.id = id;

        return this;
    }

    setParent(parent) {
        this.parent = parent;

        return this;
    }

    setData(passedData) {
        let { data } = this;
        const { MergeObject } = require('./utils/index.js');
        this.data = MergeObject(passedData, data);

        return this;
    }

    renderSingularComponent(replaced) {
        let { id, component, attributes } = replaced;
        component = Object.create(component);
        let componentData;
        let dataExpression = attributes['data-bind'];

        if (dataExpression) {
            let { data } = this;
            let generateComponentData = function (dataExpression, data) {
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
                if (typeof componentData !== 'object') {
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

        if (componentData) {
            component.setData(componentData);
        }

        component.render({
            targetElement: document.getElementById(id),
        });
    }

    removeOnInitElement() {
        let { id } = this;

        $(`[on_init_${id}]`).remove();
    }

    renderOnInitElement(template) {
        let { data, id } = this;
        const generateTemplate = function (template, data, id) {
            let $template0;
            const { InterpolateText } = require('./utils/index.js');

            template = $.parseHTML(InterpolateText(data, template));
            $template0 = $(template[0]);

            const ComponentException = require('./ComponentException.js');
            if (template.length <= 0) {
                throw new ComponentException([
                    `.onInit() do not have a template.`,
                ].join(" "));
            }
            if (template.length > 1) {
                throw new ComponentException([
                    `.onInit() template must be enclosed in a`,
                    `single block-level element.`,
                ].join(" "));
            }
            if (template[0].nodeType !== 1) {
                throw new ComponentException([
                    `.onInit() template must be enclosed in a`,
                    `single block-level element.`,
                ].join(" "));
            }

            $template0.attr(`on_init_${id}`, '');

            return template;
        }
        template = generateTemplate(template, data, id);
        let { renderConfig } = this;
        let defaultConfig = {
            targetElement: document.body,
            renderType: 'replaceWith',
        };
        const { SetDefaultConfig } = require('./utils/index.js');
        let { targetElement, renderType } = SetDefaultConfig(defaultConfig, renderConfig);

        $(targetElement)[renderType](template);
    }

    refreshRenderedList(targetElement, items, listItemComponent, noItemsComponent) {
        targetElement = $(targetElement);
        targetElement.empty();

        if (!(items && items.length)) {
            if (noItemsComponent) {
                noItemsComponent.createInstance(this).render({
                    targetElement,
                    renderType: 'append',
                });
            }

            return;
        }

        for (let i = 0; i < items.length; i++) {
            let listItem = listItemComponent.createInstance(this);
            let item = items[i];
            item.index = [i];
            listItem.setData(item);

            listItem.render({
                targetElement,
                renderType: 'append',
            })
        }
    }

    destroy() {
        let { styleId } = this;
        let { $self } = this.$refs;

        $self[0].remove();
        let similarComponents = $(`[${styleId}]`);

        if (!similarComponents.length) {
            this.removeStyle();
        }
    }

    removeStyle() {
        let { styleId } = this;

        $(`style[itemid="${styleId}"]`).remove();
    }

}

module.exports = Component;