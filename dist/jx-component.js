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
  var id = replaced.id,
      component = replaced.component,
      attributes = replaced.attributes;
  component = Object.create(component);
  var componentData;
  var dataExpression = attributes['data-bind'];

  if (dataExpression) {
    var data = this.data;

    var generateComponentData = function generateComponentData(dataExpression, data) {
      dataExpression = dataExpression.trim();
      var componentData;
      var hasEqualSign = dataExpression.search('[=]') + 1;

      if (hasEqualSign) {
        var valueExpression = dataExpression.split("=")[0].trim();
        var script = "\n                    (function () {\n                        let { ".concat(Object.keys(data).join(", "), " } = data;\n                        let fn = function () {\n                            let ").concat(dataExpression, ";\n        \n                            return ").concat(valueExpression, ";\n                        }\n        \n                        return fn();\n                    })()\n                ");
        componentData = eval(script);
      }

      if (!hasEqualSign) {
        var key = dataExpression;
        componentData = {};
        componentData[key] = data[key];
      }

      if (_typeof(componentData) !== 'object') {
        componentData = {};
      }

      return componentData;
    };

    componentData = generateComponentData(dataExpression, data);
  }

  delete attributes['component-alias'];
  delete attributes['data-list'];
  delete attributes['data-bind'];
  component.setAttributes(attributes).setId(GenerateRandomId('cid')).setParent(this);

  if (componentData) {
    component.setData(componentData);
  }

  component.render({
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwic3JjL0NvbXBvbmVudC5qcyIsInNyYy9Db21wb25lbnRDb2xsZWN0aW9uLmpzIiwic3JjL0NvbXBvbmVudENvbnN0cnVjdG9yLmpzIiwic3JjL0NvbXBvbmVudEV4Y2VwdGlvbi5qcyIsInNyYy9oZWxwZXJzL2luZGV4LmpzIiwic3JjL2hlbHBlcnMvcmVtb3ZlU3R5bGUuanMiLCJzcmMvaGVscGVycy9zdHlsZUV4aXN0cy5qcyIsInNyYy9tZXRob2RzL2FmdGVyUmVuZGVyLmpzIiwic3JjL21ldGhvZHMvYmVmb3JlUmVuZGVyLmpzIiwic3JjL21ldGhvZHMvY3JlYXRlSW5zdGFuY2UuanMiLCJzcmMvbWV0aG9kcy9kZXN0cm95LmpzIiwic3JjL21ldGhvZHMvZ2VuZXJhdGVTdHlsZS5qcyIsInNyYy9tZXRob2RzL2dlbmVyYXRlVGVtcGxhdGUuanMiLCJzcmMvbWV0aG9kcy9oaWVyYXJjaHkuanMiLCJzcmMvbWV0aG9kcy9pbmRleC5qcyIsInNyYy9tZXRob2RzL29uSW5pdC5qcyIsInNyYy9tZXRob2RzL29uUmVuZGVyLmpzIiwic3JjL21ldGhvZHMvcGFyZW50Q29tcG9uZW50LmpzIiwic3JjL21ldGhvZHMvcmVnaXN0ZXJEb21SZWZzLmpzIiwic3JjL21ldGhvZHMvcmVnaXN0ZXJFdmVudHMuanMiLCJzcmMvbWV0aG9kcy9yZWdpc3Rlck1ldGhvZHMuanMiLCJzcmMvbWV0aG9kcy9yZWdpc3RlclJlbW92ZVNlbGZFdmVudC5qcyIsInNyYy9tZXRob2RzL3JlbW92ZU9uSW5pdEVsZW1lbnQuanMiLCJzcmMvbWV0aG9kcy9yZW5hbWVDb21wb25lbnRzLmpzIiwic3JjL21ldGhvZHMvcmVuZGVyLmpzIiwic3JjL21ldGhvZHMvcmVuZGVyQ29tcG9uZW50LmpzIiwic3JjL21ldGhvZHMvcmVuZGVyQ29tcG9uZW50cy5qcyIsInNyYy9tZXRob2RzL3JlbmRlcklmLmpzIiwic3JjL21ldGhvZHMvcmVuZGVyTGlzdENvbXBvbmVudC5qcyIsInNyYy9tZXRob2RzL3JlbmRlck9uSW5pdEVsZW1lbnQuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJTaG93LmpzIiwic3JjL21ldGhvZHMvcmVuZGVyU2luZ3VsYXJDb21wb25lbnQuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJTdHlsZS5qcyIsInNyYy9tZXRob2RzL3JlbmRlclRlbXBsYXRlLmpzIiwic3JjL21ldGhvZHMvcmVwbGFjZUNvbXBvbmVudFRhZ3MuanMiLCJzcmMvbWV0aG9kcy9zZXRBdHRyaWJ1dGVzLmpzIiwic3JjL21ldGhvZHMvc2V0RGF0YS5qcyIsInNyYy9tZXRob2RzL3NldElkLmpzIiwic3JjL21ldGhvZHMvc2V0UGFyZW50LmpzIiwic3JjL21ldGhvZHMvdHdlYWtMaWZlQ3ljbGUuanMiLCJzcmMvdXRpbHMvQXR0cmlidXRlc0V4dHJhY3Rvci5qcyIsInNyYy91dGlscy9EYXNoaWZ5U25ha2VDYXNlLmpzIiwic3JjL3V0aWxzL0dlbmVyYXRlUmFuZG9tSWQuanMiLCJzcmMvdXRpbHMvR2VuZXJhdGVSYW5kb21OdW1iZXIuanMiLCJzcmMvdXRpbHMvSW50ZXJwb2xhdGVUZXh0LmpzIiwic3JjL3V0aWxzL0lzVGhlbmFibGUuanMiLCJzcmMvdXRpbHMvTWVyZ2VPYmplY3QuanMiLCJzcmMvdXRpbHMvU2V0RGVmYXVsdENvbmZpZy5qcyIsInNyYy91dGlscy9UcmltV2hpdGVTcGFjZS5qcyIsInNyYy91dGlscy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsOEJBQUQsQ0FBbkM7O0FBQ0EsSUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsNkJBQUQsQ0FBbEM7O0FBQ0EsSUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsK0JBQUQsQ0FBcEM7O0FBQ0EsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLG9CQUFELENBQXpCOztBQUVBLE1B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QUEsY0FBYyxFQUFkO0FBVGdCLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudENvbGxlY3Rpb24uanMnKTtcclxuY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi9zcmMvQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudENvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9zcmMvQ29tcG9uZW50Q29uc3RydWN0b3IuanMnKTtcclxuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9zcmMvQ29tcG9uZW50LmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRDb21wb25lbnRDb2xsZWN0aW9uLFxyXG5cdENvbXBvbmVudEV4Y2VwdGlvbixcclxuXHRDb21wb25lbnRDb25zdHJ1Y3RvcixcclxuXHRDb21wb25lbnQsXHJcbn0iLCJjb25zdCB7IEdlbmVyYXRlUmFuZG9tSWQgfSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgeyBcclxuICAgIGRlc3Ryb3ksXHJcbiAgICBoaWVyYXJjaHksXHJcbiAgICBwYXJlbnRDb21wb25lbnQsXHJcbiAgICBjcmVhdGVJbnN0YW5jZSxcclxuICAgIHNldERhdGEsXHJcbiAgICBzZXRQYXJlbnQsXHJcbiAgICBzZXRJZCxcclxuICAgIHNldEF0dHJpYnV0ZXMsXHJcbiAgICByZW5kZXJTaW5ndWxhckNvbXBvbmVudCxcclxuICAgIHJlbmRlckxpc3RDb21wb25lbnQsXHJcbiAgICByZW5kZXJDb21wb25lbnQsXHJcbiAgICByZXBsYWNlQ29tcG9uZW50VGFncyxcclxuICAgIHJlbmRlckNvbXBvbmVudHMsXHJcbiAgICByZWdpc3RlckRvbVJlZnMsXHJcblx0cmVnaXN0ZXJFdmVudHMsXHJcblx0cmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQsXHJcbiAgICByZWdpc3Rlck1ldGhvZHMsXHJcbiAgICByZW5kZXJTaG93LFxyXG4gICAgcmVuZGVySWYsXHJcbiAgICBnZW5lcmF0ZVRlbXBsYXRlLFxyXG4gICAgcmVuZGVyVGVtcGxhdGUsXHJcbiAgICBnZW5lcmF0ZVN0eWxlLFxyXG4gICAgcmVuZGVyU3R5bGUsXHJcbiAgICBhZnRlclJlbmRlcixcclxuICAgIG9uUmVuZGVyLFxyXG4gICAgYmVmb3JlUmVuZGVyLFxyXG4gICAgcmVtb3ZlT25Jbml0RWxlbWVudCxcclxuICAgIHJlbmRlck9uSW5pdEVsZW1lbnQsXHJcbiAgICBvbkluaXQsXHJcbiAgICB0d2Vha0xpZmVDeWNsZSxcclxuICAgIHJlbmFtZUNvbXBvbmVudHMsXHJcbiAgICByZW5kZXIsXHJcbn0gPSByZXF1aXJlKCcuL21ldGhvZHMvaW5kZXguanMnKTtcclxuXHJcbmNsYXNzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcclxuXHRcdGxldCB7IFxyXG5cdFx0XHRuYW1lLFxyXG5cdFx0XHRzdHlsZUlkLFxyXG5cdFx0XHRzdHlsZSxcclxuXHRcdFx0dGVtcGxhdGUsXHJcblx0XHRcdGRhdGEsXHJcblx0XHRcdGV2ZW50cyxcclxuXHRcdFx0bWV0aG9kcyxcclxuXHRcdFx0bGlmZUN5Y2xlLFxyXG5cdFx0XHRjb21wb25lbnRzLFxyXG5cdFx0XHRhdHRyaWJ1dGVzLFxyXG5cdFx0XHRwYXJlbnQsXHJcblx0XHR9ID0gY29uZmlnO1xyXG5cclxuXHRcdHRoaXMuaWQgPSBHZW5lcmF0ZVJhbmRvbUlkKCdjaWQnKTtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLnN0eWxlSWQgPSBzdHlsZUlkO1xyXG5cdFx0dGhpcy5zdHlsZSA9IHN0eWxlO1xyXG5cdFx0dGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcclxuXHRcdHRoaXMuZXZlbnRzID0gZXZlbnRzO1xyXG5cdFx0dGhpcy5tZXRob2RzID0gbWV0aG9kcztcclxuXHRcdHRoaXMubGlmZUN5Y2xlID0gbGlmZUN5Y2xlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuXHRcdHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XHJcbiAgICAgICAgdGhpcy4kcmVmcyA9IHt9O1xyXG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcblx0fVxyXG5cclxuICAgIGRlc3Ryb3kgPSBkZXN0cm95O1xyXG4gICAgaGllcmFyY2h5ID0gaGllcmFyY2h5O1xyXG4gICAgcGFyZW50Q29tcG9uZW50ID0gcGFyZW50Q29tcG9uZW50O1xyXG4gICAgY3JlYXRlSW5zdGFuY2UgPSBjcmVhdGVJbnN0YW5jZTtcclxuICAgIHNldERhdGEgPSBzZXREYXRhO1xyXG4gICAgc2V0UGFyZW50ID0gc2V0UGFyZW50O1xyXG4gICAgc2V0SWQgPSBzZXRJZDtcclxuICAgIHNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xyXG4gICAgcmVuZGVyU2luZ3VsYXJDb21wb25lbnQgPSByZW5kZXJTaW5ndWxhckNvbXBvbmVudDtcclxuICAgIHJlbmRlckxpc3RDb21wb25lbnQgPSByZW5kZXJMaXN0Q29tcG9uZW50O1xyXG4gICAgcmVuZGVyQ29tcG9uZW50ID0gcmVuZGVyQ29tcG9uZW50O1xyXG4gICAgcmVwbGFjZUNvbXBvbmVudFRhZ3MgPSByZXBsYWNlQ29tcG9uZW50VGFncztcclxuICAgIHJlbmRlckNvbXBvbmVudHMgPSByZW5kZXJDb21wb25lbnRzO1xyXG4gICAgcmVnaXN0ZXJEb21SZWZzID0gcmVnaXN0ZXJEb21SZWZzO1xyXG5cdHJlZ2lzdGVyRXZlbnRzID0gcmVnaXN0ZXJFdmVudHM7XHJcblx0cmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQgPSByZWdpc3RlclJlbW92ZVNlbGZFdmVudDtcclxuICAgIHJlZ2lzdGVyTWV0aG9kcyA9IHJlZ2lzdGVyTWV0aG9kcztcclxuICAgIHJlbmRlclNob3cgPSByZW5kZXJTaG93O1xyXG4gICAgcmVuZGVySWYgPSByZW5kZXJJZjtcclxuICAgIGdlbmVyYXRlVGVtcGxhdGUgPSBnZW5lcmF0ZVRlbXBsYXRlO1xyXG4gICAgcmVuZGVyVGVtcGxhdGUgPSByZW5kZXJUZW1wbGF0ZTtcclxuICAgIGdlbmVyYXRlU3R5bGUgPSBnZW5lcmF0ZVN0eWxlO1xyXG4gICAgcmVuZGVyU3R5bGUgPSByZW5kZXJTdHlsZTtcclxuICAgIGFmdGVyUmVuZGVyID0gYWZ0ZXJSZW5kZXI7XHJcbiAgICBvblJlbmRlciA9IG9uUmVuZGVyO1xyXG4gICAgYmVmb3JlUmVuZGVyID0gYmVmb3JlUmVuZGVyO1xyXG4gICAgcmVtb3ZlT25Jbml0RWxlbWVudCA9IHJlbW92ZU9uSW5pdEVsZW1lbnQ7XHJcbiAgICByZW5kZXJPbkluaXRFbGVtZW50ID0gcmVuZGVyT25Jbml0RWxlbWVudDtcclxuICAgIG9uSW5pdCA9IG9uSW5pdDtcclxuICAgIHR3ZWFrTGlmZUN5Y2xlID0gdHdlYWtMaWZlQ3ljbGU7XHJcbiAgICByZW5hbWVDb21wb25lbnRzID0gcmVuYW1lQ29tcG9uZW50cztcclxuICAgIHJlbmRlciA9IHJlbmRlcjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHtcclxuXHRjb21wb25lbnRzOiBbXSxcclxuXHRhZGQoY29tcG9uZW50KSB7IFxyXG5cdFx0dGhpcy5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcclxuXHR9LFxyXG5cdHJlbW92ZShjb21wb25lbnQpIHtcclxuXHRcdGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblx0XHRsZXQgaW5kZXggPSBjb21wb25lbnRzLmZpbmRJbmRleCgoaXRlbSk9PiB7XHJcblx0XHRcdHJldHVybiBpdGVtLmlkID09IGNvbXBvbmVudC5pZDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGluZGV4IDw9IC0xKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cdFxyXG5cdFx0Y29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuXHR9LFxyXG5cdGZpbHRlcigpIHtcclxuXHRcdGxldCBmaWx0ZXJDb21wb25lbnRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblxyXG5cdFx0XHRmb3IobGV0IGk9MDsgaTxjb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNbaV07XHJcblx0XHRcdFx0bGV0ICRjb21wb25lbnQgPSAkKGAjJHtjb21wb25lbnQuaWR9YCk7XHJcblx0XHJcblx0XHRcdFx0aWYoJGNvbXBvbmVudC5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnJlbW92ZShjb21wb25lbnQpO1xyXG5cdFx0XHR9XHRcdFxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZmlsdGVyQ29tcG9uZW50cywgMTAwMCk7XHJcblx0fSxcclxuXHRkaXNwbGF5KCkge1xyXG5cdFx0bGV0IHsgY29tcG9uZW50cyB9ID0gdGhpcztcclxuXHRcdGxldCBpdGVtcyA9IGNvbXBvbmVudHMubWFwKCh7IGlkLCBuYW1lLCBzdHlsZUlkIH0pID0+IHsgXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWQsIFxyXG5cdFx0XHRcdG5hbWUsIFxyXG5cdFx0XHRcdHN0eWxlSWQsXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnNvbGUudGFibGUoaXRlbXMpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnRDb2xsZWN0aW9uOyIsImNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ29tcG9uZW50LmpzJyk7XHJcbmNvbnN0IHsgXHJcblx0R2VuZXJhdGVSYW5kb21JZCxcclxuXHRTZXREZWZhdWx0Q29uZmlnLFxyXG59ID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgQ29tcG9uZW50Q29uc3RydWN0b3IgPSB7XHJcblx0Y3JlYXRlKGNvbmZpZyA9IHt9KSB7XHJcblx0XHRjb25zdCBkZWZhdWx0Q29uZmlnID0ge1xyXG5cdFx0XHRzdHlsZUlkOiBHZW5lcmF0ZVJhbmRvbUlkKCdjc3MnKSxcclxuXHRcdFx0dGVtcGxhdGU6IGBcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGgxPiBDb21wb25lbnQgcmVuZGVyZWQuIDwvaDE+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdGAsXHJcblx0XHRcdGRhdGE6IHt9LFxyXG5cdFx0XHRldmVudHM6IHt9LFxyXG5cdFx0XHRtZXRob2RzOiB7fSxcclxuXHRcdFx0bGlmZUN5Y2xlOiB7fSxcclxuXHRcdFx0Y29tcG9uZW50czoge30sXHJcblx0XHRcdGF0dHJpYnV0ZXM6IHt9LFxyXG5cdFx0XHRwYXJlbnQ6IG51bGwsXHJcblx0XHR9O1xyXG5cdFx0Y29uZmlnID0gU2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnLCBjb25maWcpO1xyXG5cdFx0bGV0IHsgbmFtZSB9ID0gY29uZmlnO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvbmVudChjb25maWcpO1xyXG5cdH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50Q29uc3RydWN0b3I7IiwiY2xhc3MgQ29tcG9uZW50RXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gJ0NvbXBvbmVudEV4Y2VwdGlvbic7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50RXhjZXB0aW9uOyIsImNvbnN0IHJlbW92ZVN0eWxlID0gcmVxdWlyZSgnLi9yZW1vdmVTdHlsZS5qcycpO1xyXG5jb25zdCBzdHlsZUV4aXN0cyA9IHJlcXVpcmUoJy4vc3R5bGVFeGlzdHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcmVtb3ZlU3R5bGUsXHJcbiAgICBzdHlsZUV4aXN0cyxcclxufSIsImNvbnN0IHJlbW92ZVN0eWxlID0gZnVuY3Rpb24oaWQpIHtcclxuXHQkKGBzdHlsZVtpdGVtaWQ9XCIke2lkfVwiXWApLnJlbW92ZSgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZVN0eWxlOyIsImNvbnN0IHN0eWxlRXhpc3RzID0gZnVuY3Rpb24oaWQpIHtcclxuXHRyZXR1cm4gJChgc3R5bGVbaXRlbWlkPVwiJHtpZH1cIl1gKS5sZW5ndGg7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc3R5bGVFeGlzdHM7IiwiY29uc3QgeyBJc1RoZW5hYmxlIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5jb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudENvbGxlY3Rpb24uanMnKTtcclxuXHJcbmNvbnN0IGFmdGVyUmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBhZnRlclJlbmRlciB9ID0gdGhpcy5saWZlQ3ljbGU7XHJcbiAgICBsZXQgcmV0dXJuVmFsdWU7XHJcbiAgICBcclxuICAgIGlmKGFmdGVyUmVuZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWUgPSB0aGlzLmxpZmVDeWNsZS5hZnRlclJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgaWYoSXNUaGVuYWJsZShyZXR1cm5WYWx1ZSkpIHtcclxuICAgICAgICByZXR1cm5WYWx1ZS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNvbXBvbmVudHMoKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XHJcbiAgICB0aGlzLnJlbW92ZU9uSW5pdEVsZW1lbnQoKTtcclxuICAgIENvbXBvbmVudENvbGxlY3Rpb24uYWRkKHRoaXMpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFmdGVyUmVuZGVyOyIsImNvbnN0IGJlZm9yZVJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlmZUN5Y2xlLmJlZm9yZVJlbmRlcigpO1xyXG59XHRcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYmVmb3JlUmVuZGVyOyIsImNvbnN0IGNyZWF0ZUluc3RhbmNlID0gZnVuY3Rpb24ocGFyZW50KSB7XHJcbiAgICBsZXQgY3JlYXRlZEluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcclxuICAgICAgICBjcmVhdGVkSW5zdGFuY2VcclxuICAgICAgICAgICAgLnNldFBhcmVudChwYXJlbnQpXHJcbiAgICAgICAgICAgIC5zZXRJZCgpO1xyXG5cclxuICAgIHJldHVybiBjcmVhdGVkSW5zdGFuY2U7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSW5zdGFuY2U7IiwiY29uc3QgeyByZW1vdmVTdHlsZSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgc3R5bGVJZCB9ID0gdGhpcztcclxuICAgIGxldCB7ICRzZWxmIH0gPSB0aGlzLiRyZWZzO1xyXG5cclxuICAgICRzZWxmWzBdLnJlbW92ZSgpO1xyXG4gICAgbGV0IHNpbWlsYXJDb21wb25lbnRzID0gJChgWyR7c3R5bGVJZH1dYCk7XHJcblxyXG4gICAgaWYoIXNpbWlsYXJDb21wb25lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJlbW92ZVN0eWxlKHN0eWxlSWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRlc3Ryb3k7XHJcbiIsImNvbnN0IHsgSW50ZXJwb2xhdGVUZXh0LCBUcmltV2hpdGVTcGFjZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlU3R5bGUgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IHN0eWxlSWQsIHN0eWxlIH0gPSB0aGlzO1xyXG4gICAgbGV0IHN0eWxlVGFnID0gYFxyXG4gICAgICAgIDxzdHlsZSBpdGVtaWQ9XCIke3N0eWxlSWR9XCI+XHJcbiAgICAgICAgICAgICR7SW50ZXJwb2xhdGVUZXh0KHtzdHlsZUlkfSwgc3R5bGUpfVxyXG4gICAgICAgIDwvc3R5bGU+XHJcbiAgICBgO1xyXG5cclxuICAgIHJldHVybiBUcmltV2hpdGVTcGFjZShzdHlsZVRhZyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVTdHlsZTsiLCJjb25zdCB7IEludGVycG9sYXRlVGV4dCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBpZCwgbmFtZSwgc3R5bGVJZCwgdGVtcGxhdGUsIGRhdGEsIGF0dHJpYnV0ZXMgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHRlbXBsYXRlMDtcclxuXHJcbiAgICB0ZW1wbGF0ZSA9ICQucGFyc2VIVE1MKEludGVycG9sYXRlVGV4dChkYXRhLCB0ZW1wbGF0ZSkpO1xyXG4gICAgJHRlbXBsYXRlMCA9ICQodGVtcGxhdGVbMF0pO1xyXG5cclxuICAgIGlmKHRlbXBsYXRlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgIGBDb21wb25lbnQgZG8gbm90IGhhdmUgYSB0ZW1wbGF0ZS5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYodGVtcGxhdGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbiAgICBpZih0ZW1wbGF0ZVswXS5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgJHRlbXBsYXRlMFxyXG4gICAgICAgIC5hdHRyKGF0dHJpYnV0ZXMpXHJcbiAgICAgICAgLmF0dHIoJ2NvbXBvbmVudC1uYW1lJywgbmFtZSlcclxuICAgICAgICAuYXR0cihzdHlsZUlkLCAnJylcclxuICAgICAgICAuYXR0cignaWQnLCBpZCk7XHJcbiAgICAgICAgXHJcbiAgICByZXR1cm4gdGVtcGxhdGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVUZW1wbGF0ZTsiLCJjb25zdCBoaWVyYXJjaHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgeyBuYW1lIH0gPSB0aGlzO1xyXG4gICAgbGV0IGhpZXJhcmNoeSA9IFtdO1xyXG4gICAgbGV0IHdoaWxlUGFyZW50RXhpc3RzID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCB7IHBhcmVudCB9ID0gY29tcG9uZW50O1xyXG5cclxuICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJlbnROYW1lID0gKHBhcmVudC5uYW1lKSA/IHBhcmVudC5uYW1lIDogJ3Jvb3QnO1xyXG5cclxuICAgICAgICBoaWVyYXJjaHkucHVzaChwYXJlbnROYW1lKTtcclxuICAgICAgICB3aGlsZVBhcmVudEV4aXN0cyhwYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlUGFyZW50RXhpc3RzKHRoaXMpO1xyXG5cclxuICAgIGlmKGhpZXJhcmNoeS5sZW5ndGggPT0gMCAmJiBuYW1lID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGhpZXJhcmNoeS5wdXNoKCdyb290Jyk7ICAgICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGllcmFyY2h5LnB1c2gobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhpZXJhcmNoeTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBoaWVyYXJjaHk7IiwiY29uc3QgZGVzdHJveSA9IHJlcXVpcmUoJy4vZGVzdHJveS5qcycpO1xyXG5jb25zdCBoaWVyYXJjaHkgPSByZXF1aXJlKCcuL2hpZXJhcmNoeS5qcycpO1xyXG5jb25zdCBwYXJlbnRDb21wb25lbnQgPSByZXF1aXJlKCcuL3BhcmVudENvbXBvbmVudC5qcycpO1xyXG5jb25zdCBjcmVhdGVJbnN0YW5jZSA9IHJlcXVpcmUoJy4vY3JlYXRlSW5zdGFuY2UuanMnKTtcclxuY29uc3Qgc2V0RGF0YSA9IHJlcXVpcmUoJy4vc2V0RGF0YS5qcycpO1xyXG5jb25zdCBzZXRQYXJlbnQgPSByZXF1aXJlKCcuL3NldFBhcmVudC5qcycpO1xyXG5jb25zdCBzZXRJZCA9IHJlcXVpcmUoJy4vc2V0SWQuanMnKTtcclxuY29uc3Qgc2V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vc2V0QXR0cmlidXRlcy5qcycpO1xyXG5jb25zdCByZW5kZXJTaW5ndWxhckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcmVuZGVyU2luZ3VsYXJDb21wb25lbnQuanMnKTtcclxuY29uc3QgcmVuZGVyTGlzdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vcmVuZGVyTGlzdENvbXBvbmVudC5qcycpO1xyXG5jb25zdCByZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL3JlbmRlckNvbXBvbmVudC5qcycpO1xyXG5jb25zdCByZXBsYWNlQ29tcG9uZW50VGFncyA9IHJlcXVpcmUoJy4vcmVwbGFjZUNvbXBvbmVudFRhZ3MuanMnKTtcclxuY29uc3QgcmVuZGVyQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vcmVuZGVyQ29tcG9uZW50cy5qcycpO1xyXG5jb25zdCByZWdpc3RlckRvbVJlZnMgPSByZXF1aXJlKCcuL3JlZ2lzdGVyRG9tUmVmcy5qcycpO1xyXG5jb25zdCByZWdpc3RlckV2ZW50cyA9IHJlcXVpcmUoJy4vcmVnaXN0ZXJFdmVudHMuanMnKTtcclxuY29uc3QgcmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQgPSByZXF1aXJlKCcuL3JlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50LmpzJyk7XHJcbmNvbnN0IHJlZ2lzdGVyTWV0aG9kcyA9IHJlcXVpcmUoJy4vcmVnaXN0ZXJNZXRob2RzLmpzJyk7XHJcbmNvbnN0IHJlbmRlclNob3cgPSByZXF1aXJlKCcuL3JlbmRlclNob3cuanMnKTtcclxuY29uc3QgcmVuZGVySWYgPSByZXF1aXJlKCcuL3JlbmRlcklmLmpzJyk7XHJcbmNvbnN0IGdlbmVyYXRlVGVtcGxhdGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlVGVtcGxhdGUuanMnKTtcclxuY29uc3QgcmVuZGVyVGVtcGxhdGUgPSByZXF1aXJlKCcuL3JlbmRlclRlbXBsYXRlLmpzJyk7XHJcbmNvbnN0IGdlbmVyYXRlU3R5bGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlU3R5bGUuanMnKTtcclxuY29uc3QgcmVuZGVyU3R5bGUgPSByZXF1aXJlKCcuL3JlbmRlclN0eWxlLmpzJyk7XHJcbmNvbnN0IGFmdGVyUmVuZGVyID0gcmVxdWlyZSgnLi9hZnRlclJlbmRlci5qcycpO1xyXG5jb25zdCBvblJlbmRlciA9IHJlcXVpcmUoJy4vb25SZW5kZXIuanMnKTtcclxuY29uc3QgYmVmb3JlUmVuZGVyID0gcmVxdWlyZSgnLi9iZWZvcmVSZW5kZXIuanMnKTtcclxuY29uc3QgcmVtb3ZlT25Jbml0RWxlbWVudCA9IHJlcXVpcmUoJy4vcmVtb3ZlT25Jbml0RWxlbWVudC5qcycpO1xyXG5jb25zdCByZW5kZXJPbkluaXRFbGVtZW50ID0gcmVxdWlyZSgnLi9yZW5kZXJPbkluaXRFbGVtZW50LmpzJyk7XHJcbmNvbnN0IG9uSW5pdCA9IHJlcXVpcmUoJy4vb25Jbml0LmpzJyk7XHJcbmNvbnN0IHR3ZWFrTGlmZUN5Y2xlID0gcmVxdWlyZSgnLi90d2Vha0xpZmVDeWNsZS5qcycpO1xyXG5jb25zdCByZW5hbWVDb21wb25lbnRzID0gcmVxdWlyZSgnLi9yZW5hbWVDb21wb25lbnRzLmpzJyk7XHJcbmNvbnN0IHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyLmpzJyk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBkZXN0cm95LFxyXG4gICAgaGllcmFyY2h5LFxyXG4gICAgcGFyZW50Q29tcG9uZW50LFxyXG4gICAgY3JlYXRlSW5zdGFuY2UsXHJcbiAgICBzZXREYXRhLFxyXG4gICAgc2V0UGFyZW50LFxyXG4gICAgc2V0SWQsXHJcbiAgICBzZXRBdHRyaWJ1dGVzLFxyXG4gICAgcmVuZGVyU2luZ3VsYXJDb21wb25lbnQsXHJcbiAgICByZW5kZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgcmVuZGVyQ29tcG9uZW50LFxyXG4gICAgcmVwbGFjZUNvbXBvbmVudFRhZ3MsXHJcbiAgICByZW5kZXJDb21wb25lbnRzLFxyXG4gICAgcmVnaXN0ZXJEb21SZWZzLFxyXG4gICAgcmVnaXN0ZXJFdmVudHMsXHJcbiAgICByZWdpc3RlclJlbW92ZVNlbGZFdmVudCxcclxuICAgIHJlZ2lzdGVyTWV0aG9kcyxcclxuICAgIHJlbmRlclNob3csXHJcbiAgICByZW5kZXJJZixcclxuICAgIGdlbmVyYXRlVGVtcGxhdGUsXHJcbiAgICByZW5kZXJUZW1wbGF0ZSxcclxuICAgIGdlbmVyYXRlU3R5bGUsXHJcbiAgICByZW5kZXJTdHlsZSxcclxuICAgIGFmdGVyUmVuZGVyLFxyXG4gICAgb25SZW5kZXIsXHJcbiAgICBiZWZvcmVSZW5kZXIsXHJcbiAgICByZW1vdmVPbkluaXRFbGVtZW50LFxyXG4gICAgcmVuZGVyT25Jbml0RWxlbWVudCxcclxuICAgIG9uSW5pdCxcclxuICAgIHR3ZWFrTGlmZUN5Y2xlLFxyXG4gICAgcmVuYW1lQ29tcG9uZW50cyxcclxuICAgIHJlbmRlcixcclxufSIsImNvbnN0IG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlmZUN5Y2xlLm9uSW5pdCgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG9uSW5pdDsiLCJjb25zdCBvblJlbmRlciA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgdGhpcy5yZW5kZXJTdHlsZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJUZW1wbGF0ZShjb25maWcpO1xyXG4gICAgdGhpcy5yZW5kZXJJZigpO1xyXG4gICAgdGhpcy5yZW5kZXJTaG93KCk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyTWV0aG9kcygpO1xyXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgdGhpcy5yZWdpc3RlclJlbW92ZVNlbGZFdmVudCgpO1xyXG4gICAgdGhpcy5yZWdpc3RlckRvbVJlZnMoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBvblJlbmRlcjsiLCJjb25zdCBwYXJlbnRDb21wb25lbnQgPSBmdW5jdGlvbihuPTApIHtcclxuICAgIGxldCByZXBlYXRTdHJpbmcgPSBmdW5jdGlvbihzdHI9JzAnLCBuPTApIHtcclxuICAgICAgICBsZXQgcmVwZWF0ZWRTdHJpbmcgPSBgYDtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlcGVhdGVkU3RyaW5nICs9IHN0cjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXBlYXRlZFN0cmluZztcclxuICAgIH1cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmJHtyZXBlYXRTdHJpbmcoJy5wYXJlbnQnLCBuKzEpfVxyXG4gICAgICAgIH0pKClcclxuICAgIGA7XHJcbiAgICBsZXQgcGFyZW50ID0gZXZhbChzY3JpcHQpO1xyXG5cclxuICAgIHJldHVybiBwYXJlbnQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGFyZW50Q29tcG9uZW50OyIsImNvbnN0IHJlZ2lzdGVyRG9tUmVmcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHJlZnMgPSB7fTtcclxuICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgbGV0IGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RvbXJlZl1gKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCAkZWxlbWVudCA9ICQoZWxlbWVudHNbaV0pO1xyXG4gICAgICAgIGxldCBkb21yZWYgPSAkZWxlbWVudC5hdHRyKCdkb21yZWYnKTtcclxuXHJcbiAgICAgICAgJHJlZnNbYCQke2RvbXJlZn1gXSA9ICRlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgICRyZWZzW2Akc2VsZmBdID0gJHNlbGY7XHJcbiAgICB0aGlzLiRyZWZzID0gJHJlZnM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXJEb21SZWZzOyIsImNvbnN0IHJlZ2lzdGVyRXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBpZCwgZXZlbnRzIH0gPSB0aGlzO1xyXG4gICAgbGV0ICRzZWxmID0gJChgIyR7aWR9YCk7XHJcbiAgICBsZXQgZG9tRXZlbnRzID0gW1xyXG4gICAgICAgIFwiYmx1cixmb2N1cyxsb2FkLHJlc2l6ZSxzY3JvbGwsdW5sb2FkLGJlZm9yZXVubG9hZCxcIixcclxuICAgICAgICBcImNsaWNrLGRibGNsaWNrLG1vdXNlZG93bixtb3VzZXVwLG1vdXNlbW92ZSxtb3VzZW92ZXIsXCIsXHJcbiAgICAgICAgXCJtb3VzZW91dCxtb3VzZWVudGVyLG1vdXNlbGVhdmUsY2hhbmdlLHNlbGVjdCxzdWJtaXQsXCIsXHJcbiAgICAgICAgXCJrZXlkb3duLGtleXByZXNzLGtleXVwXCJcclxuICAgIF0uam9pbihcIlwiKS5zcGxpdChcIixcIik7XHJcblxyXG4gICAgbGV0IGFkZEV2ZW50VG9FbGVtZW50cyA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZWxlbWVudHMpIHtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQoZWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICBsZXQgZm5OYW1lID0gZWxlbWVudC5hdHRyKGBvbi0ke2V2ZW50TmFtZX1gKTtcclxuICAgICAgICAgICAgbGV0IGZuID0gZXZlbnRzW2ZuTmFtZV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHRcdFx0XHRcdFxyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHIoYG9uLSR7ZXZlbnROYW1lfWApO1x0XHRcdFxyXG4gICAgICAgICAgICBlbGVtZW50WzBdLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmbi5iaW5kKHRoaXMpKTtcdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG4gICAgICAgIH1cdFx0XHRcdFxyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIGZvcihsZXQgaT0wOyBpPGRvbUV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBldmVudE5hbWUgPSBkb21FdmVudHNbaV07XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gJHNlbGYuZmluZChgW29uLSR7ZXZlbnROYW1lfV1gKTtcclxuXHJcbiAgICAgICAgaWYoJHNlbGYuYXR0cihgb24tJHtldmVudE5hbWV9YCkpIHtcclxuICAgICAgICAgICAgZWxlbWVudHMgPSAoZWxlbWVudHMgJiYgZWxlbWVudHMubGVuZ3RoKSA/IFsuLi5lbGVtZW50cywgJHNlbGZdIDogWyRzZWxmXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGFkZEV2ZW50VG9FbGVtZW50cyhldmVudE5hbWUsIGVsZW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXJFdmVudHM7IiwiY29uc3QgcmVnaXN0ZXJNZXRob2RzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBtZXRob2RzIH0gPSB0aGlzO1xyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtZXRob2RzKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgbGV0IGZuID0gbWV0aG9kc1trZXldO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1ldGhvZHNba2V5XSA9IGZuLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tZXRob2RzID0gbWV0aG9kcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3Rlck1ldGhvZHM7IiwiY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudENvbGxlY3Rpb24uanMnKTtcclxuXHJcbmNvbnN0IHJlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQgeyBpZCB9ID0gc2VsZjtcclxuICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgXHJcbiAgICAkc2VsZi5vbignRE9NTm9kZVJlbW92ZWQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgQ29tcG9uZW50Q29sbGVjdGlvbi5maWx0ZXIoKTsgICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQ7IiwiY29uc3QgcmVtb3ZlT25Jbml0RWxlbWVudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQgfSA9IHRoaXM7XHJcbiAgICBcclxuICAgICQoYFtvbl9pbml0XyR7aWR9XWApLnJlbW92ZSgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZU9uSW5pdEVsZW1lbnQ7IiwiY29uc3QgeyBEYXNoaWZ5U25ha2VDYXNlIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgcmVuYW1lQ29tcG9uZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgY29tcG9uZW50cyB9ID0gdGhpcztcclxuXHJcbiAgICBmb3IobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XTtcclxuXHJcbiAgICAgICAgY29tcG9uZW50Lm5hbWUgPSBEYXNoaWZ5U25ha2VDYXNlKGtleSk7XHJcbiAgICAgICAgY29tcG9uZW50c1trZXldID0gY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuYW1lQ29tcG9uZW50czsiLCJjb25zdCB7IElzVGhlbmFibGUgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG5cclxuY29uc3QgcmVuZGVyID0gZnVuY3Rpb24gKGNvbmZpZyA9IHt9KSB7XHJcbiAgICBsZXQgaGllcmFyY2h5ID0gdGhpcy5oaWVyYXJjaHkoKS5qb2luKFwiID4gXCIpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyQ29uZmlnID0gY29uZmlnO1xyXG4gICAgdGhpcy5yZW5hbWVDb21wb25lbnRzKCk7XHJcbiAgICB0aGlzLnR3ZWFrTGlmZUN5Y2xlKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgeyBiZWZvcmVSZW5kZXIsIG9uSW5pdCwgfSA9IHRoaXMubGlmZUN5Y2xlO1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKG9uSW5pdCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uSW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmVmb3JlUmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gdGhpcy5iZWZvcmVSZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChJc1RoZW5hYmxlKHJldHVyblZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25SZW5kZXIoY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uUmVuZGVyKGNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5hZnRlclJlbmRlcigpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBbXHJcbiAgICAgICAgICAgIGhpZXJhcmNoeSxcclxuICAgICAgICAgICAgZS5tZXNzYWdlLFxyXG4gICAgICAgICAgICBlLnN0YWNrLFxyXG4gICAgICAgIF0uam9pbihcIlxcblwiKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlcjsiLCJjb25zdCByZW5kZXJDb21wb25lbnQgPSBmdW5jdGlvbihyZXBsYWNlZCkge1xyXG4gICAgbGV0IGxpc3RFeHByZXNzaW9uID0gcmVwbGFjZWQuYXR0cmlidXRlc1snZGF0YS1saXN0J107XHJcblxyXG4gICAgaWYobGlzdEV4cHJlc3Npb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMaXN0Q29tcG9uZW50KHJlcGxhY2VkKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyU2luZ3VsYXJDb21wb25lbnQocmVwbGFjZWQpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlckNvbXBvbmVudDsiLCJjb25zdCByZW5kZXJDb21wb25lbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKTtcclxuXHJcbiAgICBpZigha2V5cy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgcmVwbGFjZWRDb21wb25lbnRUYWdzID0gdGhpcy5yZXBsYWNlQ29tcG9uZW50VGFncygpO1xyXG5cclxuICAgIGZvcihsZXQgaT0wOyBpPHJlcGxhY2VkQ29tcG9uZW50VGFncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCByZXBsYWNlZCA9IHJlcGxhY2VkQ29tcG9uZW50VGFnc1tpXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQocmVwbGFjZWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlckNvbXBvbmVudHM7IiwiY29uc3QgcmVuZGVySWYgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGlkLCBkYXRhIH0gPSB0aGlzO1xyXG4gICAgbGV0ICRzZWxmID0gJChgIyR7aWR9YCk7XHJcbiAgICBsZXQgcmVuZGVyV2hpbGVFeGlzdHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSAkc2VsZi5maW5kKGBbZGF0YS1pZl1gKTtcclxuXHJcbiAgICAgICAgaWYoIWVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCAkZWxlbWVudDAgPSAkKGVsZW1lbnRzWzBdKTtcclxuICAgICAgICBsZXQgZXhwcmVzc2lvbiA9ICRlbGVtZW50MC5hdHRyKCdkYXRhLWlmJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNjcmlwdCA9IGBcclxuICAgICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHsgJHtPYmplY3Qua2V5cyhkYXRhKS5qb2luKFwiLFwiKX0gfSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHtleHByZXNzaW9ufVxyXG4gICAgICAgIH0pKClcclxuICAgICAgICBgO1xyXG4gICAgICAgIGV4cHJlc3Npb24gPSBCb29sZWFuKGV2YWwoc2NyaXB0KSk7XHJcblxyXG4gICAgICAgIGlmKGV4cHJlc3Npb24gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudDAucmVtb3ZlQXR0cignZGF0YS1pZicpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYoZXhwcmVzc2lvbiAhPSB0cnVlKSB7XHJcbiAgICAgICAgICAgICRlbGVtZW50MC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudHMgPSAkc2VsZi5maW5kKGBbZGF0YS1pZl1gKTtcclxuXHJcbiAgICAgICAgaWYoZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlbmRlcldoaWxlRXhpc3RzKCk7XHJcbiAgICAgICAgfVx0XHRcdFx0XHRcdFx0XHRcdFx0XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyV2hpbGVFeGlzdHMoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJJZjsiLCJjb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuY29uc3QgeyBHZW5lcmF0ZVJhbmRvbUlkIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgcmVuZGVyTGlzdENvbXBvbmVudCA9IGZ1bmN0aW9uKHJlcGxhY2VkKSB7XHJcbiAgICBsZXQgeyBhdHRyaWJ1dGVzLCBpZCB9ID0gcmVwbGFjZWQ7XHJcbiAgICBsZXQgYmluZEV4cHJlc3Npb24gPSBhdHRyaWJ1dGVzWydkYXRhLWJpbmQnXTtcclxuICAgIGxldCBsaXN0RXhwcmVzc2lvbiA9IGF0dHJpYnV0ZXNbJ2RhdGEtbGlzdCddO1xyXG4gICAgbGV0IFtjdXJyZW50SXRlbSwgaXRlbXNdID0gbGlzdEV4cHJlc3Npb24uc3BsaXQoXCIgaW4gXCIpO1xyXG4gICAgICAgIGN1cnJlbnRJdGVtID0gY3VycmVudEl0ZW0udHJpbSgpO1xyXG4gICAgICAgIGl0ZW1zID0gaXRlbXMudHJpbSgpO1xyXG4gICAgbGV0IGxpc3RJdGVtcyA9IHRoaXMuZGF0YVtpdGVtc107XHJcblxyXG4gICAgZGVsZXRlIGF0dHJpYnV0ZXNbJ2NvbXBvbmVudC1hbGlhcyddO1xyXG4gICAgZGVsZXRlIGF0dHJpYnV0ZXNbJ2RhdGEtbGlzdCddO1xyXG4gICAgZGVsZXRlIGF0dHJpYnV0ZXNbJ2RhdGEtYmluZCddO1xyXG5cclxuICAgIGlmKCEobGlzdEl0ZW1zICYmIGxpc3RJdGVtcy5sZW5ndGgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbIFxyXG4gICAgICAgICAgICBgJyR7aXRlbXN9JyBpcyBlbXB0eSBvciBub3QgYW4gYXJyYXkgb3IgdW5kZWZpbmVkLmBcclxuICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cdFx0XHJcbiAgICBsZXQgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTsgXHJcblxyXG4gICAgbGV0IGNvbmZpZyA9IHtcclxuICAgICAgICB0YXJnZXRFbGVtZW50OiB0YXJnZXRFbGVtZW50LnBhcmVudE5vZGUsXHJcbiAgICAgICAgcmVuZGVyVHlwZTogJ2FwcGVuZCcsXHJcbiAgICB9XHJcbiAgICBsZXQgcmVuZGVyTGlzdEl0ZW0gPSBmdW5jdGlvbihyZXBsYWNlZCwgY29tcG9uZW50RGF0YSwgY29uZmlnKSB7XHJcbiAgICAgICAgbGV0IHsgYXR0cmlidXRlcywgY29tcG9uZW50IH0gPSByZXBsYWNlZDtcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gT2JqZWN0LmNyZWF0ZShjb21wb25lbnQpO1xyXG5cclxuXHJcbiAgICAgICAgY29tcG9uZW50XHJcbiAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpXHJcbiAgICAgICAgICAgIC5zZXRJZChHZW5lcmF0ZVJhbmRvbUlkKCdjaWQnKSlcclxuICAgICAgICAgICAgLnNldFBhcmVudCh0aGlzKVxyXG4gICAgICAgICAgICAuc2V0RGF0YShjb21wb25lbnREYXRhKVxyXG4gICAgICAgICAgICAucmVuZGVyKGNvbmZpZyk7XHRcclxuXHJcbiAgICB9LmJpbmQodGhpcyk7XHJcbiAgICBsZXQgZXh0cmFjdENvbXBvbmVudERhdGEgPSBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudERhdGEgPSB7fTtcclxuICAgICAgICBsZXQgc2NyaXB0ID0gYFxyXG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7IFxyXG4gICAgICAgICAgICAgICAgbGV0ICR7YmluZEV4cHJlc3Npb259ID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAke2JpbmRFeHByZXNzaW9ufVxyXG4gICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgYDtcclxuICAgICAgICBsZXQgZGF0YSA9IGV2YWwoc2NyaXB0KTtcclxuXHJcbiAgICAgICAgaWYoY3VycmVudEl0ZW0gPT0gYmluZEV4cHJlc3Npb24pIHtcclxuICAgICAgICAgICAgY29tcG9uZW50RGF0YVtjdXJyZW50SXRlbV0gPSBkYXRhO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGlmKGN1cnJlbnRJdGVtICE9IGJpbmRFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY29tcG9uZW50RGF0YSwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxsaXN0SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50RGF0YSA9IGV4dHJhY3RDb21wb25lbnREYXRhKGxpc3RJdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEuaW5kZXggPSBpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICByZW5kZXJMaXN0SXRlbShyZXBsYWNlZCwgY29tcG9uZW50RGF0YSwgY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICAkKHRhcmdldEVsZW1lbnQpLnJlbW92ZSgpO1x0XHRcdFx0XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJMaXN0Q29tcG9uZW50OyIsImNvbnN0IHsgSW50ZXJwb2xhdGVUZXh0LCBTZXREZWZhdWx0Q29uZmlnIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5jb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlVGVtcGxhdGUgPSBmdW5jdGlvbih0ZW1wbGF0ZSwgZGF0YSwgaWQpIHtcclxuICAgIGxldCAkdGVtcGxhdGUwO1xyXG5cclxuICAgIHRlbXBsYXRlID0gJC5wYXJzZUhUTUwoSW50ZXJwb2xhdGVUZXh0KGRhdGEsIHRlbXBsYXRlKSk7XHJcbiAgICAkdGVtcGxhdGUwID0gJCh0ZW1wbGF0ZVswXSk7XHJcblxyXG4gICAgaWYodGVtcGxhdGUubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgYC5vbkluaXQoKSBkbyBub3QgaGF2ZSBhIHRlbXBsYXRlLmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbiAgICBpZih0ZW1wbGF0ZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgIGAub25Jbml0KCkgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbiAgICBpZih0ZW1wbGF0ZVswXS5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgLm9uSW5pdCgpIHRlbXBsYXRlIG11c3QgYmUgZW5jbG9zZWQgaW4gYWAsXHJcbiAgICAgICAgICAgIGBzaW5nbGUgYmxvY2stbGV2ZWwgZWxlbWVudC5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgICR0ZW1wbGF0ZTAuYXR0cihgb25faW5pdF8ke2lkfWAsICcnKTtcclxuICAgICAgICBcclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxufVxyXG5cclxuY29uc3QgcmVuZGVyT25Jbml0RWxlbWVudCA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XHJcbiAgICBsZXQgeyBkYXRhLCBpZCB9ID0gdGhpcztcclxuICAgIHRlbXBsYXRlID0gZ2VuZXJhdGVUZW1wbGF0ZSh0ZW1wbGF0ZSwgZGF0YSwgaWQpO1xyXG4gICAgbGV0IHsgcmVuZGVyQ29uZmlnIH0gPSB0aGlzO1xyXG4gICAgbGV0IGRlZmF1bHRDb25maWcgPSB7XHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudDogZG9jdW1lbnQuYm9keSwgXHJcbiAgICAgICAgcmVuZGVyVHlwZTogJ3JlcGxhY2VXaXRoJyxcclxuICAgIH07XHJcbiAgICBsZXQgeyB0YXJnZXRFbGVtZW50LCByZW5kZXJUeXBlIH0gPSBTZXREZWZhdWx0Q29uZmlnKGRlZmF1bHRDb25maWcsIHJlbmRlckNvbmZpZyk7XHJcblxyXG4gICAgJCh0YXJnZXRFbGVtZW50KVtyZW5kZXJUeXBlXSh0ZW1wbGF0ZSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyT25Jbml0RWxlbWVudDsiLCJjb25zdCByZW5kZXJTaG93ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBpZCwgZGF0YSB9ID0gdGhpcztcclxuICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgbGV0IHJlbmRlcldoaWxlRXhpc3RzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RhdGEtc2hvd11gKTtcclxuXHJcbiAgICAgICAgaWYoIWVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCAkZWxlbWVudDAgPSAkKGVsZW1lbnRzWzBdKTtcclxuICAgICAgICBsZXQgZXhwcmVzc2lvbiA9ICRlbGVtZW50MC5hdHRyKCdkYXRhLXNob3cnKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2NyaXB0ID0gYFxyXG4gICAgICAgIChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgeyAke09iamVjdC5rZXlzKGRhdGEpLmpvaW4oXCIsXCIpfSB9ID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAke2V4cHJlc3Npb259XHJcbiAgICAgICAgfSkoKVxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmKCFldmFsKHNjcmlwdCkpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQwLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGVsZW1lbnQwLnJlbW92ZUF0dHIoJ2RhdGEtc2hvdycpO1xyXG4gICAgICAgIGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RhdGEtc2hvd11gKTtcclxuXHJcbiAgICAgICAgaWYoZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlbmRlcldoaWxlRXhpc3RzKCk7XHJcbiAgICAgICAgfVx0XHRcdFx0XHRcdFx0XHRcdFx0XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyV2hpbGVFeGlzdHMoKTtcdFx0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyU2hvdzsiLCJjb25zdCB7IEdlbmVyYXRlUmFuZG9tSWQgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCByZW5kZXJTaW5ndWxhckNvbXBvbmVudCA9IGZ1bmN0aW9uIChyZXBsYWNlZCkge1xyXG4gICAgbGV0IHsgaWQsIGNvbXBvbmVudCwgYXR0cmlidXRlcyB9ID0gcmVwbGFjZWQ7XHJcbiAgICBjb21wb25lbnQgPSBPYmplY3QuY3JlYXRlKGNvbXBvbmVudCk7XHJcbiAgICBsZXQgY29tcG9uZW50RGF0YTtcclxuICAgIGxldCBkYXRhRXhwcmVzc2lvbiA9IGF0dHJpYnV0ZXNbJ2RhdGEtYmluZCddO1xyXG5cclxuICAgIGlmKGRhdGFFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgbGV0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICBsZXQgZ2VuZXJhdGVDb21wb25lbnREYXRhID0gZnVuY3Rpb24oZGF0YUV4cHJlc3Npb24sIGRhdGEpIHtcclxuICAgICAgICAgICAgZGF0YUV4cHJlc3Npb24gPSBkYXRhRXhwcmVzc2lvbi50cmltKCk7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnREYXRhO1xyXG4gICAgICAgICAgICBsZXQgaGFzRXF1YWxTaWduID0gZGF0YUV4cHJlc3Npb24uc2VhcmNoKCdbPV0nKSArIDE7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKGhhc0VxdWFsU2lnbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlRXhwcmVzc2lvbiA9IGRhdGFFeHByZXNzaW9uLnNwbGl0KFwiPVwiKVswXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0ID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7ICR7T2JqZWN0LmtleXMoZGF0YSkuam9pbihcIiwgXCIpfSB9ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR7ZGF0YUV4cHJlc3Npb259O1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICR7dmFsdWVFeHByZXNzaW9ufTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IGV2YWwoc2NyaXB0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWhhc0VxdWFsU2lnbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGRhdGFFeHByZXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RGF0YVtrZXldID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjb21wb25lbnREYXRhICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnREYXRhO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbXBvbmVudERhdGEgPSBnZW5lcmF0ZUNvbXBvbmVudERhdGEoZGF0YUV4cHJlc3Npb24sIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydjb21wb25lbnQtYWxpYXMnXTtcclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydkYXRhLWxpc3QnXTtcclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydkYXRhLWJpbmQnXTtcclxuXHJcbiAgICBjb21wb25lbnRcclxuICAgICAgICAuc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxyXG4gICAgICAgIC5zZXRJZChHZW5lcmF0ZVJhbmRvbUlkKCdjaWQnKSlcclxuICAgICAgICAuc2V0UGFyZW50KHRoaXMpO1xyXG5cclxuICAgIGlmKGNvbXBvbmVudERhdGEpIHtcclxuICAgICAgICBjb21wb25lbnQuc2V0RGF0YShjb21wb25lbnREYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnQucmVuZGVyKHtcclxuICAgICAgICB0YXJnZXRFbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCksXHJcbiAgICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJTaW5ndWxhckNvbXBvbmVudDsiLCJjb25zdCB7IHN0eWxlRXhpc3RzIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCByZW5kZXJTdHlsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgc3R5bGVJZCwgc3R5bGUgfSA9IHRoaXM7XHJcblxyXG4gICAgaWYoIXN0eWxlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYoIXN0eWxlRXhpc3RzKHN0eWxlSWQpKSB7XHJcbiAgICAgICAgbGV0IGhlYWQwID0gJCgnaGVhZCcpWzBdO1xyXG4gICAgICAgIGxldCAkaGVhZDAgPSAkKGhlYWQwKTtcclxuXHJcbiAgICAgICAgJGhlYWQwLmFwcGVuZCh0aGlzLmdlbmVyYXRlU3R5bGUoKSk7XHJcbiAgICB9XHRcdFx0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyU3R5bGU7XHJcbiIsImNvbnN0IHsgU2V0RGVmYXVsdENvbmZpZyB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlbmRlclRlbXBsYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICBsZXQgeyBpZCB9ID0gdGhpcztcclxuICAgIGxldCBkZWZhdWx0Q29uZmlnID0ge1xyXG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IGRvY3VtZW50LmJvZHksIFxyXG4gICAgICAgIHJlbmRlclR5cGU6ICdyZXBsYWNlV2l0aCcsXHJcbiAgICB9O1xyXG4gICAgbGV0IHsgdGFyZ2V0RWxlbWVudCwgcmVuZGVyVHlwZSB9ID0gU2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnLCBjb25maWcpO1xyXG4gICAgbGV0IHRlbXBsYXRlID0gdGhpcy5nZW5lcmF0ZVRlbXBsYXRlKCk7XHJcbiAgICBsZXQgJHRhcmdldEVsZW1lbnQgPSAkKHRhcmdldEVsZW1lbnQpO1xyXG5cclxuICAgIGlmKCEkdGFyZ2V0RWxlbWVudC5sZW5ndGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgYCd0YXJnZXRFbGVtZW50JyBkb2VzIG5vdCBleGlzdHMuYCxcclxuICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuICAgIGlmKHJlbmRlclR5cGUgPT0gJ3JlcGxhY2VXaXRoJykge1xyXG4gICAgICAgIGxldCAkb25Jbml0RWxlbWVudCA9ICQoYFtvbl9pbml0XyR7aWR9XWApO1xyXG5cclxuICAgICAgICBpZigkb25Jbml0RWxlbWVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb25Jbml0RWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJHRhcmdldEVsZW1lbnRbcmVuZGVyVHlwZV0odGVtcGxhdGUpO1x0XHRcclxufVx0XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlclRlbXBsYXRlOyIsImNvbnN0IHsgR2VuZXJhdGVSYW5kb21JZCwgQXR0cmlidXRlc0V4dHJhY3RvciB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlcGxhY2VDb21wb25lbnRUYWdzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG4gICAgbGV0IHsgJHNlbGYgfSA9IHRoaXMuJHJlZnM7XHJcbiAgICBsZXQgcmVwbGFjZWRDb21wb25lbnRUYWdzID0gW107XHJcbiAgICBsZXQgZmluZENvbXBvbmVudHMgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gW1xyXG4gICAgICAgICAgICAuLi4kc2VsZi5maW5kKG5hbWUpLCBcclxuICAgICAgICAgICAgLi4uJHNlbGYuZmluZChgW2NvbXBvbmVudC1hbGlhcz1cIiR7bmFtZX1cIl1gKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50cztcclxuICAgIH1cclxuICAgIGxldCByZXBsYWNlID0gZnVuY3Rpb24oZWxlbWVudHMsIGNvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCBpZCA9IEdlbmVyYXRlUmFuZG9tSWQoJ3JpZCcpO1xyXG4gICAgICAgIGxldCBlbGVtZW50MCA9IGVsZW1lbnRzWzBdO1xyXG4gICAgICAgIGxldCB0YWJsZUVsZW1lbnRzID0gXCJ0aGVhZCx0Ym9keSx0Zm9vdCx0cix0aCx0ZFwiO1xyXG4gICAgICAgIGxldCB0YWdOYW1lID0gZWxlbWVudDAudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCB0YWcgPSAoXHJcbiAgICAgICAgICAgIHRhYmxlRWxlbWVudHNcclxuICAgICAgICAgICAgICAgIC5zcGxpdChcIixcIilcclxuICAgICAgICAgICAgICAgIC5pbmNsdWRlcyh0YWdOYW1lKVxyXG4gICAgICAgICkgPyB0YWdOYW1lIDogXCJ0ZW1wb3JhcnlcIjtcclxuICAgICAgICBsZXQgJGVsZW1lbnQwID0gJChlbGVtZW50MCk7XHJcblxyXG4gICAgICAgIHJlcGxhY2VkQ29tcG9uZW50VGFncy5wdXNoKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudDogT2JqZWN0LmNyZWF0ZShjb21wb25lbnQpLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBBdHRyaWJ1dGVzRXh0cmFjdG9yKGVsZW1lbnQwKS5leHRyYWN0KCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJGVsZW1lbnQwLnJlcGxhY2VXaXRoKGA8JHt0YWd9IGlkPVwiJHtpZH1cIi8+YCk7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVwbGFjZVdoaWxlRXhpc3RzID0gZnVuY3Rpb24oY29tcG9uZW50KSB7XHJcbiAgICAgICAgbGV0IHsgbmFtZSB9ID0gY29tcG9uZW50O1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9IGZpbmRDb21wb25lbnRzKG5hbWUpO1xyXG5cclxuICAgICAgICBpZighZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVwbGFjZShlbGVtZW50cywgY29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgZWxlbWVudHMgPSBmaW5kQ29tcG9uZW50cyhuYW1lKTtcclxuXHJcbiAgICAgICAgaWYoIWVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcGxhY2VXaGlsZUV4aXN0cyhjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcihsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldO1xyXG5cclxuICAgICAgICBpZighY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXBsYWNlV2hpbGVFeGlzdHMoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVwbGFjZWRDb21wb25lbnRUYWdzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcGxhY2VDb21wb25lbnRUYWdzOyIsImNvbnN0IHNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbihEb21BdHRyaWJ1dGVzID0ge30pIHtcclxuICAgIGxldCB7IGF0dHJpYnV0ZXMgfSA9IHRoaXM7XHJcblxyXG4gICAgaWYodHlwZW9mIERvbUF0dHJpYnV0ZXMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgRG9tQXR0cmlidXRlcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzLCBEb21BdHRyaWJ1dGVzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzOyIsImNvbnN0IHsgTWVyZ2VPYmplY3QgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCBzZXREYXRhID0gZnVuY3Rpb24ocGFzc2VkRGF0YSkge1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICB0aGlzLmRhdGEgPSBNZXJnZU9iamVjdChwYXNzZWREYXRhLCBkYXRhKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufVx0XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNldERhdGE7IiwiY29uc3QgeyBHZW5lcmF0ZVJhbmRvbUlkIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3Qgc2V0SWQgPSBmdW5jdGlvbihpZD1HZW5lcmF0ZVJhbmRvbUlkKCdjaWQnKSkge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNldElkOyIsImNvbnN0IHNldFBhcmVudCA9IGZ1bmN0aW9uKHBhcmVudCkge1xyXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2V0UGFyZW50OyIsImNvbnN0IHR3ZWFrTGlmZUN5Y2xlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBsaWZlQ3ljbGUgfSA9IHRoaXM7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGxpZmVDeWNsZSk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIGxldCBmbiA9IGxpZmVDeWNsZVtrZXldO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpZmVDeWNsZVtrZXldID0gZm4uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpZmVDeWNsZSA9IGxpZmVDeWNsZTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0d2Vha0xpZmVDeWNsZTsiLCJjb25zdCBBdHRyaWJ1dGVzRXh0cmFjdG9yID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdGxldCBleHRyYWN0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgYXR0cmlidXRlcyA9IHt9O1xyXG5cdFx0bGV0IG5vZGVNYXAgPSB0aGlzLmVsZW1lbnQuYXR0cmlidXRlcztcclxuXHJcblx0XHRmb3IobGV0IGk9MDsgaTxub2RlTWFwLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGxldCB7IG5vZGVOYW1lLCBub2RlVmFsdWUgfSA9IG5vZGVNYXBbaV07XHJcblx0XHRcdFxyXG5cdFx0XHRhdHRyaWJ1dGVzW25vZGVOYW1lXSA9IG5vZGVWYWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXR0cmlidXRlcztcclxuXHR9O1xyXG5cdGxldCBnZXQgPSBmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRsZXQgYXR0cmlidXRlcyA9IHRoaXMuZXh0cmFjdCgpO1xyXG5cclxuXHRcdHJldHVybiBhdHRyaWJ1dGVzW25hbWVdO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRlbGVtZW50LFxyXG5cdFx0ZXh0cmFjdCxcclxuXHRcdGdldCxcclxuXHR9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEF0dHJpYnV0ZXNFeHRyYWN0b3I7IiwiY29uc3QgRGFzaGlmeVNuYWtlQ2FzZSA9IGZ1bmN0aW9uKHN0cikge1xyXG5cdGxldCBjaHVua3MgPSBzdHIuc3BsaXQoLyhbQS1aXSkvKTtcclxuXHJcblx0aWYoY2h1bmtzWzBdPT1cIlwiKSB7XHJcblx0XHRjaHVua3Muc2hpZnQoKTtcclxuXHR9XHJcblx0aWYoL14oW0EtWl0pezF9JC8udGVzdChjaHVua3NbMF0pKSB7XHJcblx0XHRjaHVua3NbMF0gPSBjaHVua3NbMF0udG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblx0c3RyID0gY2h1bmtzLmpvaW4oXCJcIik7XHJcblx0Y2h1bmtzID0gc3RyLnNwbGl0KC8oW0EtWl0pLyk7XHJcblx0Y2h1bmtzID0gY2h1bmtzLm1hcChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRpZigvXihbQS1aXSl7MX0kLy50ZXN0KGl0ZW0pKSB7XHJcblx0XHRcdGl0ZW0gPSBgLSR7aXRlbX1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gY2h1bmtzLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXNoaWZ5U25ha2VDYXNlOyIsImNvbnN0IEdlbmVyYXRlUmFuZG9tTnVtYmVyID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbU51bWJlci5qcycpO1xyXG5cclxuY29uc3QgR2VuZXJhdGVSYW5kb21JZCA9IGZ1bmN0aW9uKHByZWZpeCA9IFwicm5kXCIpIHtcclxuXHRsZXQgaWQgPSBbXHJcblx0XHRwcmVmaXgsXHJcblx0XHRHZW5lcmF0ZVJhbmRvbU51bWJlcigxMDAwLCA5OTk5KSxcclxuXHRcdChEYXRlLm5vdygpICsgJycpLnN1YnN0cig1KSxcclxuXHRdLmpvaW4oXCJfXCIpO1xyXG5cclxuXHRyZXR1cm4gaWQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdGVSYW5kb21JZDsiLCJjb25zdCBHZW5lcmF0ZVJhbmRvbU51bWJlciA9IGZ1bmN0aW9uKG1pbj0wLCBtYXg9OSkge1xyXG5cdG1pbiA9IE1hdGguY2VpbChtaW4pO1xyXG5cdG1heCA9IE1hdGguZmxvb3IobWF4KTtcclxuXHJcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdGVSYW5kb21OdW1iZXI7IiwiY29uc3QgVHJpbVdoaXRlU3BhY2UgPSByZXF1aXJlKCcuL1RyaW1XaGl0ZVNwYWNlLmpzJyk7XHJcblxyXG5jb25zdCByZXBsYWNlID0gZnVuY3Rpb24oc3RyLCBmaW5kLCByZXBsYWNlKSB7XHJcblx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoYCgke2ZpbmR9KWAsICdnJyksIHJlcGxhY2UpOyBcclxufVxyXG5cclxuY29uc3QgSW50ZXJwb2xhdGVUZXh0ID0gZnVuY3Rpb24oZGF0YSwgdGV4dCkge1xyXG5cdGlmKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHR0ZXh0ID0gcmVwbGFjZSh0ZXh0LCAne3snLCAnJHsnKTtcclxuXHR0ZXh0ID0gcmVwbGFjZSh0ZXh0LCAnfX0nLCAnfScpOztcclxuXHJcblx0bGV0IGZuQm9keSA9IGBcclxuXHRcdGxldCB7ICR7T2JqZWN0LmtleXMoZGF0YSkuam9pbihcIiwgXCIpfSB9ID0gZGF0YTtcclxuXHJcblx0XHRyZXR1cm4gXFxgJHt0ZXh0fVxcYDtcclxuXHRgO1xyXG5cdGxldCBmbiA9IG5ldyBGdW5jdGlvbignZGF0YScsIGZuQm9keSk7XHJcblx0XHJcblx0cmV0dXJuIFRyaW1XaGl0ZVNwYWNlKGZuKGRhdGEpKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcnBvbGF0ZVRleHQ7IiwiY29uc3QgSXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICBpZighZm4pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlzUHJvbWlzZSA9IGZuIGluc3RhbmNlb2YgUHJvbWlzZTtcclxuICAgIGxldCBpc0FzeW5jID0gZm4uY29uc3RydWN0b3IubmFtZSA9PT0gJ0FzeW5jRnVuY3Rpb24nO1xyXG4gICAgXHJcbiAgICByZXR1cm4gaXNQcm9taXNlIHx8IGlzQXN5bmM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXNUaGVuYWJsZTsiLCJjb25zdCBNZXJnZU9iamVjdCA9IGZ1bmN0aW9uKGRvbWluYW50T2JqZWN0LCB3ZWFrT2JqZWN0KSB7XHJcblx0bGV0IHdlYWtPYmplY3RLZXlzID0gT2JqZWN0LmtleXMod2Vha09iamVjdCk7XHJcblxyXG5cdGZvcihsZXQgaT0wOyBpPHdlYWtPYmplY3RLZXlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQga2V5ID0gd2Vha09iamVjdEtleXNbaV07XHJcblxyXG5cdFx0aWYoZG9taW5hbnRPYmplY3Rba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRvbWluYW50T2JqZWN0W2tleV0gPSB3ZWFrT2JqZWN0W2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZG9taW5hbnRPYmplY3Q7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVyZ2VPYmplY3Q7IiwiY29uc3QgU2V0RGVmYXVsdENvbmZpZyA9IGZ1bmN0aW9uKGRlZmF1bHRDb25maWcsIHN1cHBsaWVkQ29uZmlnKSB7XHJcblx0bGV0IGRlZmF1bHRDb25maWdLZXlzID0gT2JqZWN0LmtleXMoZGVmYXVsdENvbmZpZyk7XHJcblxyXG5cdGZvcihsZXQgaT0wOyBpPGRlZmF1bHRDb25maWdLZXlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQga2V5ID0gZGVmYXVsdENvbmZpZ0tleXNbaV07XHJcblxyXG5cdFx0aWYoc3VwcGxpZWRDb25maWdba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHN1cHBsaWVkQ29uZmlnW2tleV0gPSBkZWZhdWx0Q29uZmlnW2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3VwcGxpZWRDb25maWc7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2V0RGVmYXVsdENvbmZpZzsiLCJjb25zdCBUcmltV2hpdGVTcGFjZSA9IGZ1bmN0aW9uKHN0cikge1xyXG5cdGxldCBjaHVua3MgPSBzdHIuc3BsaXQoL1xccy8pO1xyXG5cdGxldCBjaGFycyA9IFtdO1xyXG5cclxuXHRmb3IobGV0IGk9MDsgaTxjaHVua3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBjaHVuayA9IGNodW5rc1tpXTtcclxuXHJcblx0XHRpZihjaHVuaz09XCJcIikge1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHRjaGFycy5wdXNoKGNodW5rKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjaGFycy5qb2luKFwiIFwiKTtcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyaW1XaGl0ZVNwYWNlOyIsImNvbnN0IEF0dHJpYnV0ZXNFeHRyYWN0b3IgPSByZXF1aXJlKCcuL0F0dHJpYnV0ZXNFeHRyYWN0b3IuanMnKTtcclxuY29uc3QgRGFzaGlmeVNuYWtlQ2FzZSA9IHJlcXVpcmUoJy4vRGFzaGlmeVNuYWtlQ2FzZS5qcycpO1xyXG5jb25zdCBHZW5lcmF0ZVJhbmRvbUlkID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbUlkLmpzJyk7XHJcbmNvbnN0IEdlbmVyYXRlUmFuZG9tTnVtYmVyID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbU51bWJlci5qcycpO1xyXG5jb25zdCBJbnRlcnBvbGF0ZVRleHQgPSByZXF1aXJlKCcuL0ludGVycG9sYXRlVGV4dC5qcycpO1xyXG5jb25zdCBJc1RoZW5hYmxlID0gcmVxdWlyZSgnLi9Jc1RoZW5hYmxlLmpzJyk7XHJcbmNvbnN0IE1lcmdlT2JqZWN0ID0gcmVxdWlyZSgnLi9NZXJnZU9iamVjdC5qcycpO1xyXG5jb25zdCBTZXREZWZhdWx0Q29uZmlnID0gcmVxdWlyZSgnLi9TZXREZWZhdWx0Q29uZmlnLmpzJyk7XHJcbmNvbnN0IFRyaW1XaGl0ZVNwYWNlID0gcmVxdWlyZSgnLi9UcmltV2hpdGVTcGFjZS5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0QXR0cmlidXRlc0V4dHJhY3RvcixcclxuXHREYXNoaWZ5U25ha2VDYXNlLFxyXG5cdEdlbmVyYXRlUmFuZG9tSWQsXHJcblx0R2VuZXJhdGVSYW5kb21OdW1iZXIsXHJcblx0SW50ZXJwb2xhdGVUZXh0LFxyXG5cdElzVGhlbmFibGUsXHJcblx0TWVyZ2VPYmplY3QsXHJcblx0U2V0RGVmYXVsdENvbmZpZyxcclxuXHRUcmltV2hpdGVTcGFjZSxcclxufSJdfQ==
