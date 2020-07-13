# jxComponent

A component based javascript framework using [jQuery](https://jquery.com) library.

[Features](#features) | [Tips and Tricks](#tips-and-tricks) | [Caveats](#caveats) | [Sample Projects](#sample-projects) | [Github Repo](#github-repository) | [Report Issues](#report-issues)

## Download

- [For development - CDN (from jsdelivr.com)](https://cdn.jsdelivr.net/gh/elioth-coder/jx-component/dist/jx-component.js)
- [For production - CDN](https://cdn.jsdelivr.net/gh/elioth-coder/jx-component/dist/jx-component.min.js)

## Installation

Using sript:

```html
<script src="https://cdn.jsdelivr.net/gh/elioth-coder/jx-component/dist/jx-component.js"></script>
```

Using npm:

```shell
npm i --save jx-component
```

Getting the `ComponentConstructor` object:

```javascript
// When using script:
const { ComponentConstructor } = jxComponent;

// When using browserify:
const { ComponentConstructor } = require("jx-component");
```

## Why jxComponent

[jxComponent](#jxcomponent) borrows the power of [jQuery](https://jquery.com) library and adapted some of [Vue](https://vuejs.org)'s framework design. It does not adapt [Vue](https://vuejs.org)'s reactivity feature though, so that developers can have more control on how to update the DOM using the [jQuery](https://jquery.com) library.

## Features

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
    name: "Christian",
    country: "Philippines",
  },
  template: `
        <h1>Hi, I'm {{ name }} from the {{ country }}.</h1>
    `,
})

NameCountryComponent.render({
  targetElement: document.getElementById("container"),
  // renderType: 'replaceWith'
  // (Note: 'replaceWith' is the default value of renderType)
})
```

The code above will render something like:

```html
<h1>Hi, I'm Christian from the Philippines.</h1>
```

[jxComponent](#jxcomponent) uses the three render types `replaceWith`, `append` and `html` from the [jQuery](https://jquery.com) library. The `renderType` will default to `replaceWith` if nothing was specified.
At the sample code above [jxComponent](#jxcomponent) finds the target element `document.getElementById('container')` and then replace that element.

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
})
```

The code above will render something like:

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
<div class="red-box">
  <h1>Hi, I'm a red box.</h1>
</div>
```

[jxComponent](#jxcomponent) requires having `[{{ styleId }}]` at the beginning of the selectors in order to accurately style the component. Failing to use `[{{ styleId }}]` will cause the component style to not be applied. `[{{ styleId }}]` is a unique reference id to the root element of the component.

### Data Binding

```javascript
const SonComponent = ComponentConstructor.create({
  template: `
    <p>
      <strong>Son: </strong>Hello, I'm {{ name }} I am {{ age }} years old.
    </p>
  `,
})

const FatherComponent = ComponentConstructor.create({
  data: {
    name: "James",
    son: {
      name: "Jun",
      age: 3,
    },
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
  },
})
```

The code above will render something like:

```html
<div>
  <p><strong>Father: </strong> Hi I'm James I have a son named Jun.</p>
  <p><strong>Son: </strong>Hello, I'm Jun I am 3 years old.</p>
</div>
```

Passing and binding data between components in [jxComponent](#jxcomponent) are done using the `data-bind` attribute. If you want to passed the data `son` you can do so by using `data-bind="son"` or by doing a data destructuring which is the recommended way by using `data-bind="{ name, age } = son"`.

### Conditional Rendering

```javascript
const CurrentlyUsingOSComponent = ComponentConstructor.create({
  data: {
    os: "windows",
  },
  template: `
    <div>
      <h1>Question: What Operating System are you using?</h1>
      <h3 data-if="os==='linux'">Answer: Im using Linux.</h3>
      <h3 data-if="os==='macos'">Answer: Im using Mac OS.</h3>
      <h3 data-if="os==='windows'">Answer: Im using Windows.</h3>
    </div>
  `,
})
```

The code above will render something like:

```html
<div>
  <h1>Question: What Operating System are you using?</h1>
  <h3>Answer: Im using Windows.</h3>
</div>
```

Notice that the other `<h3>` elements were not rendered and only the `<h3>` element with the attribute `data-if="os==='windows'"` was rendered, that's because `data-if` attribute will only render the element if the condition on the attribute is `true`.
If you only want to hide the other elements [jxComponent](#jxcomponent) has another attribute called `data-show`. The `data-show` attribute will show the element if the condition is `true` and hides it when it was `false`(Note: the element was still rendered.)

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

At the code above the value `item in items` of `data-list` will cause the [jxComponent](#jxcomponent) to iterate over the `items` array of the parent component `ProductList` and pass the data `item` to the child component `ListItem`. The expression `{ name, price }` on `data-bind` attribute is equivalent to `{ name, price } = item;`. You can also shorten that to `data-bind="item"` but the text interpolation will become like this `{{ item.name }}` instead of just `{{ name }}` on `ListItem` component template.

If you want to show the index of the item just use `{{ index }}`. But be careful not to pass a data with a name `index` on the `ListItem` component, because [jxComponent](#jxcomponent) automatically pass the `index` data into the child component.

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
    },
  },
})
```

The code above will render a button, that when clicked will popup an alert message saying `"You clicked me!"` and will console the element who triggered the click event.
[jxComponent](#jxcomponent) adds event listeners to the components by using the `on-[EventType]="[FunctionName]"` pattern. So adding `on-click="clickAlert"` attribute on a button is equivalent to `button.addEventListener("click", events.clickAlert)`.

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
    },
  },
  events: {
    sayAgentName() {
      let { getAgentName } = this.methods;

      alert(`Agent name: ${getAgentName()}`);
    },
  },
})
```

The code above will render a button, that when clicked will popup an alert message saying `"Agent name: James Bond"`.
[jxComponent](#jxcomponent) uses the `methods` property to contain helpful functions for your component which is accessible by calling `this.methods`.

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

      $box2.css({ backgroundColor: "red" });
      $box4.css({ backgroundColor: "red" });
      $box6.css({ backgroundColor: "red" });
    },
    turnOddBoxesGreen() {
      let { $box1, $box3, $box5 } = this.$refs;

      $box1.css({ backgroundColor: "green" });
      $box3.css({ backgroundColor: "green" });
      $box5.css({ backgroundColor: "green" });
    },
  },
})
```

