const onRender = function(config) {
    this.renderStyle();
    this.renderTemplate(config);
    this.renderIf();
    this.renderShow();
    this.registerMethods();
    this.registerEvents();
    this.registerRemoveSelfEvent();
    this.registerDomRefs();
}

module.exports = onRender;