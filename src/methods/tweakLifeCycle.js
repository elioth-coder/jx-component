const tweakLifeCycle = function() {
    let { lifeCycle } = this;
    let keys = Object.keys(lifeCycle);

    for(let i=0; i<keys.length; i++) {
        let key = keys[i];
        let fn = lifeCycle[key];

        if(typeof fn !== 'function') {
            continue;
        }
        lifeCycle[key] = fn.bind(this);
    }

    this.lifeCycle = lifeCycle;
}

module.exports = tweakLifeCycle;