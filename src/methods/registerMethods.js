const registerMethods = function() {
    let { methods } = this;
    let keys = Object.keys(methods);

    for(let i=0; i<keys.length; i++) {
        let key = keys[i];
        let fn = methods[key];

        if(typeof fn !== 'function') {
            continue;
        }
        methods[key] = fn.bind(this);
    }

    this.methods = methods;
}

module.exports = registerMethods;