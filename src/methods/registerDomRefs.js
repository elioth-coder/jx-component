const registerDomRefs = function() {
    let { id } = this;
    let $refs = {};
    let $self = $(`#${id}`);
    let elements = $self.find(`[domref]`);

    for(let i=0; i<elements.length; i++) {
        let $element = $(elements[i]);
        let domref = $element.attr('domref');

        $refs[`$${domref}`] = $element;
    }

    $refs[`$self`] = $self;
    this.$refs = $refs;
}

module.exports = registerDomRefs;