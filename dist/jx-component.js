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

},{"./src/Component.js":14,"./src/ComponentCollection.js":15,"./src/ComponentConstructor.js":16,"./src/ComponentException.js":17}],2:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":7}],3:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":2,"./_getRawTag":5,"./_objectToString":6}],4:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":2}],6:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],7:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":4}],8:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":9,"./now":12,"./toNumber":13}],9:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],10:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],11:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":3,"./isObjectLike":10}],12:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":7}],13:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":9,"./isSymbol":11}],14:[function(require,module,exports){
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
    refreshRenderedList = _require2.refreshRenderedList,
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

  _defineProperty(this, "refreshRenderedList", refreshRenderedList);

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

},{"./methods/index.js":28,"./utils/index.js":64}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./Component.js":14,"./utils/index.js":64}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";

var removeStyle = require('./removeStyle.js');

var styleExists = require('./styleExists.js');

module.exports = {
  removeStyle: removeStyle,
  styleExists: styleExists
};

},{"./removeStyle.js":19,"./styleExists.js":20}],19:[function(require,module,exports){
"use strict";

var removeStyle = function removeStyle(id) {
  $("style[itemid=\"".concat(id, "\"]")).remove();
};

module.exports = removeStyle;

},{}],20:[function(require,module,exports){
"use strict";

var styleExists = function styleExists(id) {
  return $("style[itemid=\"".concat(id, "\"]")).length;
};

module.exports = styleExists;

},{}],21:[function(require,module,exports){
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

},{"../ComponentCollection.js":15,"../ComponentException.js":17,"../utils/index.js":64}],22:[function(require,module,exports){
"use strict";

var beforeRender = function beforeRender() {
  return this.lifeCycle.beforeRender();
};

module.exports = beforeRender;

},{}],23:[function(require,module,exports){
"use strict";

var createInstance = function createInstance(parent) {
  var createdInstance = Object.create(this);
  createdInstance.setParent(parent).setId();
  return createdInstance;
};

module.exports = createInstance;

},{}],24:[function(require,module,exports){
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

},{"../helpers/index.js":18}],25:[function(require,module,exports){
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

},{"../utils/index.js":64}],26:[function(require,module,exports){
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

},{"../ComponentException.js":17,"../utils/index.js":64}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

var refreshRenderedList = require('./refreshRenderedList.js');

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
  refreshRenderedList: refreshRenderedList,
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

},{"./afterRender.js":21,"./beforeRender.js":22,"./createInstance.js":23,"./destroy.js":24,"./generateStyle.js":25,"./generateTemplate.js":26,"./hierarchy.js":27,"./onInit.js":29,"./onRender.js":30,"./parentComponent.js":31,"./refreshRenderedList.js":32,"./registerDomRefs.js":33,"./registerEvents.js":34,"./registerMethods.js":35,"./registerRemoveSelfEvent.js":36,"./removeOnInitElement.js":37,"./renameComponents.js":38,"./render.js":39,"./renderComponent.js":40,"./renderComponents.js":41,"./renderIf.js":42,"./renderListComponent.js":43,"./renderOnInitElement.js":44,"./renderShow.js":45,"./renderSingularComponent.js":46,"./renderStyle.js":47,"./renderTemplate.js":48,"./replaceComponentTags.js":49,"./setAttributes.js":50,"./setData.js":51,"./setId.js":52,"./setParent.js":53,"./tweakLifeCycle.js":54}],29:[function(require,module,exports){
"use strict";

var onInit = function onInit() {
  return this.lifeCycle.onInit();
};

module.exports = onInit;

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
"use strict";

var refreshRenderedList = function refreshRenderedList(targetElement, items, listItemComponent, noItemsComponent) {
  targetElement = $(targetElement);
  targetElement.empty();

  if (!(items && items.length)) {
    if (noItemsComponent) {
      noItemsComponent.createInstance(this).render({
        targetElement: targetElement,
        renderType: 'append'
      });
    }

    return;
  }

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var listItem = listItemComponent.createInstance(this);
    listItem.setData(item);
    listItem.render({
      targetElement: targetElement,
      renderType: 'append'
    });
  }
};

module.exports = refreshRenderedList;

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var debounce = require('lodash/debounce');

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
      var debounceAttribute = element.attr('debounce') + '';

      var _debounceAttribute$sp = debounceAttribute.split(","),
          _debounceAttribute$sp2 = _slicedToArray(_debounceAttribute$sp, 2),
          evt = _debounceAttribute$sp2[0],
          wait = _debounceAttribute$sp2[1];

      evt = evt + ''.trim();
      wait = parseInt(wait + ''.trim());
      wait = isNaN(wait) || wait < 0 ? 0 : wait;

      if (typeof fn !== 'function') {
        continue;
      }

      element.removeAttr("on-".concat(eventName));
      element.removeAttr('debounce');

      if (evt == eventName && wait > 0) {
        fn = debounce(fn, wait, {
          leading: false,
          trailing: true
        });
        element[0].addEventListener(eventName, fn.bind(this));
        continue;
      }

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

},{"lodash/debounce":8}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"../ComponentCollection.js":15}],37:[function(require,module,exports){
"use strict";

var removeOnInitElement = function removeOnInitElement() {
  var id = this.id;
  $("[on_init_".concat(id, "]")).remove();
};

module.exports = removeOnInitElement;

},{}],38:[function(require,module,exports){
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

},{"../utils/index.js":64}],39:[function(require,module,exports){
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

},{"../ComponentException.js":17,"../utils/index.js":64}],40:[function(require,module,exports){
"use strict";

var renderComponent = function renderComponent(replaced) {
  var listExpression = replaced.attributes['data-list'];

  if (listExpression) {
    return this.renderListComponent(replaced);
  }

  this.renderSingularComponent(replaced);
};

module.exports = renderComponent;

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"../ComponentException.js":17,"../utils/index.js":64}],44:[function(require,module,exports){
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

},{"../ComponentException.js":17,"../utils/index.js":64}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"../utils/index.js":64}],47:[function(require,module,exports){
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

},{"../helpers/index.js":18}],48:[function(require,module,exports){
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

},{"../utils/index.js":64}],49:[function(require,module,exports){
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

},{"../utils/index.js":64}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    MergeObject = _require.MergeObject;

var setData = function setData(passedData) {
  var data = this.data;
  this.data = MergeObject(passedData, data);
  return this;
};

module.exports = setData;

},{"../utils/index.js":64}],52:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId;

var setId = function setId() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GenerateRandomId('cid');
  this.id = id;
  return this;
};

module.exports = setId;

},{"../utils/index.js":64}],53:[function(require,module,exports){
"use strict";

var setParent = function setParent(parent) {
  this.parent = parent;
  return this;
};

module.exports = setParent;

},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
"use strict";

var GenerateRandomNumber = require('./GenerateRandomNumber.js');

var GenerateRandomId = function GenerateRandomId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "rnd";
  var id = [prefix, GenerateRandomNumber(1000, 9999), (Date.now() + '').substr(5)].join("_");
  return id;
};

