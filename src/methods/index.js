const destroy = require('./destroy.js');
const hierarchy = require('./hierarchy.js');
const parentComponent = require('./parentComponent.js');
const createInstance = require('./createInstance.js');
const setData = require('./setData.js');
const setParent = require('./setParent.js');
const setId = require('./setId.js');
const setAttributes = require('./setAttributes.js');
const renderSingularComponent = require('./renderSingularComponent.js');
const renderListComponent = require('./renderListComponent.js');
const refreshRenderedList = require('./refreshRenderedList.js');
const renderComponent = require('./renderComponent.js');
const replaceComponentTags = require('./replaceComponentTags.js');
const renderComponents = require('./renderComponents.js');
const registerDomRefs = require('./registerDomRefs.js');
const registerEvents = require('./registerEvents.js');
const registerRemoveSelfEvent = require('./registerRemoveSelfEvent.js');
const registerMethods = require('./registerMethods.js');
const renderShow = require('./renderShow.js');
const renderIf = require('./renderIf.js');
const generateTemplate = require('./generateTemplate.js');
const renderTemplate = require('./renderTemplate.js');
const generateStyle = require('./generateStyle.js');
const renderStyle = require('./renderStyle.js');
const afterRender = require('./afterRender.js');
const onRender = require('./onRender.js');
const beforeRender = require('./beforeRender.js');
const removeOnInitElement = require('./removeOnInitElement.js');
const renderOnInitElement = require('./renderOnInitElement.js');
const onInit = require('./onInit.js');
const tweakLifeCycle = require('./tweakLifeCycle.js');
const renameComponents = require('./renameComponents.js');
const render = require('./render.js');


module.exports = {
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
    refreshRenderedList,
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
}