The code above will render six boxes with similar sizes and two buttons below the six boxes. Clicking the first button will change the color of the boxes marked with even numbers to red. While clicking the second button will change the color of the boxes marked with odd numbers to green.
[jxComponent](#jxcomponent) uses the value of the `domref` attribute to reference a DOM element. Adding `domref="box1"` on an element is equivalent to `$('[domref="box1"]')`. [jxComponent](#jxcomponent) stores the value of `$('[domref="box1"]')` to `this.$refs.$box1`.

### Life cycle hooks

```javascript
const MessagesComponent = ComponentConstructor.create({
  data: {
    messages: [],
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
    beforeRender: async function () {
      this.data, (messages = await fetch("http://example.com/messages"));

      console.log(`Successfully fetched messages from the server.`);
    },
    afterRender() {
      console.log(`Component with id: ${this.id} was rendered successfully.`);
    },
  },
})
```

On the code above the `onInit` will be the first to execute followed by `beforeRender` and then `afterRender`.
Unlike Vue or React, [jxComponent](#jxcomponent) only have these three life cycle hooks `onInit`, `beforeRender` and `afterRender`.

#### Recommended usage for jxComponent's life cycle hooks

- `onInit` - rendering .gif image loaders.
- `beforeRender` - fetching data from the server.
- `afterRender` - rendering other components not related to the component.

[ [Back to Top](#jxcomponent) | [Features](#features) ]

## Tips and Tricks

### Communicating with the Parent Component

```javascript
const SonComponent = ComponentConstructor.create({
  data: {
    name: 'Calvin'
  },
  template: `
    <div>
      <h3>I'm the son component</h3>
      <button on-click="introduceFamily">Introduce family.</button>
    </div>
  `,
  events: {
    introduceFamily() {
      let { introduce } = this.methods;

      introduce();
    }
  },
  methods: {
    introduce() {
      let grandFather = this.parentComponent(1);
      let father = this.parentComponent();

      console.log(`Hi I'm ${name}.`);
      console.log(`My father is Mr. ${grandFather.data.name}.`);
      father.methods.introduce();
      console.log(`And my grandfather is Mr. ${father.data.name}.`);
      grandFather.methods.introduce();
    }
  },
})