module.exports = GenerateRandomId;

},{"./GenerateRandomNumber.js":58}],58:[function(require,module,exports){
"use strict";

var GenerateRandomNumber = function GenerateRandomNumber() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = GenerateRandomNumber;

},{}],59:[function(require,module,exports){
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

},{"./TrimWhiteSpace.js":63}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{"./AttributesExtractor.js":55,"./DashifySnakeCase.js":56,"./GenerateRandomId.js":57,"./GenerateRandomNumber.js":58,"./InterpolateText.js":59,"./IsThenable.js":60,"./MergeObject.js":61,"./SetDefaultConfig.js":62,"./TrimWhiteSpace.js":63}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90b051bWJlci5qcyIsInNyYy9Db21wb25lbnQuanMiLCJzcmMvQ29tcG9uZW50Q29sbGVjdGlvbi5qcyIsInNyYy9Db21wb25lbnRDb25zdHJ1Y3Rvci5qcyIsInNyYy9Db21wb25lbnRFeGNlcHRpb24uanMiLCJzcmMvaGVscGVycy9pbmRleC5qcyIsInNyYy9oZWxwZXJzL3JlbW92ZVN0eWxlLmpzIiwic3JjL2hlbHBlcnMvc3R5bGVFeGlzdHMuanMiLCJzcmMvbWV0aG9kcy9hZnRlclJlbmRlci5qcyIsInNyYy9tZXRob2RzL2JlZm9yZVJlbmRlci5qcyIsInNyYy9tZXRob2RzL2NyZWF0ZUluc3RhbmNlLmpzIiwic3JjL21ldGhvZHMvZGVzdHJveS5qcyIsInNyYy9tZXRob2RzL2dlbmVyYXRlU3R5bGUuanMiLCJzcmMvbWV0aG9kcy9nZW5lcmF0ZVRlbXBsYXRlLmpzIiwic3JjL21ldGhvZHMvaGllcmFyY2h5LmpzIiwic3JjL21ldGhvZHMvaW5kZXguanMiLCJzcmMvbWV0aG9kcy9vbkluaXQuanMiLCJzcmMvbWV0aG9kcy9vblJlbmRlci5qcyIsInNyYy9tZXRob2RzL3BhcmVudENvbXBvbmVudC5qcyIsInNyYy9tZXRob2RzL3JlZnJlc2hSZW5kZXJlZExpc3QuanMiLCJzcmMvbWV0aG9kcy9yZWdpc3RlckRvbVJlZnMuanMiLCJzcmMvbWV0aG9kcy9yZWdpc3RlckV2ZW50cy5qcyIsInNyYy9tZXRob2RzL3JlZ2lzdGVyTWV0aG9kcy5qcyIsInNyYy9tZXRob2RzL3JlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50LmpzIiwic3JjL21ldGhvZHMvcmVtb3ZlT25Jbml0RWxlbWVudC5qcyIsInNyYy9tZXRob2RzL3JlbmFtZUNvbXBvbmVudHMuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXIuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJDb21wb25lbnQuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJDb21wb25lbnRzLmpzIiwic3JjL21ldGhvZHMvcmVuZGVySWYuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJMaXN0Q29tcG9uZW50LmpzIiwic3JjL21ldGhvZHMvcmVuZGVyT25Jbml0RWxlbWVudC5qcyIsInNyYy9tZXRob2RzL3JlbmRlclNob3cuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJTaW5ndWxhckNvbXBvbmVudC5qcyIsInNyYy9tZXRob2RzL3JlbmRlclN0eWxlLmpzIiwic3JjL21ldGhvZHMvcmVuZGVyVGVtcGxhdGUuanMiLCJzcmMvbWV0aG9kcy9yZXBsYWNlQ29tcG9uZW50VGFncy5qcyIsInNyYy9tZXRob2RzL3NldEF0dHJpYnV0ZXMuanMiLCJzcmMvbWV0aG9kcy9zZXREYXRhLmpzIiwic3JjL21ldGhvZHMvc2V0SWQuanMiLCJzcmMvbWV0aG9kcy9zZXRQYXJlbnQuanMiLCJzcmMvbWV0aG9kcy90d2Vha0xpZmVDeWNsZS5qcyIsInNyYy91dGlscy9BdHRyaWJ1dGVzRXh0cmFjdG9yLmpzIiwic3JjL3V0aWxzL0Rhc2hpZnlTbmFrZUNhc2UuanMiLCJzcmMvdXRpbHMvR2VuZXJhdGVSYW5kb21JZC5qcyIsInNyYy91dGlscy9HZW5lcmF0ZVJhbmRvbU51bWJlci5qcyIsInNyYy91dGlscy9JbnRlcnBvbGF0ZVRleHQuanMiLCJzcmMvdXRpbHMvSXNUaGVuYWJsZS5qcyIsInNyYy91dGlscy9NZXJnZU9iamVjdC5qcyIsInNyYy91dGlscy9TZXREZWZhdWx0Q29uZmlnLmpzIiwic3JjL3V0aWxzL1RyaW1XaGl0ZVNwYWNlLmpzIiwic3JjL3V0aWxzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyw4QkFBRCxDQUFuQzs7QUFDQSxJQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyw2QkFBRCxDQUFsQzs7QUFDQSxJQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQywrQkFBRCxDQUFwQzs7QUFDQSxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsb0JBQUQsQ0FBekI7O0FBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUFDaEIsRUFBQSxtQkFBbUIsRUFBbkIsbUJBRGdCO0FBRWhCLEVBQUEsa0JBQWtCLEVBQWxCLGtCQUZnQjtBQUdoQixFQUFBLG9CQUFvQixFQUFwQixvQkFIZ0I7QUFJaEIsRUFBQSxTQUFTLEVBQVQ7QUFKZ0IsQ0FBakI7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFBLGNBQWMsRUFBZDtBQVRnQixDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSByZXF1aXJlKCcuL3NyYy9Db21wb25lbnRDb2xsZWN0aW9uLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG5jb25zdCBDb21wb25lbnRDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudENvbnN0cnVjdG9yLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudC5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Q29tcG9uZW50Q29sbGVjdGlvbixcclxuXHRDb21wb25lbnRFeGNlcHRpb24sXHJcblx0Q29tcG9uZW50Q29uc3RydWN0b3IsXHJcblx0Q29tcG9uZW50LFxyXG59IiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBub3cgPSByZXF1aXJlKCcuL25vdycpLFxuICAgIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgdGltZVdhaXRpbmcgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nXG4gICAgICA/IG5hdGl2ZU1pbih0aW1lV2FpdGluZywgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpXG4gICAgICA6IHRpbWVXYWl0aW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbm93O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXI7XG4iLCJjb25zdCB7IEdlbmVyYXRlUmFuZG9tSWQgfSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgeyBcclxuICAgIGRlc3Ryb3ksXHJcbiAgICBoaWVyYXJjaHksXHJcbiAgICBwYXJlbnRDb21wb25lbnQsXHJcbiAgICBjcmVhdGVJbnN0YW5jZSxcclxuICAgIHNldERhdGEsXHJcbiAgICBzZXRQYXJlbnQsXHJcbiAgICBzZXRJZCxcclxuICAgIHNldEF0dHJpYnV0ZXMsXHJcbiAgICByZW5kZXJTaW5ndWxhckNvbXBvbmVudCxcclxuICAgIHJlbmRlckxpc3RDb21wb25lbnQsXHJcbiAgICByZWZyZXNoUmVuZGVyZWRMaXN0LFxyXG4gICAgcmVuZGVyQ29tcG9uZW50LFxyXG4gICAgcmVwbGFjZUNvbXBvbmVudFRhZ3MsXHJcbiAgICByZW5kZXJDb21wb25lbnRzLFxyXG4gICAgcmVnaXN0ZXJEb21SZWZzLFxyXG5cdHJlZ2lzdGVyRXZlbnRzLFxyXG5cdHJlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50LFxyXG4gICAgcmVnaXN0ZXJNZXRob2RzLFxyXG4gICAgcmVuZGVyU2hvdyxcclxuICAgIHJlbmRlcklmLFxyXG4gICAgZ2VuZXJhdGVUZW1wbGF0ZSxcclxuICAgIHJlbmRlclRlbXBsYXRlLFxyXG4gICAgZ2VuZXJhdGVTdHlsZSxcclxuICAgIHJlbmRlclN0eWxlLFxyXG4gICAgYWZ0ZXJSZW5kZXIsXHJcbiAgICBvblJlbmRlcixcclxuICAgIGJlZm9yZVJlbmRlcixcclxuICAgIHJlbW92ZU9uSW5pdEVsZW1lbnQsXHJcbiAgICByZW5kZXJPbkluaXRFbGVtZW50LFxyXG4gICAgb25Jbml0LFxyXG4gICAgdHdlYWtMaWZlQ3ljbGUsXHJcbiAgICByZW5hbWVDb21wb25lbnRzLFxyXG4gICAgcmVuZGVyLFxyXG59ID0gcmVxdWlyZSgnLi9tZXRob2RzL2luZGV4LmpzJyk7XHJcblxyXG5jbGFzcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XHJcblx0XHRsZXQgeyBcclxuXHRcdFx0bmFtZSxcclxuXHRcdFx0c3R5bGVJZCxcclxuXHRcdFx0c3R5bGUsXHJcblx0XHRcdHRlbXBsYXRlLFxyXG5cdFx0XHRkYXRhLFxyXG5cdFx0XHRldmVudHMsXHJcblx0XHRcdG1ldGhvZHMsXHJcblx0XHRcdGxpZmVDeWNsZSxcclxuXHRcdFx0Y29tcG9uZW50cyxcclxuXHRcdFx0YXR0cmlidXRlcyxcclxuXHRcdFx0cGFyZW50LFxyXG5cdFx0fSA9IGNvbmZpZztcclxuXHJcblx0XHR0aGlzLmlkID0gR2VuZXJhdGVSYW5kb21JZCgnY2lkJyk7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5zdHlsZUlkID0gc3R5bGVJZDtcclxuXHRcdHRoaXMuc3R5bGUgPSBzdHlsZTtcclxuXHRcdHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XHJcblx0XHR0aGlzLmV2ZW50cyA9IGV2ZW50cztcclxuXHRcdHRoaXMubWV0aG9kcyA9IG1ldGhvZHM7XHJcblx0XHR0aGlzLmxpZmVDeWNsZSA9IGxpZmVDeWNsZTtcclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcblx0XHR0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgICAgIHRoaXMuJHJlZnMgPSB7fTtcclxuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG5cdH1cclxuXHJcbiAgICBkZXN0cm95ID0gZGVzdHJveTtcclxuICAgIGhpZXJhcmNoeSA9IGhpZXJhcmNoeTtcclxuICAgIHBhcmVudENvbXBvbmVudCA9IHBhcmVudENvbXBvbmVudDtcclxuICAgIGNyZWF0ZUluc3RhbmNlID0gY3JlYXRlSW5zdGFuY2U7XHJcbiAgICBzZXREYXRhID0gc2V0RGF0YTtcclxuICAgIHNldFBhcmVudCA9IHNldFBhcmVudDtcclxuICAgIHNldElkID0gc2V0SWQ7XHJcbiAgICBzZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcclxuICAgIHJlbmRlclNpbmd1bGFyQ29tcG9uZW50ID0gcmVuZGVyU2luZ3VsYXJDb21wb25lbnQ7XHJcbiAgICByZW5kZXJMaXN0Q29tcG9uZW50ID0gcmVuZGVyTGlzdENvbXBvbmVudDtcclxuICAgIHJlZnJlc2hSZW5kZXJlZExpc3QgPSByZWZyZXNoUmVuZGVyZWRMaXN0O1xyXG4gICAgcmVuZGVyQ29tcG9uZW50ID0gcmVuZGVyQ29tcG9uZW50O1xyXG4gICAgcmVwbGFjZUNvbXBvbmVudFRhZ3MgPSByZXBsYWNlQ29tcG9uZW50VGFncztcclxuICAgIHJlbmRlckNvbXBvbmVudHMgPSByZW5kZXJDb21wb25lbnRzO1xyXG4gICAgcmVnaXN0ZXJEb21SZWZzID0gcmVnaXN0ZXJEb21SZWZzO1xyXG5cdHJlZ2lzdGVyRXZlbnRzID0gcmVnaXN0ZXJFdmVudHM7XHJcblx0cmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQgPSByZWdpc3RlclJlbW92ZVNlbGZFdmVudDtcclxuICAgIHJlZ2lzdGVyTWV0aG9kcyA9IHJlZ2lzdGVyTWV0aG9kcztcclxuICAgIHJlbmRlclNob3cgPSByZW5kZXJTaG93O1xyXG4gICAgcmVuZGVySWYgPSByZW5kZXJJZjtcclxuICAgIGdlbmVyYXRlVGVtcGxhdGUgPSBnZW5lcmF0ZVRlbXBsYXRlO1xyXG4gICAgcmVuZGVyVGVtcGxhdGUgPSByZW5kZXJUZW1wbGF0ZTtcclxuICAgIGdlbmVyYXRlU3R5bGUgPSBnZW5lcmF0ZVN0eWxlO1xyXG4gICAgcmVuZGVyU3R5bGUgPSByZW5kZXJTdHlsZTtcclxuICAgIGFmdGVyUmVuZGVyID0gYWZ0ZXJSZW5kZXI7XHJcbiAgICBvblJlbmRlciA9IG9uUmVuZGVyO1xyXG4gICAgYmVmb3JlUmVuZGVyID0gYmVmb3JlUmVuZGVyO1xyXG4gICAgcmVtb3ZlT25Jbml0RWxlbWVudCA9IHJlbW92ZU9uSW5pdEVsZW1lbnQ7XHJcbiAgICByZW5kZXJPbkluaXRFbGVtZW50ID0gcmVuZGVyT25Jbml0RWxlbWVudDtcclxuICAgIG9uSW5pdCA9IG9uSW5pdDtcclxuICAgIHR3ZWFrTGlmZUN5Y2xlID0gdHdlYWtMaWZlQ3ljbGU7XHJcbiAgICByZW5hbWVDb21wb25lbnRzID0gcmVuYW1lQ29tcG9uZW50cztcclxuICAgIHJlbmRlciA9IHJlbmRlcjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHtcclxuXHRjb21wb25lbnRzOiBbXSxcclxuXHRhZGQoY29tcG9uZW50KSB7IFxyXG5cdFx0dGhpcy5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcclxuXHR9LFxyXG5cdHJlbW92ZShjb21wb25lbnQpIHtcclxuXHRcdGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblx0XHRsZXQgaW5kZXggPSBjb21wb25lbnRzLmZpbmRJbmRleCgoaXRlbSk9PiB7XHJcblx0XHRcdHJldHVybiBpdGVtLmlkID09IGNvbXBvbmVudC5pZDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGluZGV4IDw9IC0xKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cdFxyXG5cdFx0Y29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuXHR9LFxyXG5cdGZpbHRlcigpIHtcclxuXHRcdGxldCBmaWx0ZXJDb21wb25lbnRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblxyXG5cdFx0XHRmb3IobGV0IGk9MDsgaTxjb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNbaV07XHJcblx0XHRcdFx0bGV0ICRjb21wb25lbnQgPSAkKGAjJHtjb21wb25lbnQuaWR9YCk7XHJcblx0XHJcblx0XHRcdFx0aWYoJGNvbXBvbmVudC5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnJlbW92ZShjb21wb25lbnQpO1xyXG5cdFx0XHR9XHRcdFxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZmlsdGVyQ29tcG9uZW50cywgMTAwMCk7XHJcblx0fSxcclxuXHRkaXNwbGF5KCkge1xyXG5cdFx0bGV0IHsgY29tcG9uZW50cyB9ID0gdGhpcztcclxuXHRcdGxldCBpdGVtcyA9IGNvbXBvbmVudHMubWFwKCh7IGlkLCBuYW1lLCBzdHlsZUlkIH0pID0+IHsgXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWQsIFxyXG5cdFx0XHRcdG5hbWUsIFxyXG5cdFx0XHRcdHN0eWxlSWQsXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnNvbGUudGFibGUoaXRlbXMpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnRDb2xsZWN0aW9uOyIsImNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ29tcG9uZW50LmpzJyk7XHJcbmNvbnN0IHsgXHJcblx0R2VuZXJhdGVSYW5kb21JZCxcclxuXHRTZXREZWZhdWx0Q29uZmlnLFxyXG59ID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgQ29tcG9uZW50Q29uc3RydWN0b3IgPSB7XHJcblx0Y3JlYXRlKGNvbmZpZyA9IHt9KSB7XHJcblx0XHRjb25zdCBkZWZhdWx0Q29uZmlnID0ge1xyXG5cdFx0XHRzdHlsZUlkOiBHZW5lcmF0ZVJhbmRvbUlkKCdjc3MnKSxcclxuXHRcdFx0dGVtcGxhdGU6IGBcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGgxPiBDb21wb25lbnQgcmVuZGVyZWQuIDwvaDE+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdGAsXHJcblx0XHRcdGRhdGE6IHt9LFxyXG5cdFx0XHRldmVudHM6IHt9LFxyXG5cdFx0XHRtZXRob2RzOiB7fSxcclxuXHRcdFx0bGlmZUN5Y2xlOiB7fSxcclxuXHRcdFx0Y29tcG9uZW50czoge30sXHJcblx0XHRcdGF0dHJpYnV0ZXM6IHt9LFxyXG5cdFx0XHRwYXJlbnQ6IG51bGwsXHJcblx0XHR9O1xyXG5cdFx0Y29uZmlnID0gU2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnLCBjb25maWcpO1xyXG5cdFx0bGV0IHsgbmFtZSB9ID0gY29uZmlnO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvbmVudChjb25maWcpO1xyXG5cdH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50Q29uc3RydWN0b3I7IiwiY2xhc3MgQ29tcG9uZW50RXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gJ0NvbXBvbmVudEV4Y2VwdGlvbic7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50RXhjZXB0aW9uOyIsImNvbnN0IHJlbW92ZVN0eWxlID0gcmVxdWlyZSgnLi9yZW1vdmVTdHlsZS5qcycpO1xyXG5jb25zdCBzdHlsZUV4aXN0cyA9IHJlcXVpcmUoJy4vc3R5bGVFeGlzdHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcmVtb3ZlU3R5bGUsXHJcbiAgICBzdHlsZUV4aXN0cyxcclxufSIsImNvbnN0IHJlbW92ZVN0eWxlID0gZnVuY3Rpb24oaWQpIHtcclxuXHQkKGBzdHlsZVtpdGVtaWQ9XCIke2lkfVwiXWApLnJlbW92ZSgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZVN0eWxlOyIsImNvbnN0IHN0eWxlRXhpc3RzID0gZnVuY3Rpb24oaWQpIHtcclxuXHRyZXR1cm4gJChgc3R5bGVbaXRlbWlkPVwiJHtpZH1cIl1gKS5sZW5ndGg7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc3R5bGVFeGlzdHM7IiwiY29uc3QgeyBJc1RoZW5hYmxlIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5jb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudENvbGxlY3Rpb24uanMnKTtcclxuXHJcbmNvbnN0IGFmdGVyUmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBhZnRlclJlbmRlciB9ID0gdGhpcy5saWZlQ3ljbGU7XHJcbiAgICBsZXQgcmV0dXJuVmFsdWU7XHJcbiAgICBcclxuICAgIGlmKGFmdGVyUmVuZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWUgPSB0aGlzLmxpZmVDeWNsZS5hZnRlclJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgaWYoSXNUaGVuYWJsZShyZXR1cm5WYWx1ZSkpIHtcclxuICAgICAgICByZXR1cm5WYWx1ZS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNvbXBvbmVudHMoKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XHJcbiAgICB0aGlzLnJlbW92ZU9uSW5pdEVsZW1lbnQoKTtcclxuICAgIENvbXBvbmVudENvbGxlY3Rpb24uYWRkKHRoaXMpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFmdGVyUmVuZGVyOyIsImNvbnN0IGJlZm9yZVJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlmZUN5Y2xlLmJlZm9yZVJlbmRlcigpO1xyXG59XHRcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYmVmb3JlUmVuZGVyOyIsImNvbnN0IGNyZWF0ZUluc3RhbmNlID0gZnVuY3Rpb24ocGFyZW50KSB7XHJcbiAgICBsZXQgY3JlYXRlZEluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcclxuICAgICAgICBjcmVhdGVkSW5zdGFuY2VcclxuICAgICAgICAgICAgLnNldFBhcmVudChwYXJlbnQpXHJcbiAgICAgICAgICAgIC5zZXRJZCgpO1xyXG5cclxuICAgIHJldHVybiBjcmVhdGVkSW5zdGFuY2U7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSW5zdGFuY2U7IiwiY29uc3QgeyByZW1vdmVTdHlsZSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgc3R5bGVJZCB9ID0gdGhpcztcclxuICAgIGxldCB7ICRzZWxmIH0gPSB0aGlzLiRyZWZzO1xyXG5cclxuICAgICRzZWxmWzBdLnJlbW92ZSgpO1xyXG4gICAgbGV0IHNpbWlsYXJDb21wb25lbnRzID0gJChgWyR7c3R5bGVJZH1dYCk7XHJcblxyXG4gICAgaWYoIXNpbWlsYXJDb21wb25lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJlbW92ZVN0eWxlKHN0eWxlSWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRlc3Ryb3k7XHJcbiIsImNvbnN0IHsgSW50ZXJwb2xhdGVUZXh0LCBUcmltV2hpdGVTcGFjZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlU3R5bGUgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IHN0eWxlSWQsIHN0eWxlIH0gPSB0aGlzO1xyXG4gICAgbGV0IHN0eWxlVGFnID0gYFxyXG4gICAgICAgIDxzdHlsZSBpdGVtaWQ9XCIke3N0eWxlSWR9XCI+XHJcbiAgICAgICAgICAgICR7SW50ZXJwb2xhdGVUZXh0KHtzdHlsZUlkfSwgc3R5bGUpfVxyXG4gICAgICAgIDwvc3R5bGU+XHJcbiAgICBgO1xyXG5cclxuICAgIHJldHVybiBUcmltV2hpdGVTcGFjZShzdHlsZVRhZyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVTdHlsZTsiLCJjb25zdCB7IEludGVycG9sYXRlVGV4dCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBpZCwgbmFtZSwgc3R5bGVJZCwgdGVtcGxhdGUsIGRhdGEsIGF0dHJpYnV0ZXMgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHRlbXBsYXRlMDtcclxuXHJcbiAgICB0ZW1wbGF0ZSA9ICQucGFyc2VIVE1MKEludGVycG9sYXRlVGV4dChkYXRhLCB0ZW1wbGF0ZSkpO1xyXG4gICAgJHRlbXBsYXRlMCA9ICQodGVtcGxhdGVbMF0pO1xyXG5cclxuICAgIGlmKHRlbXBsYXRlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgIGBDb21wb25lbnQgZG8gbm90IGhhdmUgYSB0ZW1wbGF0ZS5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYodGVtcGxhdGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbiAgICBpZih0ZW1wbGF0ZVswXS5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgJHRlbXBsYXRlMFxyXG4gICAgICAgIC5hdHRyKGF0dHJpYnV0ZXMpXHJcbiAgICAgICAgLmF0dHIoJ2NvbXBvbmVudC1uYW1lJywgbmFtZSlcclxuICAgICAgICAuYXR0cihzdHlsZUlkLCAnJylcclxuICAgICAgICAuYXR0cignaWQnLCBpZCk7XHJcbiAgICAgICAgXHJcbiAgICByZXR1cm4gdGVtcGxhdGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVUZW1wbGF0ZTsiLCJjb25zdCBoaWVyYXJjaHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgeyBuYW1lIH0gPSB0aGlzO1xyXG4gICAgbGV0IGhpZXJhcmNoeSA9IFtdO1xyXG4gICAgbGV0IHdoaWxlUGFyZW50RXhpc3RzID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCB7IHBhcmVudCB9ID0gY29tcG9uZW50O1xyXG5cclxuICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJlbnROYW1lID0gKHBhcmVudC5uYW1lKSA/IHBhcmVudC5uYW1lIDogJ3Jvb3QnO1xyXG5cclxuICAgICAgICBoaWVyYXJjaHkucHVzaChwYXJlbnROYW1lKTtcclxuICAgICAgICB3aGlsZVBhcmVudEV4aXN0cyhwYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlUGFyZW50RXhpc3RzKHRoaXMpO1xyXG5cclxuICAgIGlmKGhpZXJhcmNoeS5sZW5ndGggPT0gMCAmJiBuYW1lID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGhpZXJhcmNoeS5wdXNoKCdyb290Jyk7ICAgICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGllcmFyY2h5LnB1c2gobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhpZXJhcmNoeTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBoaWVyYXJjaHk7IiwiY29uc3QgZGVzdHJveSA9IHJlcXVpcmUoJy4vZGVzdHJveS5qcycpO1xyXG5jb25zdCBoaWVyYXJjaHkgPSByZXF1aXJlKCcuL2hpZXJhcmNoeS5qcycpO1xyXG5jb25zdCBwYXJlbnRDb21wb25lbnQgPSByZXF1aXJlKCcuL3BhcmVudENvbXBvbmVudC5qcycpO1xyXG5jb25zdCBjcmVhdGVJbnN0YW5jZSA9IHJlcXVpcmUoJy4vY3JlYXRlSW5zdGFuY2UuanMnKTtcclxuY29uc3Qgc2V0RGF0YSA9IHJlcXVpcmUoJy4vc2V0RGF0YS5qcycpO1xyXG5jb25zdCBzZXRQYXJlbnQgPSByZXF1aXJlKCcuL3NldFBhcmVudC5qcycpO1xyXG5jb25zdCBzZXRJZCA9IHJlcXVpcmUoJy4vc2V0SWQuanMnKTtcclxuY29uc3Qgc2V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vc2V0QXR0cmlidXRlcy5qcycpO1xyXG5jb25zdCByZW5kZXJTaW5ndWxhckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcmVuZGVyU2luZ3VsYXJDb21wb25lbnQuanMnKTtcclxuY29uc3QgcmVuZGVyTGlzdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vcmVuZGVyTGlzdENvbXBvbmVudC5qcycpO1xyXG5jb25zdCByZWZyZXNoUmVuZGVyZWRMaXN0ID0gcmVxdWlyZSgnLi9yZWZyZXNoUmVuZGVyZWRMaXN0LmpzJyk7XHJcbmNvbnN0IHJlbmRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcmVuZGVyQ29tcG9uZW50LmpzJyk7XHJcbmNvbnN0IHJlcGxhY2VDb21wb25lbnRUYWdzID0gcmVxdWlyZSgnLi9yZXBsYWNlQ29tcG9uZW50VGFncy5qcycpO1xyXG5jb25zdCByZW5kZXJDb21wb25lbnRzID0gcmVxdWlyZSgnLi9yZW5kZXJDb21wb25lbnRzLmpzJyk7XHJcbmNvbnN0IHJlZ2lzdGVyRG9tUmVmcyA9IHJlcXVpcmUoJy4vcmVnaXN0ZXJEb21SZWZzLmpzJyk7XHJcbmNvbnN0IHJlZ2lzdGVyRXZlbnRzID0gcmVxdWlyZSgnLi9yZWdpc3RlckV2ZW50cy5qcycpO1xyXG5jb25zdCByZWdpc3RlclJlbW92ZVNlbGZFdmVudCA9IHJlcXVpcmUoJy4vcmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQuanMnKTtcclxuY29uc3QgcmVnaXN0ZXJNZXRob2RzID0gcmVxdWlyZSgnLi9yZWdpc3Rlck1ldGhvZHMuanMnKTtcclxuY29uc3QgcmVuZGVyU2hvdyA9IHJlcXVpcmUoJy4vcmVuZGVyU2hvdy5qcycpO1xyXG5jb25zdCByZW5kZXJJZiA9IHJlcXVpcmUoJy4vcmVuZGVySWYuanMnKTtcclxuY29uc3QgZ2VuZXJhdGVUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZ2VuZXJhdGVUZW1wbGF0ZS5qcycpO1xyXG5jb25zdCByZW5kZXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcmVuZGVyVGVtcGxhdGUuanMnKTtcclxuY29uc3QgZ2VuZXJhdGVTdHlsZSA9IHJlcXVpcmUoJy4vZ2VuZXJhdGVTdHlsZS5qcycpO1xyXG5jb25zdCByZW5kZXJTdHlsZSA9IHJlcXVpcmUoJy4vcmVuZGVyU3R5bGUuanMnKTtcclxuY29uc3QgYWZ0ZXJSZW5kZXIgPSByZXF1aXJlKCcuL2FmdGVyUmVuZGVyLmpzJyk7XHJcbmNvbnN0IG9uUmVuZGVyID0gcmVxdWlyZSgnLi9vblJlbmRlci5qcycpO1xyXG5jb25zdCBiZWZvcmVSZW5kZXIgPSByZXF1aXJlKCcuL2JlZm9yZVJlbmRlci5qcycpO1xyXG5jb25zdCByZW1vdmVPbkluaXRFbGVtZW50ID0gcmVxdWlyZSgnLi9yZW1vdmVPbkluaXRFbGVtZW50LmpzJyk7XHJcbmNvbnN0IHJlbmRlck9uSW5pdEVsZW1lbnQgPSByZXF1aXJlKCcuL3JlbmRlck9uSW5pdEVsZW1lbnQuanMnKTtcclxuY29uc3Qgb25Jbml0ID0gcmVxdWlyZSgnLi9vbkluaXQuanMnKTtcclxuY29uc3QgdHdlYWtMaWZlQ3ljbGUgPSByZXF1aXJlKCcuL3R3ZWFrTGlmZUN5Y2xlLmpzJyk7XHJcbmNvbnN0IHJlbmFtZUNvbXBvbmVudHMgPSByZXF1aXJlKCcuL3JlbmFtZUNvbXBvbmVudHMuanMnKTtcclxuY29uc3QgcmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXIuanMnKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGRlc3Ryb3ksXHJcbiAgICBoaWVyYXJjaHksXHJcbiAgICBwYXJlbnRDb21wb25lbnQsXHJcbiAgICBjcmVhdGVJbnN0YW5jZSxcclxuICAgIHNldERhdGEsXHJcbiAgICBzZXRQYXJlbnQsXHJcbiAgICBzZXRJZCxcclxuICAgIHNldEF0dHJpYnV0ZXMsXHJcbiAgICByZW5kZXJTaW5ndWxhckNvbXBvbmVudCxcclxuICAgIHJlbmRlckxpc3RDb21wb25lbnQsXHJcbiAgICByZWZyZXNoUmVuZGVyZWRMaXN0LFxyXG4gICAgcmVuZGVyQ29tcG9uZW50LFxyXG4gICAgcmVwbGFjZUNvbXBvbmVudFRhZ3MsXHJcbiAgICByZW5kZXJDb21wb25lbnRzLFxyXG4gICAgcmVnaXN0ZXJEb21SZWZzLFxyXG4gICAgcmVnaXN0ZXJFdmVudHMsXHJcbiAgICByZWdpc3RlclJlbW92ZVNlbGZFdmVudCxcclxuICAgIHJlZ2lzdGVyTWV0aG9kcyxcclxuICAgIHJlbmRlclNob3csXHJcbiAgICByZW5kZXJJZixcclxuICAgIGdlbmVyYXRlVGVtcGxhdGUsXHJcbiAgICByZW5kZXJUZW1wbGF0ZSxcclxuICAgIGdlbmVyYXRlU3R5bGUsXHJcbiAgICByZW5kZXJTdHlsZSxcclxuICAgIGFmdGVyUmVuZGVyLFxyXG4gICAgb25SZW5kZXIsXHJcbiAgICBiZWZvcmVSZW5kZXIsXHJcbiAgICByZW1vdmVPbkluaXRFbGVtZW50LFxyXG4gICAgcmVuZGVyT25Jbml0RWxlbWVudCxcclxuICAgIG9uSW5pdCxcclxuICAgIHR3ZWFrTGlmZUN5Y2xlLFxyXG4gICAgcmVuYW1lQ29tcG9uZW50cyxcclxuICAgIHJlbmRlcixcclxufSIsImNvbnN0IG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlmZUN5Y2xlLm9uSW5pdCgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG9uSW5pdDsiLCJjb25zdCBvblJlbmRlciA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgdGhpcy5yZW5kZXJTdHlsZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJUZW1wbGF0ZShjb25maWcpO1xyXG4gICAgdGhpcy5yZW5kZXJJZigpO1xyXG4gICAgdGhpcy5yZW5kZXJTaG93KCk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyTWV0aG9kcygpO1xyXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgdGhpcy5yZWdpc3RlclJlbW92ZVNlbGZFdmVudCgpO1xyXG4gICAgdGhpcy5yZWdpc3RlckRvbVJlZnMoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBvblJlbmRlcjsiLCJjb25zdCBwYXJlbnRDb21wb25lbnQgPSBmdW5jdGlvbihuPTApIHtcclxuICAgIGxldCByZXBlYXRTdHJpbmcgPSBmdW5jdGlvbihzdHI9JzAnLCBuPTApIHtcclxuICAgICAgICBsZXQgcmVwZWF0ZWRTdHJpbmcgPSBgYDtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlcGVhdGVkU3RyaW5nICs9IHN0cjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXBlYXRlZFN0cmluZztcclxuICAgIH1cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmJHtyZXBlYXRTdHJpbmcoJy5wYXJlbnQnLCBuKzEpfVxyXG4gICAgICAgIH0pKClcclxuICAgIGA7XHJcbiAgICBsZXQgcGFyZW50ID0gZXZhbChzY3JpcHQpO1xyXG5cclxuICAgIHJldHVybiBwYXJlbnQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGFyZW50Q29tcG9uZW50OyIsImNvbnN0IHJlZnJlc2hSZW5kZXJlZExpc3QgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50LCBpdGVtcywgbGlzdEl0ZW1Db21wb25lbnQsIG5vSXRlbXNDb21wb25lbnQpIHtcclxuICAgIHRhcmdldEVsZW1lbnQgPSAkKHRhcmdldEVsZW1lbnQpO1xyXG4gICAgdGFyZ2V0RWxlbWVudC5lbXB0eSgpO1xyXG5cclxuICAgIGlmKCEoaXRlbXMgJiYgaXRlbXMubGVuZ3RoKSkge1xyXG4gICAgICAgIGlmKG5vSXRlbXNDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgbm9JdGVtc0NvbXBvbmVudC5jcmVhdGVJbnN0YW5jZSh0aGlzKS5yZW5kZXIoe1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudCxcclxuICAgICAgICAgICAgICAgIHJlbmRlclR5cGU6ICdhcHBlbmQnLFxyXG4gICAgICAgICAgICB9KTsgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgbGV0IGxpc3RJdGVtID0gbGlzdEl0ZW1Db21wb25lbnQuY3JlYXRlSW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgbGlzdEl0ZW0uc2V0RGF0YShpdGVtKTtcclxuXHJcbiAgICAgICAgbGlzdEl0ZW0ucmVuZGVyKHtcclxuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudCxcclxuICAgICAgICAgICAgcmVuZGVyVHlwZTogJ2FwcGVuZCcsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZWZyZXNoUmVuZGVyZWRMaXN0O1xyXG4iLCJjb25zdCByZWdpc3RlckRvbVJlZnMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGlkIH0gPSB0aGlzO1xyXG4gICAgbGV0ICRyZWZzID0ge307XHJcbiAgICBsZXQgJHNlbGYgPSAkKGAjJHtpZH1gKTtcclxuICAgIGxldCBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkb21yZWZdYCk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKGVsZW1lbnRzW2ldKTtcclxuICAgICAgICBsZXQgZG9tcmVmID0gJGVsZW1lbnQuYXR0cignZG9tcmVmJyk7XHJcblxyXG4gICAgICAgICRyZWZzW2AkJHtkb21yZWZ9YF0gPSAkZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAkcmVmc1tgJHNlbGZgXSA9ICRzZWxmO1xyXG4gICAgdGhpcy4kcmVmcyA9ICRyZWZzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyRG9tUmVmczsiLCJjb25zdCBkZWJvdW5jZSA9IHJlcXVpcmUoJ2xvZGFzaC9kZWJvdW5jZScpO1xyXG5cclxuY29uc3QgcmVnaXN0ZXJFdmVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGlkLCBldmVudHMgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHNlbGYgPSAkKGAjJHtpZH1gKTtcclxuICAgIGxldCBkb21FdmVudHMgPSBbXHJcbiAgICAgICAgXCJibHVyLGZvY3VzLGxvYWQscmVzaXplLHNjcm9sbCx1bmxvYWQsYmVmb3JldW5sb2FkLFwiLFxyXG4gICAgICAgIFwiY2xpY2ssZGJsY2xpY2ssbW91c2Vkb3duLG1vdXNldXAsbW91c2Vtb3ZlLG1vdXNlb3ZlcixcIixcclxuICAgICAgICBcIm1vdXNlb3V0LG1vdXNlZW50ZXIsbW91c2VsZWF2ZSxjaGFuZ2Usc2VsZWN0LHN1Ym1pdCxcIixcclxuICAgICAgICBcImtleWRvd24sa2V5cHJlc3Msa2V5dXBcIlxyXG4gICAgXS5qb2luKFwiXCIpLnNwbGl0KFwiLFwiKTtcclxuXHJcbiAgICBsZXQgYWRkRXZlbnRUb0VsZW1lbnRzID0gZnVuY3Rpb24oZXZlbnROYW1lLCBlbGVtZW50cykge1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJChlbGVtZW50c1tpXSk7XHJcbiAgICAgICAgICAgIGxldCBmbk5hbWUgPSBlbGVtZW50LmF0dHIoYG9uLSR7ZXZlbnROYW1lfWApO1xyXG4gICAgICAgICAgICBsZXQgZm4gPSBldmVudHNbZm5OYW1lXTtcclxuICAgICAgICAgICAgbGV0IGRlYm91bmNlQXR0cmlidXRlID0gZWxlbWVudC5hdHRyKCdkZWJvdW5jZScpICsgJyc7XHJcbiAgICAgICAgICAgIGxldCBbIGV2dCwgd2FpdCBdID0gZGVib3VuY2VBdHRyaWJ1dGUuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgZXZ0ID0gZXZ0ICsgJycudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgd2FpdCA9IHBhcnNlSW50KHdhaXQgKyAnJy50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgd2FpdCA9IChpc05hTih3YWl0KSB8fCB3YWl0IDwgMCkgPyAwIDogd2FpdDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cdFx0XHRcdFx0XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cihgb24tJHtldmVudE5hbWV9YCk7XHRcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyKCdkZWJvdW5jZScpO1x0XHJcblxyXG4gICAgICAgICAgICBpZihldnQgPT0gZXZlbnROYW1lICYmIHdhaXQgPiAwICkge1xyXG4gICAgICAgICAgICAgICAgZm4gPSBkZWJvdW5jZShmbiwgd2FpdCwgeyBcclxuICAgICAgICAgICAgICAgICAgICBsZWFkaW5nOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhaWxpbmc6IHRydWUgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZuLmJpbmQodGhpcykpO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cdFx0XHJcbiAgICAgICAgICAgIGVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZuLmJpbmQodGhpcykpO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHJcbiAgICAgICAgfVx0XHRcdFx0XHJcbiAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8ZG9tRXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGRvbUV2ZW50c1tpXTtcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSAkc2VsZi5maW5kKGBbb24tJHtldmVudE5hbWV9XWApO1xyXG5cclxuICAgICAgICBpZigkc2VsZi5hdHRyKGBvbi0ke2V2ZW50TmFtZX1gKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50cyA9IChlbGVtZW50cyAmJiBlbGVtZW50cy5sZW5ndGgpID8gWy4uLmVsZW1lbnRzLCAkc2VsZl0gOiBbJHNlbGZdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYWRkRXZlbnRUb0VsZW1lbnRzKGV2ZW50TmFtZSwgZWxlbWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlckV2ZW50czsiLCJjb25zdCByZWdpc3Rlck1ldGhvZHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IG1ldGhvZHMgfSA9IHRoaXM7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1ldGhvZHMpO1xyXG5cclxuICAgIGZvcihsZXQgaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcclxuICAgICAgICBsZXQgZm4gPSBtZXRob2RzW2tleV07XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWV0aG9kc1trZXldID0gZm4uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1ldGhvZHMgPSBtZXRob2RzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyTWV0aG9kczsiLCJjb25zdCBDb21wb25lbnRDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50Q29sbGVjdGlvbi5qcycpO1xyXG5cclxuY29uc3QgcmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGxldCB7IGlkIH0gPSBzZWxmO1xyXG4gICAgbGV0ICRzZWxmID0gJChgIyR7aWR9YCk7XHJcbiAgICBcclxuICAgICRzZWxmLm9uKCdET01Ob2RlUmVtb3ZlZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBDb21wb25lbnRDb2xsZWN0aW9uLmZpbHRlcigpOyAgICAgICAgXHJcbiAgICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlclJlbW92ZVNlbGZFdmVudDsiLCJjb25zdCByZW1vdmVPbkluaXRFbGVtZW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBpZCB9ID0gdGhpcztcclxuICAgIFxyXG4gICAgJChgW29uX2luaXRfJHtpZH1dYCkucmVtb3ZlKCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlT25Jbml0RWxlbWVudDsiLCJjb25zdCB7IERhc2hpZnlTbmFrZUNhc2UgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCByZW5hbWVDb21wb25lbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG5cclxuICAgIGZvcihsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldO1xyXG5cclxuICAgICAgICBjb21wb25lbnQubmFtZSA9IERhc2hpZnlTbmFrZUNhc2Uoa2V5KTtcclxuICAgICAgICBjb21wb25lbnRzW2tleV0gPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5hbWVDb21wb25lbnRzOyIsImNvbnN0IHsgSXNUaGVuYWJsZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcblxyXG5jb25zdCByZW5kZXIgPSBmdW5jdGlvbiAoY29uZmlnID0ge30pIHtcclxuICAgIGxldCBoaWVyYXJjaHkgPSB0aGlzLmhpZXJhcmNoeSgpLmpvaW4oXCIgPiBcIik7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJDb25maWcgPSBjb25maWc7XHJcbiAgICB0aGlzLnJlbmFtZUNvbXBvbmVudHMoKTtcclxuICAgIHRoaXMudHdlYWtMaWZlQ3ljbGUoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCB7IGJlZm9yZVJlbmRlciwgb25Jbml0LCB9ID0gdGhpcy5saWZlQ3ljbGU7XHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xyXG5cclxuICAgICAgICBpZiAob25Jbml0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Jbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZWZvcmVSZW5kZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSB0aGlzLmJlZm9yZVJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKElzVGhlbmFibGUocmV0dXJuVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblJlbmRlcihjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZnRlclJlbmRlcigpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25SZW5kZXIoY29uZmlnKTtcclxuICAgICAgICB0aGlzLmFmdGVyUmVuZGVyKCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IFtcclxuICAgICAgICAgICAgaGllcmFyY2h5LFxyXG4gICAgICAgICAgICBlLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGUuc3RhY2ssXHJcbiAgICAgICAgXS5qb2luKFwiXFxuXCIpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyOyIsImNvbnN0IHJlbmRlckNvbXBvbmVudCA9IGZ1bmN0aW9uKHJlcGxhY2VkKSB7XHJcbiAgICBsZXQgbGlzdEV4cHJlc3Npb24gPSByZXBsYWNlZC5hdHRyaWJ1dGVzWydkYXRhLWxpc3QnXTtcclxuXHJcbiAgICBpZihsaXN0RXhwcmVzc2lvbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxpc3RDb21wb25lbnQocmVwbGFjZWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXJTaW5ndWxhckNvbXBvbmVudChyZXBsYWNlZCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyQ29tcG9uZW50OyIsImNvbnN0IHJlbmRlckNvbXBvbmVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGNvbXBvbmVudHMpO1xyXG5cclxuICAgIGlmKCFrZXlzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCByZXBsYWNlZENvbXBvbmVudFRhZ3MgPSB0aGlzLnJlcGxhY2VDb21wb25lbnRUYWdzKCk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8cmVwbGFjZWRDb21wb25lbnRUYWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJlcGxhY2VkID0gcmVwbGFjZWRDb21wb25lbnRUYWdzW2ldO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckNvbXBvbmVudChyZXBsYWNlZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyQ29tcG9uZW50czsiLCJjb25zdCByZW5kZXJJZiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQsIGRhdGEgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHNlbGYgPSAkKGAjJHtpZH1gKTtcclxuICAgIGxldCByZW5kZXJXaGlsZUV4aXN0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkYXRhLWlmXWApO1xyXG5cclxuICAgICAgICBpZighZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0ICRlbGVtZW50MCA9ICQoZWxlbWVudHNbMF0pO1xyXG4gICAgICAgIGxldCBleHByZXNzaW9uID0gJGVsZW1lbnQwLmF0dHIoJ2RhdGEtaWYnKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2NyaXB0ID0gYFxyXG4gICAgICAgIChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgeyAke09iamVjdC5rZXlzKGRhdGEpLmpvaW4oXCIsXCIpfSB9ID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAke2V4cHJlc3Npb259XHJcbiAgICAgICAgfSkoKVxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgZXhwcmVzc2lvbiA9IEJvb2xlYW4oZXZhbChzY3JpcHQpKTtcclxuXHJcbiAgICAgICAgaWYoZXhwcmVzc2lvbiA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICRlbGVtZW50MC5yZW1vdmVBdHRyKCdkYXRhLWlmJyk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBpZihleHByZXNzaW9uICE9IHRydWUpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQwLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkYXRhLWlmXWApO1xyXG5cclxuICAgICAgICBpZihlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVuZGVyV2hpbGVFeGlzdHMoKTtcclxuICAgICAgICB9XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJXaGlsZUV4aXN0cygpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlcklmOyIsImNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG5jb25zdCB7IEdlbmVyYXRlUmFuZG9tSWQgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCByZW5kZXJMaXN0Q29tcG9uZW50ID0gZnVuY3Rpb24ocmVwbGFjZWQpIHtcclxuICAgIGxldCB7IGF0dHJpYnV0ZXMsIGlkIH0gPSByZXBsYWNlZDtcclxuICAgIGxldCBiaW5kRXhwcmVzc2lvbiA9IGF0dHJpYnV0ZXNbJ2RhdGEtYmluZCddO1xyXG4gICAgbGV0IGxpc3RFeHByZXNzaW9uID0gYXR0cmlidXRlc1snZGF0YS1saXN0J107XHJcbiAgICBsZXQgW2N1cnJlbnRJdGVtLCBpdGVtc10gPSBsaXN0RXhwcmVzc2lvbi5zcGxpdChcIiBpbiBcIik7XHJcbiAgICAgICAgY3VycmVudEl0ZW0gPSBjdXJyZW50SXRlbS50cmltKCk7XHJcbiAgICAgICAgaXRlbXMgPSBpdGVtcy50cmltKCk7XHJcbiAgICBsZXQgbGlzdEl0ZW1zID0gdGhpcy5kYXRhW2l0ZW1zXTtcclxuXHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snY29tcG9uZW50LWFsaWFzJ107XHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snZGF0YS1saXN0J107XHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snZGF0YS1iaW5kJ107XHJcblxyXG4gICAgaWYoIShsaXN0SXRlbXMgJiYgbGlzdEl0ZW1zLmxlbmd0aCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFsgXHJcbiAgICAgICAgICAgIGAnJHtpdGVtc30nIGlzIGVtcHR5IG9yIG5vdCBhbiBhcnJheSBvciB1bmRlZmluZWQuYFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVx0XHRcclxuICAgIGxldCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpOyBcclxuXHJcbiAgICBsZXQgY29uZmlnID0ge1xyXG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IHRhcmdldEVsZW1lbnQucGFyZW50Tm9kZSxcclxuICAgICAgICByZW5kZXJUeXBlOiAnYXBwZW5kJyxcclxuICAgIH1cclxuICAgIGxldCByZW5kZXJMaXN0SXRlbSA9IGZ1bmN0aW9uKHJlcGxhY2VkLCBjb21wb25lbnREYXRhLCBjb25maWcpIHtcclxuICAgICAgICBsZXQgeyBhdHRyaWJ1dGVzLCBjb21wb25lbnQgfSA9IHJlcGxhY2VkO1xyXG4gICAgICAgICAgICBjb21wb25lbnQgPSBPYmplY3QuY3JlYXRlKGNvbXBvbmVudCk7XHJcblxyXG5cclxuICAgICAgICBjb21wb25lbnRcclxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcylcclxuICAgICAgICAgICAgLnNldElkKEdlbmVyYXRlUmFuZG9tSWQoJ2NpZCcpKVxyXG4gICAgICAgICAgICAuc2V0UGFyZW50KHRoaXMpXHJcbiAgICAgICAgICAgIC5zZXREYXRhKGNvbXBvbmVudERhdGEpXHJcbiAgICAgICAgICAgIC5yZW5kZXIoY29uZmlnKTtcdFxyXG5cclxuICAgIH0uYmluZCh0aGlzKTtcclxuICAgIGxldCBleHRyYWN0Q29tcG9uZW50RGF0YSA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50RGF0YSA9IHt9O1xyXG4gICAgICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHsgXHJcbiAgICAgICAgICAgICAgICBsZXQgJHtiaW5kRXhwcmVzc2lvbn0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICR7YmluZEV4cHJlc3Npb259XHJcbiAgICAgICAgICAgIH0pKClcclxuICAgICAgICBgO1xyXG4gICAgICAgIGxldCBkYXRhID0gZXZhbChzY3JpcHQpO1xyXG5cclxuICAgICAgICBpZihjdXJyZW50SXRlbSA9PSBiaW5kRXhwcmVzc2lvbikge1xyXG4gICAgICAgICAgICBjb21wb25lbnREYXRhW2N1cnJlbnRJdGVtXSA9IGRhdGE7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgaWYoY3VycmVudEl0ZW0gIT0gYmluZEV4cHJlc3Npb24pIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb21wb25lbnREYXRhLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcihsZXQgaT0wOyBpPGxpc3RJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjb21wb25lbnREYXRhID0gZXh0cmFjdENvbXBvbmVudERhdGEobGlzdEl0ZW1zW2ldKTtcclxuICAgICAgICAgICAgY29tcG9uZW50RGF0YS5pbmRleCA9IGk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHJlbmRlckxpc3RJdGVtKHJlcGxhY2VkLCBjb21wb25lbnREYXRhLCBjb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgICQodGFyZ2V0RWxlbWVudCkucmVtb3ZlKCk7XHRcdFx0XHRcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlckxpc3RDb21wb25lbnQ7IiwiY29uc3QgeyBJbnRlcnBvbGF0ZVRleHQsIFNldERlZmF1bHRDb25maWcgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG5cclxuY29uc3QgZ2VuZXJhdGVUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRlbXBsYXRlLCBkYXRhLCBpZCkge1xyXG4gICAgbGV0ICR0ZW1wbGF0ZTA7XHJcblxyXG4gICAgdGVtcGxhdGUgPSAkLnBhcnNlSFRNTChJbnRlcnBvbGF0ZVRleHQoZGF0YSwgdGVtcGxhdGUpKTtcclxuICAgICR0ZW1wbGF0ZTAgPSAkKHRlbXBsYXRlWzBdKTtcclxuXHJcbiAgICBpZih0ZW1wbGF0ZS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgLm9uSW5pdCgpIGRvIG5vdCBoYXZlIGEgdGVtcGxhdGUuYCxcclxuICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuICAgIGlmKHRlbXBsYXRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgYC5vbkluaXQoKSB0ZW1wbGF0ZSBtdXN0IGJlIGVuY2xvc2VkIGluIGFgLFxyXG4gICAgICAgICAgICBgc2luZ2xlIGJsb2NrLWxldmVsIGVsZW1lbnQuYCxcclxuICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuICAgIGlmKHRlbXBsYXRlWzBdLm5vZGVUeXBlICE9PSAxKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgIGAub25Jbml0KCkgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgJHRlbXBsYXRlMC5hdHRyKGBvbl9pbml0XyR7aWR9YCwgJycpO1xyXG4gICAgICAgIFxyXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJPbkluaXRFbGVtZW50ID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcclxuICAgIGxldCB7IGRhdGEsIGlkIH0gPSB0aGlzO1xyXG4gICAgdGVtcGxhdGUgPSBnZW5lcmF0ZVRlbXBsYXRlKHRlbXBsYXRlLCBkYXRhLCBpZCk7XHJcbiAgICBsZXQgeyByZW5kZXJDb25maWcgfSA9IHRoaXM7XHJcbiAgICBsZXQgZGVmYXVsdENvbmZpZyA9IHtcclxuICAgICAgICB0YXJnZXRFbGVtZW50OiBkb2N1bWVudC5ib2R5LCBcclxuICAgICAgICByZW5kZXJUeXBlOiAncmVwbGFjZVdpdGgnLFxyXG4gICAgfTtcclxuICAgIGxldCB7IHRhcmdldEVsZW1lbnQsIHJlbmRlclR5cGUgfSA9IFNldERlZmF1bHRDb25maWcoZGVmYXVsdENvbmZpZywgcmVuZGVyQ29uZmlnKTtcclxuXHJcbiAgICAkKHRhcmdldEVsZW1lbnQpW3JlbmRlclR5cGVdKHRlbXBsYXRlKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJPbkluaXRFbGVtZW50OyIsImNvbnN0IHJlbmRlclNob3cgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGlkLCBkYXRhIH0gPSB0aGlzO1xyXG4gICAgbGV0ICRzZWxmID0gJChgIyR7aWR9YCk7XHJcbiAgICBsZXQgcmVuZGVyV2hpbGVFeGlzdHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSAkc2VsZi5maW5kKGBbZGF0YS1zaG93XWApO1xyXG5cclxuICAgICAgICBpZighZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0ICRlbGVtZW50MCA9ICQoZWxlbWVudHNbMF0pO1xyXG4gICAgICAgIGxldCBleHByZXNzaW9uID0gJGVsZW1lbnQwLmF0dHIoJ2RhdGEtc2hvdycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB7ICR7T2JqZWN0LmtleXMoZGF0YSkuam9pbihcIixcIil9IH0gPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICR7ZXhwcmVzc2lvbn1cclxuICAgICAgICB9KSgpXHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYoIWV2YWwoc2NyaXB0KSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudDAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkZWxlbWVudDAucmVtb3ZlQXR0cignZGF0YS1zaG93Jyk7XHJcbiAgICAgICAgZWxlbWVudHMgPSAkc2VsZi5maW5kKGBbZGF0YS1zaG93XWApO1xyXG5cclxuICAgICAgICBpZihlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVuZGVyV2hpbGVFeGlzdHMoKTtcclxuICAgICAgICB9XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJXaGlsZUV4aXN0cygpO1x0XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJTaG93OyIsImNvbnN0IHsgR2VuZXJhdGVSYW5kb21JZCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlbmRlclNpbmd1bGFyQ29tcG9uZW50ID0gZnVuY3Rpb24gKHJlcGxhY2VkKSB7XHJcbiAgICBsZXQgeyBpZCwgY29tcG9uZW50LCBhdHRyaWJ1dGVzIH0gPSByZXBsYWNlZDtcclxuICAgIGNvbXBvbmVudCA9IE9iamVjdC5jcmVhdGUoY29tcG9uZW50KTtcclxuICAgIGxldCBjb21wb25lbnREYXRhO1xyXG4gICAgbGV0IGRhdGFFeHByZXNzaW9uID0gYXR0cmlidXRlc1snZGF0YS1iaW5kJ107XHJcblxyXG4gICAgaWYoZGF0YUV4cHJlc3Npb24pIHtcclxuICAgICAgICBsZXQgeyBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBnZW5lcmF0ZUNvbXBvbmVudERhdGEgPSBmdW5jdGlvbihkYXRhRXhwcmVzc2lvbiwgZGF0YSkge1xyXG4gICAgICAgICAgICBkYXRhRXhwcmVzc2lvbiA9IGRhdGFFeHByZXNzaW9uLnRyaW0oKTtcclxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudERhdGE7XHJcbiAgICAgICAgICAgIGxldCBoYXNFcXVhbFNpZ24gPSBkYXRhRXhwcmVzc2lvbi5zZWFyY2goJ1s9XScpICsgMTtcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAoaGFzRXF1YWxTaWduKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVFeHByZXNzaW9uID0gZGF0YUV4cHJlc3Npb24uc3BsaXQoXCI9XCIpWzBdLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHsgJHtPYmplY3Qua2V5cyhkYXRhKS5qb2luKFwiLCBcIil9IH0gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHtkYXRhRXhwcmVzc2lvbn07XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHt2YWx1ZUV4cHJlc3Npb259O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnREYXRhID0gZXZhbChzY3JpcHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaGFzRXF1YWxTaWduKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gZGF0YUV4cHJlc3Npb247XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnREYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnREYXRhW2tleV0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodHlwZW9mIGNvbXBvbmVudERhdGEgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnREYXRhID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY29tcG9uZW50RGF0YSA9IGdlbmVyYXRlQ29tcG9uZW50RGF0YShkYXRhRXhwcmVzc2lvbiwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlIGF0dHJpYnV0ZXNbJ2NvbXBvbmVudC1hbGlhcyddO1xyXG4gICAgZGVsZXRlIGF0dHJpYnV0ZXNbJ2RhdGEtbGlzdCddO1xyXG4gICAgZGVsZXRlIGF0dHJpYnV0ZXNbJ2RhdGEtYmluZCddO1xyXG5cclxuICAgIGNvbXBvbmVudFxyXG4gICAgICAgIC5zZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpXHJcbiAgICAgICAgLnNldElkKEdlbmVyYXRlUmFuZG9tSWQoJ2NpZCcpKVxyXG4gICAgICAgIC5zZXRQYXJlbnQodGhpcyk7XHJcblxyXG4gICAgaWYoY29tcG9uZW50RGF0YSkge1xyXG4gICAgICAgIGNvbXBvbmVudC5zZXREYXRhKGNvbXBvbmVudERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudC5yZW5kZXIoe1xyXG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSxcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlclNpbmd1bGFyQ29tcG9uZW50OyIsImNvbnN0IHsgc3R5bGVFeGlzdHMgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlbmRlclN0eWxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBzdHlsZUlkLCBzdHlsZSB9ID0gdGhpcztcclxuXHJcbiAgICBpZighc3R5bGUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZighc3R5bGVFeGlzdHMoc3R5bGVJZCkpIHtcclxuICAgICAgICBsZXQgaGVhZDAgPSAkKCdoZWFkJylbMF07XHJcbiAgICAgICAgbGV0ICRoZWFkMCA9ICQoaGVhZDApO1xyXG5cclxuICAgICAgICAkaGVhZDAuYXBwZW5kKHRoaXMuZ2VuZXJhdGVTdHlsZSgpKTtcclxuICAgIH1cdFx0XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJTdHlsZTtcclxuIiwiY29uc3QgeyBTZXREZWZhdWx0Q29uZmlnIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgcmVuZGVyVGVtcGxhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuICAgIGxldCB7IGlkIH0gPSB0aGlzO1xyXG4gICAgbGV0IGRlZmF1bHRDb25maWcgPSB7XHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudDogZG9jdW1lbnQuYm9keSwgXHJcbiAgICAgICAgcmVuZGVyVHlwZTogJ3JlcGxhY2VXaXRoJyxcclxuICAgIH07XHJcbiAgICBsZXQgeyB0YXJnZXRFbGVtZW50LCByZW5kZXJUeXBlIH0gPSBTZXREZWZhdWx0Q29uZmlnKGRlZmF1bHRDb25maWcsIGNvbmZpZyk7XHJcbiAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLmdlbmVyYXRlVGVtcGxhdGUoKTtcclxuICAgIGxldCAkdGFyZ2V0RWxlbWVudCA9ICQodGFyZ2V0RWxlbWVudCk7XHJcblxyXG4gICAgaWYoISR0YXJnZXRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgJ3RhcmdldEVsZW1lbnQnIGRvZXMgbm90IGV4aXN0cy5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYocmVuZGVyVHlwZSA9PSAncmVwbGFjZVdpdGgnKSB7XHJcbiAgICAgICAgbGV0ICRvbkluaXRFbGVtZW50ID0gJChgW29uX2luaXRfJHtpZH1dYCk7XHJcblxyXG4gICAgICAgIGlmKCRvbkluaXRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRvbkluaXRFbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAkdGFyZ2V0RWxlbWVudFtyZW5kZXJUeXBlXSh0ZW1wbGF0ZSk7XHRcdFxyXG59XHRcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyVGVtcGxhdGU7IiwiY29uc3QgeyBHZW5lcmF0ZVJhbmRvbUlkLCBBdHRyaWJ1dGVzRXh0cmFjdG9yIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgcmVwbGFjZUNvbXBvbmVudFRhZ3MgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcbiAgICBsZXQgeyAkc2VsZiB9ID0gdGhpcy4kcmVmcztcclxuICAgIGxldCByZXBsYWNlZENvbXBvbmVudFRhZ3MgPSBbXTtcclxuICAgIGxldCBmaW5kQ29tcG9uZW50cyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSBbXHJcbiAgICAgICAgICAgIC4uLiRzZWxmLmZpbmQobmFtZSksIFxyXG4gICAgICAgICAgICAuLi4kc2VsZi5maW5kKGBbY29tcG9uZW50LWFsaWFzPVwiJHtuYW1lfVwiXWApXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlcGxhY2UgPSBmdW5jdGlvbihlbGVtZW50cywgY29tcG9uZW50KSB7XHJcbiAgICAgICAgbGV0IGlkID0gR2VuZXJhdGVSYW5kb21JZCgncmlkJyk7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQwID0gZWxlbWVudHNbMF07XHJcbiAgICAgICAgbGV0IHRhYmxlRWxlbWVudHMgPSBcInRoZWFkLHRib2R5LHRmb290LHRyLHRoLHRkXCI7XHJcbiAgICAgICAgbGV0IHRhZ05hbWUgPSBlbGVtZW50MC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IHRhZyA9IChcclxuICAgICAgICAgICAgdGFibGVFbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiLFwiKVxyXG4gICAgICAgICAgICAgICAgLmluY2x1ZGVzKHRhZ05hbWUpXHJcbiAgICAgICAgKSA/IHRhZ05hbWUgOiBcInRlbXBvcmFyeVwiO1xyXG4gICAgICAgIGxldCAkZWxlbWVudDAgPSAkKGVsZW1lbnQwKTtcclxuXHJcbiAgICAgICAgcmVwbGFjZWRDb21wb25lbnRUYWdzLnB1c2goe1xyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgY29tcG9uZW50OiBPYmplY3QuY3JlYXRlKGNvbXBvbmVudCksXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZXNFeHRyYWN0b3IoZWxlbWVudDApLmV4dHJhY3QoKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAkZWxlbWVudDAucmVwbGFjZVdpdGgoYDwke3RhZ30gaWQ9XCIke2lkfVwiLz5gKTtcclxuICAgIH1cclxuICAgIGxldCByZXBsYWNlV2hpbGVFeGlzdHMgPSBmdW5jdGlvbihjb21wb25lbnQpIHtcclxuICAgICAgICBsZXQgeyBuYW1lIH0gPSBjb21wb25lbnQ7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gZmluZENvbXBvbmVudHMobmFtZSk7XHJcblxyXG4gICAgICAgIGlmKCFlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXBsYWNlKGVsZW1lbnRzLCBjb21wb25lbnQpO1xyXG5cclxuICAgICAgICBlbGVtZW50cyA9IGZpbmRDb21wb25lbnRzKG5hbWUpO1xyXG5cclxuICAgICAgICBpZighZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVwbGFjZVdoaWxlRXhpc3RzKGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV07XHJcblxyXG4gICAgICAgIGlmKCFjb21wb25lbnQpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcGxhY2VXaGlsZUV4aXN0cyhjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXBsYWNlZENvbXBvbmVudFRhZ3M7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVwbGFjZUNvbXBvbmVudFRhZ3M7IiwiY29uc3Qgc2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uKERvbUF0dHJpYnV0ZXMgPSB7fSkge1xyXG4gICAgbGV0IHsgYXR0cmlidXRlcyB9ID0gdGhpcztcclxuXHJcbiAgICBpZih0eXBlb2YgRG9tQXR0cmlidXRlcyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBEb21BdHRyaWJ1dGVzID0ge307XHJcbiAgICB9XHJcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIERvbUF0dHJpYnV0ZXMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXM7IiwiY29uc3QgeyBNZXJnZU9iamVjdCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHNldERhdGEgPSBmdW5jdGlvbihwYXNzZWREYXRhKSB7XHJcbiAgICBsZXQgeyBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IE1lcmdlT2JqZWN0KHBhc3NlZERhdGEsIGRhdGEpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59XHRcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2V0RGF0YTsiLCJjb25zdCB7IEdlbmVyYXRlUmFuZG9tSWQgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCBzZXRJZCA9IGZ1bmN0aW9uKGlkPUdlbmVyYXRlUmFuZG9tSWQoJ2NpZCcpKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2V0SWQ7IiwiY29uc3Qgc2V0UGFyZW50ID0gZnVuY3Rpb24ocGFyZW50KSB7XHJcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXRQYXJlbnQ7IiwiY29uc3QgdHdlYWtMaWZlQ3ljbGUgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGxpZmVDeWNsZSB9ID0gdGhpcztcclxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobGlmZUN5Y2xlKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgbGV0IGZuID0gbGlmZUN5Y2xlW2tleV07XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlmZUN5Y2xlW2tleV0gPSBmbi5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlmZUN5Y2xlID0gbGlmZUN5Y2xlO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHR3ZWFrTGlmZUN5Y2xlOyIsImNvbnN0IEF0dHJpYnV0ZXNFeHRyYWN0b3IgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0bGV0IGV4dHJhY3QgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBhdHRyaWJ1dGVzID0ge307XHJcblx0XHRsZXQgbm9kZU1hcCA9IHRoaXMuZWxlbWVudC5hdHRyaWJ1dGVzO1xyXG5cclxuXHRcdGZvcihsZXQgaT0wOyBpPG5vZGVNYXAubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0bGV0IHsgbm9kZU5hbWUsIG5vZGVWYWx1ZSB9ID0gbm9kZU1hcFtpXTtcclxuXHRcdFx0XHJcblx0XHRcdGF0dHJpYnV0ZXNbbm9kZU5hbWVdID0gbm9kZVZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhdHRyaWJ1dGVzO1xyXG5cdH07XHJcblx0bGV0IGdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdGxldCBhdHRyaWJ1dGVzID0gdGhpcy5leHRyYWN0KCk7XHJcblxyXG5cdFx0cmV0dXJuIGF0dHJpYnV0ZXNbbmFtZV07XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGVsZW1lbnQsXHJcblx0XHRleHRyYWN0LFxyXG5cdFx0Z2V0LFxyXG5cdH07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXR0cmlidXRlc0V4dHJhY3RvcjsiLCJjb25zdCBEYXNoaWZ5U25ha2VDYXNlID0gZnVuY3Rpb24oc3RyKSB7XHJcblx0bGV0IGNodW5rcyA9IHN0ci5zcGxpdCgvKFtBLVpdKS8pO1xyXG5cclxuXHRpZihjaHVua3NbMF09PVwiXCIpIHtcclxuXHRcdGNodW5rcy5zaGlmdCgpO1xyXG5cdH1cclxuXHRpZigvXihbQS1aXSl7MX0kLy50ZXN0KGNodW5rc1swXSkpIHtcclxuXHRcdGNodW5rc1swXSA9IGNodW5rc1swXS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHRzdHIgPSBjaHVua3Muam9pbihcIlwiKTtcclxuXHRjaHVua3MgPSBzdHIuc3BsaXQoLyhbQS1aXSkvKTtcclxuXHRjaHVua3MgPSBjaHVua3MubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdGlmKC9eKFtBLVpdKXsxfSQvLnRlc3QoaXRlbSkpIHtcclxuXHRcdFx0aXRlbSA9IGAtJHtpdGVtfWA7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBjaHVua3Muam9pbihcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hpZnlTbmFrZUNhc2U7IiwiY29uc3QgR2VuZXJhdGVSYW5kb21OdW1iZXIgPSByZXF1aXJlKCcuL0dlbmVyYXRlUmFuZG9tTnVtYmVyLmpzJyk7XHJcblxyXG5jb25zdCBHZW5lcmF0ZVJhbmRvbUlkID0gZnVuY3Rpb24ocHJlZml4ID0gXCJybmRcIikge1xyXG5cdGxldCBpZCA9IFtcclxuXHRcdHByZWZpeCxcclxuXHRcdEdlbmVyYXRlUmFuZG9tTnVtYmVyKDEwMDAsIDk5OTkpLFxyXG5cdFx0KERhdGUubm93KCkgKyAnJykuc3Vic3RyKDUpLFxyXG5cdF0uam9pbihcIl9cIik7XHJcblxyXG5cdHJldHVybiBpZDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHZW5lcmF0ZVJhbmRvbUlkOyIsImNvbnN0IEdlbmVyYXRlUmFuZG9tTnVtYmVyID0gZnVuY3Rpb24obWluPTAsIG1heD05KSB7XHJcblx0bWluID0gTWF0aC5jZWlsKG1pbik7XHJcblx0bWF4ID0gTWF0aC5mbG9vcihtYXgpO1xyXG5cclxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHZW5lcmF0ZVJhbmRvbU51bWJlcjsiLCJjb25zdCBUcmltV2hpdGVTcGFjZSA9IHJlcXVpcmUoJy4vVHJpbVdoaXRlU3BhY2UuanMnKTtcclxuXHJcbmNvbnN0IHJlcGxhY2UgPSBmdW5jdGlvbihzdHIsIGZpbmQsIHJlcGxhY2UpIHtcclxuXHRyZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChgKCR7ZmluZH0pYCwgJ2cnKSwgcmVwbGFjZSk7IFxyXG59XHJcblxyXG5jb25zdCBJbnRlcnBvbGF0ZVRleHQgPSBmdW5jdGlvbihkYXRhLCB0ZXh0KSB7XHJcblx0aWYodHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSB7XHJcblx0XHRyZXR1cm4gdGV4dDtcclxuXHR9XHJcblxyXG5cdHRleHQgPSByZXBsYWNlKHRleHQsICd7eycsICckeycpO1xyXG5cdHRleHQgPSByZXBsYWNlKHRleHQsICd9fScsICd9Jyk7O1xyXG5cclxuXHRsZXQgZm5Cb2R5ID0gYFxyXG5cdFx0bGV0IHsgJHtPYmplY3Qua2V5cyhkYXRhKS5qb2luKFwiLCBcIil9IH0gPSBkYXRhO1xyXG5cclxuXHRcdHJldHVybiBcXGAke3RleHR9XFxgO1xyXG5cdGA7XHJcblx0bGV0IGZuID0gbmV3IEZ1bmN0aW9uKCdkYXRhJywgZm5Cb2R5KTtcclxuXHRcclxuXHRyZXR1cm4gVHJpbVdoaXRlU3BhY2UoZm4oZGF0YSkpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEludGVycG9sYXRlVGV4dDsiLCJjb25zdCBJc1RoZW5hYmxlID0gZnVuY3Rpb24oZm4pIHtcclxuICAgIGlmKCFmbikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaXNQcm9taXNlID0gZm4gaW5zdGFuY2VvZiBQcm9taXNlO1xyXG4gICAgbGV0IGlzQXN5bmMgPSBmbi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXN5bmNGdW5jdGlvbic7XHJcbiAgICBcclxuICAgIHJldHVybiBpc1Byb21pc2UgfHwgaXNBc3luYztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJc1RoZW5hYmxlOyIsImNvbnN0IE1lcmdlT2JqZWN0ID0gZnVuY3Rpb24oZG9taW5hbnRPYmplY3QsIHdlYWtPYmplY3QpIHtcclxuXHRsZXQgd2Vha09iamVjdEtleXMgPSBPYmplY3Qua2V5cyh3ZWFrT2JqZWN0KTtcclxuXHJcblx0Zm9yKGxldCBpPTA7IGk8d2Vha09iamVjdEtleXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBrZXkgPSB3ZWFrT2JqZWN0S2V5c1tpXTtcclxuXHJcblx0XHRpZihkb21pbmFudE9iamVjdFtrZXldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZG9taW5hbnRPYmplY3Rba2V5XSA9IHdlYWtPYmplY3Rba2V5XTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBkb21pbmFudE9iamVjdDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZXJnZU9iamVjdDsiLCJjb25zdCBTZXREZWZhdWx0Q29uZmlnID0gZnVuY3Rpb24oZGVmYXVsdENvbmZpZywgc3VwcGxpZWRDb25maWcpIHtcclxuXHRsZXQgZGVmYXVsdENvbmZpZ0tleXMgPSBPYmplY3Qua2V5cyhkZWZhdWx0Q29uZmlnKTtcclxuXHJcblx0Zm9yKGxldCBpPTA7IGk8ZGVmYXVsdENvbmZpZ0tleXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBrZXkgPSBkZWZhdWx0Q29uZmlnS2V5c1tpXTtcclxuXHJcblx0XHRpZihzdXBwbGllZENvbmZpZ1trZXldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0c3VwcGxpZWRDb25maWdba2V5XSA9IGRlZmF1bHRDb25maWdba2V5XTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBzdXBwbGllZENvbmZpZztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZXREZWZhdWx0Q29uZmlnOyIsImNvbnN0IFRyaW1XaGl0ZVNwYWNlID0gZnVuY3Rpb24oc3RyKSB7XHJcblx0bGV0IGNodW5rcyA9IHN0ci5zcGxpdCgvXFxzLyk7XHJcblx0bGV0IGNoYXJzID0gW107XHJcblxyXG5cdGZvcihsZXQgaT0wOyBpPGNodW5rcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IGNodW5rID0gY2h1bmtzW2ldO1xyXG5cclxuXHRcdGlmKGNodW5rPT1cIlwiKSB7XHJcblx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNoYXJzLnB1c2goY2h1bmspO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNoYXJzLmpvaW4oXCIgXCIpO1x0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHJpbVdoaXRlU3BhY2U7IiwiY29uc3QgQXR0cmlidXRlc0V4dHJhY3RvciA9IHJlcXVpcmUoJy4vQXR0cmlidXRlc0V4dHJhY3Rvci5qcycpO1xyXG5jb25zdCBEYXNoaWZ5U25ha2VDYXNlID0gcmVxdWlyZSgnLi9EYXNoaWZ5U25ha2VDYXNlLmpzJyk7XHJcbmNvbnN0IEdlbmVyYXRlUmFuZG9tSWQgPSByZXF1aXJlKCcuL0dlbmVyYXRlUmFuZG9tSWQuanMnKTtcclxuY29uc3QgR2VuZXJhdGVSYW5kb21OdW1iZXIgPSByZXF1aXJlKCcuL0dlbmVyYXRlUmFuZG9tTnVtYmVyLmpzJyk7XHJcbmNvbnN0IEludGVycG9sYXRlVGV4dCA9IHJlcXVpcmUoJy4vSW50ZXJwb2xhdGVUZXh0LmpzJyk7XHJcbmNvbnN0IElzVGhlbmFibGUgPSByZXF1aXJlKCcuL0lzVGhlbmFibGUuanMnKTtcclxuY29uc3QgTWVyZ2VPYmplY3QgPSByZXF1aXJlKCcuL01lcmdlT2JqZWN0LmpzJyk7XHJcbmNvbnN0IFNldERlZmF1bHRDb25maWcgPSByZXF1aXJlKCcuL1NldERlZmF1bHRDb25maWcuanMnKTtcclxuY29uc3QgVHJpbVdoaXRlU3BhY2UgPSByZXF1aXJlKCcuL1RyaW1XaGl0ZVNwYWNlLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRBdHRyaWJ1dGVzRXh0cmFjdG9yLFxyXG5cdERhc2hpZnlTbmFrZUNhc2UsXHJcblx0R2VuZXJhdGVSYW5kb21JZCxcclxuXHRHZW5lcmF0ZVJhbmRvbU51bWJlcixcclxuXHRJbnRlcnBvbGF0ZVRleHQsXHJcblx0SXNUaGVuYWJsZSxcclxuXHRNZXJnZU9iamVjdCxcclxuXHRTZXREZWZhdWx0Q29uZmlnLFxyXG5cdFRyaW1XaGl0ZVNwYWNlLFxyXG59Il19
