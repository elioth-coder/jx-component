const { GenerateRandomId } = require('./utils/index.js');
const { 
    destroy,
    hierarchy,
    parentComponent,
    createInstance,
    setData,
    setParent,
    setId,
    setAttributes,
    renderSingularComponent,
    renderListComponent,
    renderComponent,
    replaceComponentTags,
    renderComponents,
    registerDomRefs,
	registerEvents,
	registerRemoveSelfEvent,
    registerMethods,
    renderShow,
    renderIf,
    generateTemplate,
    renderTemplate,
    generateStyle,
    renderStyle,
    afterRender,
    onRender,
    beforeRender,
    removeOnInitElement,
    renderOnInitElement,
    onInit,
    tweakLifeCycle,
    renameComponents,
    render,
} = require('./methods/index.js');

class Component {
	constructor(config = {}) {
		let { 
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
		} = config;

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

    destroy = destroy;
    hierarchy = hierarchy;
    parentComponent = parentComponent;
    createInstance = createInstance;
    setData = setData;
    setParent = setParent;
    setId = setId;
    setAttributes = setAttributes;
    renderSingularComponent = renderSingularComponent;
    renderListComponent = renderListComponent;
    renderComponent = renderComponent;
    replaceComponentTags = replaceComponentTags;
    renderComponents = renderComponents;
    registerDomRefs = registerDomRefs;
	registerEvents = registerEvents;
	registerRemoveSelfEvent = registerRemoveSelfEvent;
    registerMethods = registerMethods;
    renderShow = renderShow;
    renderIf = renderIf;
    generateTemplate = generateTemplate;
    renderTemplate = renderTemplate;
    generateStyle = generateStyle;
    renderStyle = renderStyle;
    afterRender = afterRender;
    onRender = onRender;
    beforeRender = beforeRender;
    removeOnInitElement = removeOnInitElement;
    renderOnInitElement = renderOnInitElement;
    onInit = onInit;
    tweakLifeCycle = tweakLifeCycle;
    renameComponents = renameComponents;
    render = render;
}

module.exports = Component;