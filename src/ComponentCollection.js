const ComponentCollection = {
	components: [],
	add(component) { 
		this.components.push(component);
	},
	remove(component) {
		let { components } = this;
		let index = components.findIndex((item)=> {
			return item.id == component.id;
		});

		if(index <= -1) {
			return;
		}	
		components.splice(index, 1);
		this.components = components;
	},
	filter() {
		let filterComponents = function() {
			let { components } = this;

			for(let i=0; i<components.length; i++) {
				let component = components[i];
				let $component = $(`#${component.id}`);
	
				if($component.length) {
					continue;
				}
				this.remove(component);
			}		
		}.bind(this);

		setTimeout(filterComponents, 1000);
	},
	display() {
		let { components } = this;
		let items = components.map(({ id, name, styleId }) => { 
			return {
				id, 
				name, 
				styleId,
			}
		});

		console.table(items);
	}
}

module.exports = ComponentCollection;