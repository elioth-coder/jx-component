(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jxComponent = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var ComponentCollection = require('./src/ComponentCollection.js');

var ComponentException = require('./src/ComponentException.js');

var ComponentConstructor = require('./src/ComponentConstructor.js');

var Component = require('./src/Component.js');

module.exports = {
  ComponentCollection: ComponentCollection,
  ComponentException: ComponentException,
  ComponentConstructor: ComponentConstructor,
  Component: Component
};

},{"./src/Component.js":2,"./src/ComponentCollection.js":3,"./src/ComponentConstructor.js":4,"./src/ComponentException.js":5}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('./utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId;

var _require2 = require('./methods/index.js'),
    destroy = _require2.destroy,
    hierarchy = _require2.hierarchy,
    parentComponent = _require2.parentComponent,
    createInstance = _require2.createInstance,
    setData = _require2.setData,
    setParent = _require2.setParent,
    setId = _require2.setId,
    setAttributes = _require2.setAttributes,
    renderSingularComponent = _require2.renderSingularComponent,
    renderListComponent = _require2.renderListComponent,
    renderComponent = _require2.renderComponent,
    replaceComponentTags = _require2.replaceComponentTags,
    renderComponents = _require2.renderComponents,
    registerDomRefs = _require2.registerDomRefs,
    registerEvents = _require2.registerEvents,
    registerRemoveSelfEvent = _require2.registerRemoveSelfEvent,
    registerMethods = _require2.registerMethods,
    renderShow = _require2.renderShow,
    renderIf = _require2.renderIf,
    generateTemplate = _require2.generateTemplate,
    renderTemplate = _require2.renderTemplate,
    generateStyle = _require2.generateStyle,
    renderStyle = _require2.renderStyle,
    afterRender = _require2.afterRender,
    onRender = _require2.onRender,
    beforeRender = _require2.beforeRender,
    removeOnInitElement = _require2.removeOnInitElement,
    renderOnInitElement = _require2.renderOnInitElement,
    onInit = _require2.onInit,
    tweakLifeCycle = _require2.tweakLifeCycle,
    renameComponents = _require2.renameComponents,
    render = _require2.render;

var Component = function Component() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Component);

  _defineProperty(this, "destroy", destroy);

  _defineProperty(this, "hierarchy", hierarchy);

  _defineProperty(this, "parentComponent", parentComponent);

  _defineProperty(this, "createInstance", createInstance);

  _defineProperty(this, "setData", setData);

  _defineProperty(this, "setParent", setParent);

  _defineProperty(this, "setId", setId);

  _defineProperty(this, "setAttributes", setAttributes);

  _defineProperty(this, "renderSingularComponent", renderSingularComponent);

  _defineProperty(this, "renderListComponent", renderListComponent);

  _defineProperty(this, "renderComponent", renderComponent);

  _defineProperty(this, "replaceComponentTags", replaceComponentTags);

  _defineProperty(this, "renderComponents", renderComponents);

  _defineProperty(this, "registerDomRefs", registerDomRefs);

  _defineProperty(this, "registerEvents", registerEvents);

  _defineProperty(this, "registerRemoveSelfEvent", registerRemoveSelfEvent);

  _defineProperty(this, "registerMethods", registerMethods);

  _defineProperty(this, "renderShow", renderShow);

  _defineProperty(this, "renderIf", renderIf);

  _defineProperty(this, "generateTemplate", generateTemplate);

  _defineProperty(this, "renderTemplate", renderTemplate);

  _defineProperty(this, "generateStyle", generateStyle);

  _defineProperty(this, "renderStyle", renderStyle);

  _defineProperty(this, "afterRender", afterRender);

  _defineProperty(this, "onRender", onRender);

  _defineProperty(this, "beforeRender", beforeRender);

  _defineProperty(this, "removeOnInitElement", removeOnInitElement);

  _defineProperty(this, "renderOnInitElement", renderOnInitElement);

  _defineProperty(this, "onInit", onInit);

  _defineProperty(this, "tweakLifeCycle", tweakLifeCycle);

  _defineProperty(this, "renameComponents", renameComponents);

  _defineProperty(this, "render", render);

  var name = config.name,
      styleId = config.styleId,
      style = config.style,
      template = config.template,
      data = config.data,
      events = config.events,
      methods = config.methods,
      lifeCycle = config.lifeCycle,
      components = config.components,
      attributes = config.attributes,
      parent = config.parent;
  this.id = GenerateRandomId('cid');
  this.name = name;
  this.styleId = styleId;
  this.style = style;
  this.template = template;
  this.data = data;
  this.events = events;
  this.methods = methods;
  this.lifeCycle = lifeCycle;
  this.components = components;
  this.attributes = attributes;
  this.$refs = {};
  this.parent = parent;
};

module.exports = Component;

},{"./methods/index.js":16,"./utils/index.js":51}],3:[function(require,module,exports){
"use strict";

var ComponentCollection = {
  components: [],
  add: function add(component) {
    this.components.push(component);
  },
  remove: function remove(component) {
    var components = this.components;
    var index = components.findIndex(function (item) {
      return item.id == component.id;
    });

    if (index <= -1) {
      return;
    }

    components.splice(index, 1);
    this.components = components;
  },
  filter: function filter() {
    var filterComponents = function () {
      var components = this.components;

      for (var i = 0; i < components.length; i++) {
        var component = components[i];
        var $component = $("#".concat(component.id));

        if ($component.length) {
          continue;
        }

        this.remove(component);
      }
    }.bind(this);

    setTimeout(filterComponents, 1000);
  },
  display: function display() {
    var components = this.components;
    var items = components.map(function (_ref) {
      var id = _ref.id,
          name = _ref.name,
          styleId = _ref.styleId;
      return {
        id: id,
        name: name,
        styleId: styleId
      };
    });
    console.table(items);
  }
};
module.exports = ComponentCollection;

},{}],4:[function(require,module,exports){
"use strict";

var Component = require('./Component.js');

var _require = require('./utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId,
    SetDefaultConfig = _require.SetDefaultConfig;

var ComponentConstructor = {
  create: function create() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultConfig = {
      styleId: GenerateRandomId('css'),
      template: "\n\t\t\t\t<div>\n\t\t\t\t\t<h1> Component rendered. </h1>\n\t\t\t\t</div>\n\t\t\t",
      data: {},
      events: {},
      methods: {},
      lifeCycle: {},
      components: {},
      attributes: {},
      parent: null
    };
    config = SetDefaultConfig(defaultConfig, config);
    var _config = config,
        name = _config.name;
    return new Component(config);
  }
};
module.exports = ComponentConstructor;

},{"./Component.js":2,"./utils/index.js":51}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ComponentException = /*#__PURE__*/function (_Error) {
  _inherits(ComponentException, _Error);

  var _super = _createSuper(ComponentException);

  function ComponentException(message) {
    var _this;

    _classCallCheck(this, ComponentException);

    _this = _super.call(this, message);
    _this.name = 'ComponentException';
    return _this;
  }

  return ComponentException;
}( /*#__PURE__*/_wrapNativeSuper(Error));

module.exports = ComponentException;

},{}],6:[function(require,module,exports){
"use strict";

var removeStyle = require('./removeStyle.js');

var styleExists = require('./styleExists.js');

module.exports = {
  removeStyle: removeStyle,
  styleExists: styleExists
};

},{"./removeStyle.js":7,"./styleExists.js":8}],7:[function(require,module,exports){
"use strict";

var removeStyle = function removeStyle(id) {
  $("style[itemid=\"".concat(id, "\"]")).remove();
};

module.exports = removeStyle;

},{}],8:[function(require,module,exports){
"use strict";

var styleExists = function styleExists(id) {
  return $("style[itemid=\"".concat(id, "\"]")).length;
};

module.exports = styleExists;

},{}],9:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    IsThenable = _require.IsThenable;

var ComponentException = require('../ComponentException.js');

var ComponentCollection = require('../ComponentCollection.js');

var afterRender = function afterRender() {
  var afterRender = this.lifeCycle.afterRender;
  var returnValue;

  if (afterRender) {
    returnValue = this.lifeCycle.afterRender();
  }

  if (IsThenable(returnValue)) {
    returnValue.then(function () {
      this.renderComponents();
    }.bind(this))["catch"](function (e) {
      throw new ComponentException(e.message);
    });
    return;
  }

  this.renderComponents();
  this.removeOnInitElement();
  ComponentCollection.add(this);
};

module.exports = afterRender;

},{"../ComponentCollection.js":3,"../ComponentException.js":5,"../utils/index.js":51}],10:[function(require,module,exports){
"use strict";

var beforeRender = function beforeRender() {
  return this.lifeCycle.beforeRender();
};

module.exports = beforeRender;

},{}],11:[function(require,module,exports){
"use strict";

var createInstance = function createInstance(parent) {
  var createdInstance = Object.create(this);
  createdInstance.setParent(parent).setId();
  return createdInstance;
};

module.exports = createInstance;

},{}],12:[function(require,module,exports){
"use strict";

var _require = require('../helpers/index.js'),
    removeStyle = _require.removeStyle;

var destroy = function destroy() {
  var styleId = this.styleId;
  var $self = this.$refs.$self;
  $self[0].remove();
  var similarComponents = $("[".concat(styleId, "]"));

  if (!similarComponents.length) {
    removeStyle(styleId);
  }
};

module.exports = destroy;

},{"../helpers/index.js":6}],13:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    InterpolateText = _require.InterpolateText,
    TrimWhiteSpace = _require.TrimWhiteSpace;

var generateStyle = function generateStyle() {
  var styleId = this.styleId,
      style = this.style;
  var styleTag = "\n        <style itemid=\"".concat(styleId, "\">\n            ").concat(InterpolateText({
    styleId: styleId
  }, style), "\n        </style>\n    ");
  return TrimWhiteSpace(styleTag);
};

module.exports = generateStyle;

},{"../utils/index.js":51}],14:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    InterpolateText = _require.InterpolateText;

var ComponentException = require('../ComponentException.js');

var generateTemplate = function generateTemplate() {
  var id = this.id,
      name = this.name,
      styleId = this.styleId,
      template = this.template,
      data = this.data,
      attributes = this.attributes;
  var $template0;
  template = $.parseHTML(InterpolateText(data, template));
  $template0 = $(template[0]);

  if (template.length <= 0) {
    throw new ComponentException(["Component do not have a template."].join(" "));
  }

  if (template.length > 1) {
    throw new ComponentException(["template must be enclosed in a", "single block-level element."].join(" "));
  }

  if (template[0].nodeType !== 1) {
    throw new ComponentException(["template must be enclosed in a", "single block-level element."].join(" "));
  }

  $template0.attr(attributes).attr('component-name', name).attr(styleId, '').attr('id', id);
  return template;
};

module.exports = generateTemplate;

},{"../ComponentException.js":5,"../utils/index.js":51}],15:[function(require,module,exports){
"use strict";

var hierarchy = function hierarchy() {
  var name = this.name;
  var hierarchy = [];

  var whileParentExists = function whileParentExists(component) {
    var parent = component.parent;

    if (!parent) {
      return;
    }

    var parentName = parent.name ? parent.name : 'root';
    hierarchy.push(parentName);
    whileParentExists(parent);
  };

  whileParentExists(this);

  if (hierarchy.length == 0 && name == undefined) {
    hierarchy.push('root');
  } else {
    hierarchy.push(name);
  }

  return hierarchy;
};

module.exports = hierarchy;

},{}],16:[function(require,module,exports){
"use strict";

var destroy = require('./destroy.js');

var hierarchy = require('./hierarchy.js');

var parentComponent = require('./parentComponent.js');

var createInstance = require('./createInstance.js');

var setData = require('./setData.js');

var setParent = require('./setParent.js');

var setId = require('./setId.js');

var setAttributes = require('./setAttributes.js');

var renderSingularComponent = require('./renderSingularComponent.js');

var renderListComponent = require('./renderListComponent.js');

var renderComponent = require('./renderComponent.js');

var replaceComponentTags = require('./replaceComponentTags.js');

var renderComponents = require('./renderComponents.js');

var registerDomRefs = require('./registerDomRefs.js');

var registerEvents = require('./registerEvents.js');

var registerRemoveSelfEvent = require('./registerRemoveSelfEvent.js');

var registerMethods = require('./registerMethods.js');

var renderShow = require('./renderShow.js');

var renderIf = require('./renderIf.js');

var generateTemplate = require('./generateTemplate.js');

var renderTemplate = require('./renderTemplate.js');

var generateStyle = require('./generateStyle.js');

var renderStyle = require('./renderStyle.js');

var afterRender = require('./afterRender.js');

var onRender = require('./onRender.js');

var beforeRender = require('./beforeRender.js');

var removeOnInitElement = require('./removeOnInitElement.js');

var renderOnInitElement = require('./renderOnInitElement.js');

var onInit = require('./onInit.js');

var tweakLifeCycle = require('./tweakLifeCycle.js');

var renameComponents = require('./renameComponents.js');

var render = require('./render.js');

module.exports = {
  destroy: destroy,
  hierarchy: hierarchy,
  parentComponent: parentComponent,
  createInstance: createInstance,
  setData: setData,
  setParent: setParent,
  setId: setId,
  setAttributes: setAttributes,
  renderSingularComponent: renderSingularComponent,
  renderListComponent: renderListComponent,
  renderComponent: renderComponent,
  replaceComponentTags: replaceComponentTags,
  renderComponents: renderComponents,
  registerDomRefs: registerDomRefs,
  registerEvents: registerEvents,
  registerRemoveSelfEvent: registerRemoveSelfEvent,
  registerMethods: registerMethods,
  renderShow: renderShow,
  renderIf: renderIf,
  generateTemplate: generateTemplate,
  renderTemplate: renderTemplate,
  generateStyle: generateStyle,
  renderStyle: renderStyle,
  afterRender: afterRender,
  onRender: onRender,
  beforeRender: beforeRender,
  removeOnInitElement: removeOnInitElement,
  renderOnInitElement: renderOnInitElement,
  onInit: onInit,
  tweakLifeCycle: tweakLifeCycle,
  renameComponents: renameComponents,
  render: render
};

},{"./afterRender.js":9,"./beforeRender.js":10,"./createInstance.js":11,"./destroy.js":12,"./generateStyle.js":13,"./generateTemplate.js":14,"./hierarchy.js":15,"./onInit.js":17,"./onRender.js":18,"./parentComponent.js":19,"./registerDomRefs.js":20,"./registerEvents.js":21,"./registerMethods.js":22,"./registerRemoveSelfEvent.js":23,"./removeOnInitElement.js":24,"./renameComponents.js":25,"./render.js":26,"./renderComponent.js":27,"./renderComponents.js":28,"./renderIf.js":29,"./renderListComponent.js":30,"./renderOnInitElement.js":31,"./renderShow.js":32,"./renderSingularComponent.js":33,"./renderStyle.js":34,"./renderTemplate.js":35,"./replaceComponentTags.js":36,"./setAttributes.js":37,"./setData.js":38,"./setId.js":39,"./setParent.js":40,"./tweakLifeCycle.js":41}],17:[function(require,module,exports){
"use strict";

var onInit = function onInit() {
  return this.lifeCycle.onInit();
};

module.exports = onInit;

},{}],18:[function(require,module,exports){
"use strict";

var onRender = function onRender(config) {
  this.renderStyle();
  this.renderTemplate(config);
  this.renderIf();
  this.renderShow();
  this.registerMethods();
  this.registerEvents();
  this.registerRemoveSelfEvent();
  this.registerDomRefs();
};

module.exports = onRender;

},{}],19:[function(require,module,exports){
"use strict";

var parentComponent = function parentComponent() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var repeatString = function repeatString() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var repeatedString = "";

    for (var i = 0; i < n; i++) {
      repeatedString += str;
    }

    return repeatedString;
  };

  var self = this;
  var script = "\n        (function(){\n            return self".concat(repeatString('.parent', n + 1), "\n        })()\n    ");
  var parent = eval(script);
  return parent;
};