const FatherComponent = ComponentConstructor.create({
  data: {
    name: 'James'
  },
  template: `
    <div>
      <h3>I'm the father component</h3>
      <son-component></son-component>
    </div>
  `,
  methods: {
    introduce() {
      let { name } = this.data;

      console.log(`Hi I'm his father ${name}.`);
    }
  },
  components: {
    SonComponent,
  }
})

const GrandFatherComponent = ComponentConstructor.create({
  data: {
    name: 'Arthur'
  },
  template: `
    <div>
      <h3>I'm the grandfather component</h3>
      <father-component></father-component>
    </div>
  `,
  methods: {
    introduce() {
      let { name } = this.data;

      console.log(`Hi I'm his grandfather ${name}.`);
    }
  },
  components: {
    FatherComponent,
  }
})
```

The code above demonstrates how you can access the parent component by calling `this.parentComponent()`. And by adding a parameter in `this.parentComponent(1)` you can access the grandparent component, this feature makes it easy to relay messages to the top-level component. Even if the component relaying the message is nested five levels inside the top-level component you can just call `this.parentComponent(4)` in that component to access the top-level component.

**Note:** You can use `console.log(this.hierarchy().join(" > "))` to check how many levels the component is nested inside the top-level component.

### Refreshing the list when the data updates

```javascript
const TodoItem = ComponentConstructor.create({
  template: `
    <tr>
      <td>{{ index }}.</td>
      <td>{{ name }}</td>
      <td><button>&times;</button></td>
    </tr>
    `,
})

const NoItems = ComponentConstructor.create({
  template: `
    <tr>
      <td colspan="3" style="text-align: center;">No items found.</td>
    </tr>
    `,
})

