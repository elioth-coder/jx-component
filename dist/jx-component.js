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

},{"./methods/index.js":28,"./utils/index.js":63}],15:[function(require,module,exports){
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

},{"./Component.js":14,"./utils/index.js":63}],17:[function(require,module,exports){
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

},{"../ComponentCollection.js":15,"../ComponentException.js":17,"../utils/index.js":63}],22:[function(require,module,exports){
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

},{"../utils/index.js":63}],26:[function(require,module,exports){
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

},{"../ComponentException.js":17,"../utils/index.js":63}],27:[function(require,module,exports){
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

},{"./afterRender.js":21,"./beforeRender.js":22,"./createInstance.js":23,"./destroy.js":24,"./generateStyle.js":25,"./generateTemplate.js":26,"./hierarchy.js":27,"./onInit.js":29,"./onRender.js":30,"./parentComponent.js":31,"./registerDomRefs.js":32,"./registerEvents.js":33,"./registerMethods.js":34,"./registerRemoveSelfEvent.js":35,"./removeOnInitElement.js":36,"./renameComponents.js":37,"./render.js":38,"./renderComponent.js":39,"./renderComponents.js":40,"./renderIf.js":41,"./renderListComponent.js":42,"./renderOnInitElement.js":43,"./renderShow.js":44,"./renderSingularComponent.js":45,"./renderStyle.js":46,"./renderTemplate.js":47,"./replaceComponentTags.js":48,"./setAttributes.js":49,"./setData.js":50,"./setId.js":51,"./setParent.js":52,"./tweakLifeCycle.js":53}],29:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"lodash/debounce":8}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"../ComponentCollection.js":15}],36:[function(require,module,exports){
"use strict";

var removeOnInitElement = function removeOnInitElement() {
  var id = this.id;
  $("[on_init_".concat(id, "]")).remove();
};

module.exports = removeOnInitElement;

},{}],37:[function(require,module,exports){
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

},{"../utils/index.js":63}],38:[function(require,module,exports){
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

},{"../ComponentException.js":17,"../utils/index.js":63}],39:[function(require,module,exports){
"use strict";

var renderComponent = function renderComponent(replaced) {
  var listExpression = replaced.attributes['data-list'];

  if (listExpression) {
    return this.renderListComponent(replaced);
  }

  this.renderSingularComponent(replaced);
};

module.exports = renderComponent;

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"../ComponentException.js":17,"../utils/index.js":63}],43:[function(require,module,exports){
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

},{"../ComponentException.js":17,"../utils/index.js":63}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{"../utils/index.js":63}],46:[function(require,module,exports){
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

},{"../helpers/index.js":18}],47:[function(require,module,exports){
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

},{"../utils/index.js":63}],48:[function(require,module,exports){
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

},{"../utils/index.js":63}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    MergeObject = _require.MergeObject;

var setData = function setData(passedData) {
  var data = this.data;
  this.data = MergeObject(passedData, data);
  return this;
};

module.exports = setData;

},{"../utils/index.js":63}],51:[function(require,module,exports){
"use strict";

var _require = require('../utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId;

var setId = function setId() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GenerateRandomId('cid');
  this.id = id;
  return this;
};

module.exports = setId;

},{"../utils/index.js":63}],52:[function(require,module,exports){
"use strict";

var setParent = function setParent(parent) {
  this.parent = parent;
  return this;
};

module.exports = setParent;

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
"use strict";

var GenerateRandomNumber = require('./GenerateRandomNumber.js');

var GenerateRandomId = function GenerateRandomId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "rnd";
  var id = [prefix, GenerateRandomNumber(1000, 9999), (Date.now() + '').substr(5)].join("_");
  return id;
};

module.exports = GenerateRandomId;

},{"./GenerateRandomNumber.js":57}],57:[function(require,module,exports){
"use strict";

var GenerateRandomNumber = function GenerateRandomNumber() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = GenerateRandomNumber;

},{}],58:[function(require,module,exports){
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

},{"./TrimWhiteSpace.js":62}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{"./AttributesExtractor.js":54,"./DashifySnakeCase.js":55,"./GenerateRandomId.js":56,"./GenerateRandomNumber.js":57,"./InterpolateText.js":58,"./IsThenable.js":59,"./MergeObject.js":60,"./SetDefaultConfig.js":61,"./TrimWhiteSpace.js":62}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90b051bWJlci5qcyIsInNyYy9Db21wb25lbnQuanMiLCJzcmMvQ29tcG9uZW50Q29sbGVjdGlvbi5qcyIsInNyYy9Db21wb25lbnRDb25zdHJ1Y3Rvci5qcyIsInNyYy9Db21wb25lbnRFeGNlcHRpb24uanMiLCJzcmMvaGVscGVycy9pbmRleC5qcyIsInNyYy9oZWxwZXJzL3JlbW92ZVN0eWxlLmpzIiwic3JjL2hlbHBlcnMvc3R5bGVFeGlzdHMuanMiLCJzcmMvbWV0aG9kcy9hZnRlclJlbmRlci5qcyIsInNyYy9tZXRob2RzL2JlZm9yZVJlbmRlci5qcyIsInNyYy9tZXRob2RzL2NyZWF0ZUluc3RhbmNlLmpzIiwic3JjL21ldGhvZHMvZGVzdHJveS5qcyIsInNyYy9tZXRob2RzL2dlbmVyYXRlU3R5bGUuanMiLCJzcmMvbWV0aG9kcy9nZW5lcmF0ZVRlbXBsYXRlLmpzIiwic3JjL21ldGhvZHMvaGllcmFyY2h5LmpzIiwic3JjL21ldGhvZHMvaW5kZXguanMiLCJzcmMvbWV0aG9kcy9vbkluaXQuanMiLCJzcmMvbWV0aG9kcy9vblJlbmRlci5qcyIsInNyYy9tZXRob2RzL3BhcmVudENvbXBvbmVudC5qcyIsInNyYy9tZXRob2RzL3JlZ2lzdGVyRG9tUmVmcy5qcyIsInNyYy9tZXRob2RzL3JlZ2lzdGVyRXZlbnRzLmpzIiwic3JjL21ldGhvZHMvcmVnaXN0ZXJNZXRob2RzLmpzIiwic3JjL21ldGhvZHMvcmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQuanMiLCJzcmMvbWV0aG9kcy9yZW1vdmVPbkluaXRFbGVtZW50LmpzIiwic3JjL21ldGhvZHMvcmVuYW1lQ29tcG9uZW50cy5qcyIsInNyYy9tZXRob2RzL3JlbmRlci5qcyIsInNyYy9tZXRob2RzL3JlbmRlckNvbXBvbmVudC5qcyIsInNyYy9tZXRob2RzL3JlbmRlckNvbXBvbmVudHMuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJJZi5qcyIsInNyYy9tZXRob2RzL3JlbmRlckxpc3RDb21wb25lbnQuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJPbkluaXRFbGVtZW50LmpzIiwic3JjL21ldGhvZHMvcmVuZGVyU2hvdy5qcyIsInNyYy9tZXRob2RzL3JlbmRlclNpbmd1bGFyQ29tcG9uZW50LmpzIiwic3JjL21ldGhvZHMvcmVuZGVyU3R5bGUuanMiLCJzcmMvbWV0aG9kcy9yZW5kZXJUZW1wbGF0ZS5qcyIsInNyYy9tZXRob2RzL3JlcGxhY2VDb21wb25lbnRUYWdzLmpzIiwic3JjL21ldGhvZHMvc2V0QXR0cmlidXRlcy5qcyIsInNyYy9tZXRob2RzL3NldERhdGEuanMiLCJzcmMvbWV0aG9kcy9zZXRJZC5qcyIsInNyYy9tZXRob2RzL3NldFBhcmVudC5qcyIsInNyYy9tZXRob2RzL3R3ZWFrTGlmZUN5Y2xlLmpzIiwic3JjL3V0aWxzL0F0dHJpYnV0ZXNFeHRyYWN0b3IuanMiLCJzcmMvdXRpbHMvRGFzaGlmeVNuYWtlQ2FzZS5qcyIsInNyYy91dGlscy9HZW5lcmF0ZVJhbmRvbUlkLmpzIiwic3JjL3V0aWxzL0dlbmVyYXRlUmFuZG9tTnVtYmVyLmpzIiwic3JjL3V0aWxzL0ludGVycG9sYXRlVGV4dC5qcyIsInNyYy91dGlscy9Jc1RoZW5hYmxlLmpzIiwic3JjL3V0aWxzL01lcmdlT2JqZWN0LmpzIiwic3JjL3V0aWxzL1NldERlZmF1bHRDb25maWcuanMiLCJzcmMvdXRpbHMvVHJpbVdoaXRlU3BhY2UuanMiLCJzcmMvdXRpbHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLDhCQUFELENBQW5DOztBQUNBLElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLDZCQUFELENBQWxDOztBQUNBLElBQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLCtCQUFELENBQXBDOztBQUNBLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxvQkFBRCxDQUF6Qjs7QUFFQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtBQUNoQixFQUFBLG1CQUFtQixFQUFuQixtQkFEZ0I7QUFFaEIsRUFBQSxrQkFBa0IsRUFBbEIsa0JBRmdCO0FBR2hCLEVBQUEsb0JBQW9CLEVBQXBCLG9CQUhnQjtBQUloQixFQUFBLFNBQVMsRUFBVDtBQUpnQixDQUFqQjs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LEVBQWhCLGdCQVJnQjtBQVNoQixFQUFBLGNBQWMsRUFBZDtBQVRnQixDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSByZXF1aXJlKCcuL3NyYy9Db21wb25lbnRDb2xsZWN0aW9uLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG5jb25zdCBDb21wb25lbnRDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudENvbnN0cnVjdG9yLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudC5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Q29tcG9uZW50Q29sbGVjdGlvbixcclxuXHRDb21wb25lbnRFeGNlcHRpb24sXHJcblx0Q29tcG9uZW50Q29uc3RydWN0b3IsXHJcblx0Q29tcG9uZW50LFxyXG59IiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBub3cgPSByZXF1aXJlKCcuL25vdycpLFxuICAgIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgdGltZVdhaXRpbmcgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nXG4gICAgICA/IG5hdGl2ZU1pbih0aW1lV2FpdGluZywgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpXG4gICAgICA6IHRpbWVXYWl0aW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbm93O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXI7XG4iLCJjb25zdCB7IEdlbmVyYXRlUmFuZG9tSWQgfSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgeyBcclxuICAgIGRlc3Ryb3ksXHJcbiAgICBoaWVyYXJjaHksXHJcbiAgICBwYXJlbnRDb21wb25lbnQsXHJcbiAgICBjcmVhdGVJbnN0YW5jZSxcclxuICAgIHNldERhdGEsXHJcbiAgICBzZXRQYXJlbnQsXHJcbiAgICBzZXRJZCxcclxuICAgIHNldEF0dHJpYnV0ZXMsXHJcbiAgICByZW5kZXJTaW5ndWxhckNvbXBvbmVudCxcclxuICAgIHJlbmRlckxpc3RDb21wb25lbnQsXHJcbiAgICByZW5kZXJDb21wb25lbnQsXHJcbiAgICByZXBsYWNlQ29tcG9uZW50VGFncyxcclxuICAgIHJlbmRlckNvbXBvbmVudHMsXHJcbiAgICByZWdpc3RlckRvbVJlZnMsXHJcblx0cmVnaXN0ZXJFdmVudHMsXHJcblx0cmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQsXHJcbiAgICByZWdpc3Rlck1ldGhvZHMsXHJcbiAgICByZW5kZXJTaG93LFxyXG4gICAgcmVuZGVySWYsXHJcbiAgICBnZW5lcmF0ZVRlbXBsYXRlLFxyXG4gICAgcmVuZGVyVGVtcGxhdGUsXHJcbiAgICBnZW5lcmF0ZVN0eWxlLFxyXG4gICAgcmVuZGVyU3R5bGUsXHJcbiAgICBhZnRlclJlbmRlcixcclxuICAgIG9uUmVuZGVyLFxyXG4gICAgYmVmb3JlUmVuZGVyLFxyXG4gICAgcmVtb3ZlT25Jbml0RWxlbWVudCxcclxuICAgIHJlbmRlck9uSW5pdEVsZW1lbnQsXHJcbiAgICBvbkluaXQsXHJcbiAgICB0d2Vha0xpZmVDeWNsZSxcclxuICAgIHJlbmFtZUNvbXBvbmVudHMsXHJcbiAgICByZW5kZXIsXHJcbn0gPSByZXF1aXJlKCcuL21ldGhvZHMvaW5kZXguanMnKTtcclxuXHJcbmNsYXNzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcclxuXHRcdGxldCB7IFxyXG5cdFx0XHRuYW1lLFxyXG5cdFx0XHRzdHlsZUlkLFxyXG5cdFx0XHRzdHlsZSxcclxuXHRcdFx0dGVtcGxhdGUsXHJcblx0XHRcdGRhdGEsXHJcblx0XHRcdGV2ZW50cyxcclxuXHRcdFx0bWV0aG9kcyxcclxuXHRcdFx0bGlmZUN5Y2xlLFxyXG5cdFx0XHRjb21wb25lbnRzLFxyXG5cdFx0XHRhdHRyaWJ1dGVzLFxyXG5cdFx0XHRwYXJlbnQsXHJcblx0XHR9ID0gY29uZmlnO1xyXG5cclxuXHRcdHRoaXMuaWQgPSBHZW5lcmF0ZVJhbmRvbUlkKCdjaWQnKTtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLnN0eWxlSWQgPSBzdHlsZUlkO1xyXG5cdFx0dGhpcy5zdHlsZSA9IHN0eWxlO1xyXG5cdFx0dGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcclxuXHRcdHRoaXMuZXZlbnRzID0gZXZlbnRzO1xyXG5cdFx0dGhpcy5tZXRob2RzID0gbWV0aG9kcztcclxuXHRcdHRoaXMubGlmZUN5Y2xlID0gbGlmZUN5Y2xlO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuXHRcdHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XHJcbiAgICAgICAgdGhpcy4kcmVmcyA9IHt9O1xyXG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcblx0fVxyXG5cclxuICAgIGRlc3Ryb3kgPSBkZXN0cm95O1xyXG4gICAgaGllcmFyY2h5ID0gaGllcmFyY2h5O1xyXG4gICAgcGFyZW50Q29tcG9uZW50ID0gcGFyZW50Q29tcG9uZW50O1xyXG4gICAgY3JlYXRlSW5zdGFuY2UgPSBjcmVhdGVJbnN0YW5jZTtcclxuICAgIHNldERhdGEgPSBzZXREYXRhO1xyXG4gICAgc2V0UGFyZW50ID0gc2V0UGFyZW50O1xyXG4gICAgc2V0SWQgPSBzZXRJZDtcclxuICAgIHNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xyXG4gICAgcmVuZGVyU2luZ3VsYXJDb21wb25lbnQgPSByZW5kZXJTaW5ndWxhckNvbXBvbmVudDtcclxuICAgIHJlbmRlckxpc3RDb21wb25lbnQgPSByZW5kZXJMaXN0Q29tcG9uZW50O1xyXG4gICAgcmVuZGVyQ29tcG9uZW50ID0gcmVuZGVyQ29tcG9uZW50O1xyXG4gICAgcmVwbGFjZUNvbXBvbmVudFRhZ3MgPSByZXBsYWNlQ29tcG9uZW50VGFncztcclxuICAgIHJlbmRlckNvbXBvbmVudHMgPSByZW5kZXJDb21wb25lbnRzO1xyXG4gICAgcmVnaXN0ZXJEb21SZWZzID0gcmVnaXN0ZXJEb21SZWZzO1xyXG5cdHJlZ2lzdGVyRXZlbnRzID0gcmVnaXN0ZXJFdmVudHM7XHJcblx0cmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQgPSByZWdpc3RlclJlbW92ZVNlbGZFdmVudDtcclxuICAgIHJlZ2lzdGVyTWV0aG9kcyA9IHJlZ2lzdGVyTWV0aG9kcztcclxuICAgIHJlbmRlclNob3cgPSByZW5kZXJTaG93O1xyXG4gICAgcmVuZGVySWYgPSByZW5kZXJJZjtcclxuICAgIGdlbmVyYXRlVGVtcGxhdGUgPSBnZW5lcmF0ZVRlbXBsYXRlO1xyXG4gICAgcmVuZGVyVGVtcGxhdGUgPSByZW5kZXJUZW1wbGF0ZTtcclxuICAgIGdlbmVyYXRlU3R5bGUgPSBnZW5lcmF0ZVN0eWxlO1xyXG4gICAgcmVuZGVyU3R5bGUgPSByZW5kZXJTdHlsZTtcclxuICAgIGFmdGVyUmVuZGVyID0gYWZ0ZXJSZW5kZXI7XHJcbiAgICBvblJlbmRlciA9IG9uUmVuZGVyO1xyXG4gICAgYmVmb3JlUmVuZGVyID0gYmVmb3JlUmVuZGVyO1xyXG4gICAgcmVtb3ZlT25Jbml0RWxlbWVudCA9IHJlbW92ZU9uSW5pdEVsZW1lbnQ7XHJcbiAgICByZW5kZXJPbkluaXRFbGVtZW50ID0gcmVuZGVyT25Jbml0RWxlbWVudDtcclxuICAgIG9uSW5pdCA9IG9uSW5pdDtcclxuICAgIHR3ZWFrTGlmZUN5Y2xlID0gdHdlYWtMaWZlQ3ljbGU7XHJcbiAgICByZW5hbWVDb21wb25lbnRzID0gcmVuYW1lQ29tcG9uZW50cztcclxuICAgIHJlbmRlciA9IHJlbmRlcjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHtcclxuXHRjb21wb25lbnRzOiBbXSxcclxuXHRhZGQoY29tcG9uZW50KSB7IFxyXG5cdFx0dGhpcy5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcclxuXHR9LFxyXG5cdHJlbW92ZShjb21wb25lbnQpIHtcclxuXHRcdGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblx0XHRsZXQgaW5kZXggPSBjb21wb25lbnRzLmZpbmRJbmRleCgoaXRlbSk9PiB7XHJcblx0XHRcdHJldHVybiBpdGVtLmlkID09IGNvbXBvbmVudC5pZDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmKGluZGV4IDw9IC0xKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cdFxyXG5cdFx0Y29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0dGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuXHR9LFxyXG5cdGZpbHRlcigpIHtcclxuXHRcdGxldCBmaWx0ZXJDb21wb25lbnRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblxyXG5cdFx0XHRmb3IobGV0IGk9MDsgaTxjb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNbaV07XHJcblx0XHRcdFx0bGV0ICRjb21wb25lbnQgPSAkKGAjJHtjb21wb25lbnQuaWR9YCk7XHJcblx0XHJcblx0XHRcdFx0aWYoJGNvbXBvbmVudC5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnJlbW92ZShjb21wb25lbnQpO1xyXG5cdFx0XHR9XHRcdFxyXG5cdFx0fS5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZmlsdGVyQ29tcG9uZW50cywgMTAwMCk7XHJcblx0fSxcclxuXHRkaXNwbGF5KCkge1xyXG5cdFx0bGV0IHsgY29tcG9uZW50cyB9ID0gdGhpcztcclxuXHRcdGxldCBpdGVtcyA9IGNvbXBvbmVudHMubWFwKCh7IGlkLCBuYW1lLCBzdHlsZUlkIH0pID0+IHsgXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWQsIFxyXG5cdFx0XHRcdG5hbWUsIFxyXG5cdFx0XHRcdHN0eWxlSWQsXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnNvbGUudGFibGUoaXRlbXMpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnRDb2xsZWN0aW9uOyIsImNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ29tcG9uZW50LmpzJyk7XHJcbmNvbnN0IHsgXHJcblx0R2VuZXJhdGVSYW5kb21JZCxcclxuXHRTZXREZWZhdWx0Q29uZmlnLFxyXG59ID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgQ29tcG9uZW50Q29uc3RydWN0b3IgPSB7XHJcblx0Y3JlYXRlKGNvbmZpZyA9IHt9KSB7XHJcblx0XHRjb25zdCBkZWZhdWx0Q29uZmlnID0ge1xyXG5cdFx0XHRzdHlsZUlkOiBHZW5lcmF0ZVJhbmRvbUlkKCdjc3MnKSxcclxuXHRcdFx0dGVtcGxhdGU6IGBcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGgxPiBDb21wb25lbnQgcmVuZGVyZWQuIDwvaDE+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdGAsXHJcblx0XHRcdGRhdGE6IHt9LFxyXG5cdFx0XHRldmVudHM6IHt9LFxyXG5cdFx0XHRtZXRob2RzOiB7fSxcclxuXHRcdFx0bGlmZUN5Y2xlOiB7fSxcclxuXHRcdFx0Y29tcG9uZW50czoge30sXHJcblx0XHRcdGF0dHJpYnV0ZXM6IHt9LFxyXG5cdFx0XHRwYXJlbnQ6IG51bGwsXHJcblx0XHR9O1xyXG5cdFx0Y29uZmlnID0gU2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnLCBjb25maWcpO1xyXG5cdFx0bGV0IHsgbmFtZSB9ID0gY29uZmlnO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IENvbXBvbmVudChjb25maWcpO1xyXG5cdH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50Q29uc3RydWN0b3I7IiwiY2xhc3MgQ29tcG9uZW50RXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpXHJcblxyXG5cdFx0dGhpcy5uYW1lID0gJ0NvbXBvbmVudEV4Y2VwdGlvbic7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50RXhjZXB0aW9uOyIsImNvbnN0IHJlbW92ZVN0eWxlID0gcmVxdWlyZSgnLi9yZW1vdmVTdHlsZS5qcycpO1xyXG5jb25zdCBzdHlsZUV4aXN0cyA9IHJlcXVpcmUoJy4vc3R5bGVFeGlzdHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcmVtb3ZlU3R5bGUsXHJcbiAgICBzdHlsZUV4aXN0cyxcclxufSIsImNvbnN0IHJlbW92ZVN0eWxlID0gZnVuY3Rpb24oaWQpIHtcclxuXHQkKGBzdHlsZVtpdGVtaWQ9XCIke2lkfVwiXWApLnJlbW92ZSgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZVN0eWxlOyIsImNvbnN0IHN0eWxlRXhpc3RzID0gZnVuY3Rpb24oaWQpIHtcclxuXHRyZXR1cm4gJChgc3R5bGVbaXRlbWlkPVwiJHtpZH1cIl1gKS5sZW5ndGg7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc3R5bGVFeGlzdHM7IiwiY29uc3QgeyBJc1RoZW5hYmxlIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5jb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL0NvbXBvbmVudENvbGxlY3Rpb24uanMnKTtcclxuXHJcbmNvbnN0IGFmdGVyUmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBhZnRlclJlbmRlciB9ID0gdGhpcy5saWZlQ3ljbGU7XHJcbiAgICBsZXQgcmV0dXJuVmFsdWU7XHJcbiAgICBcclxuICAgIGlmKGFmdGVyUmVuZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWUgPSB0aGlzLmxpZmVDeWNsZS5hZnRlclJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgaWYoSXNUaGVuYWJsZShyZXR1cm5WYWx1ZSkpIHtcclxuICAgICAgICByZXR1cm5WYWx1ZS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNvbXBvbmVudHMoKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XHJcbiAgICB0aGlzLnJlbW92ZU9uSW5pdEVsZW1lbnQoKTtcclxuICAgIENvbXBvbmVudENvbGxlY3Rpb24uYWRkKHRoaXMpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFmdGVyUmVuZGVyOyIsImNvbnN0IGJlZm9yZVJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlmZUN5Y2xlLmJlZm9yZVJlbmRlcigpO1xyXG59XHRcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYmVmb3JlUmVuZGVyOyIsImNvbnN0IGNyZWF0ZUluc3RhbmNlID0gZnVuY3Rpb24ocGFyZW50KSB7XHJcbiAgICBsZXQgY3JlYXRlZEluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcclxuICAgICAgICBjcmVhdGVkSW5zdGFuY2VcclxuICAgICAgICAgICAgLnNldFBhcmVudChwYXJlbnQpXHJcbiAgICAgICAgICAgIC5zZXRJZCgpO1xyXG5cclxuICAgIHJldHVybiBjcmVhdGVkSW5zdGFuY2U7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSW5zdGFuY2U7IiwiY29uc3QgeyByZW1vdmVTdHlsZSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgc3R5bGVJZCB9ID0gdGhpcztcclxuICAgIGxldCB7ICRzZWxmIH0gPSB0aGlzLiRyZWZzO1xyXG5cclxuICAgICRzZWxmWzBdLnJlbW92ZSgpO1xyXG4gICAgbGV0IHNpbWlsYXJDb21wb25lbnRzID0gJChgWyR7c3R5bGVJZH1dYCk7XHJcblxyXG4gICAgaWYoIXNpbWlsYXJDb21wb25lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJlbW92ZVN0eWxlKHN0eWxlSWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRlc3Ryb3k7XHJcbiIsImNvbnN0IHsgSW50ZXJwb2xhdGVUZXh0LCBUcmltV2hpdGVTcGFjZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlU3R5bGUgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IHN0eWxlSWQsIHN0eWxlIH0gPSB0aGlzO1xyXG4gICAgbGV0IHN0eWxlVGFnID0gYFxyXG4gICAgICAgIDxzdHlsZSBpdGVtaWQ9XCIke3N0eWxlSWR9XCI+XHJcbiAgICAgICAgICAgICR7SW50ZXJwb2xhdGVUZXh0KHtzdHlsZUlkfSwgc3R5bGUpfVxyXG4gICAgICAgIDwvc3R5bGU+XHJcbiAgICBgO1xyXG5cclxuICAgIHJldHVybiBUcmltV2hpdGVTcGFjZShzdHlsZVRhZyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVTdHlsZTsiLCJjb25zdCB7IEludGVycG9sYXRlVGV4dCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBpZCwgbmFtZSwgc3R5bGVJZCwgdGVtcGxhdGUsIGRhdGEsIGF0dHJpYnV0ZXMgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHRlbXBsYXRlMDtcclxuXHJcbiAgICB0ZW1wbGF0ZSA9ICQucGFyc2VIVE1MKEludGVycG9sYXRlVGV4dChkYXRhLCB0ZW1wbGF0ZSkpO1xyXG4gICAgJHRlbXBsYXRlMCA9ICQodGVtcGxhdGVbMF0pO1xyXG5cclxuICAgIGlmKHRlbXBsYXRlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgIGBDb21wb25lbnQgZG8gbm90IGhhdmUgYSB0ZW1wbGF0ZS5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYodGVtcGxhdGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbiAgICBpZih0ZW1wbGF0ZVswXS5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgJHRlbXBsYXRlMFxyXG4gICAgICAgIC5hdHRyKGF0dHJpYnV0ZXMpXHJcbiAgICAgICAgLmF0dHIoJ2NvbXBvbmVudC1uYW1lJywgbmFtZSlcclxuICAgICAgICAuYXR0cihzdHlsZUlkLCAnJylcclxuICAgICAgICAuYXR0cignaWQnLCBpZCk7XHJcbiAgICAgICAgXHJcbiAgICByZXR1cm4gdGVtcGxhdGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVUZW1wbGF0ZTsiLCJjb25zdCBoaWVyYXJjaHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgeyBuYW1lIH0gPSB0aGlzO1xyXG4gICAgbGV0IGhpZXJhcmNoeSA9IFtdO1xyXG4gICAgbGV0IHdoaWxlUGFyZW50RXhpc3RzID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCB7IHBhcmVudCB9ID0gY29tcG9uZW50O1xyXG5cclxuICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJlbnROYW1lID0gKHBhcmVudC5uYW1lKSA/IHBhcmVudC5uYW1lIDogJ3Jvb3QnO1xyXG5cclxuICAgICAgICBoaWVyYXJjaHkucHVzaChwYXJlbnROYW1lKTtcclxuICAgICAgICB3aGlsZVBhcmVudEV4aXN0cyhwYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlUGFyZW50RXhpc3RzKHRoaXMpO1xyXG5cclxuICAgIGlmKGhpZXJhcmNoeS5sZW5ndGggPT0gMCAmJiBuYW1lID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGhpZXJhcmNoeS5wdXNoKCdyb290Jyk7ICAgICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGllcmFyY2h5LnB1c2gobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhpZXJhcmNoeTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBoaWVyYXJjaHk7IiwiY29uc3QgZGVzdHJveSA9IHJlcXVpcmUoJy4vZGVzdHJveS5qcycpO1xyXG5jb25zdCBoaWVyYXJjaHkgPSByZXF1aXJlKCcuL2hpZXJhcmNoeS5qcycpO1xyXG5jb25zdCBwYXJlbnRDb21wb25lbnQgPSByZXF1aXJlKCcuL3BhcmVudENvbXBvbmVudC5qcycpO1xyXG5jb25zdCBjcmVhdGVJbnN0YW5jZSA9IHJlcXVpcmUoJy4vY3JlYXRlSW5zdGFuY2UuanMnKTtcclxuY29uc3Qgc2V0RGF0YSA9IHJlcXVpcmUoJy4vc2V0RGF0YS5qcycpO1xyXG5jb25zdCBzZXRQYXJlbnQgPSByZXF1aXJlKCcuL3NldFBhcmVudC5qcycpO1xyXG5jb25zdCBzZXRJZCA9IHJlcXVpcmUoJy4vc2V0SWQuanMnKTtcclxuY29uc3Qgc2V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vc2V0QXR0cmlidXRlcy5qcycpO1xyXG5jb25zdCByZW5kZXJTaW5ndWxhckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcmVuZGVyU2luZ3VsYXJDb21wb25lbnQuanMnKTtcclxuY29uc3QgcmVuZGVyTGlzdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vcmVuZGVyTGlzdENvbXBvbmVudC5qcycpO1xyXG5jb25zdCByZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL3JlbmRlckNvbXBvbmVudC5qcycpO1xyXG5jb25zdCByZXBsYWNlQ29tcG9uZW50VGFncyA9IHJlcXVpcmUoJy4vcmVwbGFjZUNvbXBvbmVudFRhZ3MuanMnKTtcclxuY29uc3QgcmVuZGVyQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vcmVuZGVyQ29tcG9uZW50cy5qcycpO1xyXG5jb25zdCByZWdpc3RlckRvbVJlZnMgPSByZXF1aXJlKCcuL3JlZ2lzdGVyRG9tUmVmcy5qcycpO1xyXG5jb25zdCByZWdpc3RlckV2ZW50cyA9IHJlcXVpcmUoJy4vcmVnaXN0ZXJFdmVudHMuanMnKTtcclxuY29uc3QgcmVnaXN0ZXJSZW1vdmVTZWxmRXZlbnQgPSByZXF1aXJlKCcuL3JlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50LmpzJyk7XHJcbmNvbnN0IHJlZ2lzdGVyTWV0aG9kcyA9IHJlcXVpcmUoJy4vcmVnaXN0ZXJNZXRob2RzLmpzJyk7XHJcbmNvbnN0IHJlbmRlclNob3cgPSByZXF1aXJlKCcuL3JlbmRlclNob3cuanMnKTtcclxuY29uc3QgcmVuZGVySWYgPSByZXF1aXJlKCcuL3JlbmRlcklmLmpzJyk7XHJcbmNvbnN0IGdlbmVyYXRlVGVtcGxhdGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlVGVtcGxhdGUuanMnKTtcclxuY29uc3QgcmVuZGVyVGVtcGxhdGUgPSByZXF1aXJlKCcuL3JlbmRlclRlbXBsYXRlLmpzJyk7XHJcbmNvbnN0IGdlbmVyYXRlU3R5bGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlU3R5bGUuanMnKTtcclxuY29uc3QgcmVuZGVyU3R5bGUgPSByZXF1aXJlKCcuL3JlbmRlclN0eWxlLmpzJyk7XHJcbmNvbnN0IGFmdGVyUmVuZGVyID0gcmVxdWlyZSgnLi9hZnRlclJlbmRlci5qcycpO1xyXG5jb25zdCBvblJlbmRlciA9IHJlcXVpcmUoJy4vb25SZW5kZXIuanMnKTtcclxuY29uc3QgYmVmb3JlUmVuZGVyID0gcmVxdWlyZSgnLi9iZWZvcmVSZW5kZXIuanMnKTtcclxuY29uc3QgcmVtb3ZlT25Jbml0RWxlbWVudCA9IHJlcXVpcmUoJy4vcmVtb3ZlT25Jbml0RWxlbWVudC5qcycpO1xyXG5jb25zdCByZW5kZXJPbkluaXRFbGVtZW50ID0gcmVxdWlyZSgnLi9yZW5kZXJPbkluaXRFbGVtZW50LmpzJyk7XHJcbmNvbnN0IG9uSW5pdCA9IHJlcXVpcmUoJy4vb25Jbml0LmpzJyk7XHJcbmNvbnN0IHR3ZWFrTGlmZUN5Y2xlID0gcmVxdWlyZSgnLi90d2Vha0xpZmVDeWNsZS5qcycpO1xyXG5jb25zdCByZW5hbWVDb21wb25lbnRzID0gcmVxdWlyZSgnLi9yZW5hbWVDb21wb25lbnRzLmpzJyk7XHJcbmNvbnN0IHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyLmpzJyk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBkZXN0cm95LFxyXG4gICAgaGllcmFyY2h5LFxyXG4gICAgcGFyZW50Q29tcG9uZW50LFxyXG4gICAgY3JlYXRlSW5zdGFuY2UsXHJcbiAgICBzZXREYXRhLFxyXG4gICAgc2V0UGFyZW50LFxyXG4gICAgc2V0SWQsXHJcbiAgICBzZXRBdHRyaWJ1dGVzLFxyXG4gICAgcmVuZGVyU2luZ3VsYXJDb21wb25lbnQsXHJcbiAgICByZW5kZXJMaXN0Q29tcG9uZW50LFxyXG4gICAgcmVuZGVyQ29tcG9uZW50LFxyXG4gICAgcmVwbGFjZUNvbXBvbmVudFRhZ3MsXHJcbiAgICByZW5kZXJDb21wb25lbnRzLFxyXG4gICAgcmVnaXN0ZXJEb21SZWZzLFxyXG4gICAgcmVnaXN0ZXJFdmVudHMsXHJcbiAgICByZWdpc3RlclJlbW92ZVNlbGZFdmVudCxcclxuICAgIHJlZ2lzdGVyTWV0aG9kcyxcclxuICAgIHJlbmRlclNob3csXHJcbiAgICByZW5kZXJJZixcclxuICAgIGdlbmVyYXRlVGVtcGxhdGUsXHJcbiAgICByZW5kZXJUZW1wbGF0ZSxcclxuICAgIGdlbmVyYXRlU3R5bGUsXHJcbiAgICByZW5kZXJTdHlsZSxcclxuICAgIGFmdGVyUmVuZGVyLFxyXG4gICAgb25SZW5kZXIsXHJcbiAgICBiZWZvcmVSZW5kZXIsXHJcbiAgICByZW1vdmVPbkluaXRFbGVtZW50LFxyXG4gICAgcmVuZGVyT25Jbml0RWxlbWVudCxcclxuICAgIG9uSW5pdCxcclxuICAgIHR3ZWFrTGlmZUN5Y2xlLFxyXG4gICAgcmVuYW1lQ29tcG9uZW50cyxcclxuICAgIHJlbmRlcixcclxufSIsImNvbnN0IG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlmZUN5Y2xlLm9uSW5pdCgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG9uSW5pdDsiLCJjb25zdCBvblJlbmRlciA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgdGhpcy5yZW5kZXJTdHlsZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJUZW1wbGF0ZShjb25maWcpO1xyXG4gICAgdGhpcy5yZW5kZXJJZigpO1xyXG4gICAgdGhpcy5yZW5kZXJTaG93KCk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyTWV0aG9kcygpO1xyXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgdGhpcy5yZWdpc3RlclJlbW92ZVNlbGZFdmVudCgpO1xyXG4gICAgdGhpcy5yZWdpc3RlckRvbVJlZnMoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBvblJlbmRlcjsiLCJjb25zdCBwYXJlbnRDb21wb25lbnQgPSBmdW5jdGlvbihuPTApIHtcclxuICAgIGxldCByZXBlYXRTdHJpbmcgPSBmdW5jdGlvbihzdHI9JzAnLCBuPTApIHtcclxuICAgICAgICBsZXQgcmVwZWF0ZWRTdHJpbmcgPSBgYDtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlcGVhdGVkU3RyaW5nICs9IHN0cjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXBlYXRlZFN0cmluZztcclxuICAgIH1cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmJHtyZXBlYXRTdHJpbmcoJy5wYXJlbnQnLCBuKzEpfVxyXG4gICAgICAgIH0pKClcclxuICAgIGA7XHJcbiAgICBsZXQgcGFyZW50ID0gZXZhbChzY3JpcHQpO1xyXG5cclxuICAgIHJldHVybiBwYXJlbnQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGFyZW50Q29tcG9uZW50OyIsImNvbnN0IHJlZ2lzdGVyRG9tUmVmcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHJlZnMgPSB7fTtcclxuICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgbGV0IGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RvbXJlZl1gKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCAkZWxlbWVudCA9ICQoZWxlbWVudHNbaV0pO1xyXG4gICAgICAgIGxldCBkb21yZWYgPSAkZWxlbWVudC5hdHRyKCdkb21yZWYnKTtcclxuXHJcbiAgICAgICAgJHJlZnNbYCQke2RvbXJlZn1gXSA9ICRlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgICRyZWZzW2Akc2VsZmBdID0gJHNlbGY7XHJcbiAgICB0aGlzLiRyZWZzID0gJHJlZnM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXJEb21SZWZzOyIsImNvbnN0IGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoL2RlYm91bmNlJyk7XHJcblxyXG5jb25zdCByZWdpc3RlckV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQsIGV2ZW50cyB9ID0gdGhpcztcclxuICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgbGV0IGRvbUV2ZW50cyA9IFtcclxuICAgICAgICBcImJsdXIsZm9jdXMsbG9hZCxyZXNpemUsc2Nyb2xsLHVubG9hZCxiZWZvcmV1bmxvYWQsXCIsXHJcbiAgICAgICAgXCJjbGljayxkYmxjbGljayxtb3VzZWRvd24sbW91c2V1cCxtb3VzZW1vdmUsbW91c2VvdmVyLFwiLFxyXG4gICAgICAgIFwibW91c2VvdXQsbW91c2VlbnRlcixtb3VzZWxlYXZlLGNoYW5nZSxzZWxlY3Qsc3VibWl0LFwiLFxyXG4gICAgICAgIFwia2V5ZG93bixrZXlwcmVzcyxrZXl1cFwiXHJcbiAgICBdLmpvaW4oXCJcIikuc3BsaXQoXCIsXCIpO1xyXG5cclxuICAgIGxldCBhZGRFdmVudFRvRWxlbWVudHMgPSBmdW5jdGlvbihldmVudE5hbWUsIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8ZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSAkKGVsZW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgbGV0IGZuTmFtZSA9IGVsZW1lbnQuYXR0cihgb24tJHtldmVudE5hbWV9YCk7XHJcbiAgICAgICAgICAgIGxldCBmbiA9IGV2ZW50c1tmbk5hbWVdO1xyXG4gICAgICAgICAgICBsZXQgZGVib3VuY2VBdHRyaWJ1dGUgPSBlbGVtZW50LmF0dHIoJ2RlYm91bmNlJykgKyAnJztcclxuICAgICAgICAgICAgbGV0IFsgZXZ0LCB3YWl0IF0gPSBkZWJvdW5jZUF0dHJpYnV0ZS5zcGxpdChcIixcIik7XHJcbiAgICAgICAgICAgICAgICBldnQgPSBldnQgKyAnJy50cmltKCk7XHJcbiAgICAgICAgICAgICAgICB3YWl0ID0gcGFyc2VJbnQod2FpdCArICcnLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICB3YWl0ID0gKGlzTmFOKHdhaXQpIHx8IHdhaXQgPCAwKSA/IDAgOiB3YWl0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVx0XHRcdFx0XHRcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyKGBvbi0ke2V2ZW50TmFtZX1gKTtcdFxyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHIoJ2RlYm91bmNlJyk7XHRcclxuXHJcbiAgICAgICAgICAgIGlmKGV2dCA9PSBldmVudE5hbWUgJiYgd2FpdCA+IDAgKSB7XHJcbiAgICAgICAgICAgICAgICBmbiA9IGRlYm91bmNlKGZuLCB3YWl0LCB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWRpbmc6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICB0cmFpbGluZzogdHJ1ZSBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4uYmluZCh0aGlzKSk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVx0XHRcclxuICAgICAgICAgICAgZWxlbWVudFswXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4uYmluZCh0aGlzKSk7XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuICAgICAgICB9XHRcdFx0XHRcclxuICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxkb21FdmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgZXZlbnROYW1lID0gZG9tRXZlbnRzW2ldO1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtvbi0ke2V2ZW50TmFtZX1dYCk7XHJcblxyXG4gICAgICAgIGlmKCRzZWxmLmF0dHIoYG9uLSR7ZXZlbnROYW1lfWApKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzID0gKGVsZW1lbnRzICYmIGVsZW1lbnRzLmxlbmd0aCkgPyBbLi4uZWxlbWVudHMsICRzZWxmXSA6IFskc2VsZl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBhZGRFdmVudFRvRWxlbWVudHMoZXZlbnROYW1lLCBlbGVtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyRXZlbnRzOyIsImNvbnN0IHJlZ2lzdGVyTWV0aG9kcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgbWV0aG9kcyB9ID0gdGhpcztcclxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobWV0aG9kcyk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8a2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIGxldCBmbiA9IG1ldGhvZHNba2V5XTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2RzW2tleV0gPSBmbi5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWV0aG9kcyA9IG1ldGhvZHM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXJNZXRob2RzOyIsImNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRDb2xsZWN0aW9uLmpzJyk7XHJcblxyXG5jb25zdCByZWdpc3RlclJlbW92ZVNlbGZFdmVudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IHsgaWQgfSA9IHNlbGY7XHJcbiAgICBsZXQgJHNlbGYgPSAkKGAjJHtpZH1gKTtcclxuICAgIFxyXG4gICAgJHNlbGYub24oJ0RPTU5vZGVSZW1vdmVkJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIENvbXBvbmVudENvbGxlY3Rpb24uZmlsdGVyKCk7ICAgICAgICBcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50OyIsImNvbnN0IHJlbW92ZU9uSW5pdEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGlkIH0gPSB0aGlzO1xyXG4gICAgXHJcbiAgICAkKGBbb25faW5pdF8ke2lkfV1gKS5yZW1vdmUoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW1vdmVPbkluaXRFbGVtZW50OyIsImNvbnN0IHsgRGFzaGlmeVNuYWtlQ2FzZSB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlbmFtZUNvbXBvbmVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblxyXG4gICAgZm9yKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV07XHJcblxyXG4gICAgICAgIGNvbXBvbmVudC5uYW1lID0gRGFzaGlmeVNuYWtlQ2FzZShrZXkpO1xyXG4gICAgICAgIGNvbXBvbmVudHNba2V5XSA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmFtZUNvbXBvbmVudHM7IiwiY29uc3QgeyBJc1RoZW5hYmxlIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5jb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuXHJcbmNvbnN0IHJlbmRlciA9IGZ1bmN0aW9uIChjb25maWcgPSB7fSkge1xyXG4gICAgbGV0IGhpZXJhcmNoeSA9IHRoaXMuaGllcmFyY2h5KCkuam9pbihcIiA+IFwiKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlckNvbmZpZyA9IGNvbmZpZztcclxuICAgIHRoaXMucmVuYW1lQ29tcG9uZW50cygpO1xyXG4gICAgdGhpcy50d2Vha0xpZmVDeWNsZSgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHsgYmVmb3JlUmVuZGVyLCBvbkluaXQsIH0gPSB0aGlzLmxpZmVDeWNsZTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChvbkluaXQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJlZm9yZVJlbmRlcikge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHRoaXMuYmVmb3JlUmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoSXNUaGVuYWJsZShyZXR1cm5WYWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVuZGVyKGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmdGVyUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vblJlbmRlcihjb25maWcpO1xyXG4gICAgICAgIHRoaXMuYWZ0ZXJSZW5kZXIoKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gW1xyXG4gICAgICAgICAgICBoaWVyYXJjaHksXHJcbiAgICAgICAgICAgIGUubWVzc2FnZSxcclxuICAgICAgICAgICAgZS5zdGFjayxcclxuICAgICAgICBdLmpvaW4oXCJcXG5cIik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXI7IiwiY29uc3QgcmVuZGVyQ29tcG9uZW50ID0gZnVuY3Rpb24ocmVwbGFjZWQpIHtcclxuICAgIGxldCBsaXN0RXhwcmVzc2lvbiA9IHJlcGxhY2VkLmF0dHJpYnV0ZXNbJ2RhdGEtbGlzdCddO1xyXG5cclxuICAgIGlmKGxpc3RFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTGlzdENvbXBvbmVudChyZXBsYWNlZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlclNpbmd1bGFyQ29tcG9uZW50KHJlcGxhY2VkKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJDb21wb25lbnQ7IiwiY29uc3QgcmVuZGVyQ29tcG9uZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgY29tcG9uZW50cyB9ID0gdGhpcztcclxuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cyk7XHJcblxyXG4gICAgaWYoIWtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlcGxhY2VkQ29tcG9uZW50VGFncyA9IHRoaXMucmVwbGFjZUNvbXBvbmVudFRhZ3MoKTtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxyZXBsYWNlZENvbXBvbmVudFRhZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcmVwbGFjZWQgPSByZXBsYWNlZENvbXBvbmVudFRhZ3NbaV07XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyQ29tcG9uZW50KHJlcGxhY2VkKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJDb21wb25lbnRzOyIsImNvbnN0IHJlbmRlcklmID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgeyBpZCwgZGF0YSB9ID0gdGhpcztcclxuICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgbGV0IHJlbmRlcldoaWxlRXhpc3RzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RhdGEtaWZdYCk7XHJcblxyXG4gICAgICAgIGlmKCFlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgJGVsZW1lbnQwID0gJChlbGVtZW50c1swXSk7XHJcbiAgICAgICAgbGV0IGV4cHJlc3Npb24gPSAkZWxlbWVudDAuYXR0cignZGF0YS1pZicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB7ICR7T2JqZWN0LmtleXMoZGF0YSkuam9pbihcIixcIil9IH0gPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICR7ZXhwcmVzc2lvbn1cclxuICAgICAgICB9KSgpXHJcbiAgICAgICAgYDtcclxuICAgICAgICBleHByZXNzaW9uID0gQm9vbGVhbihldmFsKHNjcmlwdCkpO1xyXG5cclxuICAgICAgICBpZihleHByZXNzaW9uID09IHRydWUpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQwLnJlbW92ZUF0dHIoJ2RhdGEtaWYnKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmKGV4cHJlc3Npb24gIT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudDAucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RhdGEtaWZdYCk7XHJcblxyXG4gICAgICAgIGlmKGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZW5kZXJXaGlsZUV4aXN0cygpO1xyXG4gICAgICAgIH1cdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcldoaWxlRXhpc3RzKCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVySWY7IiwiY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcbmNvbnN0IHsgR2VuZXJhdGVSYW5kb21JZCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHJlbmRlckxpc3RDb21wb25lbnQgPSBmdW5jdGlvbihyZXBsYWNlZCkge1xyXG4gICAgbGV0IHsgYXR0cmlidXRlcywgaWQgfSA9IHJlcGxhY2VkO1xyXG4gICAgbGV0IGJpbmRFeHByZXNzaW9uID0gYXR0cmlidXRlc1snZGF0YS1iaW5kJ107XHJcbiAgICBsZXQgbGlzdEV4cHJlc3Npb24gPSBhdHRyaWJ1dGVzWydkYXRhLWxpc3QnXTtcclxuICAgIGxldCBbY3VycmVudEl0ZW0sIGl0ZW1zXSA9IGxpc3RFeHByZXNzaW9uLnNwbGl0KFwiIGluIFwiKTtcclxuICAgICAgICBjdXJyZW50SXRlbSA9IGN1cnJlbnRJdGVtLnRyaW0oKTtcclxuICAgICAgICBpdGVtcyA9IGl0ZW1zLnRyaW0oKTtcclxuICAgIGxldCBsaXN0SXRlbXMgPSB0aGlzLmRhdGFbaXRlbXNdO1xyXG5cclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydjb21wb25lbnQtYWxpYXMnXTtcclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydkYXRhLWxpc3QnXTtcclxuICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydkYXRhLWJpbmQnXTtcclxuXHJcbiAgICBpZighKGxpc3RJdGVtcyAmJiBsaXN0SXRlbXMubGVuZ3RoKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oWyBcclxuICAgICAgICAgICAgYCcke2l0ZW1zfScgaXMgZW1wdHkgb3Igbm90IGFuIGFycmF5IG9yIHVuZGVmaW5lZC5gXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHRcdFxyXG4gICAgbGV0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7IFxyXG5cclxuICAgIGxldCBjb25maWcgPSB7XHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudDogdGFyZ2V0RWxlbWVudC5wYXJlbnROb2RlLFxyXG4gICAgICAgIHJlbmRlclR5cGU6ICdhcHBlbmQnLFxyXG4gICAgfVxyXG4gICAgbGV0IHJlbmRlckxpc3RJdGVtID0gZnVuY3Rpb24ocmVwbGFjZWQsIGNvbXBvbmVudERhdGEsIGNvbmZpZykge1xyXG4gICAgICAgIGxldCB7IGF0dHJpYnV0ZXMsIGNvbXBvbmVudCB9ID0gcmVwbGFjZWQ7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IE9iamVjdC5jcmVhdGUoY29tcG9uZW50KTtcclxuXHJcblxyXG4gICAgICAgIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAuc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxyXG4gICAgICAgICAgICAuc2V0SWQoR2VuZXJhdGVSYW5kb21JZCgnY2lkJykpXHJcbiAgICAgICAgICAgIC5zZXRQYXJlbnQodGhpcylcclxuICAgICAgICAgICAgLnNldERhdGEoY29tcG9uZW50RGF0YSlcclxuICAgICAgICAgICAgLnJlbmRlcihjb25maWcpO1x0XHJcblxyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgbGV0IGV4dHJhY3RDb21wb25lbnREYXRhID0gZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIGxldCBjb21wb25lbnREYXRhID0ge307XHJcbiAgICAgICAgbGV0IHNjcmlwdCA9IGBcclxuICAgICAgICAgICAgKGZ1bmN0aW9uKCkgeyBcclxuICAgICAgICAgICAgICAgIGxldCAke2JpbmRFeHByZXNzaW9ufSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHtiaW5kRXhwcmVzc2lvbn1cclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBldmFsKHNjcmlwdCk7XHJcblxyXG4gICAgICAgIGlmKGN1cnJlbnRJdGVtID09IGJpbmRFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGFbY3VycmVudEl0ZW1dID0gZGF0YTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBpZihjdXJyZW50SXRlbSAhPSBiaW5kRXhwcmVzc2lvbikge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudERhdGEsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGk8bGlzdEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudERhdGEgPSBleHRyYWN0Q29tcG9uZW50RGF0YShsaXN0SXRlbXNbaV0pO1xyXG4gICAgICAgICAgICBjb21wb25lbnREYXRhLmluZGV4ID0gaTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgcmVuZGVyTGlzdEl0ZW0ocmVwbGFjZWQsIGNvbXBvbmVudERhdGEsIGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgJCh0YXJnZXRFbGVtZW50KS5yZW1vdmUoKTtcdFx0XHRcdFx0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyTGlzdENvbXBvbmVudDsiLCJjb25zdCB7IEludGVycG9sYXRlVGV4dCwgU2V0RGVmYXVsdENvbmZpZyB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVRlbXBsYXRlID0gZnVuY3Rpb24odGVtcGxhdGUsIGRhdGEsIGlkKSB7XHJcbiAgICBsZXQgJHRlbXBsYXRlMDtcclxuXHJcbiAgICB0ZW1wbGF0ZSA9ICQucGFyc2VIVE1MKEludGVycG9sYXRlVGV4dChkYXRhLCB0ZW1wbGF0ZSkpO1xyXG4gICAgJHRlbXBsYXRlMCA9ICQodGVtcGxhdGVbMF0pO1xyXG5cclxuICAgIGlmKHRlbXBsYXRlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgIGAub25Jbml0KCkgZG8gbm90IGhhdmUgYSB0ZW1wbGF0ZS5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYodGVtcGxhdGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICBgLm9uSW5pdCgpIHRlbXBsYXRlIG11c3QgYmUgZW5jbG9zZWQgaW4gYWAsXHJcbiAgICAgICAgICAgIGBzaW5nbGUgYmxvY2stbGV2ZWwgZWxlbWVudC5gLFxyXG4gICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYodGVtcGxhdGVbMF0ubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgYC5vbkluaXQoKSB0ZW1wbGF0ZSBtdXN0IGJlIGVuY2xvc2VkIGluIGFgLFxyXG4gICAgICAgICAgICBgc2luZ2xlIGJsb2NrLWxldmVsIGVsZW1lbnQuYCxcclxuICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICAkdGVtcGxhdGUwLmF0dHIoYG9uX2luaXRfJHtpZH1gLCAnJyk7XHJcbiAgICAgICAgXHJcbiAgICByZXR1cm4gdGVtcGxhdGU7XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlck9uSW5pdEVsZW1lbnQgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xyXG4gICAgbGV0IHsgZGF0YSwgaWQgfSA9IHRoaXM7XHJcbiAgICB0ZW1wbGF0ZSA9IGdlbmVyYXRlVGVtcGxhdGUodGVtcGxhdGUsIGRhdGEsIGlkKTtcclxuICAgIGxldCB7IHJlbmRlckNvbmZpZyB9ID0gdGhpcztcclxuICAgIGxldCBkZWZhdWx0Q29uZmlnID0ge1xyXG4gICAgICAgIHRhcmdldEVsZW1lbnQ6IGRvY3VtZW50LmJvZHksIFxyXG4gICAgICAgIHJlbmRlclR5cGU6ICdyZXBsYWNlV2l0aCcsXHJcbiAgICB9O1xyXG4gICAgbGV0IHsgdGFyZ2V0RWxlbWVudCwgcmVuZGVyVHlwZSB9ID0gU2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnLCByZW5kZXJDb25maWcpO1xyXG5cclxuICAgICQodGFyZ2V0RWxlbWVudClbcmVuZGVyVHlwZV0odGVtcGxhdGUpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlck9uSW5pdEVsZW1lbnQ7IiwiY29uc3QgcmVuZGVyU2hvdyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgaWQsIGRhdGEgfSA9IHRoaXM7XHJcbiAgICBsZXQgJHNlbGYgPSAkKGAjJHtpZH1gKTtcclxuICAgIGxldCByZW5kZXJXaGlsZUV4aXN0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkYXRhLXNob3ddYCk7XHJcblxyXG4gICAgICAgIGlmKCFlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgJGVsZW1lbnQwID0gJChlbGVtZW50c1swXSk7XHJcbiAgICAgICAgbGV0IGV4cHJlc3Npb24gPSAkZWxlbWVudDAuYXR0cignZGF0YS1zaG93Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNjcmlwdCA9IGBcclxuICAgICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHsgJHtPYmplY3Qua2V5cyhkYXRhKS5qb2luKFwiLFwiKX0gfSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJHtleHByZXNzaW9ufVxyXG4gICAgICAgIH0pKClcclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBpZighZXZhbChzY3JpcHQpKSB7XHJcbiAgICAgICAgICAgICRlbGVtZW50MC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRlbGVtZW50MC5yZW1vdmVBdHRyKCdkYXRhLXNob3cnKTtcclxuICAgICAgICBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkYXRhLXNob3ddYCk7XHJcblxyXG4gICAgICAgIGlmKGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZW5kZXJXaGlsZUV4aXN0cygpO1xyXG4gICAgICAgIH1cdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcldoaWxlRXhpc3RzKCk7XHRcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlclNob3c7IiwiY29uc3QgeyBHZW5lcmF0ZVJhbmRvbUlkIH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgcmVuZGVyU2luZ3VsYXJDb21wb25lbnQgPSBmdW5jdGlvbiAocmVwbGFjZWQpIHtcclxuICAgIGxldCB7IGlkLCBjb21wb25lbnQsIGF0dHJpYnV0ZXMgfSA9IHJlcGxhY2VkO1xyXG4gICAgY29tcG9uZW50ID0gT2JqZWN0LmNyZWF0ZShjb21wb25lbnQpO1xyXG4gICAgbGV0IGNvbXBvbmVudERhdGE7XHJcbiAgICBsZXQgZGF0YUV4cHJlc3Npb24gPSBhdHRyaWJ1dGVzWydkYXRhLWJpbmQnXTtcclxuXHJcbiAgICBpZihkYXRhRXhwcmVzc2lvbikge1xyXG4gICAgICAgIGxldCB7IGRhdGEgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGdlbmVyYXRlQ29tcG9uZW50RGF0YSA9IGZ1bmN0aW9uKGRhdGFFeHByZXNzaW9uLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGRhdGFFeHByZXNzaW9uID0gZGF0YUV4cHJlc3Npb24udHJpbSgpO1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50RGF0YTtcclxuICAgICAgICAgICAgbGV0IGhhc0VxdWFsU2lnbiA9IGRhdGFFeHByZXNzaW9uLnNlYXJjaCgnWz1dJykgKyAxO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIChoYXNFcXVhbFNpZ24pIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZUV4cHJlc3Npb24gPSBkYXRhRXhwcmVzc2lvbi5zcGxpdChcIj1cIilbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGBcclxuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeyAke09iamVjdC5rZXlzKGRhdGEpLmpvaW4oXCIsIFwiKX0gfSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAke2RhdGFFeHByZXNzaW9ufTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAke3ZhbHVlRXhwcmVzc2lvbn07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSBldmFsKHNjcmlwdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFoYXNFcXVhbFNpZ24pIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBkYXRhRXhwcmVzc2lvbjtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudERhdGFba2V5XSA9IGRhdGFba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0eXBlb2YgY29tcG9uZW50RGF0YSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50RGF0YTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb21wb25lbnREYXRhID0gZ2VuZXJhdGVDb21wb25lbnREYXRhKGRhdGFFeHByZXNzaW9uLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snY29tcG9uZW50LWFsaWFzJ107XHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snZGF0YS1saXN0J107XHJcbiAgICBkZWxldGUgYXR0cmlidXRlc1snZGF0YS1iaW5kJ107XHJcblxyXG4gICAgY29tcG9uZW50XHJcbiAgICAgICAgLnNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcylcclxuICAgICAgICAuc2V0SWQoR2VuZXJhdGVSYW5kb21JZCgnY2lkJykpXHJcbiAgICAgICAgLnNldFBhcmVudCh0aGlzKTtcclxuXHJcbiAgICBpZihjb21wb25lbnREYXRhKSB7XHJcbiAgICAgICAgY29tcG9uZW50LnNldERhdGEoY29tcG9uZW50RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50LnJlbmRlcih7XHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyU2luZ3VsYXJDb21wb25lbnQ7IiwiY29uc3QgeyBzdHlsZUV4aXN0cyB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9pbmRleC5qcycpO1xyXG5cclxuY29uc3QgcmVuZGVyU3R5bGUgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCB7IHN0eWxlSWQsIHN0eWxlIH0gPSB0aGlzO1xyXG5cclxuICAgIGlmKCFzdHlsZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmKCFzdHlsZUV4aXN0cyhzdHlsZUlkKSkge1xyXG4gICAgICAgIGxldCBoZWFkMCA9ICQoJ2hlYWQnKVswXTtcclxuICAgICAgICBsZXQgJGhlYWQwID0gJChoZWFkMCk7XHJcblxyXG4gICAgICAgICRoZWFkMC5hcHBlbmQodGhpcy5nZW5lcmF0ZVN0eWxlKCkpO1xyXG4gICAgfVx0XHRcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlclN0eWxlO1xyXG4iLCJjb25zdCB7IFNldERlZmF1bHRDb25maWcgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCByZW5kZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgbGV0IHsgaWQgfSA9IHRoaXM7XHJcbiAgICBsZXQgZGVmYXVsdENvbmZpZyA9IHtcclxuICAgICAgICB0YXJnZXRFbGVtZW50OiBkb2N1bWVudC5ib2R5LCBcclxuICAgICAgICByZW5kZXJUeXBlOiAncmVwbGFjZVdpdGgnLFxyXG4gICAgfTtcclxuICAgIGxldCB7IHRhcmdldEVsZW1lbnQsIHJlbmRlclR5cGUgfSA9IFNldERlZmF1bHRDb25maWcoZGVmYXVsdENvbmZpZywgY29uZmlnKTtcclxuICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMuZ2VuZXJhdGVUZW1wbGF0ZSgpO1xyXG4gICAgbGV0ICR0YXJnZXRFbGVtZW50ID0gJCh0YXJnZXRFbGVtZW50KTtcclxuXHJcbiAgICBpZighJHRhcmdldEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgIGAndGFyZ2V0RWxlbWVudCcgZG9lcyBub3QgZXhpc3RzLmAsXHJcbiAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICB9XHJcbiAgICBpZihyZW5kZXJUeXBlID09ICdyZXBsYWNlV2l0aCcpIHtcclxuICAgICAgICBsZXQgJG9uSW5pdEVsZW1lbnQgPSAkKGBbb25faW5pdF8ke2lkfV1gKTtcclxuXHJcbiAgICAgICAgaWYoJG9uSW5pdEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICR0YXJnZXRFbGVtZW50ID0gJG9uSW5pdEVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICR0YXJnZXRFbGVtZW50W3JlbmRlclR5cGVdKHRlbXBsYXRlKTtcdFx0XHJcbn1cdFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXJUZW1wbGF0ZTsiLCJjb25zdCB7IEdlbmVyYXRlUmFuZG9tSWQsIEF0dHJpYnV0ZXNFeHRyYWN0b3IgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5jb25zdCByZXBsYWNlQ29tcG9uZW50VGFncyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgY29tcG9uZW50cyB9ID0gdGhpcztcclxuICAgIGxldCB7ICRzZWxmIH0gPSB0aGlzLiRyZWZzO1xyXG4gICAgbGV0IHJlcGxhY2VkQ29tcG9uZW50VGFncyA9IFtdO1xyXG4gICAgbGV0IGZpbmRDb21wb25lbnRzID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9IFtcclxuICAgICAgICAgICAgLi4uJHNlbGYuZmluZChuYW1lKSwgXHJcbiAgICAgICAgICAgIC4uLiRzZWxmLmZpbmQoYFtjb21wb25lbnQtYWxpYXM9XCIke25hbWV9XCJdYClcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudHM7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVwbGFjZSA9IGZ1bmN0aW9uKGVsZW1lbnRzLCBjb21wb25lbnQpIHtcclxuICAgICAgICBsZXQgaWQgPSBHZW5lcmF0ZVJhbmRvbUlkKCdyaWQnKTtcclxuICAgICAgICBsZXQgZWxlbWVudDAgPSBlbGVtZW50c1swXTtcclxuICAgICAgICBsZXQgdGFibGVFbGVtZW50cyA9IFwidGhlYWQsdGJvZHksdGZvb3QsdHIsdGgsdGRcIjtcclxuICAgICAgICBsZXQgdGFnTmFtZSA9IGVsZW1lbnQwLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgdGFnID0gKFxyXG4gICAgICAgICAgICB0YWJsZUVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIsXCIpXHJcbiAgICAgICAgICAgICAgICAuaW5jbHVkZXModGFnTmFtZSlcclxuICAgICAgICApID8gdGFnTmFtZSA6IFwidGVtcG9yYXJ5XCI7XHJcbiAgICAgICAgbGV0ICRlbGVtZW50MCA9ICQoZWxlbWVudDApO1xyXG5cclxuICAgICAgICByZXBsYWNlZENvbXBvbmVudFRhZ3MucHVzaCh7XHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBjb21wb25lbnQ6IE9iamVjdC5jcmVhdGUoY29tcG9uZW50KSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogQXR0cmlidXRlc0V4dHJhY3RvcihlbGVtZW50MCkuZXh0cmFjdCgpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRlbGVtZW50MC5yZXBsYWNlV2l0aChgPCR7dGFnfSBpZD1cIiR7aWR9XCIvPmApO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlcGxhY2VXaGlsZUV4aXN0cyA9IGZ1bmN0aW9uKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCB7IG5hbWUgfSA9IGNvbXBvbmVudDtcclxuICAgICAgICBsZXQgZWxlbWVudHMgPSBmaW5kQ29tcG9uZW50cyhuYW1lKTtcclxuXHJcbiAgICAgICAgaWYoIWVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcGxhY2UoZWxlbWVudHMsIGNvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIGVsZW1lbnRzID0gZmluZENvbXBvbmVudHMobmFtZSk7XHJcblxyXG4gICAgICAgIGlmKCFlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXBsYWNlV2hpbGVFeGlzdHMoY29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XTtcclxuXHJcbiAgICAgICAgaWYoIWNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVwbGFjZVdoaWxlRXhpc3RzKGNvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcGxhY2VkQ29tcG9uZW50VGFncztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZXBsYWNlQ29tcG9uZW50VGFnczsiLCJjb25zdCBzZXRBdHRyaWJ1dGVzID0gZnVuY3Rpb24oRG9tQXR0cmlidXRlcyA9IHt9KSB7XHJcbiAgICBsZXQgeyBhdHRyaWJ1dGVzIH0gPSB0aGlzO1xyXG5cclxuICAgIGlmKHR5cGVvZiBEb21BdHRyaWJ1dGVzICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIERvbUF0dHJpYnV0ZXMgPSB7fTtcclxuICAgIH1cclxuICAgIHRoaXMuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgRG9tQXR0cmlidXRlcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlczsiLCJjb25zdCB7IE1lcmdlT2JqZWN0IH0gPSByZXF1aXJlKCcuLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuY29uc3Qgc2V0RGF0YSA9IGZ1bmN0aW9uKHBhc3NlZERhdGEpIHtcclxuICAgIGxldCB7IGRhdGEgfSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gTWVyZ2VPYmplY3QocGFzc2VkRGF0YSwgZGF0YSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cdFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXREYXRhOyIsImNvbnN0IHsgR2VuZXJhdGVSYW5kb21JZCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IHNldElkID0gZnVuY3Rpb24oaWQ9R2VuZXJhdGVSYW5kb21JZCgnY2lkJykpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXRJZDsiLCJjb25zdCBzZXRQYXJlbnQgPSBmdW5jdGlvbihwYXJlbnQpIHtcclxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNldFBhcmVudDsiLCJjb25zdCB0d2Vha0xpZmVDeWNsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHsgbGlmZUN5Y2xlIH0gPSB0aGlzO1xyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhsaWZlQ3ljbGUpO1xyXG5cclxuICAgIGZvcihsZXQgaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcclxuICAgICAgICBsZXQgZm4gPSBsaWZlQ3ljbGVba2V5XTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaWZlQ3ljbGVba2V5XSA9IGZuLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saWZlQ3ljbGUgPSBsaWZlQ3ljbGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdHdlYWtMaWZlQ3ljbGU7IiwiY29uc3QgQXR0cmlidXRlc0V4dHJhY3RvciA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRsZXQgZXh0cmFjdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IGF0dHJpYnV0ZXMgPSB7fTtcclxuXHRcdGxldCBub2RlTWFwID0gdGhpcy5lbGVtZW50LmF0dHJpYnV0ZXM7XHJcblxyXG5cdFx0Zm9yKGxldCBpPTA7IGk8bm9kZU1hcC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRsZXQgeyBub2RlTmFtZSwgbm9kZVZhbHVlIH0gPSBub2RlTWFwW2ldO1xyXG5cdFx0XHRcclxuXHRcdFx0YXR0cmlidXRlc1tub2RlTmFtZV0gPSBub2RlVmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGF0dHJpYnV0ZXM7XHJcblx0fTtcclxuXHRsZXQgZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0bGV0IGF0dHJpYnV0ZXMgPSB0aGlzLmV4dHJhY3QoKTtcclxuXHJcblx0XHRyZXR1cm4gYXR0cmlidXRlc1tuYW1lXTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0ZWxlbWVudCxcclxuXHRcdGV4dHJhY3QsXHJcblx0XHRnZXQsXHJcblx0fTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdHRyaWJ1dGVzRXh0cmFjdG9yOyIsImNvbnN0IERhc2hpZnlTbmFrZUNhc2UgPSBmdW5jdGlvbihzdHIpIHtcclxuXHRsZXQgY2h1bmtzID0gc3RyLnNwbGl0KC8oW0EtWl0pLyk7XHJcblxyXG5cdGlmKGNodW5rc1swXT09XCJcIikge1xyXG5cdFx0Y2h1bmtzLnNoaWZ0KCk7XHJcblx0fVxyXG5cdGlmKC9eKFtBLVpdKXsxfSQvLnRlc3QoY2h1bmtzWzBdKSkge1xyXG5cdFx0Y2h1bmtzWzBdID0gY2h1bmtzWzBdLnRvTG93ZXJDYXNlKCk7XHJcblx0fVxyXG5cdHN0ciA9IGNodW5rcy5qb2luKFwiXCIpO1xyXG5cdGNodW5rcyA9IHN0ci5zcGxpdCgvKFtBLVpdKS8pO1xyXG5cdGNodW5rcyA9IGNodW5rcy5tYXAoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0aWYoL14oW0EtWl0pezF9JC8udGVzdChpdGVtKSkge1xyXG5cdFx0XHRpdGVtID0gYC0ke2l0ZW19YDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIGNodW5rcy5qb2luKFwiXCIpLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGFzaGlmeVNuYWtlQ2FzZTsiLCJjb25zdCBHZW5lcmF0ZVJhbmRvbU51bWJlciA9IHJlcXVpcmUoJy4vR2VuZXJhdGVSYW5kb21OdW1iZXIuanMnKTtcclxuXHJcbmNvbnN0IEdlbmVyYXRlUmFuZG9tSWQgPSBmdW5jdGlvbihwcmVmaXggPSBcInJuZFwiKSB7XHJcblx0bGV0IGlkID0gW1xyXG5cdFx0cHJlZml4LFxyXG5cdFx0R2VuZXJhdGVSYW5kb21OdW1iZXIoMTAwMCwgOTk5OSksXHJcblx0XHQoRGF0ZS5ub3coKSArICcnKS5zdWJzdHIoNSksXHJcblx0XS5qb2luKFwiX1wiKTtcclxuXHJcblx0cmV0dXJuIGlkO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyYXRlUmFuZG9tSWQ7IiwiY29uc3QgR2VuZXJhdGVSYW5kb21OdW1iZXIgPSBmdW5jdGlvbihtaW49MCwgbWF4PTkpIHtcclxuXHRtaW4gPSBNYXRoLmNlaWwobWluKTtcclxuXHRtYXggPSBNYXRoLmZsb29yKG1heCk7XHJcblxyXG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyYXRlUmFuZG9tTnVtYmVyOyIsImNvbnN0IFRyaW1XaGl0ZVNwYWNlID0gcmVxdWlyZSgnLi9UcmltV2hpdGVTcGFjZS5qcycpO1xyXG5cclxuY29uc3QgcmVwbGFjZSA9IGZ1bmN0aW9uKHN0ciwgZmluZCwgcmVwbGFjZSkge1xyXG5cdHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGAoJHtmaW5kfSlgLCAnZycpLCByZXBsYWNlKTsgXHJcbn1cclxuXHJcbmNvbnN0IEludGVycG9sYXRlVGV4dCA9IGZ1bmN0aW9uKGRhdGEsIHRleHQpIHtcclxuXHRpZih0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdHJldHVybiB0ZXh0O1xyXG5cdH1cclxuXHJcblx0dGV4dCA9IHJlcGxhY2UodGV4dCwgJ3t7JywgJyR7Jyk7XHJcblx0dGV4dCA9IHJlcGxhY2UodGV4dCwgJ319JywgJ30nKTs7XHJcblxyXG5cdGxldCBmbkJvZHkgPSBgXHJcblx0XHRsZXQgeyAke09iamVjdC5rZXlzKGRhdGEpLmpvaW4oXCIsIFwiKX0gfSA9IGRhdGE7XHJcblxyXG5cdFx0cmV0dXJuIFxcYCR7dGV4dH1cXGA7XHJcblx0YDtcclxuXHRsZXQgZm4gPSBuZXcgRnVuY3Rpb24oJ2RhdGEnLCBmbkJvZHkpO1xyXG5cdFxyXG5cdHJldHVybiBUcmltV2hpdGVTcGFjZShmbihkYXRhKSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW50ZXJwb2xhdGVUZXh0OyIsImNvbnN0IElzVGhlbmFibGUgPSBmdW5jdGlvbihmbikge1xyXG4gICAgaWYoIWZuKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpc1Byb21pc2UgPSBmbiBpbnN0YW5jZW9mIFByb21pc2U7XHJcbiAgICBsZXQgaXNBc3luYyA9IGZuLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdBc3luY0Z1bmN0aW9uJztcclxuICAgIFxyXG4gICAgcmV0dXJuIGlzUHJvbWlzZSB8fCBpc0FzeW5jO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElzVGhlbmFibGU7IiwiY29uc3QgTWVyZ2VPYmplY3QgPSBmdW5jdGlvbihkb21pbmFudE9iamVjdCwgd2Vha09iamVjdCkge1xyXG5cdGxldCB3ZWFrT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKHdlYWtPYmplY3QpO1xyXG5cclxuXHRmb3IobGV0IGk9MDsgaTx3ZWFrT2JqZWN0S2V5cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IGtleSA9IHdlYWtPYmplY3RLZXlzW2ldO1xyXG5cclxuXHRcdGlmKGRvbWluYW50T2JqZWN0W2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRkb21pbmFudE9iamVjdFtrZXldID0gd2Vha09iamVjdFtrZXldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRvbWluYW50T2JqZWN0O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lcmdlT2JqZWN0OyIsImNvbnN0IFNldERlZmF1bHRDb25maWcgPSBmdW5jdGlvbihkZWZhdWx0Q29uZmlnLCBzdXBwbGllZENvbmZpZykge1xyXG5cdGxldCBkZWZhdWx0Q29uZmlnS2V5cyA9IE9iamVjdC5rZXlzKGRlZmF1bHRDb25maWcpO1xyXG5cclxuXHRmb3IobGV0IGk9MDsgaTxkZWZhdWx0Q29uZmlnS2V5cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IGtleSA9IGRlZmF1bHRDb25maWdLZXlzW2ldO1xyXG5cclxuXHRcdGlmKHN1cHBsaWVkQ29uZmlnW2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRzdXBwbGllZENvbmZpZ1trZXldID0gZGVmYXVsdENvbmZpZ1trZXldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN1cHBsaWVkQ29uZmlnO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNldERlZmF1bHRDb25maWc7IiwiY29uc3QgVHJpbVdoaXRlU3BhY2UgPSBmdW5jdGlvbihzdHIpIHtcclxuXHRsZXQgY2h1bmtzID0gc3RyLnNwbGl0KC9cXHMvKTtcclxuXHRsZXQgY2hhcnMgPSBbXTtcclxuXHJcblx0Zm9yKGxldCBpPTA7IGk8Y2h1bmtzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQgY2h1bmsgPSBjaHVua3NbaV07XHJcblxyXG5cdFx0aWYoY2h1bms9PVwiXCIpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2hhcnMucHVzaChjaHVuayk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY2hhcnMuam9pbihcIiBcIik7XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmltV2hpdGVTcGFjZTsiLCJjb25zdCBBdHRyaWJ1dGVzRXh0cmFjdG9yID0gcmVxdWlyZSgnLi9BdHRyaWJ1dGVzRXh0cmFjdG9yLmpzJyk7XHJcbmNvbnN0IERhc2hpZnlTbmFrZUNhc2UgPSByZXF1aXJlKCcuL0Rhc2hpZnlTbmFrZUNhc2UuanMnKTtcclxuY29uc3QgR2VuZXJhdGVSYW5kb21JZCA9IHJlcXVpcmUoJy4vR2VuZXJhdGVSYW5kb21JZC5qcycpO1xyXG5jb25zdCBHZW5lcmF0ZVJhbmRvbU51bWJlciA9IHJlcXVpcmUoJy4vR2VuZXJhdGVSYW5kb21OdW1iZXIuanMnKTtcclxuY29uc3QgSW50ZXJwb2xhdGVUZXh0ID0gcmVxdWlyZSgnLi9JbnRlcnBvbGF0ZVRleHQuanMnKTtcclxuY29uc3QgSXNUaGVuYWJsZSA9IHJlcXVpcmUoJy4vSXNUaGVuYWJsZS5qcycpO1xyXG5jb25zdCBNZXJnZU9iamVjdCA9IHJlcXVpcmUoJy4vTWVyZ2VPYmplY3QuanMnKTtcclxuY29uc3QgU2V0RGVmYXVsdENvbmZpZyA9IHJlcXVpcmUoJy4vU2V0RGVmYXVsdENvbmZpZy5qcycpO1xyXG5jb25zdCBUcmltV2hpdGVTcGFjZSA9IHJlcXVpcmUoJy4vVHJpbVdoaXRlU3BhY2UuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdEF0dHJpYnV0ZXNFeHRyYWN0b3IsXHJcblx0RGFzaGlmeVNuYWtlQ2FzZSxcclxuXHRHZW5lcmF0ZVJhbmRvbUlkLFxyXG5cdEdlbmVyYXRlUmFuZG9tTnVtYmVyLFxyXG5cdEludGVycG9sYXRlVGV4dCxcclxuXHRJc1RoZW5hYmxlLFxyXG5cdE1lcmdlT2JqZWN0LFxyXG5cdFNldERlZmF1bHRDb25maWcsXHJcblx0VHJpbVdoaXRlU3BhY2UsXHJcbn0iXX0=
