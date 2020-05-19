const renderComponent = function(replaced) {
    let listExpression = replaced.attributes['data-list'];

    if(listExpression) {
        return this.renderListComponent(replaced);
    }
    this.renderSingularComponent(replaced);
}

module.exports = renderComponent;