const parentComponent = function(n=0) {
    let repeatString = function(str='0', n=0) {
        let repeatedString = ``;

        for(let i=0; i<n; i++) {
            repeatedString += str;
        }

        return repeatedString;
    }
    let self = this;
    let script = `
        (function(){
            return self${repeatString('.parent', n+1)}
        })()
    `;
    let parent = eval(script);

    return parent;
}

module.exports = parentComponent;