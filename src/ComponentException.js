class ComponentException extends Error {
    constructor(message) {
        super(message)

		this.name = 'ComponentException';
    }
}

module.exports = ComponentException;