const TodoList = ComponentConstructor.create({
  data: {
    todos: [],
  },
  template: `
    <div>
      <h1>Todo List</h1>
      <table>
        <thead>
          <tr><th>ID</th><th>Todo Items</th><th>Delete</th></tr>
        </thead>
        <tbody domref="tbody">
          <todo-item
            data-if="todos.length"
            data-list="todo in todos"
            data-bind="{ id, name }"
          ></todo-item>
          <no-items
            data-if="!todos.length"
          ></no-items>
        </tbody>
      </table>
    </div>
    `,
  methods: {
    renderTodos() {
      let { TodoItem, NoItems } = this.components;
      let { todos } = this.data;
      let { $tbody } = this.$refs;

      this.refreshRenderedList($tbody, todos, TodoItem, NoItems)
    },
  },
  lifeCycle: {
    afterRender() {
      let { renderTodos } = this.methods;
      let todos = [
        { id: 11234235, name: "Task 1" },
        { id: 23454457, name: "Task 2" },
        { id: 78574563, name: "Task 3" },
        { id: 37868232, name: "Task 4" },
        { id: 79698543, name: "Task 5" },
      ];

      this.data.todos = todos;
      renderTodos();
    },
  },
  components: {
    TodoItem,
    NoItems,
  },
})
```

The code above demonstrates how to refresh the list when the data updates using the `this.refreshRenderedList($tbody, todos, TodoItem, Noitems);` method. The first parameter `$tbody` is the target element that the `jQuery` will update. The second parameter `todos` is the updated data to be used on refreshing the list. The third parameter `TodoItem` is the list item component to used when rendering list of data. The fourth parameter `NoItems` is optional it will be the component to be rendered when the data is just an empty array.

### Optimizing Search Using the `debounce` Attribute

```javascript
const PetSearcher = ComponentConstructor.create({
    data: {
        pets: [
          'Dog',
          'Cat',
          'Mouse',
          'Hamster',
          'Rabbit',
          'Bird',
          'Pig',
          'Chicken',
        ],
    },
    template: `
    <div>
      <h1>Search Pet</h1>
      <div>
        <input id="search" domref="search" type="text"
            on-keyup="search"
            debounce="keyup,1000"
            placeholder="Enter the pet to search"
        />
        <hr>
        <p>Check the results on your console.</p>
      </div>
    </div>  
    `,
    events: {
      search(event) {
        let { pets } = this.data;

        // Note: You must get FuzzySearch.js for this code to work.
        // Here is the link to it's github repository https://github.com/wouter2203/fuzzy-search
        const searcher = new FuzzySearch(pets);
        const results = searcher.search(event.target.value); // event.target is the input element.

        console.log(results);
      },
    },
})

PetSearcher.render({
    targetElement: document.getElementById('container'),
})
```

The code above demonstrates how to optimize your search using the `debounce` attribute. The `debounce` attribute requires two parameters (ex. `debounce="keyup,1000"`) the first parameter(`keyup`) is the type of the event while the second parameter(`1000`) is the number of milliseconds to wait (Note. `1000 is equivalent to 1 second`). The advantage of using the `debounce` attribute is that it lessens the number of times the system will search(or make an HTTP request in the server.), by only searching after the user stopped typing for 1 second, instead of searching after every keystroke (In case of the code above.)

(Note: Normally the `event` parameter in the `search(event)` is not required and you can just do `search()` and you'll still have access for the [Event](https://dom.spec.whatwg.org/#dom-event-event) object. But in the case where you are using the `debounce` attribute it is required to put the `event` parameter to have an access to the [Event](https://dom.spec.whatwg.org/#dom-event-event) object.

[ [Back to Top](#jxcomponent) | [Tips and Tricks](#tips-and-tricks) ]

## Caveats

- Always add a closing tag to your component (e.g. `<list-item></list-item>`).
- Do not use component tags(e.g. `<list-item></list-item>`) inside a `<ul>` element. The same goes for `<table>`, `<thead>`, `<tbody>`, `<tfoot>` and `<tr>` elements. Doing so will result in the component being rendered outside of that element. The workaround here is to use the `component-alias` attribute. You can use it in `<li>` element like this `<ul><li component-alias="list-item"></li><ul>`.
- All elements with the `component-alias` attribute are treated by [jxComponent](#jxcomponent) as a component tag.

## Sample Projects

- [Click Counter](https://codepen.io/elioth-coder/pen/LYpgbPW) - counts the number of times the button is clicked.
- [Todo List](https://codepen.io/elioth-coder/pen/dyYgRBy) - making a list of things to do.
- [Item Price List](https://codepen.io/elioth-coder/pen/rNOEqBW) - making a list of item prices.
- [Optimized Search](https://codepen.io/elioth-coder/pen/dyGKBem) - doing an optimized search using the `debounce` attribute.

## Browser Support

All es6 compliant browsers.

## Github Repository

[https://github.com/elioth-coder/jx-component](https://github.com/elioth-coder/jx-component)

## Report Issues

[https://github.com/elioth-coder/jx-component/issues](https://github.com/elioth-coder/jx-component/issues)

## NPM Registry

[https://www.npmjs.com/package/jx-component](https://www.npmjs.com/package/jx-component)