module.exports = parentComponent;

},{}],20:[function(require,module,exports){
"use strict";

var registerDomRefs = function registerDomRefs() {
  var id = this.id;
  var $refs = {};
  var $self = $("#".concat(id));
  var elements = $self.find("[domref]");

  for (var i = 0; i < elements.length; i++) {
    var $element = $(elements[i]);
    var domref = $element.attr('domref');
    $refs["$".concat(domref)] = $element;
  }

  $refs["$self"] = $self;
  this.$refs = $refs;
};

module.exports = registerDomRefs;

},{}],21:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var registerEvents = function registerEvents() {
  var id = this.id,
      events = this.events;
  var $self = $("#".concat(id));
  var domEvents = ["blur,focus,load,resize,scroll,unload,beforeunload,", "click,dblclick,mousedown,mouseup,mousemove,mouseover,", "mouseout,mouseenter,mouseleave,change,select,submit,", "keydown,keypress,keyup"].join("").split(",");

  var addEventToElements = function (eventName, elements) {
    for (var i = 0; i < elements.length; i++) {
      var element = $(elements[i]);
      var fnName = element.attr("on-".concat(eventName));
      var fn = events[fnName];

      if (typeof fn !== 'function') {
        continue;
      }

      element.removeAttr("on-".concat(eventName));
      element[0].addEventListener(eventName, fn.bind(this));
    }
  }.bind(this);

  for (var i = 0; i < domEvents.length; i++) {
    var eventName = domEvents[i];
    var elements = $self.find("[on-".concat(eventName, "]"));

    if ($self.attr("on-".concat(eventName))) {
      elements = elements && elements.length ? [].concat(_toConsumableArray(elements), [$self]) : [$self];
    }

    if (elements.length) {
      addEventToElements(eventName, elements);
    }
  }
};

module.exports = registerEvents;

},{}],22:[function(require,module,exports){
"use strict";

var registerMethods = function registerMethods() {
  var methods = this.methods;
  var keys = Object.keys(methods);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var fn = methods[key];

    if (typeof fn !== 'function') {
      continue;
    }

    methods[key] = fn.bind(this);
  }

  this.methods = methods;
};

module.exports = registerMethods;

},{}],23:[function(require,module,exports){
"use strict";

var ComponentCollection = require('../ComponentCollection.js');

var registerRemoveSelfEvent = function registerRemoveSelfEvent() {
  var self = this;
  var id = self.id;
  var $self = $("#".concat(id));
  $self.on('DOMNodeRemoved', function (e) {
    ComponentCollection.filter();
  });
};

module.exports = registerRemoveSelfEvent;

},{"../ComponentCollection.js":3}],24:[function(require,module,exports){
"use strict";

var removeOnInitElement = function removeOnInitElement() {
  var id = this.id;
  $("[on_init_".concat(id, "]")).remove();
};

module.exports = removeOnInitElement;

},{}],25:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    DashifySnakeCase = _require.DashifySnakeCase;

var renameComponents = function renameComponents() {
  var components = this.components;

  for (var key in components) {
    var component = components[key];
    component.name = DashifySnakeCase(key);
    components[key] = component;
  }

  this.components = components;
};

module.exports = renameComponents;

},{"../utils/index.js":51}],26:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    IsThenable = _require.IsThenable;

var ComponentException = require('../ComponentException.js');

var render = function render() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var hierarchy = this.hierarchy().join(" > ");
  this.renderConfig = config;
  this.renameComponents();
  this.tweakLifeCycle();

  try {
    var _this$lifeCycle = this.lifeCycle,
        beforeRender = _this$lifeCycle.beforeRender,
        onInit = _this$lifeCycle.onInit;
    var returnValue;

    if (onInit) {
      this.onInit();
    }

    if (beforeRender) {
      returnValue = this.beforeRender();
    }

    if (IsThenable(returnValue)) {
      returnValue.then(function () {
        this.onRender(config);
        this.afterRender();
      }.bind(this))["catch"](function (e) {
        throw new ComponentException(e.message);
      });
      return;
    }

    this.onRender(config);
    this.afterRender();
  } catch (e) {
    var errorMessage = [hierarchy, e.message, e.stack].join("\n");
    console.error(errorMessage);
  }
};

module.exports = render;

},{"../ComponentException.js":5,"../utils/index.js":51}],27:[function(require,module,exports){
"use strict";

var renderComponent = function renderComponent(replaced) {
  var listExpression = replaced.attributes['data-list'];

  if (listExpression) {
    return this.renderListComponent(replaced);
  }

  this.renderSingularComponent(replaced);
};

module.exports = renderComponent;

},{}],28:[function(require,module,exports){
"use strict";

var renderComponents = function renderComponents() {
  var components = this.components;
  var keys = Object.keys(components);

  if (!keys.length) {
    return;
  }

  var replacedComponentTags = this.replaceComponentTags();

  for (var i = 0; i < replacedComponentTags.length; i++) {
    var replaced = replacedComponentTags[i];
    this.renderComponent(replaced);
  }
};

module.exports = renderComponents;

},{}],29:[function(require,module,exports){
"use strict";

var renderIf = function renderIf() {
  var id = this.id,
      data = this.data;
  var $self = $("#".concat(id));

  var renderWhileExists = function renderWhileExists() {
    var elements = $self.find("[data-if]");

    if (!elements.length) {
      return;
    }

    var $element0 = $(elements[0]);
    var expression = $element0.attr('data-if');
    var script = "\n        (function(){\n            let { ".concat(Object.keys(data).join(","), " } = data;\n\n            return ").concat(expression, "\n        })()\n        ");
    expression = Boolean(eval(script));

    if (expression == true) {
      $element0.removeAttr('data-if');
    }

    if (expression != true) {
      $element0.remove();
    }

    elements = $self.find("[data-if]");

    if (elements.length) {
      renderWhileExists();
    }
  };

  renderWhileExists();
};

module.exports = renderIf;

},{}],30:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ComponentException = require('../ComponentException.js');

var _require = require('../utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId;

var renderListComponent = function renderListComponent(replaced) {
  var attributes = replaced.attributes,
      id = replaced.id;
  var bindExpression = attributes['data-bind'];
  var listExpression = attributes['data-list'];

  var _listExpression$split = listExpression.split(" in "),
      _listExpression$split2 = _slicedToArray(_listExpression$split, 2),
      currentItem = _listExpression$split2[0],
      items = _listExpression$split2[1];

  currentItem = currentItem.trim();
  items = items.trim();
  var listItems = this.data[items];
  delete attributes['component-alias'];
  delete attributes['data-list'];
  delete attributes['data-bind'];

  if (!(listItems && listItems.length)) {
    throw new ComponentException(["'".concat(items, "' is empty or not an array or undefined.")].join(" "));
  }

  var targetElement = document.getElementById(id);
  var config = {
    targetElement: targetElement.parentNode,
    renderType: 'append'
  };

  var renderListItem = function (replaced, componentData, config) {
    var attributes = replaced.attributes,
        component = replaced.component;
    component = Object.create(component);
    component.setAttributes(attributes).setId(GenerateRandomId('cid')).setParent(this).setData(componentData).render(config);
  }.bind(this);

  var extractComponentData = function extractComponentData(item) {
    var componentData = {};
    var script = "\n            (function() { \n                let ".concat(bindExpression, " = item;\n                return ").concat(bindExpression, "\n            })()\n        ");
    var data = eval(script);

    if (currentItem == bindExpression) {
      componentData[currentItem] = data;
    }

    if (currentItem != bindExpression) {
      Object.assign(componentData, data);
    }

    return componentData;
  };

  for (var i = 0; i < listItems.length; i++) {
    var componentData = extractComponentData(listItems[i]);
    componentData.index = i;
    renderListItem(replaced, componentData, config);
  }

  $(targetElement).remove();
};

module.exports = renderListComponent;

},{"../ComponentException.js":5,"../utils/index.js":51}],31:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    InterpolateText = _require.InterpolateText,
    SetDefaultConfig = _require.SetDefaultConfig;

var ComponentException = require('../ComponentException.js');

var generateTemplate = function generateTemplate(template, data, id) {
  var $template0;
  template = $.parseHTML(InterpolateText(data, template));
  $template0 = $(template[0]);

  if (template.length <= 0) {
    throw new ComponentException([".onInit() do not have a template."].join(" "));
  }

  if (template.length > 1) {
    throw new ComponentException([".onInit() template must be enclosed in a", "single block-level element."].join(" "));
  }

  if (template[0].nodeType !== 1) {
    throw new ComponentException([".onInit() template must be enclosed in a", "single block-level element."].join(" "));
  }

  $template0.attr("on_init_".concat(id), '');
  return template;
};

var renderOnInitElement = function renderOnInitElement(template) {
  var data = this.data,
      id = this.id;
  template = generateTemplate(template, data, id);
  var renderConfig = this.renderConfig;
  var defaultConfig = {
    targetElement: document.body,
    renderType: 'replaceWith'
  };

  var _SetDefaultConfig = SetDefaultConfig(defaultConfig, renderConfig),
      targetElement = _SetDefaultConfig.targetElement,
      renderType = _SetDefaultConfig.renderType;

  $(targetElement)[renderType](template);
};

module.exports = renderOnInitElement;

},{"../ComponentException.js":5,"../utils/index.js":51}],32:[function(require,module,exports){
"use strict";

var renderShow = function renderShow() {
  var id = this.id,
      data = this.data;
  var $self = $("#".concat(id));

  var renderWhileExists = function renderWhileExists() {
    var elements = $self.find("[data-show]");

    if (!elements.length) {
      return;
    }

    var $element0 = $(elements[0]);
    var expression = $element0.attr('data-show');
    var script = "\n        (function(){\n            let { ".concat(Object.keys(data).join(","), " } = data;\n\n            return ").concat(expression, "\n        })()\n        ");

    if (!eval(script)) {
      $element0.css({
        display: 'none'
      });
    }

    $element0.removeAttr('data-show');
    elements = $self.find("[data-show]");

    if (elements.length) {
      renderWhileExists();
    }
  };

  renderWhileExists();
};

module.exports = renderShow;

},{}],33:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require('../utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId;

var renderSingularComponent = function renderSingularComponent(replaced) {
  var data = this.data;
  var id = replaced.id,
      component = replaced.component,
      attributes = replaced.attributes;
  component = Object.create(component);
  var componentData;
  var dataExpression = attributes['data-bind'].trim();
  var hasEqualSign = dataExpression.search('[=]') + 1;

  if (hasEqualSign) {
    var valueExpression = dataExpression.split("=")[0].trim();
    var script = "\n            (function () {\n                let { ".concat(Object.keys(data).join(", "), " } = data;\n                let fn = function () {\n                    let ").concat(dataExpression, ";\n\n                    return ").concat(valueExpression, ";\n                }\n\n                return fn();\n            })()\n        ");
    componentData = eval(script);
  }

  if (!hasEqualSign) {
    var key = dataExpression;
    componentData = {};
    componentData[key] = data[key];
  }

  if (_typeof(componentData) !== 'object') {
    var _key = dataExpression;
    componentData[_key] = componentData;
  }

  delete attributes['component-alias'];
  delete attributes['data-list'];
  delete attributes['data-bind'];
  component.setAttributes(attributes).setId(GenerateRandomId('cid')).setParent(this).setData(componentData).render({
    targetElement: document.getElementById(id)
  });
};

module.exports = renderSingularComponent;

},{"../utils/index.js":51}],34:[function(require,module,exports){
"use strict";

var _require = require('../helpers/index.js'),
    styleExists = _require.styleExists;

var renderStyle = function renderStyle() {
  var styleId = this.styleId,
      style = this.style;

  if (!style) {
    return;
  }

  if (!styleExists(styleId)) {
    var head0 = $('head')[0];
    var $head0 = $(head0);
    $head0.append(this.generateStyle());
  }
};

module.exports = renderStyle;

},{"../helpers/index.js":6}],35:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    SetDefaultConfig = _require.SetDefaultConfig;

