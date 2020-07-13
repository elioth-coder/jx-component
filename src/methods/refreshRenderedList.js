const refreshRenderedList = function(targetElement, items, listItemComponent, noItemsComponent) {
    targetElement = $(targetElement);
    targetElement.empty();

    if(!(items && items.length)) {
        if(noItemsComponent) {
            noItemsComponent.createInstance(this).render({
                targetElement,
                renderType: 'append',
            });    
        }

        return;
    }

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let listItem = listItemComponent.createInstance(this);
        listItem.setData(item);

        listItem.render({
            targetElement,
            renderType: 'append',
        })
    }
}

module.exports = refreshRenderedList;
