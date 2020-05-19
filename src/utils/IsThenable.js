const IsThenable = function(fn) {
    if(!fn) {
        return false;
    }

    let isPromise = fn instanceof Promise;
    let isAsync = fn.constructor.name === 'AsyncFunction';
    
    return isPromise || isAsync;
}

module.exports = IsThenable;