var renderTemplate = function renderTemplate(config) {
  var id = this.id;
  var defaultConfig = {
    targetElement: document.body,
    renderType: 'replaceWith'
  };

  var _SetDefaultConfig = SetDefaultConfig(defaultConfig, config),
      targetElement = _SetDefaultConfig.targetElement,
      renderType = _SetDefaultConfig.renderType;

  var template = this.generateTemplate();
  var $targetElement = $(targetElement);

  if (!$targetElement.length) {
    throw new ComponentException(["'targetElement' does not exists."].join(" "));
  }

  if (renderType == 'replaceWith') {
    var $onInitElement = $("[on_init_".concat(id, "]"));

    if ($onInitElement.length) {
      $targetElement = $onInitElement;
    }
  }

  $targetElement[renderType](template);
};

module.exports = renderTemplate;

},{"../utils/index.js":51}],36:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('../utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId,
    AttributesExtractor = _require.AttributesExtractor;

var replaceComponentTags = function replaceComponentTags() {
  var components = this.components;
  var $self = this.$refs.$self;
  var replacedComponentTags = [];

  var findComponents = function findComponents(name) {
    var elements = [].concat(_toConsumableArray($self.find(name)), _toConsumableArray($self.find("[component-alias=\"".concat(name, "\"]"))));
    return elements;
  };

  var replace = function replace(elements, component) {
    var id = GenerateRandomId('rid');
    var element0 = elements[0];
    var tableElements = "thead,tbody,tfoot,tr,th,td";
    var tagName = element0.tagName.toLowerCase();
    var tag = tableElements.split(",").includes(tagName) ? tagName : "temporary";
    var $element0 = $(element0);
    replacedComponentTags.push({
      id: id,
      component: Object.create(component),
      attributes: AttributesExtractor(element0).extract()
    });
    $element0.replaceWith("<".concat(tag, " id=\"").concat(id, "\"/>"));
  };

  var replaceWhileExists = function replaceWhileExists(component) {
    var name = component.name;
    var elements = findComponents(name);

    if (!elements.length) {
      return;
    }

    replace(elements, component);
    elements = findComponents(name);

    if (!elements.length) {
      return;
    }

    replaceWhileExists(component);
  };

  for (var key in components) {
    var component = components[key];

    if (!component) {
      continue;
    }

    replaceWhileExists(component);
  }

  return replacedComponentTags;
};

module.exports = replaceComponentTags;

},{"../utils/index.js":51}],37:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var setAttributes = function setAttributes() {
  var DomAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var attributes = this.attributes;

  if (_typeof(DomAttributes) !== 'object') {
    DomAttributes = {};
  }

  this.attributes = Object.assign(attributes, DomAttributes);
  return this;
};

module.exports = setAttributes;

},{}],38:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    MergeObject = _require.MergeObject;

var setData = function setData(passedData) {
  var data = this.data;
  this.data = MergeObject(passedData, data);
  return this;
};

module.exports = setData;

},{"../utils/index.js":51}],39:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId;

var setId = function setId() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GenerateRandomId('cid');
  this.id = id;
  return this;
};

module.exports = setId;

},{"../utils/index.js":51}],40:[function(require,module,exports){
"use strict";

var setParent = function setParent(parent) {
  this.parent = parent;
  return this;
};

module.exports = setParent;

},{}],41:[function(require,module,exports){
"use strict";

var tweakLifeCycle = function tweakLifeCycle() {
  var lifeCycle = this.lifeCycle;
  var keys = Object.keys(lifeCycle);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var fn = lifeCycle[key];

    if (typeof fn !== 'function') {
      continue;
    }

    lifeCycle[key] = fn.bind(this);
  }

  this.lifeCycle = lifeCycle;
};

module.exports = tweakLifeCycle;

},{}],42:[function(require,module,exports){
"use strict";

var AttributesExtractor = function AttributesExtractor(element) {
  var extract = function extract() {
    var attributes = {};
    var nodeMap = this.element.attributes;

    for (var i = 0; i < nodeMap.length; i++) {
      var _nodeMap$i = nodeMap[i],
          nodeName = _nodeMap$i.nodeName,
          nodeValue = _nodeMap$i.nodeValue;
      attributes[nodeName] = nodeValue;
    }

    return attributes;
  };

  var get = function get(name) {
    var attributes = this.extract();
    return attributes[name];
  };

  return {
    element: element,
    extract: extract,
    get: get
  };
};

module.exports = AttributesExtractor;

},{}],43:[function(require,module,exports){
"use strict";

var DashifySnakeCase = function DashifySnakeCase(str) {
  var chunks = str.split(/([A-Z])/);

  if (chunks[0] == "") {
    chunks.shift();
  }

  if (/^([A-Z]){1}$/.test(chunks[0])) {
    chunks[0] = chunks[0].toLowerCase();
  }

  str = chunks.join("");
  chunks = str.split(/([A-Z])/);
  chunks = chunks.map(function (item) {
    if (/^([A-Z]){1}$/.test(item)) {
      item = "-".concat(item);
    }

    return item;
  });
  return chunks.join("").toLowerCase();
};

module.exports = DashifySnakeCase;

},{}],44:[function(require,module,exports){
"use strict";

var GenerateRandomNumber = require('./GenerateRandomNumber.js');

var GenerateRandomId = function GenerateRandomId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "rnd";
  var id = [prefix, GenerateRandomNumber(1000, 9999), (Date.now() + '').substr(5)].join("_");
  return id;
};

module.exports = GenerateRandomId;

},{"./GenerateRandomNumber.js":45}],45:[function(require,module,exports){
"use strict";

var GenerateRandomNumber = function GenerateRandomNumber() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = GenerateRandomNumber;

},{}],46:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var TrimWhiteSpace = require('./TrimWhiteSpace.js');

var replace = function replace(str, find, _replace) {
  return str.replace(new RegExp("(".concat(find, ")"), 'g'), _replace);
};

var InterpolateText = function InterpolateText(data, text) {
  if (_typeof(data) !== 'object') {
    return text;
  }

  text = replace(text, '{{', '${');
  text = replace(text, '}}', '}');
  ;
  var fnBody = "\n\t\tlet { ".concat(Object.keys(data).join(", "), " } = data;\n\n\t\treturn `").concat(text, "`;\n\t");
  var fn = new Function('data', fnBody);
  return TrimWhiteSpace(fn(data));
};

