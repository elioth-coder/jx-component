const { IsThenable } = require('../utils/index.js');
const ComponentException = require('../ComponentException.js');

const render = function (config = {}) {
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

        if (IsThenable(returnValue)) {
            returnValue.then(function () {
                this.onRender(config);
                this.afterRender();
            }.bind(this))
                .catch(function (e) {
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

module.exports = render;