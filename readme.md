# jxComponent

A component based javascript framework using [jQuery](https://jquery.com) library.

## Download

- [For development - CDN (from jsdelivr.com)](https://cdn.jsdelivr.net/gh/elioth-coder/jx-component/dist/jx-component.js)
- [For production - CDN (from jsdelivr.com)](https://cdn.jsdelivr.net/gh/elioth-coder/jx-component/dist/jx-component.min.js)

## Installation

Using sript:

```html
<script src="https://cdn.jsdelivr.net/gh/elioth-coder/jx-component/dist/jx-component.min.js"></script>
```

Using npm:

```shell
npm i --save jx-component
```

Getting the `ComponentConstructor` object:

```javascript
// When using script:
const { ComponentConstructor } = jxComponent;

// When using npm:
const { ComponentConstructor } = require("jx-component");
```

## Why jxComponent?

jxComponent borrows the power of [jQuery](https://jquery.com) library and adapted some of [Vue](https://vuejs.org)'s framework design. It does not adapt [Vue](https://vuejs.org)'s reactivity feature though, so that developers can have more control on how to update the DOM using the [jQuery](https://jquery.com) library.
Below is the list of jxComponent's features:

- [Template Syntax](#template-syntax)
- [Component Styling](#component-styling)
- [Data Binding](#data-binding)
- [Conditional Rendering](#conditional-rendering)
- [List Rendering](#list-rendering)
- [Event Handling](#event-handling)
- [Methods](#methods)
- [DOM Referencing](#dom-referencing)
- [Life Cycle Hooks](#life-cycle-hooks)

### Template Syntax

```javascript
const NameCountryComponent = ComponentConstructor.create({
  data: {
    name: "Juan",
    country: "Philippines",
  },
  template: `
        <h1>Hi, I'm {{ name }} from the {{ country }}.</h1>
    `,
});

NameCountryComponent.render({
  targetElement: document.getElementById("container"),
});
```

The the code above will render something like:

```html
<h1>Hi, I'm Juan from the Philippines.</h1>
```

jxComponent uses the three render types `replaceWith`, `append` and `html` from the [jQuery](https://jquery.com) library. The `renderType` will default to `replaceWith` if nothing was specified. 
At the sample code above jxComponent finds the target element `document.getElementById('container')` and then replace that element.

### Component Styling

```javascript
const RedBoxComponent = ComponentConstructor.create({
  style: `
    [{{ styleId }}] {
        width: 300px;
        height: 300px;
        background-color: red;
    }
    [{{ styleId }}] h3 {
        text-align: center;
    }
    `,
  template: `
    <div class="red-box">
        <h3> Hi, I'm a red box.</h3>
    </div>
    `,
});
```

The the code above will render something like:

```html
<style>
.red-box {
    width: 300px;
    height: 300px;
    background-color: red;
}
.red-box h3 {
    text-align: center;
}
</style>
<div id="red-box">
    <h1>Hi, I'm a red box.</h1>
</div>
```

jxComponent requires having `[{{ styleId }}]` at the beginning of the selectors in order to accurately style the component. Failing to use `[{{ styleId }}]` will cause the component style to not be applied. `[{{ styleId }}]` is a unique reference id to the root element of the component's template.

### Data Binding

```javascript
const SonComponent = ComponentConstructor.create({
  template: `
    <p>
      <strong>Son: </strong>Hello, I'm {{ name }} I am {{ age }} years old.
    </p>
  `    
})

const FatherComponent = ComponentConstructor.create({
  data: {
    name: 'James',
    son: { 
      name: 'Jun',
      age: 3
    }
  },
  template: `
    <div>
      <p><strong>Father: </strong> Hi I'm {{ name }} I have a son named {{ son.name }}.</p>
      <son-component 
        data-bind="{ name, age } = son"
      ></son-component>
    </div>
  `,
  components: {
    SonComponent,
  }
})
```

The code above will render something like:

```html
<div>
    <p><strong>Father: </strong> Hi I'm James I have a son named Jun.</p> 
    <p><strong>Son: </strong>Hello, I'm Jun I am 3 years old. </p> 
</div>
```

Passing and binding data between components in jxComponent are done using the `data-bind` attribute. If you want to passed the data `son` you can do so by using `data-bind="son"` or by doing a data destructuring which is the recommended way by using `data-bind="{ name, age } = son"`.

### Conditional Rendering

```javascript
const CurrentlyUsingOSComponent = ComponentConstructor.create({
  data: {
    os: 'windows'
  },
  template: `
    <div>
      <h1>Question: What Operating System are you using?</h1>
      <h3 data-if="os==='linux'">Answer: Im using Linux.</h3>
      <h3 data-if="os==='macos'">Answer: Im using Mac OS.</h3>
      <h3 data-if="os==='windows'">Answer: Im using Windows.</h3>
    </div>
  `
})
```

The code above will render something like: 

```html
<div>
    <h1>Question: What Operating System are you using?</h1>
    <h3>Answer: Im using Windows.</h3>
</div>
```

Notice that the other `<h3>` elements were not rendered and only the `<h3>` element with the attribute `data-if="os==='windows'"` was rendered. That is the because `data-if` attribute will only render the element if the condition is `true`. 
If you only want to hide the other elements jxComponent has another attribute called `data-show`. The `data-show` attribute will show the element if the condition is `true` and hides it when it was `false`. 

### List Rendering

```javascript
const ListItem = ComponentConstructor.create({
  template: `
        <p>{{ index + 1 }}. {{ name }} | {{ price }}</p>
    `,
})
const NoItems = ComponentConstructor.create({
  template: `
        <p>No items found.</p>
    `,
})

const PriceList = ComponentConstructor.create({
  data: {
    items: [
      { name: "Item 1", price: 100 },
      { name: "Item 2", price: 100 },
      { name: "Item 3", price: 100 },
      { name: "Item 4", price: 100 },
      { name: "Item 5", price: 100 },
    ],
  },
  template: `
        <div>
            <h1>Item Price List</h1>
            <list-item 
              data-if="items.length" 
              data-list="item in items" 
              data-bind="{ name, price }"
            ></list-item>
            <no-items data-if="!items.length"></no-items>
        </div>
    `,
  components: {
    ListItem,
    NoItems,
  },
})

PriceList.render({
  targetElement: document.getElementById("container"),
})
```

The code above will render something like:

```html
<div>
  <h1>Item Price List</h1>
  <p>1. Item 1 | 100</p>
  <p>2. Item 2 | 100</p>
  <p>3. Item 3 | 100</p>
  <p>4. Item 4 | 100</p>
  <p>5. Item 5 | 100</p>
</div>
```

If there are no items it will render like:

```html
<div>
  <h1>Item Price List</h1>
  <p>No items found.</p>
</div>
```

At the code above the value `item in items` of `data-list` will cause the jxComponent to iterate over the `items` array of the parent component and pass the data `item` to the child component `ListItem`. The expression `{ name, price }` on `data-bind` attribute is equivalent to `{ name, price } = item;`. You can also shorten that to `data-bind="item"` but the text interpolation will become like this `{{ item.name }}` instead of just `{{ name }}` on `ListItem` component.

If you want to show the index of the item just use `{{ index }}`. But be careful not to pass a data with a name `index` on the `ListItem` component, because jxComponent automatically set the `index`'s value to be the `index` of the current array item.

### Event Handling

```javascript
const ClickMeComponent = ComponentConstructor.create({
  template: `
    <button on-click="clickAlert">Click me!</button>
  `,
  events: {
    clickAlert() {
      alert("You clicked me!");
      console.log(event.target);
    }
  }
})
```

The code above will render a button that when clicked will popup an alert message saying `"You clicked me!"` and will console the element who triggered the click event.
jxComponent adds event listeners to the components by using the `on-[EventType]="[FunctionName]"` pattern. So adding `on-click="clickAlert"` attribute on a button is equivalent to `button.addEventListener("click", events.clickAlert)`.

### Methods

```javascript
const SayAgentNameComponent = ComponentConstructor.create({
  data: {
    firstName: "James",
    lastName: "Bond",
  },
  template: `
    <button on-click="sayAgentName">Say agent name</button>
  `,
  methods: {
    getAgentName() {
      let { firstName, lastName } = this.data;

      return firstName + " " + lastName;
    }
  },
  events: {
    sayAgentName() {
      let { getAgentName } = this.methods;

      alert(`Agent name: ${getAgentName()}`);
    }
  }
})
```

The code above will render a button that when clicked will popup an alert message saying `"Agent name: James Bond"`.
jxComponent uses the `methods` property to contain helpful functions for your component which is accessible by calling `this.methods`.

### DOM Referencing

```javascript
var ColoredBoxesComponent = ComponentConstructor.create({
  style: `
    [{{ styleId }}] .box {
      width: 100px;
      height: 100px;
      border: 1px solid #ddd;
      float: left;
      margin: 5px;
    }
    [{{ styleId }}] .box h1 {
      text-align: center;
    }
  `,
  template: `
    <div>
      <div domref="box1" class="box"><h1>1</h1></div>
      <div domref="box2" class="box"><h1>2</h1></div>
      <div domref="box3" class="box"><h1>3</h1></div>
      <div domref="box4" class="box"><h1>4</h1></div>
      <div domref="box5" class="box"><h1>5</h1></div>
      <div domref="box6" class="box"><h1>6</h1></div>
      <hr>
      <button on-click="turnEvenBoxesRed">Turn boxes with even numbers red</button>
      <button on-click="turnOddBoxesGreen">Turn boxes with odd numbers green</button>
    </div>
  `,
  events: {
    turnEvenBoxesRed() {
      let { $box2, $box4, $box6 } = this.$refs;

      $box2.css({backgroundColor: 'red'});
      $box4.css({backgroundColor: 'red'});
      $box6.css({backgroundColor: 'red'});
    },
    turnOddBoxesGreen() {
      let { $box1, $box3, $box5 } = this.$refs;

      $box1.css({backgroundColor: 'green'});
      $box3.css({backgroundColor: 'green'});
      $box5.css({backgroundColor: 'green'});
    }
  }

})
```

The code above will render six boxes with similar sizes and two buttons. Clicking the first button will change the color of boxes with even numbers to red. While clicking the second button will change the color of boxes with odd numbers to green.
jxComponent uses the value of the `domref` attribute to reference a DOM element. Adding `domref="box1"` on an element is equivalent to `$('[domref="box1"]')`. jxComponent stores the value of `$('[domref="box1"]')` to `this.$refs.$box1`.

### Life cycle hooks

```javascript
const MessagesComponent = ComponentConstructor.create({
  data: {
    messages: []
  },
  lifeCycle: {
    onInit() {
      let loaderTemplate = `
        <p style="text-align:center;">
          <img src="loader.gif" />
        </p>
      `;

      this.renderOnInitElement(loaderTemplate);
    },
    beforeRender: async function() {
      this.data,messages = await fetch('http://example.com/messages');

      console.log(`Successfully fetched messages from the server.`);
    },
    afterRender() {
      console.log(`Component with id: ${this.id} was rendered successfully.`);
    }
  }
})

```

On the code above the `onInit` will be the first to execute followed by `beforeRender` and then `afterRender`.
Unlike Vue or React, jxComponent only have these three life cycle hooks `onInit`, `beforeRender` and `afterRender`. 

#### Recommended usage for jxComponent's life cycle hooks:

- `onInit` - rendering .gif image loaders.
- `beforeRender` - fetching data from the server.
- `afterRender` - rendering other components not related to the component.

## Sample Projects

- [Click Counter](https://codepen.io/elioth-coder/pen/LYpgbPW) - counts the number of times the button is clicked.
- [Todo List](https://codepen.io/elioth-coder/pen/dyYgRBy) - Making a list of things to do.

## Browser Support

All es6 compliant browsers.

## Github Repository

[https://github.com/elioth-coder/jx-component](https://github.com/elioth-coder/jx-component)

## NPM Registry

[https://www.npmjs.com/package/@elioth.coder/jx-component](https://www.npmjs.com/package/@elioth.coder/jx-component)