module.exports = InterpolateText;

},{"./TrimWhiteSpace.js":50}],47:[function(require,module,exports){
"use strict";

var IsThenable = function IsThenable(fn) {
  if (!fn) {
    return false;
  }

  var isPromise = fn instanceof Promise;
  var isAsync = fn.constructor.name === 'AsyncFunction';
  return isPromise || isAsync;
};

module.exports = IsThenable;

},{}],48:[function(require,module,exports){
"use strict";

var MergeObject = function MergeObject(dominantObject, weakObject) {
  var weakObjectKeys = Object.keys(weakObject);

  for (var i = 0; i < weakObjectKeys.length; i++) {
    var key = weakObjectKeys[i];

    if (dominantObject[key] === undefined) {
      dominantObject[key] = weakObject[key];
    }
  }

  return dominantObject;
};

module.exports = MergeObject;

},{}],49:[function(require,module,exports){
"use strict";

var SetDefaultConfig = function SetDefaultConfig(defaultConfig, suppliedConfig) {
  var defaultConfigKeys = Object.keys(defaultConfig);

  for (var i = 0; i < defaultConfigKeys.length; i++) {
    var key = defaultConfigKeys[i];

    if (suppliedConfig[key] === undefined) {
      suppliedConfig[key] = defaultConfig[key];
    }
  }

  return suppliedConfig;
};

module.exports = SetDefaultConfig;

},{}],50:[function(require,module,exports){
"use strict";

var TrimWhiteSpace = function TrimWhiteSpace(str) {
  var chunks = str.split(/\s/);
  var chars = [];

  for (var i = 0; i < chunks.length; i++) {
    var chunk = chunks[i];

    if (chunk == "") {
      continue;
    }

    chars.push(chunk);
  }

  return chars.join(" ");
};

module.exports = TrimWhiteSpace;

},{}],51:[function(require,module,exports){
"use strict";

var AttributesExtractor = require('./AttributesExtractor.js');

var DashifySnakeCase = require('./DashifySnakeCase.js');

var GenerateRandomId = require('./GenerateRandomId.js');

var GenerateRandomNumber = require('./GenerateRandomNumber.js');

var InterpolateText = require('./InterpolateText.js');

var IsThenable = require('./IsThenable.js');

var MergeObject = require('./MergeObject.js');

var SetDefaultConfig = require('./SetDefaultConfig.js');

var TrimWhiteSpace = require('./TrimWhiteSpace.js');

module.exports = {
  AttributesExtractor: AttributesExtractor,
  DashifySnakeCase: DashifySnakeCase,
  GenerateRandomId: GenerateRandomId,
  GenerateRandomNumber: GenerateRandomNumber,
  InterpolateText: InterpolateText,
  IsThenable: IsThenable,
  MergeObject: MergeObject,
  SetDefaultConfig: SetDefaultConfig,
  TrimWhiteSpace: TrimWhiteSpace
};

},{"./AttributesExtractor.js":42,"./DashifySnakeCase.js":43,"./GenerateRandomId.js":44,"./GenerateRandomNumber.js":45,"./InterpolateText.js":46,"./IsThenable.js":47,"./MergeObject.js":48,"./SetDefaultConfig.js":49,"./TrimWhiteSpace.js":50}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NvbXBvbmVudC5qcyIsInNyYy9Db21wb25lbnRDb2xsZWN0aW9uLmpzIiwic3JjL0NvbXBvbmVudENvbnN0cnVjdG9yLmpzIiwic3JjL0NvbXBvbmVudEV4Y2VwdGlvbi5qcyIsInNyYy9oZWxwZXJzL2luZGV4LmpzIiwic3JjL2hlbHBlcnMvcmVtb3ZlU3R5bGUuanMiLCJzcmMvaGVscGVycy9zdHlsZUV4aXN0cy5qcyIsInNyYy9tZXRob2RzL2FmdGVyUmVuZGVyLmpzIiwic3JjL21ldGhvZHMvYmVmb3JlUmVuZGVyLmpzIiwic3JjL21ldGhvZHMvY3JlYXRlSW5zdGFuY2UuanMiLCJzcmMvbWV0aG9kcy9kZXN0cm95LmpzIiwic3JjL21ldGhvZHMvZ2VuZXJhdGVTdHlsZS5qcyIsInNyYy9tZXRob2RzL2dlbmVyYXRlVGVtcGxhdGUuanMiLCJzcmMvbWV0aG9kcy9oaWVyYXJjaHkuanMiLCJzcmMvbWV0aG9kcy9pbmRleC5qcyIsInNyYy9tZXRob2RzL29uSW5pdC5qcyIsInNyYy9tZXRob2RzL29uUmVuZGVyLmpzIiwic3JjL21ldGhvZHMvcGFyZW50Q29tcG9uZW50LmpzIiwic3JjL21ldGhvZHMvcmVnaXN0ZXJEb21SZWZzLmpzIiwic3JjL21ldGhvZHMvcmVnaXN0ZXJFdmVudHMuanMiLCJzcmMvbWV0aG9kcy9yZWdpc3Rlck1ldGhvZHMuanMiLCJzcmMvbWV0aG9kcy9yZWdpc3RlclJlbW92ZVNlbGZFdmVudC5qcyIsInNyYy9tZXRob2RzL3JlbW92ZU9uSW5pdEVsZW1lbnQuanMiLCJzcmMvbWV0aG9kcy9yZW5hbWVDb21wb25lbnRzLmpzIiwic3JjL21ldGhvZHMvcmVuZGVyLmpzIiwic3JjL21ldGhvZHMvcmVuZGVyQ29tcG9uZW50LmpzIiwic3JjL21ldGhvZHMvcmVuZGVyQ29tcG9uZW50cy5qcyIsInNyYy9tZXRob2RzL3JlbmRlcklmLmpzIiwic3JjL21ldGhvZHMvcmVuZGVyTGlzdENvbXBvbmVudC5qcyIsInNyYy9tZXRob2RzL3JlbmRlck9uSW5pdEVsZW1lbnQuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJTaG93LmpzIiwic3JjL21ldGhvZHMvcmVuZGVyU2luZ3VsYXJDb21wb25lbnQuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJTdHlsZS5qcyIsInNyYy9tZXRob2RzL3JlbmRlclRlbXBsYXRlLmpzIiwic3JjL21ldGhvZHMvcmVwbGFjZUNvbXBvbmVudFRhZ3MuanMiLCJzcmMvbWV0aG9kcy9zZXRBdHRyaWJ1dGVzLmpzIiwic3JjL21ldGhvZHMvc2V0RGF0YS5qcyIsInNyYy9tZXRob2RzL3NldElkLmpzIiwic3JjL21ldGhvZHMvc2V0UGFyZW50LmpzIiwic3JjL21ldGhvZHMvdHdlYWtMaWZlQ3ljbGUuanMiLCJzcmMvdXRpbHMvQXR0cmlidXRlc0V4dHJhY3Rvci5qcyIsInNyYy91dGlscy9EYXNoaWZ5U25ha2VDYXNlLmpzIiwic3JjL3V0aWxzL0dlbmVyYXRlUmFuZG9tSWQuanMiLCJzcmMvdXRpbHMvR2VuZXJhdGVSYW5kb21OdW1iZXIuanMiLCJzcmMvdXRpbHMvSW50ZXJwb2xhdGVUZXh0LmpzIiwic3JjL3V0aWxzL0lzVGhlbmFibGUuanMiLCJzcmMvdXRpbHMvTWVyZ2VPYmplY3QuanMiLCJzcmMvdXRpbHMvU2V0RGVmYXVsdENvbmZpZy5qcyIsInNyYy91dGlscy9UcmltV2hpdGVTcGFjZS5qcyIsInNyYy91dGlscy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsOEJBQUQsQ0FBbkM7O0FBQ0EsSUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsNkJBQUQsQ0FBbEM7O0FBQ0EsSUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsK0JBQUQsQ0FBcEM7O0FBQ0EsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLG9CQUFELENBQXpCOztBQUVBLE1B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OztBQ2pCQSxJQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQywwQkFBRCxDQUFuQzs7QUFDQSxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx1QkFBRCxDQUFoQzs7QUFDQSxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx1QkFBRCxDQUFoQzs7QUFDQSxJQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQywyQkFBRCxDQUFwQzs7QUFDQSxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsc0JBQUQsQ0FBL0I7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGlCQUFELENBQTFCOztBQUNBLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxrQkFBRCxDQUEzQjs7QUFDQSxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx1QkFBRCxDQUFoQzs7QUFDQSxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMscUJBQUQsQ0FBOUI7O0FBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUFDaEIsRUFBQSxtQkFBbUIsRUFBbkIsbUJBRGdCO0FBRWhCLEVBQUEsZ0JBQWdCLEVBQWhCLGdCQUZnQjtBQUdoQixFQUFBLGdCQUFnQixFQUFoQixnQkFIZ0I7QUFJaEIsRUFBQSxvQkFBb0IsRUFBcEIsb0JBSmdCO0FBS2hCLEVBQUEsZUFBZSxFQUFmLGVBTGdCO0FBTWhCLEVBQUEsVUFBVSxFQUFWLFVBTmdCO0FBT2hCLEVBQUEsV0FBVyxFQUFYLFdBUGdCO0FBUWhCLEVBQUEsZ0JBQWdCLEVBQWhCLGdCQVJnQjtBQVNoQixFQUFBLGNBQWMsRUFBZDtBQVRnQixDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSByZXF1aXJlKCcuL3NyYy9Db21wb25lbnRDb2xsZWN0aW9uLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG5jb25zdCBDb21wb25lbnRDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudENvbnN0cnVjdG9yLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudC5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Q29tcG9uZW50Q29sbGVjdGlvbixcclxuXHRDb21wb25lbnRFeGNlcHRpb24sXHJcblx0Q29tcG9uZW50Q29uc3RydWN0b3IsXHJcblx0Q29tcG9uZW50LFxyXG59IiwiY29uc3QgeyBHZW5lcmF0ZVJhbmRvbUlkIH0gPSByZXF1aXJlKCcuL3V0aWxzL2luZGV4LmpzJyk7XHJcbmNvbnN0IHsgXHJcbiAgICBkZXN0cm95LFxyXG4gICAgaGllcmFyY2h5LFxyXG4gICAgcGFyZW50Q29tcG9uZW50LFxyXG4gICAgY3JlYXRlSW5zdGFuY2UsXHJcbiAgICBzZXREYXRhLFxyXG4gICAgc2V0UGFyZW50LFxyXG4gICAgc2V0SWQsXHJcbiAgICBzZXRBdHRyaWJ1dGVzLFxyXG4gICAgcmVuZGVyU2luZ3VsYXJDb21wb25lbnQsXHJcbiAgICByZW5kZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgcmVuZGVyQ29tcG9uZW50LFxyXG4gICAgcmVwbGFjZUNvbXBvbmVudFRhZ3MsXHJcbiAgICByZW5kZXJDb21wb25lbnRzLFxyXG4gICAgcmVnaXN0ZXJEb21SZWZzLFxyXG5cdHJlZ2lzdGVyRXZlbnRzLFxyXG5cdHJlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50LFxyXG4gICAgcmVnaXN0ZXJNZXRob2RzLFxyXG4gICAgcmVuZGVyU2hvdyxcclxuICAgIHJlbmRlcklmLFxyXG4gICAgZ2VuZXJhdGVUZW1wbGF0ZSxcclxuICAgIHJlbmRlclRlbXBsYXRlLFxyXG4gICAgZ2VuZXJhdGVTdHlsZSxcclxuICAgIHJlbmRlclN0eWxlLFxyXG4gICAgYWZ0ZXJSZW5kZXIsXHJcbiAgICBvblJlbmRlcixcclxuICAgIGJlZm9yZVJlbmRlcixcclxuICAgIHJlbW92ZU9uSW5pdEVsZW1lbnQsXHJcbiAgICByZW5kZXJPbkluaXRFbGVtZW50LFxyXG4gICAgb25Jbml0LFxyXG4gICAgdHdlYWtMaWZlQ3ljbGUsXHJcbiAgICByZW5hbWVDb21wb25lbnRzLFxyXG4gICAgcmVuZGVyLFxyXG59ID0gcmVxdWlyZSgnLi9tZXRob2RzL2luZGV4LmpzJyk7XHJcblxyXG5jbGFzcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XHJcblx0XHRsZXQgeyBcclxuXHRcdFx0bmFtZSxcclxuXHRcdFx0c3R5bGVJZCxcclxuXHRcdFx0c3R5bGUsXHJcblx0XHRcdHRlbXBsYXRlLFxyXG5cdFx0XHRkYXRhLFxyXG5cdFx0XHRldmVudHMsXHJcblx0XHRcdG1ldGhvZHMsXHJcblx0XHRcdGxpZmVDeWNsZSxcclxuXHRcdFx0Y29tcG9uZW50cyxcclxuXHRcdFx0YXR0cmlidXRlcyxcclxuXHRcdFx0cGFyZW50LFxyXG5cdFx0fSA9IGNvbmZpZztcclxuXHJcblx0XHR0aGlzLmlkID0gR2VuZXJhdGVSYW5kb21JZCgnY2lkJyk7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5zdHlsZUlkID0gc3R5bGVJZDtcclxuXHRcdHRoaXMuc3R5bGUgPSBzdHlsZTtcclxuXHRcdHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XHJcblx0XHR0aGlzLmV2ZW50cyA9IGV2ZW50cztcclxuXHRcdHRoaXMubWV0aG9kcyA9IG1ldGhvZHM7XHJcblx0XHR0aGlzLmxpZmVDeWNsZSA9IGxpZmVDeWNsZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcblx0XHR0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgICAgIHRoaXMuJHJlZnMgPSB7fTtcclxuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG5cdH1cclxuXHJcbiAgICBkZXN0cm95ID0gZGVzdHJveTtcclxuICAgIGhpZXJhcmNoeSA9IGhpZXJhcmNoeTtcclxuICAgIHBhcmVudENvbXBvbmVudCA9IHBhcmVudENvbXBvbmVudDtcclxuICAgIGNyZWF0ZUluc3RhbmNlID0gY3JlYXRlSW5zdGFuY2U7XHJcbiAgICBzZXREYXRhID0gc2V0RGF0YTtcclxuICAgIHNldFBhcmVudCA9IHNldFBhcmVudDtcclxuICAgIHNldElkID0gc2V0SWQ7XHJcbiAgICBzZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcclxuICAgIHJlbmRlclNpbmd1bGFyQ29tcG9uZW50ID0gcmVuZGVyU2luZ3VsYXJDb21wb25lbnQ7XHJcbiAgICByZW5kZXJMaXN0Q29tcG9uZW50ID0gcmVuZGVyTGlzdENvbXBvbmVudDtcclxuICAgIHJlbmRlckNvbXBvbmVudCA9IHJlbmRlckNvbXBvbmVudDtcclxuICAgIHJlcGxhY2VDb21wb25lbnRUYWdzID0gcmVwbGFjZUNvbXBvbmVudFRhZ3M7XHJcbiAgICByZW5kZXJDb21wb25lbnRzID0gcmVuZGVyQ29tcG9uZW50cztcclxuICAgIHJlZ2lzdGVyRG9tUmVmcyA9IHJlZ2lzdGVyRG9tUmVmcztcclxuXHRyZWdpc3RlckV2ZW50cyA9IHJlZ2lzdGVyRXZlbnRzO1xyXG5cdHJlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50ID0gcmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQ7XHJcbiAgICByZWdpc3Rlck1ldGhvZHMgPSByZWdpc3Rlck1ldGhvZHM7XHJcbiAgICByZW5kZXJTaG93ID0gcmVuZGVyU2hvdztcclxuICAgIHJlbmRlcklmID0gcmVuZGVySWY7XHJcbiAgICBnZW5lcmF0ZVRlbXBsYXRlID0gZ2VuZXJhdGVUZW1wbGF0ZTtcclxuICAgIHJlbmRlclRlbXBsYXRlID0gcmVuZGVyVGVtcGxhdGU7XHJcbiAgICBnZW5lcmF0ZVN0eWxlID0gZ2VuZXJhdGVTdHlsZTtcclxuICAgIHJlbmRlclN0eWxlID0gcmVuZGVyU3R5bGU7XHJcbiAgICBhZnRlclJlbmRlciA9IGFmdGVyUmVuZGVyO1xyXG4gICAgb25SZW5kZXIgPSBvblJlbmRlcjtcclxuICAgIGJlZm9yZVJlbmRlciA9IGJlZm9yZVJlbmRlcjtcclxuICAgIHJlbW92ZU9uSW5pdEVsZW1lbnQgPSByZW1vdmVPbkluaXRFbGVtZW50O1xyXG4gICAgcmVuZGVyT25Jbml0RWxlbWVudCA9IHJlbmRlck9uSW5pdEVsZW1lbnQ7XHJcbiAgICBvbkluaXQgPSBvbkluaXQ7XHJcbiAgICB0d2Vha0xpZmVDeWNsZSA9IHR3ZWFrTGlmZUN5Y2xlO1xyXG4gICAgcmVuYW1lQ29tcG9uZW50cyA9IHJlbmFtZUNvbXBvbmVudHM7XHJcbiAgICByZW5kZXIgPSByZW5kZXI7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50OyIsImNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSB7XHJcblx0Y29tcG9uZW50czogW10sXHJcblx0YWRkKGNvbXBvbmVudCkgeyBcclxuXHRcdHRoaXMuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XHJcblx0fSxcclxuXHRyZW1vdmUoY29tcG9uZW50KSB7XHJcblx0XHRsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG5cdFx0bGV0IGluZGV4ID0gY29tcG9uZW50cy5maW5kSW5kZXgoKGl0ZW0pPT4ge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5pZCA9PSBjb21wb25lbnQuaWQ7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZihpbmRleCA8PSAtMSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHRcclxuXHRcdGNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcblx0fSxcclxuXHRmaWx0ZXIoKSB7XHJcblx0XHRsZXQgZmlsdGVyQ29tcG9uZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG5cclxuXHRcdFx0Zm9yKGxldCBpPTA7IGk8Y29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2ldO1xyXG5cdFx0XHRcdGxldCAkY29tcG9uZW50ID0gJChgIyR7Y29tcG9uZW50LmlkfWApO1xyXG5cdFxyXG5cdFx0XHRcdGlmKCRjb21wb25lbnQubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5yZW1vdmUoY29tcG9uZW50KTtcclxuXHRcdFx0fVx0XHRcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZpbHRlckNvbXBvbmVudHMsIDEwMDApO1xyXG5cdH0sXHJcblx0ZGlzcGxheSgpIHtcclxuXHRcdGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblx0XHRsZXQgaXRlbXMgPSBjb21wb25lbnRzLm1hcCgoeyBpZCwgbmFtZSwgc3R5bGVJZCB9KSA9PiB7IFxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGlkLCBcclxuXHRcdFx0XHRuYW1lLCBcclxuXHRcdFx0XHRzdHlsZUlkLFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zb2xlLnRhYmxlKGl0ZW1zKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50Q29sbGVjdGlvbjsiLCJjb25zdCBDb21wb25lbnQgPSByZXF1aXJlKCcuL0NvbXBvbmVudC5qcycpO1xyXG5jb25zdCB7IFxyXG5cdEdlbmVyYXRlUmFuZG9tSWQsXHJcblx0U2V0RGVmYXVsdENvbmZpZyxcclxufSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IENvbXBvbmVudENvbnN0cnVjdG9yID0ge1xyXG5cdGNyZWF0ZShjb25maWcgPSB7fSkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdENvbmZpZyA9IHtcclxuXHRcdFx0c3R5bGVJZDogR2VuZXJhdGVSYW5kb21JZCgnY3NzJyksXHJcblx0XHRcdHRlbXBsYXRlOiBgXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxoMT4gQ29tcG9uZW50IHJlbmRlcmVkLiA8L2gxPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRgLFxyXG5cdFx0XHRkYXRhOiB7fSxcclxuXHRcdFx0ZXZlbnRzOiB7fSxcclxuXHRcdFx0bWV0aG9kczoge30sXHJcblx0XHRcdGxpZmVDeWNsZToge30sXHJcblx0XHRcdGNvbXBvbmVudHM6IHt9LFxyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7fSxcclxuXHRcdFx0cGFyZW50OiBudWxsLFxyXG5cdFx0fTtcclxuXHRcdGNvbmZpZyA9IFNldERlZmF1bHRDb25maWcoZGVmYXVsdENvbmZpZywgY29uZmlnKTtcclxuXHRcdGxldCB7IG5hbWUgfSA9IGNvbmZpZztcclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBDb21wb25lbnQoY29uZmlnKTtcclxuXHR9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudENvbnN0cnVjdG9yOyIsImNsYXNzIENvbXBvbmVudEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKVxyXG5cclxuXHRcdHRoaXMubmFtZSA9ICdDb21wb25lbnRFeGNlcHRpb24nO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudEV4Y2VwdGlvbjsiLCJjb25zdCByZW1vdmVTdHlsZSA9IHJlcXVpcmUoJy4vcmVtb3ZlU3R5bGUuanMnKTtcclxuY29uc3Qgc3R5bGVFeGlzdHMgPSByZXF1aXJlKCcuL3N0eWxlRXhpc3RzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHJlbW92ZVN0eWxlLFxyXG4gICAgc3R5bGVFeGlzdHMsXHJcbn0iLCJjb25zdCByZW1vdmVTdHlsZSA9IGZ1bmN0aW9uKGlkKSB7XHJcblx0JChgc3R5bGVbaXRlbWlkPVwiJHtpZH1cIl1gKS5yZW1vdmUoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW1vdmVTdHlsZTsiLCJjb25zdCBzdHlsZUV4aXN0cyA9IGZ1bmN0aW9uKGlkKSB7XHJcblx0cmV0dXJuICQoYHN0eWxlW2l0ZW1pZD1cIiR7aWR9XCJdYCkubGVuZ3RoO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlRXhpc3RzOyIsImNvbnN0IHsgSXNUaGVuYWJsZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRDb2xsZWN0aW9uLmpzJyk7XHJcblxyXG5jb25zdCBhZnRlclJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgYWZ0ZXJSZW5kZXIgfSA9IHRoaXMubGlmZUN5Y2xlO1xyXG4gICAgbGV0IHJldHVyblZhbHVlO1xyXG4gICAgXHJcbiAgICBpZihhZnRlclJlbmRlcikge1xyXG4gICAgICAgIHJldHVyblZhbHVlID0gdGhpcy5saWZlQ3ljbGUuYWZ0ZXJSZW5kZXIoKTtcclxuICAgIH1cclxuICAgIGlmKElzVGhlbmFibGUocmV0dXJuVmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWUudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oZS5tZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyQ29tcG9uZW50cygpO1xyXG4gICAgdGhpcy5yZW1vdmVPbkluaXRFbGVtZW50KCk7XHJcbiAgICBDb21wb25lbnRDb2xsZWN0aW9uLmFkZCh0aGlzKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhZnRlclJlbmRlcjsiLCJjb25zdCBiZWZvcmVSZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmxpZmVDeWNsZS5iZWZvcmVSZW5kZXIoKTtcclxufVx0XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJlZm9yZVJlbmRlcjsiLCJjb25zdCBjcmVhdGVJbnN0YW5jZSA9IGZ1bmN0aW9uKHBhcmVudCkge1xyXG4gICAgbGV0IGNyZWF0ZWRJbnN0YW5jZSA9IE9iamVjdC5jcmVhdGUodGhpcyk7XHJcbiAgICAgICAgY3JlYXRlZEluc3RhbmNlXHJcbiAgICAgICAgICAgIC5zZXRQYXJlbnQocGFyZW50KVxyXG4gICAgICAgICAgICAuc2V0SWQoKTtcclxuXHJcbiAgICByZXR1cm4gY3JlYXRlZEluc3RhbmNlO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUluc3RhbmNlOyIsImNvbnN0IHsgcmVtb3ZlU3R5bGUgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IGRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IHN0eWxlSWQgfSA9IHRoaXM7XHJcbiAgICBsZXQgeyAkc2VsZiB9ID0gdGhpcy4kcmVmcztcclxuXHJcbiAgICAkc2VsZlswXS5yZW1vdmUoKTtcclxuICAgIGxldCBzaW1pbGFyQ29tcG9uZW50cyA9ICQoYFske3N0eWxlSWR9XWApO1xyXG5cclxuICAgIGlmKCFzaW1pbGFyQ29tcG9uZW50cy5sZW5ndGgpIHtcclxuICAgICAgICByZW1vdmVTdHlsZShzdHlsZUlkKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkZXN0cm95O1xyXG4iLCJjb25zdCB7IEludGVycG9sYXRlVGV4dCwgVHJpbVdoaXRlU3BhY2UgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVN0eWxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBzdHlsZUlkLCBzdHlsZSB9ID0gdGhpcztcclxuICAgIGxldCBzdHlsZVRhZyA9IGBcclxuICAgICAgICA8c3R5bGUgaXRlbWlkPVwiJHtzdHlsZUlkfVwiPlxyXG4gICAgICAgICAgICAke0ludGVycG9sYXRlVGV4dCh7c3R5bGVJZH0sIHN0eWxlKX1cclxuICAgICAgICA8L3N0eWxlPlxyXG4gICAgYDtcclxuXHJcbiAgICByZXR1cm4gVHJpbVdoaXRlU3BhY2Uoc3R5bGVUYWcpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlU3R5bGU7IiwiY29uc3QgeyBJbnRlcnBvbGF0ZVRleHQgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG5cclxuY29uc3QgZ2VuZXJhdGVUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQsIG5hbWUsIHN0eWxlSWQsIHRlbXBsYXRlLCBkYXRhLCBhdHRyaWJ1dGVzIH0gPSB0aGlzO1xyXG4gICAgbGV0ICR0ZW1wbGF0ZTA7XHJcblxyXG4gICAgdGVtcGxhdGUgPSAkLnBhcnNlSFRNTChJbnRlcnBvbGF0ZVRleHQoZGF0YSwgdGVtcGxhdGUpKTtcclxuICAgICR0ZW1wbGF0ZTAgPSAkKHRlbXBsYXRlWzBdKTtcclxuXHJcbiAgICBpZih0ZW1wbGF0ZS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgQ29tcG9uZW50IGRvIG5vdCBoYXZlIGEgdGVtcGxhdGUuYCxcclxuICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuICAgIGlmKHRlbXBsYXRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgYHRlbXBsYXRlIG11c3QgYmUgZW5jbG9zZWQgaW4gYWAsXHJcbiAgICAgICAgICAgIGBzaW5nbGUgYmxvY2stbGV2ZWwgZWxlbWVudC5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYodGVtcGxhdGVbMF0ubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgYHRlbXBsYXRlIG11c3QgYmUgZW5jbG9zZWQgaW4gYWAsXHJcbiAgICAgICAgICAgIGBzaW5nbGUgYmxvY2stbGV2ZWwgZWxlbWVudC5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgICR0ZW1wbGF0ZTBcclxuICAgICAgICAuYXR0cihhdHRyaWJ1dGVzKVxyXG4gICAgICAgIC5hdHRyKCdjb21wb25lbnQtbmFtZScsIG5hbWUpXHJcbiAgICAgICAgLmF0dHIoc3R5bGVJZCwgJycpXHJcbiAgICAgICAgLmF0dHIoJ2lkJywgaWQpO1xyXG4gICAgICAgIFxyXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlVGVtcGxhdGU7IiwiY29uc3QgaGllcmFyY2h5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHsgbmFtZSB9ID0gdGhpcztcclxuICAgIGxldCBoaWVyYXJjaHkgPSBbXTtcclxuICAgIGxldCB3aGlsZVBhcmVudEV4aXN0cyA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuICAgICAgICBsZXQgeyBwYXJlbnQgfSA9IGNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyZW50TmFtZSA9IChwYXJlbnQubmFtZSkgPyBwYXJlbnQubmFtZSA6ICdyb290JztcclxuXHJcbiAgICAgICAgaGllcmFyY2h5LnB1c2gocGFyZW50TmFtZSk7XHJcbiAgICAgICAgd2hpbGVQYXJlbnRFeGlzdHMocGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZVBhcmVudEV4aXN0cyh0aGlzKTtcclxuXHJcbiAgICBpZihoaWVyYXJjaHkubGVuZ3RoID09IDAgJiYgbmFtZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBoaWVyYXJjaHkucHVzaCgncm9vdCcpOyAgICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhpZXJhcmNoeS5wdXNoKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoaWVyYXJjaHk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaGllcmFyY2h5OyIsImNvbnN0IGRlc3Ryb3kgPSByZXF1aXJlKCcuL2Rlc3Ryb3kuanMnKTtcclxuY29uc3QgaGllcmFyY2h5ID0gcmVxdWlyZSgnLi9oaWVyYXJjaHkuanMnKTtcclxuY29uc3QgcGFyZW50Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9wYXJlbnRDb21wb25lbnQuanMnKTtcclxuY29uc3QgY3JlYXRlSW5zdGFuY2UgPSByZXF1aXJlKCcuL2NyZWF0ZUluc3RhbmNlLmpzJyk7XHJcbmNvbnN0IHNldERhdGEgPSByZXF1aXJlKCcuL3NldERhdGEuanMnKTtcclxuY29uc3Qgc2V0UGFyZW50ID0gcmVxdWlyZSgnLi9zZXRQYXJlbnQuanMnKTtcclxuY29uc3Qgc2V0SWQgPSByZXF1aXJlKCcuL3NldElkLmpzJyk7XHJcbmNvbnN0IHNldEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL3NldEF0dHJpYnV0ZXMuanMnKTtcclxuY29uc3QgcmVuZGVyU2luZ3VsYXJDb21wb25lbnQgPSByZXF1aXJlKCcuL3JlbmRlclNpbmd1bGFyQ29tcG9uZW50LmpzJyk7XHJcbmNvbnN0IHJlbmRlckxpc3RDb21wb25lbnQgPSByZXF1aXJlKCcuL3JlbmRlckxpc3RDb21wb25lbnQuanMnKTtcclxuY29uc3QgcmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9yZW5kZXJDb21wb25lbnQuanMnKTtcclxuY29uc3QgcmVwbGFjZUNvbXBvbmVudFRhZ3MgPSByZXF1aXJlKCcuL3JlcGxhY2VDb21wb25lbnRUYWdzLmpzJyk7XHJcbmNvbnN0IHJlbmRlckNvbXBvbmVudHMgPSByZXF1aXJlKCcuL3JlbmRlckNvbXBvbmVudHMuanMnKTtcclxuY29uc3QgcmVnaXN0ZXJEb21SZWZzID0gcmVxdWlyZSgnLi9yZWdpc3RlckRvbVJlZnMuanMnKTtcclxuY29uc3QgcmVnaXN0ZXJFdmVudHMgPSByZXF1aXJlKCcuL3JlZ2lzdGVyRXZlbnRzLmpzJyk7XHJcbmNvbnN0IHJlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50ID0gcmVxdWlyZSgnLi9yZWdpc3RlclJlbW92ZVNlbGZFdmVudC5qcycpO1xyXG5jb25zdCByZWdpc3Rlck1ldGhvZHMgPSByZXF1aXJlKCcuL3JlZ2lzdGVyTWV0aG9kcy5qcycpO1xyXG5jb25zdCByZW5kZXJTaG93ID0gcmVxdWlyZSgnLi9yZW5kZXJTaG93LmpzJyk7XHJcbmNvbnN0IHJlbmRlcklmID0gcmVxdWlyZSgnLi9yZW5kZXJJZi5qcycpO1xyXG5jb25zdCBnZW5lcmF0ZVRlbXBsYXRlID0gcmVxdWlyZSgnLi9nZW5lcmF0ZVRlbXBsYXRlLmpzJyk7XHJcbmNvbnN0IHJlbmRlclRlbXBsYXRlID0gcmVxdWlyZSgnLi9yZW5kZXJUZW1wbGF0ZS5qcycpO1xyXG5jb25zdCBnZW5lcmF0ZVN0eWxlID0gcmVxdWlyZSgnLi9nZW5lcmF0ZVN0eWxlLmpzJyk7XHJcbmNvbnN0IHJlbmRlclN0eWxlID0gcmVxdWlyZSgnLi9yZW5kZXJTdHlsZS5qcycpO1xyXG5jb25zdCBhZnRlclJlbmRlciA9IHJlcXVpcmUoJy4vYWZ0ZXJSZW5kZXIuanMnKTtcclxuY29uc3Qgb25SZW5kZXIgPSByZXF1aXJlKCcuL29uUmVuZGVyLmpzJyk7XHJcbmNvbnN0IGJlZm9yZVJlbmRlciA9IHJlcXVpcmUoJy4vYmVmb3JlUmVuZGVyLmpzJyk7XHJcbmNvbnN0IHJlbW92ZU9uSW5pdEVsZW1lbnQgPSByZXF1aXJlKCcuL3JlbW92ZU9uSW5pdEVsZW1lbnQuanMnKTtcclxuY29uc3QgcmVuZGVyT25Jbml0RWxlbWVudCA9IHJlcXVpcmUoJy4vcmVuZGVyT25Jbml0RWxlbWVudC5qcycpO1xyXG5jb25zdCBvbkluaXQgPSByZXF1aXJlKCcuL29uSW5pdC5qcycpO1xyXG5jb25zdCB0d2Vha0xpZmVDeWNsZSA9IHJlcXVpcmUoJy4vdHdlYWtMaWZlQ3ljbGUuanMnKTtcclxuY29uc3QgcmVuYW1lQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vcmVuYW1lQ29tcG9uZW50cy5qcycpO1xyXG5jb25zdCByZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlci5qcycpO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZGVzdHJveSxcclxuICAgIGhpZXJhcmNoeSxcclxuICAgIHBhcmVudENvbXBvbmVudCxcclxuICAgIGNyZWF0ZUluc3RhbmNlLFxyXG4gICAgc2V0RGF0YSxcclxuICAgIHNldFBhcmVudCxcclxuICAgIHNldElkLFxyXG4gICAgc2V0QXR0cmlidXRlcyxcclxuICAgIHJlbmRlclNpbmd1bGFyQ29tcG9uZW50LFxyXG4gICAgcmVuZGVyTGlzdENvbXBvbmVudCxcclxuICAgIHJlbmRlckNvbXBvbmVudCxcclxuICAgIHJlcGxhY2VDb21wb25lbnRUYWdzLFxyXG4gICAgcmVuZGVyQ29tcG9uZW50cyxcclxuICAgIHJlZ2lzdGVyRG9tUmVmcyxcclxuICAgIHJlZ2lzdGVyRXZlbnRzLFxyXG4gICAgcmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQsXHJcbiAgICByZWdpc3Rlck1ldGhvZHMsXHJcbiAgICByZW5kZXJTaG93LFxyXG4gICAgcmVuZGVySWYsXHJcbiAgICBnZW5lcmF0ZVRlbXBsYXRlLFxyXG4gICAgcmVuZGVyVGVtcGxhdGUsXHJcbiAgICBnZW5lcmF0ZVN0eWxlLFxyXG4gICAgcmVuZGVyU3R5bGUsXHJcbiAgICBhZnRlclJlbmRlcixcclxuICAgIG9uUmVuZGVyLFxyXG4gICAgYmVmb3JlUmVuZGVyLFxyXG4gICAgcmVtb3ZlT25Jbml0RWxlbWVudCxcclxuICAgIHJlbmRlck9uSW5pdEVsZW1lbnQsXHJcbiAgICBvbkluaXQsXHJcbiAgICB0d2Vha0xpZmVDeWNsZSxcclxuICAgIHJlbmFtZUNvbXBvbmVudHMsXHJcbiAgICByZW5kZXIsXHJcbn0iLCJjb25zdCBvbkluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmxpZmVDeWNsZS5vbkluaXQoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBvbkluaXQ7IiwiY29uc3Qgb25SZW5kZXIgPSBmdW5jdGlvbihjb25maWcpIHtcclxuICAgIHRoaXMucmVuZGVyU3R5bGUoKTtcclxuICAgIHRoaXMucmVuZGVyVGVtcGxhdGUoY29uZmlnKTtcclxuICAgIHRoaXMucmVuZGVySWYoKTtcclxuICAgIHRoaXMucmVuZGVyU2hvdygpO1xyXG4gICAgdGhpcy5yZWdpc3Rlck1ldGhvZHMoKTtcclxuICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgIHRoaXMucmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQoKTtcclxuICAgIHRoaXMucmVnaXN0ZXJEb21SZWZzKCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gb25SZW5kZXI7IiwiY29uc3QgcGFyZW50Q29tcG9uZW50ID0gZnVuY3Rpb24obj0wKSB7XHJcbiAgICBsZXQgcmVwZWF0U3RyaW5nID0gZnVuY3Rpb24oc3RyPScwJywgbj0wKSB7XHJcbiAgICAgICAgbGV0IHJlcGVhdGVkU3RyaW5nID0gYGA7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG47IGkrKykge1xyXG4gICAgICAgICAgICByZXBlYXRlZFN0cmluZyArPSBzdHI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVwZWF0ZWRTdHJpbmc7XHJcbiAgICB9XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQgc2NyaXB0ID0gYFxyXG4gICAgICAgIChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZiR7cmVwZWF0U3RyaW5nKCcucGFyZW50JywgbisxKX1cclxuICAgICAgICB9KSgpXHJcbiAgICBgO1xyXG4gICAgbGV0IHBhcmVudCA9IGV2YWwoc2NyaXB0KTtcclxuXHJcbiAgICByZXR1cm4gcGFyZW50O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudENvbXBvbmVudDsiLCJjb25zdCByZWdpc3RlckRvbVJlZnMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGlkIH0gPSB0aGlzO1xyXG4gICAgbGV0ICRyZWZzID0ge307XHJcbiAgICBsZXQgJHNlbGYgPSAkKGAjJHtpZH1gKTtcclxuICAgIGxldCBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkb21yZWZdYCk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKGVsZW1lbnRzW2ldKTtcclxuICAgICAgICBsZXQgZG9tcmVmID0gJGVsZW1lbnQuYXR0cignZG9tcmVmJyk7XHJcblxyXG4gICAgICAgICRyZWZzW2AkJHtkb21yZWZ9YF0gPSAkZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAkcmVmc1tgJHNlbGZgXSA9ICRzZWxmO1xyXG4gICAgdGhpcy4kcmVmcyA9ICRyZWZzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyRG9tUmVmczsiLCJjb25zdCByZWdpc3RlckV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQsIGV2ZW50cyB9ID0gdGhpcztcclxuICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgbGV0IGRvbUV2ZW50cyA9IFtcclxuICAgICAgICBcImJsdXIsZm9jdXMsbG9hZCxyZXNpemUsc2Nyb2xsLHVubG9hZCxiZWZvcmV1bmxvYWQsXCIsXHJcbiAgICAgICAgXCJjbGljayxkYmxjbGljayxtb3VzZWRvd24sbW91c2V1cCxtb3VzZW1vdmUsbW91c2VvdmVyLFwiLFxyXG4gICAgICAgIFwibW91c2VvdXQsbW91c2VlbnRlcixtb3VzZWxlYXZlLGNoYW5nZSxzZWxlY3Qsc3VibWl0LFwiLFxyXG4gICAgICAgIFwia2V5ZG93bixrZXlwcmVzcyxrZXl1cFwiXHJcbiAgICBdLmpvaW4oXCJcIikuc3BsaXQoXCIsXCIpO1xyXG5cclxuICAgIGxldCBhZGRFdmVudFRvRWxlbWVudHMgPSBmdW5jdGlvbihldmVudE5hbWUsIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSAkKGVsZW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgbGV0IGZuTmFtZSA9IGVsZW1lbnQuYXR0cihgb24tJHtldmVudE5hbWV9YCk7XHJcbiAgICAgICAgICAgIGxldCBmbiA9IGV2ZW50c1tmbk5hbWVdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVx0XHRcdFx0XHRcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyKGBvbi0ke2V2ZW50TmFtZX1gKTtcdFx0XHRcclxuICAgICAgICAgICAgZWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4uYmluZCh0aGlzKSk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuICAgICAgICB9XHRcdFx0XHRcclxuICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxkb21FdmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgZXZlbnROYW1lID0gZG9tRXZlbnRzW2ldO1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtvbi0ke2V2ZW50TmFtZX1dYCk7XHJcblxyXG4gICAgICAgIGlmKCRzZWxmLmF0dHIoYG9uLSR7ZXZlbnROYW1lfWApKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzID0gKGVsZW1lbnRzICYmIGVsZW1lbnRzLmxlbmd0aCkgPyBbLi4uZWxlbWVudHMsICRzZWxmXSA6IFskc2VsZl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBhZGRFdmVudFRvRWxlbWVudHMoZXZlbnROYW1lLCBlbGVtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyRXZlbnRzOyIsImNvbnN0IHJlZ2lzdGVyTWV0aG9kcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgbWV0aG9kcyB9ID0gdGhpcztcclxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobWV0aG9kcyk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIGxldCBmbiA9IG1ldGhvZHNba2V5XTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2RzW2tleV0gPSBmbi5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWV0aG9kcyA9IG1ldGhvZHM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXJNZXRob2RzOyIsImNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRDb2xsZWN0aW9uLmpzJyk7XHJcblxyXG5jb25zdCByZWdpc3RlclJlbW92ZVNlbGZFdmVudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IHsgaWQgfSA9IHNlbGY7XHJcbiAgICBsZXQgJHNlbGYgPSAkKGAjJHtpZH1gKTtcclxuICAgIFxyXG4gICAgJHNlbGYub24oJ0RPTU5vZGVSZW1vdmVkJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIENvbXBvbmVudENvbGxlY3Rpb24uZmlsdGVyKCk7ICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50OyIsImNvbnN0IHJlbW92ZU9uSW5pdEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGlkIH0gPSB0aGlzO1xyXG4gICAgXHJcbiAgICAkKGBbb25faW5pdF8ke2lkfV1gKS5yZW1vdmUoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW1vdmVPbkluaXRFbGVtZW50OyIsImNvbnN0IHsgRGFzaGlmeVNuYWtlQ2FzZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlbmFtZUNvbXBvbmVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblxyXG4gICAgZm9yKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV07XHJcblxyXG4gICAgICAgIGNvbXBvbmVudC5uYW1lID0gRGFzaGlmeVNuYWtlQ2FzZShrZXkpO1xyXG4gICAgICAgIGNvbXBvbmVudHNba2V5XSA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmFtZUNvbXBvbmVudHM7IiwiY29uc3QgeyBJc1RoZW5hYmxlIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5jb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuXHJcbmNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uIChjb25maWcgPSB7fSkge1xyXG4gICAgbGV0IGhpZXJhcmNoeSA9IHRoaXMuaGllcmFyY2h5KCkuam9pbihcIiA+IFwiKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlckNvbmZpZyA9IGNvbmZpZztcclxuICAgIHRoaXMucmVuYW1lQ29tcG9uZW50cygpO1xyXG4gICAgdGhpcy50d2Vha0xpZmVDeWNsZSgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHsgYmVmb3JlUmVuZGVyLCBvbkluaXQsIH0gPSB0aGlzLmxpZmVDeWNsZTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChvbkluaXQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJlZm9yZVJlbmRlcikge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHRoaXMuYmVmb3JlUmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoSXNUaGVuYWJsZShyZXR1cm5WYWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVuZGVyKGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmdGVyUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vblJlbmRlcihjb25maWcpO1xyXG4gICAgICAgIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gW1xyXG4gICAgICAgICAgICBoaWVyYXJjaHksXHJcbiAgICAgICAgICAgIGUubWVzc2FnZSxcclxuICAgICAgICAgICAgZS5zdGFjayxcclxuICAgICAgICBdLmpvaW4oXCJcXG5cIik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXI7IiwiY29uc3QgcmVuZGVyQ29tcG9uZW50ID0gZnVuY3Rpb24ocmVwbGFjZWQpIHtcclxuICAgIGxldCBsaXN0RXhwcmVzc2lvbiA9IHJlcGxhY2VkLmF0dHJpYnV0ZXNbJ2RhdGEtbGlzdCddO1xyXG5cclxuICAgIGlmKGxpc3RFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTGlzdENvbXBvbmVudChyZXBsYWNlZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlclNpbmd1bGFyQ29tcG9uZW50KHJlcGxhY2VkKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJDb21wb25lbnQ7IiwiY29uc3QgcmVuZGVyQ29tcG9uZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgY29tcG9uZW50cyB9ID0gdGhpcztcclxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cyk7XHJcblxyXG4gICAgaWYoIWtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlcGxhY2VkQ29tcG9uZW50VGFncyA9IHRoaXMucmVwbGFjZUNvbXBvbmVudFRhZ3MoKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxyZXBsYWNlZENvbXBvbmVudFRhZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcmVwbGFjZWQgPSByZXBsYWNlZENvbXBvbmVudFRhZ3NbaV07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyQ29tcG9uZW50KHJlcGxhY2VkKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJDb21wb25lbnRzOyIsImNvbnN0IHJlbmRlcklmID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBpZCwgZGF0YSB9ID0gdGhpcztcclxuICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgbGV0IHJlbmRlcldoaWxlRXhpc3RzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RhdGEtaWZdYCk7XHJcblxyXG4gICAgICAgIGlmKCFlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgJGVsZW1lbnQwID0gJChlbGVtZW50c1swXSk7XHJcbiAgICAgICAgbGV0IGV4cHJlc3Npb24gPSAkZWxlbWVudDAuYXR0cignZGF0YS1pZicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB7ICR7T2JqZWN0LmtleXMoZGF0YSkuam9pbihcIixcIil9IH0gPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICR7ZXhwcmVzc2lvbn1cclxuICAgICAgICB9KSgpXHJcbiAgICAgICAgYDtcclxuICAgICAgICBleHByZXNzaW9uID0gQm9vbGVhbihldmFsKHNjcmlwdCkpO1xyXG5cclxuICAgICAgICBpZihleHByZXNzaW9uID09IHRydWUpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQwLnJlbW92ZUF0dHIoJ2RhdGEtaWYnKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmKGV4cHJlc3Npb24gIT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudDAucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RhdGEtaWZdYCk7XHJcblxyXG4gICAgICAgIGlmKGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZW5kZXJXaGlsZUV4aXN0cygpO1xyXG4gICAgICAgIH1cdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcldoaWxlRXhpc3RzKCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVySWY7IiwiY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcbmNvbnN0IHsgR2VuZXJhdGVSYW5kb21JZCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlbmRlckxpc3RDb21wb25lbnQgPSBmdW5jdGlvbihyZXBsYWNlZCkge1xyXG4gICAgbGV0IHsgYXR0cmlidXRlcywgaWQgfSA9IHJlcGxhY2VkO1xyXG4gICAgbGV0IGJpbmRFeHByZXNzaW9uID0gYXR0cmlidXRlc1snZGF0YS1iaW5kJ107XHJcbiAgICBsZXQgbGlzdEV4cHJlc3Npb24gPSBhdHRyaWJ1dGVzWydkYXRhLWxpc3QnXTtcclxuICAgIGxldCBbY3VycmVudEl0ZW0sIGl0ZW1zXSA9IGxpc3RFeHByZXNzaW9uLnNwbGl0KFwiIGluIFwiKTtcclxuICAgICAgICBjdXJyZW50SXRlbSA9IGN1cnJlbnRJdGVtLnRyaW0oKTtcclxuICAgICAgICBpdGVtcyA9IGl0ZW1zLnRyaW0oKTtcclxuICAgIGxldCBsaXN0SXRlbXMgPSB0aGlzLmRhdGFbaXRlbXNdO1xyXG5cclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydjb21wb25lbnQtYWxpYXMnXTtcclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydkYXRhLWxpc3QnXTtcclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydkYXRhLWJpbmQnXTtcclxuXHJcbiAgICBpZighKGxpc3RJdGVtcyAmJiBsaXN0SXRlbXMubGVuZ3RoKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oWyBcclxuICAgICAgICAgICAgYCcke2l0ZW1zfScgaXMgZW1wdHkgb3Igbm90IGFuIGFycmF5IG9yIHVuZGVmaW5lZC5gXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHRcdFxyXG4gICAgbGV0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7IFxyXG5cclxuICAgIGxldCBjb25maWcgPSB7XHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudDogdGFyZ2V0RWxlbWVudC5wYXJlbnROb2RlLFxyXG4gICAgICAgIHJlbmRlclR5cGU6ICdhcHBlbmQnLFxyXG4gICAgfVxyXG4gICAgbGV0IHJlbmRlckxpc3RJdGVtID0gZnVuY3Rpb24ocmVwbGFjZWQsIGNvbXBvbmVudERhdGEsIGNvbmZpZykge1xyXG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXMsIGNvbXBvbmVudCB9ID0gcmVwbGFjZWQ7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IE9iamVjdC5jcmVhdGUoY29tcG9uZW50KTtcclxuXHJcblxyXG4gICAgICAgIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAuc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxyXG4gICAgICAgICAgICAuc2V0SWQoR2VuZXJhdGVSYW5kb21JZCgnY2lkJykpXHJcbiAgICAgICAgICAgIC5zZXRQYXJlbnQodGhpcylcclxuICAgICAgICAgICAgLnNldERhdGEoY29tcG9uZW50RGF0YSlcclxuICAgICAgICAgICAgLnJlbmRlcihjb25maWcpO1x0XHJcblxyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgbGV0IGV4dHJhY3RDb21wb25lbnREYXRhID0gZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIGxldCBjb21wb25lbnREYXRhID0ge307XHJcbiAgICAgICAgbGV0IHNjcmlwdCA9IGBcclxuICAgICAgICAgICAgKGZ1bmN0aW9uKCkgeyBcclxuICAgICAgICAgICAgICAgIGxldCAke2JpbmRFeHByZXNzaW9ufSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHtiaW5kRXhwcmVzc2lvbn1cclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBldmFsKHNjcmlwdCk7XHJcblxyXG4gICAgICAgIGlmKGN1cnJlbnRJdGVtID09IGJpbmRFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGFbY3VycmVudEl0ZW1dID0gZGF0YTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBpZihjdXJyZW50SXRlbSAhPSBiaW5kRXhwcmVzc2lvbikge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudERhdGEsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8bGlzdEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudERhdGEgPSBleHRyYWN0Q29tcG9uZW50RGF0YShsaXN0SXRlbXNbaV0pO1xyXG4gICAgICAgICAgICBjb21wb25lbnREYXRhLmluZGV4ID0gaTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgcmVuZGVyTGlzdEl0ZW0ocmVwbGFjZWQsIGNvbXBvbmVudERhdGEsIGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgJCh0YXJnZXRFbGVtZW50KS5yZW1vdmUoKTtcdFx0XHRcdFx0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyTGlzdENvbXBvbmVudDsiLCJjb25zdCB7IEludGVycG9sYXRlVGV4dCwgU2V0RGVmYXVsdENvbmZpZyB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVRlbXBsYXRlID0gZnVuY3Rpb24odGVtcGxhdGUsIGRhdGEsIGlkKSB7XHJcbiAgICBsZXQgJHRlbXBsYXRlMDtcclxuXHJcbiAgICB0ZW1wbGF0ZSA9ICQucGFyc2VIVE1MKEludGVycG9sYXRlVGV4dChkYXRhLCB0ZW1wbGF0ZSkpO1xyXG4gICAgJHRlbXBsYXRlMCA9ICQodGVtcGxhdGVbMF0pO1xyXG5cclxuICAgIGlmKHRlbXBsYXRlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgIGAub25Jbml0KCkgZG8gbm90IGhhdmUgYSB0ZW1wbGF0ZS5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYodGVtcGxhdGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgLm9uSW5pdCgpIHRlbXBsYXRlIG11c3QgYmUgZW5jbG9zZWQgaW4gYWAsXHJcbiAgICAgICAgICAgIGBzaW5nbGUgYmxvY2stbGV2ZWwgZWxlbWVudC5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYodGVtcGxhdGVbMF0ubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgYC5vbkluaXQoKSB0ZW1wbGF0ZSBtdXN0IGJlIGVuY2xvc2VkIGluIGFgLFxyXG4gICAgICAgICAgICBgc2luZ2xlIGJsb2NrLWxldmVsIGVsZW1lbnQuYCxcclxuICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICAkdGVtcGxhdGUwLmF0dHIoYG9uX2luaXRfJHtpZH1gLCAnJyk7XHJcbiAgICAgICAgXHJcbiAgICByZXR1cm4gdGVtcGxhdGU7XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlck9uSW5pdEVsZW1lbnQgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xyXG4gICAgbGV0IHsgZGF0YSwgaWQgfSA9IHRoaXM7XHJcbiAgICB0ZW1wbGF0ZSA9IGdlbmVyYXRlVGVtcGxhdGUodGVtcGxhdGUsIGRhdGEsIGlkKTtcclxuICAgIGxldCB7IHJlbmRlckNvbmZpZyB9ID0gdGhpcztcclxuICAgIGxldCBkZWZhdWx0Q29uZmlnID0ge1xyXG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IGRvY3VtZW50LmJvZHksIFxyXG4gICAgICAgIHJlbmRlclR5cGU6ICdyZXBsYWNlV2l0aCcsXHJcbiAgICB9O1xyXG4gICAgbGV0IHsgdGFyZ2V0RWxlbWVudCwgcmVuZGVyVHlwZSB9ID0gU2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnLCByZW5kZXJDb25maWcpO1xyXG5cclxuICAgICQodGFyZ2V0RWxlbWVudClbcmVuZGVyVHlwZV0odGVtcGxhdGUpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlck9uSW5pdEVsZW1lbnQ7IiwiY29uc3QgcmVuZGVyU2hvdyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQsIGRhdGEgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHNlbGYgPSAkKGAjJHtpZH1gKTtcclxuICAgIGxldCByZW5kZXJXaGlsZUV4aXN0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkYXRhLXNob3ddYCk7XHJcblxyXG4gICAgICAgIGlmKCFlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgJGVsZW1lbnQwID0gJChlbGVtZW50c1swXSk7XHJcbiAgICAgICAgbGV0IGV4cHJlc3Npb24gPSAkZWxlbWVudDAuYXR0cignZGF0YS1zaG93Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNjcmlwdCA9IGBcclxuICAgICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHsgJHtPYmplY3Qua2V5cyhkYXRhKS5qb2luKFwiLFwiKX0gfSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHtleHByZXNzaW9ufVxyXG4gICAgICAgIH0pKClcclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBpZighZXZhbChzY3JpcHQpKSB7XHJcbiAgICAgICAgICAgICRlbGVtZW50MC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRlbGVtZW50MC5yZW1vdmVBdHRyKCdkYXRhLXNob3cnKTtcclxuICAgICAgICBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkYXRhLXNob3ddYCk7XHJcblxyXG4gICAgICAgIGlmKGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZW5kZXJXaGlsZUV4aXN0cygpO1xyXG4gICAgICAgIH1cdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcldoaWxlRXhpc3RzKCk7XHRcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlclNob3c7IiwiY29uc3QgeyBHZW5lcmF0ZVJhbmRvbUlkIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgcmVuZGVyU2luZ3VsYXJDb21wb25lbnQgPSBmdW5jdGlvbiAocmVwbGFjZWQpIHtcclxuICAgIGxldCB7IGRhdGEgfSA9IHRoaXM7XHJcbiAgICBsZXQgeyBpZCwgY29tcG9uZW50LCBhdHRyaWJ1dGVzIH0gPSByZXBsYWNlZDtcclxuICAgIGNvbXBvbmVudCA9IE9iamVjdC5jcmVhdGUoY29tcG9uZW50KTtcclxuICAgIGxldCBjb21wb25lbnREYXRhO1xyXG4gICAgbGV0IGRhdGFFeHByZXNzaW9uID0gYXR0cmlidXRlc1snZGF0YS1iaW5kJ10udHJpbSgpO1xyXG4gICAgbGV0IGhhc0VxdWFsU2lnbiA9IGRhdGFFeHByZXNzaW9uLnNlYXJjaCgnWz1dJykgKyAxO1xyXG5cclxuICAgIGlmIChoYXNFcXVhbFNpZ24pIHtcclxuICAgICAgICBsZXQgdmFsdWVFeHByZXNzaW9uID0gZGF0YUV4cHJlc3Npb24uc3BsaXQoXCI9XCIpWzBdLnRyaW0oKTtcclxuICAgICAgICBsZXQgc2NyaXB0ID0gYFxyXG4gICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHsgJHtPYmplY3Qua2V5cyhkYXRhKS5qb2luKFwiLCBcIil9IH0gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAke2RhdGFFeHByZXNzaW9ufTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICR7dmFsdWVFeHByZXNzaW9ufTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oKTtcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgY29tcG9uZW50RGF0YSA9IGV2YWwoc2NyaXB0KTtcclxuICAgIH1cclxuICAgIGlmICghaGFzRXF1YWxTaWduKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGRhdGFFeHByZXNzaW9uO1xyXG4gICAgICAgIGNvbXBvbmVudERhdGEgPSB7fTtcclxuICAgICAgICBjb21wb25lbnREYXRhW2tleV0gPSBkYXRhW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb21wb25lbnREYXRhICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGxldCBrZXkgPSBkYXRhRXhwcmVzc2lvbjtcclxuXHJcbiAgICAgICAgY29tcG9uZW50RGF0YVtrZXldID0gY29tcG9uZW50RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snY29tcG9uZW50LWFsaWFzJ107XHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snZGF0YS1saXN0J107XHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snZGF0YS1iaW5kJ107XHJcblxyXG4gICAgY29tcG9uZW50XHJcbiAgICAgICAgLnNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcylcclxuICAgICAgICAuc2V0SWQoR2VuZXJhdGVSYW5kb21JZCgnY2lkJykpXHJcbiAgICAgICAgLnNldFBhcmVudCh0aGlzKVxyXG4gICAgICAgIC5zZXREYXRhKGNvbXBvbmVudERhdGEpXHJcbiAgICAgICAgLnJlbmRlcih7XHJcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSxcclxuICAgICAgICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJTaW5ndWxhckNvbXBvbmVudDsiLCJjb25zdCB7IHN0eWxlRXhpc3RzIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCByZW5kZXJTdHlsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgc3R5bGVJZCwgc3R5bGUgfSA9IHRoaXM7XHJcblxyXG4gICAgaWYoIXN0eWxlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYoIXN0eWxlRXhpc3RzKHN0eWxlSWQpKSB7XHJcbiAgICAgICAgbGV0IGhlYWQwID0gJCgnaGVhZCcpWzBdO1xyXG4gICAgICAgIGxldCAkaGVhZDAgPSAkKGhlYWQwKTtcclxuXHJcbiAgICAgICAgJGhlYWQwLmFwcGVuZCh0aGlzLmdlbmVyYXRlU3R5bGUoKSk7XHJcbiAgICB9XHRcdFx0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyU3R5bGU7XHJcbiIsImNvbnN0IHsgU2V0RGVmYXVsdENvbmZpZyB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlbmRlclRlbXBsYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICBsZXQgeyBpZCB9ID0gdGhpcztcclxuICAgIGxldCBkZWZhdWx0Q29uZmlnID0ge1xyXG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IGRvY3VtZW50LmJvZHksIFxyXG4gICAgICAgIHJlbmRlclR5cGU6ICdyZXBsYWNlV2l0aCcsXHJcbiAgICB9O1xyXG4gICAgbGV0IHsgdGFyZ2V0RWxlbWVudCwgcmVuZGVyVHlwZSB9ID0gU2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnLCBjb25maWcpO1xyXG4gICAgbGV0IHRlbXBsYXRlID0gdGhpcy5nZW5lcmF0ZVRlbXBsYXRlKCk7XHJcbiAgICBsZXQgJHRhcmdldEVsZW1lbnQgPSAkKHRhcmdldEVsZW1lbnQpO1xyXG5cclxuICAgIGlmKCEkdGFyZ2V0RWxlbWVudC5sZW5ndGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgYCd0YXJnZXRFbGVtZW50JyBkb2VzIG5vdCBleGlzdHMuYCxcclxuICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuICAgIGlmKHJlbmRlclR5cGUgPT0gJ3JlcGxhY2VXaXRoJykge1xyXG4gICAgICAgIGxldCAkb25Jbml0RWxlbWVudCA9ICQoYFtvbl9pbml0XyR7aWR9XWApO1xyXG5cclxuICAgICAgICBpZigkb25Jbml0RWxlbWVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb25Jbml0RWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJHRhcmdldEVsZW1lbnRbcmVuZGVyVHlwZV0odGVtcGxhdGUpO1x0XHRcclxufVx0XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlclRlbXBsYXRlOyIsImNvbnN0IHsgR2VuZXJhdGVSYW5kb21JZCwgQXR0cmlidXRlc0V4dHJhY3RvciB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlcGxhY2VDb21wb25lbnRUYWdzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG4gICAgbGV0IHsgJHNlbGYgfSA9IHRoaXMuJHJlZnM7XHJcbiAgICBsZXQgcmVwbGFjZWRDb21wb25lbnRUYWdzID0gW107XHJcbiAgICBsZXQgZmluZENvbXBvbmVudHMgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gW1xyXG4gICAgICAgICAgICAuLi4kc2VsZi5maW5kKG5hbWUpLCBcclxuICAgICAgICAgICAgLi4uJHNlbGYuZmluZChgW2NvbXBvbmVudC1hbGlhcz1cIiR7bmFtZX1cIl1gKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50cztcclxuICAgIH1cclxuICAgIGxldCByZXBsYWNlID0gZnVuY3Rpb24oZWxlbWVudHMsIGNvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCBpZCA9IEdlbmVyYXRlUmFuZG9tSWQoJ3JpZCcpO1xyXG4gICAgICAgIGxldCBlbGVtZW50MCA9IGVsZW1lbnRzWzBdO1xyXG4gICAgICAgIGxldCB0YWJsZUVsZW1lbnRzID0gXCJ0aGVhZCx0Ym9keSx0Zm9vdCx0cix0aCx0ZFwiO1xyXG4gICAgICAgIGxldCB0YWdOYW1lID0gZWxlbWVudDAudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCB0YWcgPSAoXHJcbiAgICAgICAgICAgIHRhYmxlRWxlbWVudHNcclxuICAgICAgICAgICAgICAgIC5zcGxpdChcIixcIilcclxuICAgICAgICAgICAgICAgIC5pbmNsdWRlcyh0YWdOYW1lKVxyXG4gICAgICAgICkgPyB0YWdOYW1lIDogXCJ0ZW1wb3JhcnlcIjtcclxuICAgICAgICBsZXQgJGVsZW1lbnQwID0gJChlbGVtZW50MCk7XHJcblxyXG4gICAgICAgIHJlcGxhY2VkQ29tcG9uZW50VGFncy5wdXNoKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudDogT2JqZWN0LmNyZWF0ZShjb21wb25lbnQpLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGVzRXh0cmFjdG9yKGVsZW1lbnQwKS5leHRyYWN0KCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJGVsZW1lbnQwLnJlcGxhY2VXaXRoKGA8JHt0YWd9IGlkPVwiJHtpZH1cIi8+YCk7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVwbGFjZVdoaWxlRXhpc3RzID0gZnVuY3Rpb24oY29tcG9uZW50KSB7XHJcbiAgICAgICAgbGV0IHsgbmFtZSB9ID0gY29tcG9uZW50O1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9IGZpbmRDb21wb25lbnRzKG5hbWUpO1xyXG5cclxuICAgICAgICBpZighZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVwbGFjZShlbGVtZW50cywgY29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgZWxlbWVudHMgPSBmaW5kQ29tcG9uZW50cyhuYW1lKTtcclxuXHJcbiAgICAgICAgaWYoIWVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcGxhY2VXaGlsZUV4aXN0cyhjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcihsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldO1xyXG5cclxuICAgICAgICBpZighY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXBsYWNlV2hpbGVFeGlzdHMoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVwbGFjZWRDb21wb25lbnRUYWdzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcGxhY2VDb21wb25lbnRUYWdzOyIsImNvbnN0IHNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbihEb21BdHRyaWJ1dGVzID0ge30pIHtcclxuICAgIGxldCB7IGF0dHJpYnV0ZXMgfSA9IHRoaXM7XHJcblxyXG4gICAgaWYodHlwZW9mIERvbUF0dHJpYnV0ZXMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgRG9tQXR0cmlidXRlcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzLCBEb21BdHRyaWJ1dGVzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzOyIsImNvbnN0IHsgTWVyZ2VPYmplY3QgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCBzZXREYXRhID0gZnVuY3Rpb24ocGFzc2VkRGF0YSkge1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICB0aGlzLmRhdGEgPSBNZXJnZU9iamVjdChwYXNzZWREYXRhLCBkYXRhKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufVx0XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNldERhdGE7IiwiY29uc3QgeyBHZW5lcmF0ZVJhbmRvbUlkIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3Qgc2V0SWQgPSBmdW5jdGlvbihpZD1HZW5lcmF0ZVJhbmRvbUlkKCdjaWQnKSkge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNldElkOyIsImNvbnN0IHNldFBhcmVudCA9IGZ1bmN0aW9uKHBhcmVudCkge1xyXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2V0UGFyZW50OyIsImNvbnN0IHR3ZWFrTGlmZUN5Y2xlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBsaWZlQ3ljbGUgfSA9IHRoaXM7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxpZmVDeWNsZSk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIGxldCBmbiA9IGxpZmVDeWNsZVtrZXldO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpZmVDeWNsZVtrZXldID0gZm4uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpZmVDeWNsZSA9IGxpZmVDeWNsZTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0d2Vha0xpZmVDeWNsZTsiLCJjb25zdCBBdHRyaWJ1dGVzRXh0cmFjdG9yID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdGxldCBleHRyYWN0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgYXR0cmlidXRlcyA9IHt9O1xyXG5cdFx0bGV0IG5vZGVNYXAgPSB0aGlzLmVsZW1lbnQuYXR0cmlidXRlcztcclxuXHJcblx0XHRmb3IobGV0IGk9MDsgaTxub2RlTWFwLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGxldCB7IG5vZGVOYW1lLCBub2RlVmFsdWUgfSA9IG5vZGVNYXBbaV07XHJcblx0XHRcdFxyXG5cdFx0XHRhdHRyaWJ1dGVzW25vZGVOYW1lXSA9IG5vZGVWYWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXR0cmlidXRlcztcclxuXHR9O1xyXG5cdGxldCBnZXQgPSBmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRsZXQgYXR0cmlidXRlcyA9IHRoaXMuZXh0cmFjdCgpO1xyXG5cclxuXHRcdHJldHVybiBhdHRyaWJ1dGVzW25hbWVdO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRlbGVtZW50LFxyXG5cdFx0ZXh0cmFjdCxcclxuXHRcdGdldCxcclxuXHR9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEF0dHJpYnV0ZXNFeHRyYWN0b3I7IiwiY29uc3QgRGFzaGlmeVNuYWtlQ2FzZSA9IGZ1bmN0aW9uKHN0cikge1xyXG5cdGxldCBjaHVua3MgPSBzdHIuc3BsaXQoLyhbQS1aXSkvKTtcclxuXHJcblx0aWYoY2h1bmtzWzBdPT1cIlwiKSB7XHJcblx0XHRjaHVua3Muc2hpZnQoKTtcclxuXHR9XHJcblx0aWYoL14oW0EtWl0pezF9JC8udGVzdChjaHVua3NbMF0pKSB7XHJcblx0XHRjaHVua3NbMF0gPSBjaHVua3NbMF0udG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblx0c3RyID0gY2h1bmtzLmpvaW4oXCJcIik7XHJcblx0Y2h1bmtzID0gc3RyLnNwbGl0KC8oW0EtWl0pLyk7XHJcblx0Y2h1bmtzID0gY2h1bmtzLm1hcChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRpZigvXihbQS1aXSl7MX0kLy50ZXN0KGl0ZW0pKSB7XHJcblx0XHRcdGl0ZW0gPSBgLSR7aXRlbX1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gY2h1bmtzLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXNoaWZ5U25ha2VDYXNlOyIsImNvbnN0IEdlbmVyYXRlUmFuZG9tTnVtYmVyID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbU51bWJlci5qcycpO1xyXG5cclxuY29uc3QgR2VuZXJhdGVSYW5kb21JZCA9IGZ1bmN0aW9uKHByZWZpeCA9IFwicm5kXCIpIHtcclxuXHRsZXQgaWQgPSBbXHJcblx0XHRwcmVmaXgsXHJcblx0XHRHZW5lcmF0ZVJhbmRvbU51bWJlcigxMDAwLCA5OTk5KSxcclxuXHRcdChEYXRlLm5vdygpICsgJycpLnN1YnN0cig1KSxcclxuXHRdLmpvaW4oXCJfXCIpO1xyXG5cclxuXHRyZXR1cm4gaWQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdGVSYW5kb21JZDsiLCJjb25zdCBHZW5lcmF0ZVJhbmRvbU51bWJlciA9IGZ1bmN0aW9uKG1pbj0wLCBtYXg9OSkge1xyXG5cdG1pbiA9IE1hdGguY2VpbChtaW4pO1xyXG5cdG1heCA9IE1hdGguZmxvb3IobWF4KTtcclxuXHJcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdGVSYW5kb21OdW1iZXI7IiwiY29uc3QgVHJpbVdoaXRlU3BhY2UgPSByZXF1aXJlKCcuL1RyaW1XaGl0ZVNwYWNlLmpzJyk7XHJcblxyXG5jb25zdCByZXBsYWNlID0gZnVuY3Rpb24oc3RyLCBmaW5kLCByZXBsYWNlKSB7XHJcblx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoYCgke2ZpbmR9KWAsICdnJyksIHJlcGxhY2UpOyBcclxufVxyXG5cclxuY29uc3QgSW50ZXJwb2xhdGVUZXh0ID0gZnVuY3Rpb24oZGF0YSwgdGV4dCkge1xyXG5cdGlmKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHR0ZXh0ID0gcmVwbGFjZSh0ZXh0LCAne3snLCAnJHsnKTtcclxuXHR0ZXh0ID0gcmVwbGFjZSh0ZXh0LCAnfX0nLCAnfScpOztcclxuXHJcblx0bGV0IGZuQm9keSA9IGBcclxuXHRcdGxldCB7ICR7T2JqZWN0LmtleXMoZGF0YSkuam9pbihcIiwgXCIpfSB9ID0gZGF0YTtcclxuXHJcblx0XHRyZXR1cm4gXFxgJHt0ZXh0fVxcYDtcclxuXHRgO1xyXG5cdGxldCBmbiA9IG5ldyBGdW5jdGlvbignZGF0YScsIGZuQm9keSk7XHJcblx0XHJcblx0cmV0dXJuIFRyaW1XaGl0ZVNwYWNlKGZuKGRhdGEpKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcnBvbGF0ZVRleHQ7IiwiY29uc3QgSXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICBpZighZm4pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlzUHJvbWlzZSA9IGZuIGluc3RhbmNlb2YgUHJvbWlzZTtcclxuICAgIGxldCBpc0FzeW5jID0gZm4uY29uc3RydWN0b3IubmFtZSA9PT0gJ0FzeW5jRnVuY3Rpb24nO1xyXG4gICAgXHJcbiAgICByZXR1cm4gaXNQcm9taXNlIHx8IGlzQXN5bmM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXNUaGVuYWJsZTsiLCJjb25zdCBNZXJnZU9iamVjdCA9IGZ1bmN0aW9uKGRvbWluYW50T2JqZWN0LCB3ZWFrT2JqZWN0KSB7XHJcblx0bGV0IHdlYWtPYmplY3RLZXlzID0gT2JqZWN0LmtleXMod2Vha09iamVjdCk7XHJcblxyXG5cdGZvcihsZXQgaT0wOyBpPHdlYWtPYmplY3RLZXlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQga2V5ID0gd2Vha09iamVjdEtleXNbaV07XHJcblxyXG5cdFx0aWYoZG9taW5hbnRPYmplY3Rba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRvbWluYW50T2JqZWN0W2tleV0gPSB3ZWFrT2JqZWN0W2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZG9taW5hbnRPYmplY3Q7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVyZ2VPYmplY3Q7IiwiY29uc3QgU2V0RGVmYXVsdENvbmZpZyA9IGZ1bmN0aW9uKGRlZmF1bHRDb25maWcsIHN1cHBsaWVkQ29uZmlnKSB7XHJcblx0bGV0IGRlZmF1bHRDb25maWdLZXlzID0gT2JqZWN0LmtleXMoZGVmYXVsdENvbmZpZyk7XHJcblxyXG5cdGZvcihsZXQgaT0wOyBpPGRlZmF1bHRDb25maWdLZXlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQga2V5ID0gZGVmYXVsdENvbmZpZ0tleXNbaV07XHJcblxyXG5cdFx0aWYoc3VwcGxpZWRDb25maWdba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHN1cHBsaWVkQ29uZmlnW2tleV0gPSBkZWZhdWx0Q29uZmlnW2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3VwcGxpZWRDb25maWc7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2V0RGVmYXVsdENvbmZpZzsiLCJjb25zdCBUcmltV2hpdGVTcGFjZSA9IGZ1bmN0aW9uKHN0cikge1xyXG5cdGxldCBjaHVua3MgPSBzdHIuc3BsaXQoL1xccy8pO1xyXG5cdGxldCBjaGFycyA9IFtdO1xyXG5cclxuXHRmb3IobGV0IGk9MDsgaTxjaHVua3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBjaHVuayA9IGNodW5rc1tpXTtcclxuXHJcblx0XHRpZihjaHVuaz09XCJcIikge1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHRjaGFycy5wdXNoKGNodW5rKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjaGFycy5qb2luKFwiIFwiKTtcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyaW1XaGl0ZVNwYWNlOyIsImNvbnN0IEF0dHJpYnV0ZXNFeHRyYWN0b3IgPSByZXF1aXJlKCcuL0F0dHJpYnV0ZXNFeHRyYWN0b3IuanMnKTtcclxuY29uc3QgRGFzaGlmeVNuYWtlQ2FzZSA9IHJlcXVpcmUoJy4vRGFzaGlmeVNuYWtlQ2FzZS5qcycpO1xyXG5jb25zdCBHZW5lcmF0ZVJhbmRvbUlkID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbUlkLmpzJyk7XHJcbmNvbnN0IEdlbmVyYXRlUmFuZG9tTnVtYmVyID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbU51bWJlci5qcycpO1xyXG5jb25zdCBJbnRlcnBvbGF0ZVRleHQgPSByZXF1aXJlKCcuL0ludGVycG9sYXRlVGV4dC5qcycpO1xyXG5jb25zdCBJc1RoZW5hYmxlID0gcmVxdWlyZSgnLi9Jc1RoZW5hYmxlLmpzJyk7XHJcbmNvbnN0IE1lcmdlT2JqZWN0ID0gcmVxdWlyZSgnLi9NZXJnZU9iamVjdC5qcycpO1xyXG5jb25zdCBTZXREZWZhdWx0Q29uZmlnID0gcmVxdWlyZSgnLi9TZXREZWZhdWx0Q29uZmlnLmpzJyk7XHJcbmNvbnN0IFRyaW1XaGl0ZVNwYWNlID0gcmVxdWlyZSgnLi9UcmltV2hpdGVTcGFjZS5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0QXR0cmlidXRlc0V4dHJhY3RvcixcclxuXHREYXNoaWZ5U25ha2VDYXNlLFxyXG5cdEdlbmVyYXRlUmFuZG9tSWQsXHJcblx0R2VuZXJhdGVSYW5kb21OdW1iZXIsXHJcblx0SW50ZXJwb2xhdGVUZXh0LFxyXG5cdElzVGhlbmFibGUsXHJcblx0TWVyZ2VPYmplY3QsXHJcblx0U2V0RGVmYXVsdENvbmZpZyxcclxuXHRUcmltV2hpdGVTcGFjZSxcclxufSJdfQ==
