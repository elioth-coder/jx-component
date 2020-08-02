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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./utils/index.js'),
    GenerateRandomId = _require.GenerateRandomId;

var Component = /*#__PURE__*/function () {
  function Component(_ref) {
    var name = _ref.name,
        styleId = _ref.styleId,
        style = _ref.style,
        template = _ref.template,
        data = _ref.data,
        events = _ref.events,
        methods = _ref.methods,
        lifeCycle = _ref.lifeCycle,
        components = _ref.components,
        attributes = _ref.attributes,
        parent = _ref.parent;

    _classCallCheck(this, Component);

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
  }

  _createClass(Component, [{
    key: "parentComponent",
    value: function parentComponent() {
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
      var script = "\n            (function(){\n                return self".concat(repeatString('.parent', n + 1), "\n            })()\n        ");
      var parent = eval(script);
      return parent;
    }
  }, {
    key: "createInstance",
    value: function createInstance(parent) {
      var createdInstance = Object.create(this);
      createdInstance.setParent(parent).setId();
      return createdInstance;
    }
  }, {
    key: "render",
    value: function render() {
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

        var _require2 = require('./utils/index.js'),
            IsThenable = _require2.IsThenable;

        if (IsThenable(returnValue)) {
          returnValue.then(function () {
            this.onRender(config);
            this.afterRender();
          }.bind(this))["catch"](function (e) {
            var ComponentException = require('./ComponentException.js');

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
    }
  }, {
    key: "hierarchy",
    value: function hierarchy() {
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
    }
  }, {
    key: "renameComponents",
    value: function renameComponents() {
      var components = this.components;

      for (var key in components) {
        var component = components[key];

        var _require3 = require('./utils/index.js'),
            DashifySnakeCase = _require3.DashifySnakeCase;

        component.name = DashifySnakeCase(key);
        components[key] = component;
      }

      this.components = components;
    }
  }, {
    key: "tweakLifeCycle",
    value: function tweakLifeCycle() {
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
    }
  }, {
    key: "onInit",
    value: function onInit() {
      return this.lifeCycle.onInit();
    }
  }, {
    key: "beforeRender",
    value: function beforeRender() {
      return this.lifeCycle.beforeRender();
    }
  }, {
    key: "onRender",
    value: function onRender(config) {
      this.renderStyle();
      this.renderTemplate(config);
      this.renderIf();
      this.renderShow();
      this.registerMethods();
      this.registerEvents();
      this.registerRemoveSelfEvent();
      this.registerDomRefs();
    }
  }, {
    key: "renderStyle",
    value: function renderStyle() {
      var style = this.style;

      if (!style) {
        return;
      }

      if (!this.styleExists()) {
        var head0 = $('head')[0];
        var $head0 = $(head0);
        $head0.append(this.generateStyle());
      }
    }
  }, {
    key: "styleExists",
    value: function styleExists() {
      var styleId = this.styleId;
      return $("style[itemid=\"".concat(styleId, "\"]")).length;
    }
  }, {
    key: "generateStyle",
    value: function generateStyle() {
      var styleId = this.styleId,
          style = this.style;

      var _require4 = require('./utils/index.js'),
          InterpolateText = _require4.InterpolateText,
          TrimWhiteSpace = _require4.TrimWhiteSpace;

      var styleTag = "\n                    <style itemid=\"".concat(styleId, "\">\n                        ").concat(InterpolateText({
        styleId: styleId
      }, style), "\n                    </style>\n                ");
      return TrimWhiteSpace(styleTag);
    }
  }, {
    key: "renderTemplate",
    value: function renderTemplate(config) {
      var id = this.id;
      var defaultConfig = {
        targetElement: document.body,
        renderType: 'replaceWith'
      };

      var _require5 = require('./utils/index.js'),
          SetDefaultConfig = _require5.SetDefaultConfig;

      var _SetDefaultConfig = SetDefaultConfig(defaultConfig, config),
          targetElement = _SetDefaultConfig.targetElement,
          renderType = _SetDefaultConfig.renderType;

      var template = this.generateTemplate();
      var $targetElement = $(targetElement);

      if (!$targetElement.length) {
        var ComponentException = require('./ComponentException.js');

        throw new ComponentException(["'targetElement' does not exists."].join(" "));
      }

      if (renderType == 'replaceWith') {
        var $onInitElement = $("[on_init_".concat(id, "]"));

        if ($onInitElement.length) {
          $targetElement = $onInitElement;
        }
      }

      $targetElement[renderType](template);
    }
  }, {
    key: "generateTemplate",
    value: function generateTemplate() {
      var id = this.id,
          name = this.name,
          styleId = this.styleId,
          template = this.template,
          data = this.data,
          attributes = this.attributes;
      var $template0;

      var _require6 = require('./utils/index.js'),
          InterpolateText = _require6.InterpolateText;

      template = $.parseHTML(InterpolateText(data, template));
      $template0 = $(template[0]);

      var ComponentException = require('./ComponentException.js');

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
    }
  }, {
    key: "renderIf",
    value: function renderIf() {
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
        var script = "\n                (function(){\n                    let { ".concat(Object.keys(data).join(","), " } = data;\n        \n                    return ").concat(expression, "\n                })()\n                ");
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
    }
  }, {
    key: "renderShow",
    value: function renderShow() {
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
        var script = "\n                (function(){\n                    let { ".concat(Object.keys(data).join(","), " } = data;\n        \n                    return ").concat(expression, "\n                })()\n                ");

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
    }
  }, {
    key: "registerMethods",
    value: function registerMethods() {
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
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
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
            var debounce = require('lodash/debounce');

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
    }
  }, {
    key: "registerRemoveSelfEvent",
    value: function registerRemoveSelfEvent() {
      var self = this;
      var id = self.id;
      var $self = $("#".concat(id));
      $self.on('DOMNodeRemoved', function (e) {
        var ComponentCollection = require('./ComponentCollection.js');

        ComponentCollection.filter();
      });
    }
  }, {
    key: "registerDomRefs",
    value: function registerDomRefs() {
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
    }
  }, {
    key: "afterRender",
    value: function afterRender() {
      var afterRender = this.lifeCycle.afterRender;
      var returnValue;

      if (afterRender) {
        returnValue = this.lifeCycle.afterRender();
      }

      var _require7 = require('./utils/index.js'),
          IsThenable = _require7.IsThenable;

      if (IsThenable(returnValue)) {
        returnValue.then(function () {
          this.renderComponents();
        }.bind(this))["catch"](function (e) {
          var ComponentException = require('./ComponentException.js');

          throw new ComponentException(e.message);
        });
        return;
      }

      this.renderComponents();
      this.removeOnInitElement();

      var ComponentCollection = require('./ComponentCollection.js');

      ComponentCollection.add(this);
    }
  }, {
    key: "renderComponents",
    value: function renderComponents() {
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
    }
  }, {
    key: "replaceComponentTags",
    value: function replaceComponentTags() {
      var components = this.components;
      var $self = this.$refs.$self;
      var replacedComponentTags = [];

      var findComponents = function findComponents(name) {
        var elements = [].concat(_toConsumableArray($self.find(name)), _toConsumableArray($self.find("[component-alias=\"".concat(name, "\"]"))));
        return elements;
      };

      var replace = function replace(elements, component) {
        var _require8 = require('./utils/index.js'),
            GenerateRandomId = _require8.GenerateRandomId,
            AttributesExtractor = _require8.AttributesExtractor;

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
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(replaced) {
      var listExpression = replaced.attributes['data-list'];

      if (listExpression) {
        return this.renderListComponent(replaced);
      }

      this.renderSingularComponent(replaced);
    }
  }, {
    key: "renderListComponent",
    value: function renderListComponent(replaced) {
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
        var ComponentException = require('./ComponentException.js');

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

        var _require9 = require('./utils/index.js'),
            GenerateRandomId = _require9.GenerateRandomId;

        component.setAttributes(attributes).setId(GenerateRandomId('cid')).setParent(this).setData(componentData).render(config);
      }.bind(this);

      var extractComponentData = function extractComponentData(item) {
        var componentData = {};
        var script = "\n                            (function() { \n                                let ".concat(bindExpression, " = item;\n                                return ").concat(bindExpression, "\n                            })()\n                        ");
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
    }
  }, {
    key: "setAttributes",
    value: function setAttributes() {
      var DomAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var attributes = this.attributes;

      if (_typeof(DomAttributes) !== 'object') {
        DomAttributes = {};
      }

      this.attributes = Object.assign(attributes, DomAttributes);
      return this;
    }
  }, {
    key: "setId",
    value: function setId() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GenerateRandomId('cid');
      this.id = id;
      return this;
    }
  }, {
    key: "setParent",
    value: function setParent(parent) {
      this.parent = parent;
      return this;
    }
  }, {
    key: "setData",
    value: function setData(passedData) {
      var data = this.data;

      var _require10 = require('./utils/index.js'),
          MergeObject = _require10.MergeObject;

      this.data = MergeObject(passedData, data);
      return this;
    }
  }, {
    key: "renderSingularComponent",
    value: function renderSingularComponent(replaced) {
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
            var script = "\n                                    (function () {\n                                        let { ".concat(Object.keys(data).join(", "), " } = data;\n                                        let fn = function () {\n                                            let ").concat(dataExpression, ";\n                        \n                                            return ").concat(valueExpression, ";\n                                        }\n                        \n                                        return fn();\n                                    })()\n                                ");
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
    }
  }, {
    key: "removeOnInitElement",
    value: function removeOnInitElement() {
      var id = this.id;
      $("[on_init_".concat(id, "]")).remove();
    }
  }, {
    key: "renderOnInitElement",
    value: function renderOnInitElement(template) {
      var data = this.data,
          id = this.id;

      var generateTemplate = function generateTemplate(template, data, id) {
        var $template0;

        var _require11 = require('./utils/index.js'),
            InterpolateText = _require11.InterpolateText;

        template = $.parseHTML(InterpolateText(data, template));
        $template0 = $(template[0]);

        var ComponentException = require('./ComponentException.js');

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

      template = generateTemplate(template, data, id);
      var renderConfig = this.renderConfig;
      var defaultConfig = {
        targetElement: document.body,
        renderType: 'replaceWith'
      };

      var _require12 = require('./utils/index.js'),
          SetDefaultConfig = _require12.SetDefaultConfig;

      var _SetDefaultConfig2 = SetDefaultConfig(defaultConfig, renderConfig),
          targetElement = _SetDefaultConfig2.targetElement,
          renderType = _SetDefaultConfig2.renderType;

      $(targetElement)[renderType](template);
    }
  }, {
    key: "refreshRenderedList",
    value: function refreshRenderedList(targetElement, items, listItemComponent, noItemsComponent) {
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
        var listItem = listItemComponent.createInstance(this);
        var item = items[i];
        item.index = [i];
        listItem.setData(item);
        listItem.render({
          targetElement: targetElement,
          renderType: 'append'
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var styleId = this.styleId;
      var $self = this.$refs.$self;
      $self[0].remove();
      var similarComponents = $("[".concat(styleId, "]"));

      if (!similarComponents.length) {
        this.removeStyle();
      }
    }
  }, {
    key: "removeStyle",
    value: function removeStyle() {
      var styleId = this.styleId;
      $("style[itemid=\"".concat(styleId, "\"]")).remove();
    }
  }]);

  return Component;
}();

module.exports = Component;

},{"./ComponentCollection.js":15,"./ComponentException.js":17,"./utils/index.js":27,"lodash/debounce":8}],15:[function(require,module,exports){
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
    return new Component(config);
  }
};
module.exports = ComponentConstructor;

},{"./Component.js":14,"./utils/index.js":27}],17:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
"use strict";

var GenerateRandomNumber = require('./GenerateRandomNumber.js');

var GenerateRandomId = function GenerateRandomId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "rnd";
  var id = [prefix, GenerateRandomNumber(1000, 9999), (Date.now() + '').substr(5)].join("_");
  return id;
};

module.exports = GenerateRandomId;

},{"./GenerateRandomNumber.js":21}],21:[function(require,module,exports){
"use strict";

var GenerateRandomNumber = function GenerateRandomNumber() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = GenerateRandomNumber;

},{}],22:[function(require,module,exports){
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

},{"./TrimWhiteSpace.js":26}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./AttributesExtractor.js":18,"./DashifySnakeCase.js":19,"./GenerateRandomId.js":20,"./GenerateRandomNumber.js":21,"./InterpolateText.js":22,"./IsThenable.js":23,"./MergeObject.js":24,"./SetDefaultConfig.js":25,"./TrimWhiteSpace.js":26}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90b051bWJlci5qcyIsInNyYy9Db21wb25lbnQuanMiLCJzcmMvQ29tcG9uZW50Q29sbGVjdGlvbi5qcyIsInNyYy9Db21wb25lbnRDb25zdHJ1Y3Rvci5qcyIsInNyYy9Db21wb25lbnRFeGNlcHRpb24uanMiLCJzcmMvdXRpbHMvQXR0cmlidXRlc0V4dHJhY3Rvci5qcyIsInNyYy91dGlscy9EYXNoaWZ5U25ha2VDYXNlLmpzIiwic3JjL3V0aWxzL0dlbmVyYXRlUmFuZG9tSWQuanMiLCJzcmMvdXRpbHMvR2VuZXJhdGVSYW5kb21OdW1iZXIuanMiLCJzcmMvdXRpbHMvSW50ZXJwb2xhdGVUZXh0LmpzIiwic3JjL3V0aWxzL0lzVGhlbmFibGUuanMiLCJzcmMvdXRpbHMvTWVyZ2VPYmplY3QuanMiLCJzcmMvdXRpbHMvU2V0RGVmYXVsdENvbmZpZy5qcyIsInNyYy91dGlscy9UcmltV2hpdGVTcGFjZS5qcyIsInNyYy91dGlscy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsOEJBQUQsQ0FBbkM7O0FBQ0EsSUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsNkJBQUQsQ0FBbEM7O0FBQ0EsSUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsK0JBQUQsQ0FBcEM7O0FBQ0EsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLG9CQUFELENBQXpCOztBQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBQ2hCLEVBQUEsbUJBQW1CLEVBQW5CLG1CQURnQjtBQUVoQixFQUFBLGtCQUFrQixFQUFsQixrQkFGZ0I7QUFHaEIsRUFBQSxvQkFBb0IsRUFBcEIsb0JBSGdCO0FBSWhCLEVBQUEsU0FBUyxFQUFUO0FBSmdCLENBQWpCOzs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFnQixHQUFHLE9BQU8sQ0FBQyx1QkFBRCxDQUFoQzs7QUFDQSxJQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQywyQkFBRCxDQUFwQzs7QUFDQSxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsc0JBQUQsQ0FBL0I7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGlCQUFELENBQTFCOztBQUNBLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxrQkFBRCxDQUEzQjs7QUFDQSxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx1QkFBRCxDQUFoQzs7QUFDQSxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMscUJBQUQsQ0FBOUI7O0FBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUFDaEIsRUFBQSxtQkFBbUIsRUFBbkIsbUJBRGdCO0FBRWhCLEVBQUEsZ0JBQWdCLEVBQWhCLGdCQUZnQjtBQUdoQixFQUFBLGdCQUFnQixFQUFoQixnQkFIZ0I7QUFJaEIsRUFBQSxvQkFBb0IsRUFBcEIsb0JBSmdCO0FBS2hCLEVBQUEsZUFBZSxFQUFmLGVBTGdCO0FBTWhCLEVBQUEsVUFBVSxFQUFWLFVBTmdCO0FBT2hCLEVBQUEsV0FBVyxFQUFYLFdBUGdCO0FBUWhCLEVBQUEsZ0JBQWdCLEVBQWhCLGdCQVJnQjtBQVNoQixFQUFBLGNBQWMsRUFBZDtBQVRnQixDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSByZXF1aXJlKCcuL3NyYy9Db21wb25lbnRDb2xsZWN0aW9uLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG5jb25zdCBDb21wb25lbnRDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudENvbnN0cnVjdG9yLmpzJyk7XHJcbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc3JjL0NvbXBvbmVudC5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Q29tcG9uZW50Q29sbGVjdGlvbixcclxuXHRDb21wb25lbnRFeGNlcHRpb24sXHJcblx0Q29tcG9uZW50Q29uc3RydWN0b3IsXHJcblx0Q29tcG9uZW50LFxyXG59IiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBub3cgPSByZXF1aXJlKCcuL25vdycpLFxuICAgIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgdGltZVdhaXRpbmcgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nXG4gICAgICA/IG5hdGl2ZU1pbih0aW1lV2FpdGluZywgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpXG4gICAgICA6IHRpbWVXYWl0aW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbm93O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXI7XG4iLCJjb25zdCB7IEdlbmVyYXRlUmFuZG9tSWQgfSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNsYXNzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBzdHlsZUlkLFxyXG4gICAgICAgIHN0eWxlLFxyXG4gICAgICAgIHRlbXBsYXRlLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgZXZlbnRzLFxyXG4gICAgICAgIG1ldGhvZHMsXHJcbiAgICAgICAgbGlmZUN5Y2xlLFxyXG4gICAgICAgIGNvbXBvbmVudHMsXHJcbiAgICAgICAgYXR0cmlidXRlcyxcclxuICAgICAgICBwYXJlbnQsXHJcbiAgICB9KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IEdlbmVyYXRlUmFuZG9tSWQoJ2NpZCcpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zdHlsZUlkID0gc3R5bGVJZDtcclxuICAgICAgICB0aGlzLnN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XHJcbiAgICAgICAgdGhpcy5tZXRob2RzID0gbWV0aG9kcztcclxuICAgICAgICB0aGlzLmxpZmVDeWNsZSA9IGxpZmVDeWNsZTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XHJcbiAgICAgICAgdGhpcy4kcmVmcyA9IHt9O1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHBhcmVudENvbXBvbmVudChuID0gMCkge1xyXG4gICAgICAgIGxldCByZXBlYXRTdHJpbmcgPSBmdW5jdGlvbiAoc3RyID0gJzAnLCBuID0gMCkge1xyXG4gICAgICAgICAgICBsZXQgcmVwZWF0ZWRTdHJpbmcgPSBgYDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXBlYXRlZFN0cmluZyArPSBzdHI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXBlYXRlZFN0cmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgICAgIChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYke3JlcGVhdFN0cmluZygnLnBhcmVudCcsIG4gKyAxKX1cclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2YWwoc2NyaXB0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVJbnN0YW5jZShwYXJlbnQpIHtcclxuICAgICAgICBsZXQgY3JlYXRlZEluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcclxuICAgICAgICBjcmVhdGVkSW5zdGFuY2VcclxuICAgICAgICAgICAgLnNldFBhcmVudChwYXJlbnQpXHJcbiAgICAgICAgICAgIC5zZXRJZCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gY3JlYXRlZEluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihjb25maWcgPSB7fSkge1xyXG4gICAgICAgIGxldCBoaWVyYXJjaHkgPSB0aGlzLmhpZXJhcmNoeSgpLmpvaW4oXCIgPiBcIik7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyQ29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgIHRoaXMucmVuYW1lQ29tcG9uZW50cygpO1xyXG4gICAgICAgIHRoaXMudHdlYWtMaWZlQ3ljbGUoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHsgYmVmb3JlUmVuZGVyLCBvbkluaXQsIH0gPSB0aGlzLmxpZmVDeWNsZTtcclxuICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9uSW5pdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmVmb3JlUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHRoaXMuYmVmb3JlUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHsgSXNUaGVuYWJsZSB9ID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC5qcycpO1xyXG4gICAgICAgICAgICBpZiAoSXNUaGVuYWJsZShyZXR1cm5WYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SZW5kZXIoY29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyUmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IENvbXBvbmVudEV4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vQ29tcG9uZW50RXhjZXB0aW9uLmpzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXIoY29uZmlnKTtcclxuICAgICAgICAgICAgdGhpcy5hZnRlclJlbmRlcigpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IFtcclxuICAgICAgICAgICAgICAgIGhpZXJhcmNoeSxcclxuICAgICAgICAgICAgICAgIGUubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIGUuc3RhY2ssXHJcbiAgICAgICAgICAgIF0uam9pbihcIlxcblwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGllcmFyY2h5KCkge1xyXG4gICAgICAgIGxldCB7IG5hbWUgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGhpZXJhcmNoeSA9IFtdO1xyXG4gICAgICAgIGxldCB3aGlsZVBhcmVudEV4aXN0cyA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuICAgICAgICAgICAgbGV0IHsgcGFyZW50IH0gPSBjb21wb25lbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnROYW1lID0gKHBhcmVudC5uYW1lKSA/IHBhcmVudC5uYW1lIDogJ3Jvb3QnO1xyXG5cclxuICAgICAgICAgICAgaGllcmFyY2h5LnB1c2gocGFyZW50TmFtZSk7XHJcbiAgICAgICAgICAgIHdoaWxlUGFyZW50RXhpc3RzKHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZVBhcmVudEV4aXN0cyh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKGhpZXJhcmNoeS5sZW5ndGggPT0gMCAmJiBuYW1lID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBoaWVyYXJjaHkucHVzaCgncm9vdCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhpZXJhcmNoeS5wdXNoKG5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhpZXJhcmNoeTtcclxuICAgIH1cclxuXHJcbiAgICByZW5hbWVDb21wb25lbnRzKCkge1xyXG4gICAgICAgIGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB7IERhc2hpZnlTbmFrZUNhc2UgfSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuICAgICAgICAgICAgY29tcG9uZW50Lm5hbWUgPSBEYXNoaWZ5U25ha2VDYXNlKGtleSk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudHNba2V5XSA9IGNvbXBvbmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgdHdlYWtMaWZlQ3ljbGUoKSB7XHJcbiAgICAgICAgbGV0IHsgbGlmZUN5Y2xlIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobGlmZUN5Y2xlKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICBsZXQgZm4gPSBsaWZlQ3ljbGVba2V5XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpZmVDeWNsZVtrZXldID0gZm4uYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGlmZUN5Y2xlID0gbGlmZUN5Y2xlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saWZlQ3ljbGUub25Jbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmVmb3JlUmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpZmVDeWNsZS5iZWZvcmVSZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlbmRlcihjb25maWcpIHtcclxuICAgICAgICB0aGlzLnJlbmRlclN0eWxlKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUZW1wbGF0ZShjb25maWcpO1xyXG4gICAgICAgIHRoaXMucmVuZGVySWYoKTtcclxuICAgICAgICB0aGlzLnJlbmRlclNob3coKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTWV0aG9kcygpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVtb3ZlU2VsZkV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckRvbVJlZnMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdHlsZSgpIHtcclxuICAgICAgICBsZXQgeyBzdHlsZSB9ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCFzdHlsZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5zdHlsZUV4aXN0cygpKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkMCA9ICQoJ2hlYWQnKVswXTtcclxuICAgICAgICAgICAgbGV0ICRoZWFkMCA9ICQoaGVhZDApO1xyXG5cclxuICAgICAgICAgICAgJGhlYWQwLmFwcGVuZCh0aGlzLmdlbmVyYXRlU3R5bGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0eWxlRXhpc3RzKCkge1xyXG4gICAgICAgIGxldCB7IHN0eWxlSWQgfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiAkKGBzdHlsZVtpdGVtaWQ9XCIke3N0eWxlSWR9XCJdYCkubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlU3R5bGUoKSB7XHJcbiAgICAgICAgbGV0IHsgc3R5bGVJZCwgc3R5bGUgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBJbnRlcnBvbGF0ZVRleHQsIFRyaW1XaGl0ZVNwYWNlIH0gPSByZXF1aXJlKCcuL3V0aWxzL2luZGV4LmpzJyk7XHJcbiAgICAgICAgbGV0IHN0eWxlVGFnID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxzdHlsZSBpdGVtaWQ9XCIke3N0eWxlSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7SW50ZXJwb2xhdGVUZXh0KHsgc3R5bGVJZCB9LCBzdHlsZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBUcmltV2hpdGVTcGFjZShzdHlsZVRhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVGVtcGxhdGUoY29uZmlnKSB7XHJcbiAgICAgICAgbGV0IHsgaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRDb25maWcgPSB7XHJcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQ6IGRvY3VtZW50LmJvZHksXHJcbiAgICAgICAgICAgIHJlbmRlclR5cGU6ICdyZXBsYWNlV2l0aCcsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB7IFNldERlZmF1bHRDb25maWcgfSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuICAgICAgICBsZXQgeyB0YXJnZXRFbGVtZW50LCByZW5kZXJUeXBlIH0gPSBTZXREZWZhdWx0Q29uZmlnKGRlZmF1bHRDb25maWcsIGNvbmZpZyk7XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gdGhpcy5nZW5lcmF0ZVRlbXBsYXRlKCk7XHJcbiAgICAgICAgbGV0ICR0YXJnZXRFbGVtZW50ID0gJCh0YXJnZXRFbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCEkdGFyZ2V0RWxlbWVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgICAgICBgJ3RhcmdldEVsZW1lbnQnIGRvZXMgbm90IGV4aXN0cy5gLFxyXG4gICAgICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlbmRlclR5cGUgPT0gJ3JlcGxhY2VXaXRoJykge1xyXG4gICAgICAgICAgICBsZXQgJG9uSW5pdEVsZW1lbnQgPSAkKGBbb25faW5pdF8ke2lkfV1gKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkb25Jbml0RWxlbWVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICR0YXJnZXRFbGVtZW50ID0gJG9uSW5pdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICR0YXJnZXRFbGVtZW50W3JlbmRlclR5cGVdKHRlbXBsYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZVRlbXBsYXRlKCkge1xyXG4gICAgICAgIGxldCB7IGlkLCBuYW1lLCBzdHlsZUlkLCB0ZW1wbGF0ZSwgZGF0YSwgYXR0cmlidXRlcyB9ID0gdGhpcztcclxuICAgICAgICBsZXQgJHRlbXBsYXRlMDtcclxuXHJcbiAgICAgICAgY29uc3QgeyBJbnRlcnBvbGF0ZVRleHQgfSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuICAgICAgICB0ZW1wbGF0ZSA9ICQucGFyc2VIVE1MKEludGVycG9sYXRlVGV4dChkYXRhLCB0ZW1wbGF0ZSkpO1xyXG4gICAgICAgICR0ZW1wbGF0ZTAgPSAkKHRlbXBsYXRlWzBdKTtcclxuXHJcbiAgICAgICAgY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuICAgICAgICBpZiAodGVtcGxhdGUubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IENvbXBvbmVudEV4Y2VwdGlvbihbXHJcbiAgICAgICAgICAgICAgICBgQ29tcG9uZW50IGRvIG5vdCBoYXZlIGEgdGVtcGxhdGUuYCxcclxuICAgICAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZW1wbGF0ZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICAgICAgYHRlbXBsYXRlIG11c3QgYmUgZW5jbG9zZWQgaW4gYWAsXHJcbiAgICAgICAgICAgICAgICBgc2luZ2xlIGJsb2NrLWxldmVsIGVsZW1lbnQuYCxcclxuICAgICAgICAgICAgXS5qb2luKFwiIFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZW1wbGF0ZVswXS5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgICAgIGB0ZW1wbGF0ZSBtdXN0IGJlIGVuY2xvc2VkIGluIGFgLFxyXG4gICAgICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHRlbXBsYXRlMFxyXG4gICAgICAgICAgICAuYXR0cihhdHRyaWJ1dGVzKVxyXG4gICAgICAgICAgICAuYXR0cignY29tcG9uZW50LW5hbWUnLCBuYW1lKVxyXG4gICAgICAgICAgICAuYXR0cihzdHlsZUlkLCAnJylcclxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgaWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVySWYoKSB7XHJcbiAgICAgICAgbGV0IHsgaWQsIGRhdGEgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0ICRzZWxmID0gJChgIyR7aWR9YCk7XHJcbiAgICAgICAgbGV0IHJlbmRlcldoaWxlRXhpc3RzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudHMgPSAkc2VsZi5maW5kKGBbZGF0YS1pZl1gKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0ICRlbGVtZW50MCA9ICQoZWxlbWVudHNbMF0pO1xyXG4gICAgICAgICAgICBsZXQgZXhwcmVzc2lvbiA9ICRlbGVtZW50MC5hdHRyKCdkYXRhLWlmJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gYFxyXG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgJHtPYmplY3Qua2V5cyhkYXRhKS5qb2luKFwiLFwiKX0gfSA9IGRhdGE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICR7ZXhwcmVzc2lvbn1cclxuICAgICAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIGV4cHJlc3Npb24gPSBCb29sZWFuKGV2YWwoc2NyaXB0KSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXhwcmVzc2lvbiA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudDAucmVtb3ZlQXR0cignZGF0YS1pZicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChleHByZXNzaW9uICE9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50MC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtZW50cyA9ICRzZWxmLmZpbmQoYFtkYXRhLWlmXWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyV2hpbGVFeGlzdHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyV2hpbGVFeGlzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTaG93KCkge1xyXG4gICAgICAgIGxldCB7IGlkLCBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCAkc2VsZiA9ICQoYCMke2lkfWApO1xyXG4gICAgICAgIGxldCByZW5kZXJXaGlsZUV4aXN0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RhdGEtc2hvd11gKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0ICRlbGVtZW50MCA9ICQoZWxlbWVudHNbMF0pO1xyXG4gICAgICAgICAgICBsZXQgZXhwcmVzc2lvbiA9ICRlbGVtZW50MC5hdHRyKCdkYXRhLXNob3cnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeyAke09iamVjdC5rZXlzKGRhdGEpLmpvaW4oXCIsXCIpfSB9ID0gZGF0YTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHtleHByZXNzaW9ufVxyXG4gICAgICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIGlmICghZXZhbChzY3JpcHQpKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudDAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRlbGVtZW50MC5yZW1vdmVBdHRyKCdkYXRhLXNob3cnKTtcclxuICAgICAgICAgICAgZWxlbWVudHMgPSAkc2VsZi5maW5kKGBbZGF0YS1zaG93XWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyV2hpbGVFeGlzdHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyV2hpbGVFeGlzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck1ldGhvZHMoKSB7XHJcbiAgICAgICAgbGV0IHsgbWV0aG9kcyB9ID0gdGhpcztcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1ldGhvZHMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgIGxldCBmbiA9IG1ldGhvZHNba2V5XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1ldGhvZHNba2V5XSA9IGZuLmJpbmQodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1ldGhvZHMgPSBtZXRob2RzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyRXZlbnRzKCkge1xyXG4gICAgICAgIGxldCB7IGlkLCBldmVudHMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0ICRzZWxmID0gJChgIyR7aWR9YCk7XHJcbiAgICAgICAgbGV0IGRvbUV2ZW50cyA9IFtcclxuICAgICAgICAgICAgXCJibHVyLGZvY3VzLGxvYWQscmVzaXplLHNjcm9sbCx1bmxvYWQsYmVmb3JldW5sb2FkLFwiLFxyXG4gICAgICAgICAgICBcImNsaWNrLGRibGNsaWNrLG1vdXNlZG93bixtb3VzZXVwLG1vdXNlbW92ZSxtb3VzZW92ZXIsXCIsXHJcbiAgICAgICAgICAgIFwibW91c2VvdXQsbW91c2VlbnRlcixtb3VzZWxlYXZlLGNoYW5nZSxzZWxlY3Qsc3VibWl0LFwiLFxyXG4gICAgICAgICAgICBcImtleWRvd24sa2V5cHJlc3Msa2V5dXBcIlxyXG4gICAgICAgIF0uam9pbihcIlwiKS5zcGxpdChcIixcIik7XHJcblxyXG4gICAgICAgIGxldCBhZGRFdmVudFRvRWxlbWVudHMgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBlbGVtZW50cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQoZWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZuTmFtZSA9IGVsZW1lbnQuYXR0cihgb24tJHtldmVudE5hbWV9YCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm4gPSBldmVudHNbZm5OYW1lXTtcclxuICAgICAgICAgICAgICAgIGxldCBkZWJvdW5jZUF0dHJpYnV0ZSA9IGVsZW1lbnQuYXR0cignZGVib3VuY2UnKSArICcnO1xyXG4gICAgICAgICAgICAgICAgbGV0IFtldnQsIHdhaXRdID0gZGVib3VuY2VBdHRyaWJ1dGUuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgZXZ0ID0gZXZ0ICsgJycudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgd2FpdCA9IHBhcnNlSW50KHdhaXQgKyAnJy50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgd2FpdCA9IChpc05hTih3YWl0KSB8fCB3YWl0IDwgMCkgPyAwIDogd2FpdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHIoYG9uLSR7ZXZlbnROYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyKCdkZWJvdW5jZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldnQgPT0gZXZlbnROYW1lICYmIHdhaXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2gvZGVib3VuY2UnKTtcclxuICAgICAgICAgICAgICAgICAgICBmbiA9IGRlYm91bmNlKGZuLCB3YWl0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFpbGluZzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZuLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsZW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZuLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbUV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gZG9tRXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudHMgPSAkc2VsZi5maW5kKGBbb24tJHtldmVudE5hbWV9XWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRzZWxmLmF0dHIoYG9uLSR7ZXZlbnROYW1lfWApKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IChlbGVtZW50cyAmJiBlbGVtZW50cy5sZW5ndGgpID8gWy4uLmVsZW1lbnRzLCAkc2VsZl0gOiBbJHNlbGZdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGFkZEV2ZW50VG9FbGVtZW50cyhldmVudE5hbWUsIGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlclJlbW92ZVNlbGZFdmVudCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgaWQgfSA9IHNlbGY7XHJcbiAgICAgICAgbGV0ICRzZWxmID0gJChgIyR7aWR9YCk7XHJcblxyXG4gICAgICAgICRzZWxmLm9uKCdET01Ob2RlUmVtb3ZlZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSByZXF1aXJlKCcuL0NvbXBvbmVudENvbGxlY3Rpb24uanMnKTtcclxuICAgICAgICAgICAgQ29tcG9uZW50Q29sbGVjdGlvbi5maWx0ZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlckRvbVJlZnMoKSB7XHJcbiAgICAgICAgbGV0IHsgaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0ICRyZWZzID0ge307XHJcbiAgICAgICAgbGV0ICRzZWxmID0gJChgIyR7aWR9YCk7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gJHNlbGYuZmluZChgW2RvbXJlZl1gKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgJGVsZW1lbnQgPSAkKGVsZW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgbGV0IGRvbXJlZiA9ICRlbGVtZW50LmF0dHIoJ2RvbXJlZicpO1xyXG5cclxuICAgICAgICAgICAgJHJlZnNbYCQke2RvbXJlZn1gXSA9ICRlbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHJlZnNbYCRzZWxmYF0gPSAkc2VsZjtcclxuICAgICAgICB0aGlzLiRyZWZzID0gJHJlZnM7XHJcbiAgICB9XHJcblxyXG4gICAgYWZ0ZXJSZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHsgYWZ0ZXJSZW5kZXIgfSA9IHRoaXMubGlmZUN5Y2xlO1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKGFmdGVyUmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gdGhpcy5saWZlQ3ljbGUuYWZ0ZXJSZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgSXNUaGVuYWJsZSB9ID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC5qcycpO1xyXG4gICAgICAgIGlmIChJc1RoZW5hYmxlKHJldHVyblZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29tcG9uZW50cygpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVPbkluaXRFbGVtZW50KCk7XHJcbiAgICAgICAgY29uc3QgQ29tcG9uZW50Q29sbGVjdGlvbiA9IHJlcXVpcmUoJy4vQ29tcG9uZW50Q29sbGVjdGlvbi5qcycpO1xyXG4gICAgICAgIENvbXBvbmVudENvbGxlY3Rpb24uYWRkKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNvbXBvbmVudHMoKSB7XHJcbiAgICAgICAgbGV0IHsgY29tcG9uZW50cyB9ID0gdGhpcztcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGNvbXBvbmVudHMpO1xyXG5cclxuICAgICAgICBpZiAoIWtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlcGxhY2VkQ29tcG9uZW50VGFncyA9IHRoaXMucmVwbGFjZUNvbXBvbmVudFRhZ3MoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBsYWNlZENvbXBvbmVudFRhZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJlcGxhY2VkID0gcmVwbGFjZWRDb21wb25lbnRUYWdzW2ldO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQocmVwbGFjZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXBsYWNlQ29tcG9uZW50VGFncygpIHtcclxuICAgICAgICBsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7ICRzZWxmIH0gPSB0aGlzLiRyZWZzO1xyXG4gICAgICAgIGxldCByZXBsYWNlZENvbXBvbmVudFRhZ3MgPSBbXTtcclxuICAgICAgICBsZXQgZmluZENvbXBvbmVudHMgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudHMgPSBbXHJcbiAgICAgICAgICAgICAgICAuLi4kc2VsZi5maW5kKG5hbWUpLFxyXG4gICAgICAgICAgICAgICAgLi4uJHNlbGYuZmluZChgW2NvbXBvbmVudC1hbGlhcz1cIiR7bmFtZX1cIl1gKVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVwbGFjZSA9IGZ1bmN0aW9uIChlbGVtZW50cywgY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgR2VuZXJhdGVSYW5kb21JZCwgQXR0cmlidXRlc0V4dHJhY3RvciB9ID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC5qcycpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBHZW5lcmF0ZVJhbmRvbUlkKCdyaWQnKTtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQwID0gZWxlbWVudHNbMF07XHJcbiAgICAgICAgICAgIGxldCB0YWJsZUVsZW1lbnRzID0gXCJ0aGVhZCx0Ym9keSx0Zm9vdCx0cix0aCx0ZFwiO1xyXG4gICAgICAgICAgICBsZXQgdGFnTmFtZSA9IGVsZW1lbnQwLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgbGV0IHRhZyA9IChcclxuICAgICAgICAgICAgICAgIHRhYmxlRWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCIsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmluY2x1ZGVzKHRhZ05hbWUpXHJcbiAgICAgICAgICAgICkgPyB0YWdOYW1lIDogXCJ0ZW1wb3JhcnlcIjtcclxuICAgICAgICAgICAgbGV0ICRlbGVtZW50MCA9ICQoZWxlbWVudDApO1xyXG5cclxuICAgICAgICAgICAgcmVwbGFjZWRDb21wb25lbnRUYWdzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IE9iamVjdC5jcmVhdGUoY29tcG9uZW50KSxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZXNFeHRyYWN0b3IoZWxlbWVudDApLmV4dHJhY3QoKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRlbGVtZW50MC5yZXBsYWNlV2l0aChgPCR7dGFnfSBpZD1cIiR7aWR9XCIvPmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVwbGFjZVdoaWxlRXhpc3RzID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBsZXQgeyBuYW1lIH0gPSBjb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50cyA9IGZpbmRDb21wb25lbnRzKG5hbWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXBsYWNlKGVsZW1lbnRzLCBjb21wb25lbnQpO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudHMgPSBmaW5kQ29tcG9uZW50cyhuYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVwbGFjZVdoaWxlRXhpc3RzKGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcGxhY2VXaGlsZUV4aXN0cyhjb21wb25lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcGxhY2VkQ29tcG9uZW50VGFncztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJDb21wb25lbnQocmVwbGFjZWQpIHtcclxuICAgICAgICBsZXQgbGlzdEV4cHJlc3Npb24gPSByZXBsYWNlZC5hdHRyaWJ1dGVzWydkYXRhLWxpc3QnXTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3RFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxpc3RDb21wb25lbnQocmVwbGFjZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlclNpbmd1bGFyQ29tcG9uZW50KHJlcGxhY2VkKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJMaXN0Q29tcG9uZW50KHJlcGxhY2VkKSB7XHJcbiAgICAgICAgbGV0IHsgYXR0cmlidXRlcywgaWQgfSA9IHJlcGxhY2VkO1xyXG4gICAgICAgIGxldCBiaW5kRXhwcmVzc2lvbiA9IGF0dHJpYnV0ZXNbJ2RhdGEtYmluZCddO1xyXG4gICAgICAgIGxldCBsaXN0RXhwcmVzc2lvbiA9IGF0dHJpYnV0ZXNbJ2RhdGEtbGlzdCddO1xyXG4gICAgICAgIGxldCBbY3VycmVudEl0ZW0sIGl0ZW1zXSA9IGxpc3RFeHByZXNzaW9uLnNwbGl0KFwiIGluIFwiKTtcclxuICAgICAgICBjdXJyZW50SXRlbSA9IGN1cnJlbnRJdGVtLnRyaW0oKTtcclxuICAgICAgICBpdGVtcyA9IGl0ZW1zLnRyaW0oKTtcclxuICAgICAgICBsZXQgbGlzdEl0ZW1zID0gdGhpcy5kYXRhW2l0ZW1zXTtcclxuXHJcbiAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNbJ2NvbXBvbmVudC1hbGlhcyddO1xyXG4gICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydkYXRhLWxpc3QnXTtcclxuICAgICAgICBkZWxldGUgYXR0cmlidXRlc1snZGF0YS1iaW5kJ107XHJcblxyXG4gICAgICAgIGlmICghKGxpc3RJdGVtcyAmJiBsaXN0SXRlbXMubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBDb21wb25lbnRFeGNlcHRpb24gPSByZXF1aXJlKCcuL0NvbXBvbmVudEV4Y2VwdGlvbi5qcycpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgICAgIGAnJHtpdGVtc30nIGlzIGVtcHR5IG9yIG5vdCBhbiBhcnJheSBvciB1bmRlZmluZWQuYFxyXG4gICAgICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG4gICAgICAgIGxldCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQ6IHRhcmdldEVsZW1lbnQucGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgcmVuZGVyVHlwZTogJ2FwcGVuZCcsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZW5kZXJMaXN0SXRlbSA9IGZ1bmN0aW9uIChyZXBsYWNlZCwgY29tcG9uZW50RGF0YSwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGxldCB7IGF0dHJpYnV0ZXMsIGNvbXBvbmVudCB9ID0gcmVwbGFjZWQ7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IE9iamVjdC5jcmVhdGUoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgY29uc3QgeyBHZW5lcmF0ZVJhbmRvbUlkIH0gPSByZXF1aXJlKCcuL3V0aWxzL2luZGV4LmpzJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAuc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKVxyXG4gICAgICAgICAgICAgICAgLnNldElkKEdlbmVyYXRlUmFuZG9tSWQoJ2NpZCcpKVxyXG4gICAgICAgICAgICAgICAgLnNldFBhcmVudCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnNldERhdGEoY29tcG9uZW50RGF0YSlcclxuICAgICAgICAgICAgICAgIC5yZW5kZXIoY29uZmlnKTtcclxuXHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGxldCBleHRyYWN0Q29tcG9uZW50RGF0YSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBjb21wb25lbnREYXRhID0ge307XHJcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAke2JpbmRFeHByZXNzaW9ufSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICR7YmluZEV4cHJlc3Npb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gZXZhbChzY3JpcHQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtID09IGJpbmRFeHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnREYXRhW2N1cnJlbnRJdGVtXSA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbSAhPSBiaW5kRXhwcmVzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb21wb25lbnREYXRhLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudERhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50RGF0YSA9IGV4dHJhY3RDb21wb25lbnREYXRhKGxpc3RJdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEuaW5kZXggPSBpO1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyTGlzdEl0ZW0ocmVwbGFjZWQsIGNvbXBvbmVudERhdGEsIGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHRhcmdldEVsZW1lbnQpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEF0dHJpYnV0ZXMoRG9tQXR0cmlidXRlcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHsgYXR0cmlidXRlcyB9ID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBEb21BdHRyaWJ1dGVzICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBEb21BdHRyaWJ1dGVzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgRG9tQXR0cmlidXRlcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldElkKGlkID0gR2VuZXJhdGVSYW5kb21JZCgnY2lkJykpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhcmVudChwYXJlbnQpIHtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0YShwYXNzZWREYXRhKSB7XHJcbiAgICAgICAgbGV0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IE1lcmdlT2JqZWN0IH0gPSByZXF1aXJlKCcuL3V0aWxzL2luZGV4LmpzJyk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gTWVyZ2VPYmplY3QocGFzc2VkRGF0YSwgZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNpbmd1bGFyQ29tcG9uZW50KHJlcGxhY2VkKSB7XHJcbiAgICAgICAgbGV0IHsgaWQsIGNvbXBvbmVudCwgYXR0cmlidXRlcyB9ID0gcmVwbGFjZWQ7XHJcbiAgICAgICAgY29tcG9uZW50ID0gT2JqZWN0LmNyZWF0ZShjb21wb25lbnQpO1xyXG4gICAgICAgIGxldCBjb21wb25lbnREYXRhO1xyXG4gICAgICAgIGxldCBkYXRhRXhwcmVzc2lvbiA9IGF0dHJpYnV0ZXNbJ2RhdGEtYmluZCddO1xyXG5cclxuICAgICAgICBpZiAoZGF0YUV4cHJlc3Npb24pIHtcclxuICAgICAgICAgICAgbGV0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdlbmVyYXRlQ29tcG9uZW50RGF0YSA9IGZ1bmN0aW9uIChkYXRhRXhwcmVzc2lvbiwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YUV4cHJlc3Npb24gPSBkYXRhRXhwcmVzc2lvbi50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBoYXNFcXVhbFNpZ24gPSBkYXRhRXhwcmVzc2lvbi5zZWFyY2goJ1s9XScpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzRXF1YWxTaWduKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlRXhwcmVzc2lvbiA9IGRhdGFFeHByZXNzaW9uLnNwbGl0KFwiPVwiKVswXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcmlwdCA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7ICR7T2JqZWN0LmtleXMoZGF0YSkuam9pbihcIiwgXCIpfSB9ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHtkYXRhRXhwcmVzc2lvbn07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAke3ZhbHVlRXhwcmVzc2lvbn07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSBldmFsKHNjcmlwdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0VxdWFsU2lnbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBkYXRhRXhwcmVzc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnREYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50RGF0YVtrZXldID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnREYXRhICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnREYXRhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb21wb25lbnREYXRhID0gZ2VuZXJhdGVDb21wb25lbnREYXRhKGRhdGFFeHByZXNzaW9uLCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzWydjb21wb25lbnQtYWxpYXMnXTtcclxuICAgICAgICBkZWxldGUgYXR0cmlidXRlc1snZGF0YS1saXN0J107XHJcbiAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNbJ2RhdGEtYmluZCddO1xyXG5cclxuICAgICAgICBjb21wb25lbnRcclxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcylcclxuICAgICAgICAgICAgLnNldElkKEdlbmVyYXRlUmFuZG9tSWQoJ2NpZCcpKVxyXG4gICAgICAgICAgICAuc2V0UGFyZW50KHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoY29tcG9uZW50RGF0YSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnQuc2V0RGF0YShjb21wb25lbnREYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXBvbmVudC5yZW5kZXIoe1xyXG4gICAgICAgICAgICB0YXJnZXRFbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlT25Jbml0RWxlbWVudCgpIHtcclxuICAgICAgICBsZXQgeyBpZCB9ID0gdGhpcztcclxuXHJcbiAgICAgICAgJChgW29uX2luaXRfJHtpZH1dYCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyT25Jbml0RWxlbWVudCh0ZW1wbGF0ZSkge1xyXG4gICAgICAgIGxldCB7IGRhdGEsIGlkIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGRhdGEsIGlkKSB7XHJcbiAgICAgICAgICAgIGxldCAkdGVtcGxhdGUwO1xyXG4gICAgICAgICAgICBjb25zdCB7IEludGVycG9sYXRlVGV4dCB9ID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC5qcycpO1xyXG5cclxuICAgICAgICAgICAgdGVtcGxhdGUgPSAkLnBhcnNlSFRNTChJbnRlcnBvbGF0ZVRleHQoZGF0YSwgdGVtcGxhdGUpKTtcclxuICAgICAgICAgICAgJHRlbXBsYXRlMCA9ICQodGVtcGxhdGVbMF0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgQ29tcG9uZW50RXhjZXB0aW9uID0gcmVxdWlyZSgnLi9Db21wb25lbnRFeGNlcHRpb24uanMnKTtcclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgICAgICAgICBgLm9uSW5pdCgpIGRvIG5vdCBoYXZlIGEgdGVtcGxhdGUuYCxcclxuICAgICAgICAgICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXhjZXB0aW9uKFtcclxuICAgICAgICAgICAgICAgICAgICBgLm9uSW5pdCgpIHRlbXBsYXRlIG11c3QgYmUgZW5jbG9zZWQgaW4gYWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYHNpbmdsZSBibG9jay1sZXZlbCBlbGVtZW50LmAsXHJcbiAgICAgICAgICAgICAgICBdLmpvaW4oXCIgXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVbMF0ubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBDb21wb25lbnRFeGNlcHRpb24oW1xyXG4gICAgICAgICAgICAgICAgICAgIGAub25Jbml0KCkgdGVtcGxhdGUgbXVzdCBiZSBlbmNsb3NlZCBpbiBhYCxcclxuICAgICAgICAgICAgICAgICAgICBgc2luZ2xlIGJsb2NrLWxldmVsIGVsZW1lbnQuYCxcclxuICAgICAgICAgICAgICAgIF0uam9pbihcIiBcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdGVtcGxhdGUwLmF0dHIoYG9uX2luaXRfJHtpZH1gLCAnJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXBsYXRlID0gZ2VuZXJhdGVUZW1wbGF0ZSh0ZW1wbGF0ZSwgZGF0YSwgaWQpO1xyXG4gICAgICAgIGxldCB7IHJlbmRlckNvbmZpZyB9ID0gdGhpcztcclxuICAgICAgICBsZXQgZGVmYXVsdENvbmZpZyA9IHtcclxuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudDogZG9jdW1lbnQuYm9keSxcclxuICAgICAgICAgICAgcmVuZGVyVHlwZTogJ3JlcGxhY2VXaXRoJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHsgU2V0RGVmYXVsdENvbmZpZyB9ID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC5qcycpO1xyXG4gICAgICAgIGxldCB7IHRhcmdldEVsZW1lbnQsIHJlbmRlclR5cGUgfSA9IFNldERlZmF1bHRDb25maWcoZGVmYXVsdENvbmZpZywgcmVuZGVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgJCh0YXJnZXRFbGVtZW50KVtyZW5kZXJUeXBlXSh0ZW1wbGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFJlbmRlcmVkTGlzdCh0YXJnZXRFbGVtZW50LCBpdGVtcywgbGlzdEl0ZW1Db21wb25lbnQsIG5vSXRlbXNDb21wb25lbnQpIHtcclxuICAgICAgICB0YXJnZXRFbGVtZW50ID0gJCh0YXJnZXRFbGVtZW50KTtcclxuICAgICAgICB0YXJnZXRFbGVtZW50LmVtcHR5KCk7XHJcblxyXG4gICAgICAgIGlmICghKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgaWYgKG5vSXRlbXNDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgIG5vSXRlbXNDb21wb25lbnQuY3JlYXRlSW5zdGFuY2UodGhpcykucmVuZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclR5cGU6ICdhcHBlbmQnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RJdGVtID0gbGlzdEl0ZW1Db21wb25lbnQuY3JlYXRlSW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGl0ZW0uaW5kZXggPSBbaV07XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLnNldERhdGEoaXRlbSk7XHJcblxyXG4gICAgICAgICAgICBsaXN0SXRlbS5yZW5kZXIoe1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudCxcclxuICAgICAgICAgICAgICAgIHJlbmRlclR5cGU6ICdhcHBlbmQnLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIGxldCB7IHN0eWxlSWQgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHsgJHNlbGYgfSA9IHRoaXMuJHJlZnM7XHJcblxyXG4gICAgICAgICRzZWxmWzBdLnJlbW92ZSgpO1xyXG4gICAgICAgIGxldCBzaW1pbGFyQ29tcG9uZW50cyA9ICQoYFske3N0eWxlSWR9XWApO1xyXG5cclxuICAgICAgICBpZiAoIXNpbWlsYXJDb21wb25lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVN0eWxlKCkge1xyXG4gICAgICAgIGxldCB7IHN0eWxlSWQgfSA9IHRoaXM7XHJcblxyXG4gICAgICAgICQoYHN0eWxlW2l0ZW1pZD1cIiR7c3R5bGVJZH1cIl1gKS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50OyIsImNvbnN0IENvbXBvbmVudENvbGxlY3Rpb24gPSB7XHJcblx0Y29tcG9uZW50czogW10sXHJcblx0YWRkKGNvbXBvbmVudCkgeyBcclxuXHRcdHRoaXMuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XHJcblx0fSxcclxuXHRyZW1vdmUoY29tcG9uZW50KSB7XHJcblx0XHRsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG5cdFx0bGV0IGluZGV4ID0gY29tcG9uZW50cy5maW5kSW5kZXgoKGl0ZW0pPT4ge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5pZCA9PSBjb21wb25lbnQuaWQ7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZihpbmRleCA8PSAtMSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHRcclxuXHRcdGNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdHRoaXMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcblx0fSxcclxuXHRmaWx0ZXIoKSB7XHJcblx0XHRsZXQgZmlsdGVyQ29tcG9uZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRsZXQgeyBjb21wb25lbnRzIH0gPSB0aGlzO1xyXG5cclxuXHRcdFx0Zm9yKGxldCBpPTA7IGk8Y29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2ldO1xyXG5cdFx0XHRcdGxldCAkY29tcG9uZW50ID0gJChgIyR7Y29tcG9uZW50LmlkfWApO1xyXG5cdFxyXG5cdFx0XHRcdGlmKCRjb21wb25lbnQubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5yZW1vdmUoY29tcG9uZW50KTtcclxuXHRcdFx0fVx0XHRcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZpbHRlckNvbXBvbmVudHMsIDEwMDApO1xyXG5cdH0sXHJcblx0ZGlzcGxheSgpIHtcclxuXHRcdGxldCB7IGNvbXBvbmVudHMgfSA9IHRoaXM7XHJcblx0XHRsZXQgaXRlbXMgPSBjb21wb25lbnRzLm1hcCgoeyBpZCwgbmFtZSwgc3R5bGVJZCB9KSA9PiB7IFxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGlkLCBcclxuXHRcdFx0XHRuYW1lLCBcclxuXHRcdFx0XHRzdHlsZUlkLFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zb2xlLnRhYmxlKGl0ZW1zKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50Q29sbGVjdGlvbjsiLCJjb25zdCBDb21wb25lbnQgPSByZXF1aXJlKCcuL0NvbXBvbmVudC5qcycpO1xyXG5jb25zdCB7IFxyXG5cdEdlbmVyYXRlUmFuZG9tSWQsXHJcblx0U2V0RGVmYXVsdENvbmZpZyxcclxufSA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IENvbXBvbmVudENvbnN0cnVjdG9yID0ge1xyXG5cdGNyZWF0ZShjb25maWcgPSB7fSkge1xyXG5cdFx0Y29uc3QgZGVmYXVsdENvbmZpZyA9IHtcclxuXHRcdFx0c3R5bGVJZDogR2VuZXJhdGVSYW5kb21JZCgnY3NzJyksXHJcblx0XHRcdHRlbXBsYXRlOiBgXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxoMT4gQ29tcG9uZW50IHJlbmRlcmVkLiA8L2gxPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRgLFxyXG5cdFx0XHRkYXRhOiB7fSxcclxuXHRcdFx0ZXZlbnRzOiB7fSxcclxuXHRcdFx0bWV0aG9kczoge30sXHJcblx0XHRcdGxpZmVDeWNsZToge30sXHJcblx0XHRcdGNvbXBvbmVudHM6IHt9LFxyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7fSxcclxuXHRcdFx0cGFyZW50OiBudWxsLFxyXG5cdFx0fTtcclxuXHRcdGNvbmZpZyA9IFNldERlZmF1bHRDb25maWcoZGVmYXVsdENvbmZpZywgY29uZmlnKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBDb21wb25lbnQoY29uZmlnKTtcclxuXHR9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudENvbnN0cnVjdG9yOyIsImNsYXNzIENvbXBvbmVudEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKVxyXG5cclxuXHRcdHRoaXMubmFtZSA9ICdDb21wb25lbnRFeGNlcHRpb24nO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudEV4Y2VwdGlvbjsiLCJjb25zdCBBdHRyaWJ1dGVzRXh0cmFjdG9yID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdGxldCBleHRyYWN0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgYXR0cmlidXRlcyA9IHt9O1xyXG5cdFx0bGV0IG5vZGVNYXAgPSB0aGlzLmVsZW1lbnQuYXR0cmlidXRlcztcclxuXHJcblx0XHRmb3IobGV0IGk9MDsgaTxub2RlTWFwLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGxldCB7IG5vZGVOYW1lLCBub2RlVmFsdWUgfSA9IG5vZGVNYXBbaV07XHJcblx0XHRcdFxyXG5cdFx0XHRhdHRyaWJ1dGVzW25vZGVOYW1lXSA9IG5vZGVWYWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXR0cmlidXRlcztcclxuXHR9O1xyXG5cdGxldCBnZXQgPSBmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRsZXQgYXR0cmlidXRlcyA9IHRoaXMuZXh0cmFjdCgpO1xyXG5cclxuXHRcdHJldHVybiBhdHRyaWJ1dGVzW25hbWVdO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRlbGVtZW50LFxyXG5cdFx0ZXh0cmFjdCxcclxuXHRcdGdldCxcclxuXHR9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEF0dHJpYnV0ZXNFeHRyYWN0b3I7IiwiY29uc3QgRGFzaGlmeVNuYWtlQ2FzZSA9IGZ1bmN0aW9uKHN0cikge1xyXG5cdGxldCBjaHVua3MgPSBzdHIuc3BsaXQoLyhbQS1aXSkvKTtcclxuXHJcblx0aWYoY2h1bmtzWzBdPT1cIlwiKSB7XHJcblx0XHRjaHVua3Muc2hpZnQoKTtcclxuXHR9XHJcblx0aWYoL14oW0EtWl0pezF9JC8udGVzdChjaHVua3NbMF0pKSB7XHJcblx0XHRjaHVua3NbMF0gPSBjaHVua3NbMF0udG9Mb3dlckNhc2UoKTtcclxuXHR9XHJcblx0c3RyID0gY2h1bmtzLmpvaW4oXCJcIik7XHJcblx0Y2h1bmtzID0gc3RyLnNwbGl0KC8oW0EtWl0pLyk7XHJcblx0Y2h1bmtzID0gY2h1bmtzLm1hcChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRpZigvXihbQS1aXSl7MX0kLy50ZXN0KGl0ZW0pKSB7XHJcblx0XHRcdGl0ZW0gPSBgLSR7aXRlbX1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gY2h1bmtzLmpvaW4oXCJcIikudG9Mb3dlckNhc2UoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXNoaWZ5U25ha2VDYXNlOyIsImNvbnN0IEdlbmVyYXRlUmFuZG9tTnVtYmVyID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbU51bWJlci5qcycpO1xyXG5cclxuY29uc3QgR2VuZXJhdGVSYW5kb21JZCA9IGZ1bmN0aW9uKHByZWZpeCA9IFwicm5kXCIpIHtcclxuXHRsZXQgaWQgPSBbXHJcblx0XHRwcmVmaXgsXHJcblx0XHRHZW5lcmF0ZVJhbmRvbU51bWJlcigxMDAwLCA5OTk5KSxcclxuXHRcdChEYXRlLm5vdygpICsgJycpLnN1YnN0cig1KSxcclxuXHRdLmpvaW4oXCJfXCIpO1xyXG5cclxuXHRyZXR1cm4gaWQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdGVSYW5kb21JZDsiLCJjb25zdCBHZW5lcmF0ZVJhbmRvbU51bWJlciA9IGZ1bmN0aW9uKG1pbj0wLCBtYXg9OSkge1xyXG5cdG1pbiA9IE1hdGguY2VpbChtaW4pO1xyXG5cdG1heCA9IE1hdGguZmxvb3IobWF4KTtcclxuXHJcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdGVSYW5kb21OdW1iZXI7IiwiY29uc3QgVHJpbVdoaXRlU3BhY2UgPSByZXF1aXJlKCcuL1RyaW1XaGl0ZVNwYWNlLmpzJyk7XHJcblxyXG5jb25zdCByZXBsYWNlID0gZnVuY3Rpb24oc3RyLCBmaW5kLCByZXBsYWNlKSB7XHJcblx0cmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoYCgke2ZpbmR9KWAsICdnJyksIHJlcGxhY2UpOyBcclxufVxyXG5cclxuY29uc3QgSW50ZXJwb2xhdGVUZXh0ID0gZnVuY3Rpb24oZGF0YSwgdGV4dCkge1xyXG5cdGlmKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIHRleHQ7XHJcblx0fVxyXG5cclxuXHR0ZXh0ID0gcmVwbGFjZSh0ZXh0LCAne3snLCAnJHsnKTtcclxuXHR0ZXh0ID0gcmVwbGFjZSh0ZXh0LCAnfX0nLCAnfScpOztcclxuXHJcblx0bGV0IGZuQm9keSA9IGBcclxuXHRcdGxldCB7ICR7T2JqZWN0LmtleXMoZGF0YSkuam9pbihcIiwgXCIpfSB9ID0gZGF0YTtcclxuXHJcblx0XHRyZXR1cm4gXFxgJHt0ZXh0fVxcYDtcclxuXHRgO1xyXG5cdGxldCBmbiA9IG5ldyBGdW5jdGlvbignZGF0YScsIGZuQm9keSk7XHJcblx0XHJcblx0cmV0dXJuIFRyaW1XaGl0ZVNwYWNlKGZuKGRhdGEpKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcnBvbGF0ZVRleHQ7IiwiY29uc3QgSXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICBpZighZm4pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlzUHJvbWlzZSA9IGZuIGluc3RhbmNlb2YgUHJvbWlzZTtcclxuICAgIGxldCBpc0FzeW5jID0gZm4uY29uc3RydWN0b3IubmFtZSA9PT0gJ0FzeW5jRnVuY3Rpb24nO1xyXG4gICAgXHJcbiAgICByZXR1cm4gaXNQcm9taXNlIHx8IGlzQXN5bmM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXNUaGVuYWJsZTsiLCJjb25zdCBNZXJnZU9iamVjdCA9IGZ1bmN0aW9uKGRvbWluYW50T2JqZWN0LCB3ZWFrT2JqZWN0KSB7XHJcblx0bGV0IHdlYWtPYmplY3RLZXlzID0gT2JqZWN0LmtleXMod2Vha09iamVjdCk7XHJcblxyXG5cdGZvcihsZXQgaT0wOyBpPHdlYWtPYmplY3RLZXlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQga2V5ID0gd2Vha09iamVjdEtleXNbaV07XHJcblxyXG5cdFx0aWYoZG9taW5hbnRPYmplY3Rba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRvbWluYW50T2JqZWN0W2tleV0gPSB3ZWFrT2JqZWN0W2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZG9taW5hbnRPYmplY3Q7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVyZ2VPYmplY3Q7IiwiY29uc3QgU2V0RGVmYXVsdENvbmZpZyA9IGZ1bmN0aW9uKGRlZmF1bHRDb25maWcsIHN1cHBsaWVkQ29uZmlnKSB7XHJcblx0bGV0IGRlZmF1bHRDb25maWdLZXlzID0gT2JqZWN0LmtleXMoZGVmYXVsdENvbmZpZyk7XHJcblxyXG5cdGZvcihsZXQgaT0wOyBpPGRlZmF1bHRDb25maWdLZXlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQga2V5ID0gZGVmYXVsdENvbmZpZ0tleXNbaV07XHJcblxyXG5cdFx0aWYoc3VwcGxpZWRDb25maWdba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHN1cHBsaWVkQ29uZmlnW2tleV0gPSBkZWZhdWx0Q29uZmlnW2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3VwcGxpZWRDb25maWc7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2V0RGVmYXVsdENvbmZpZzsiLCJjb25zdCBUcmltV2hpdGVTcGFjZSA9IGZ1bmN0aW9uKHN0cikge1xyXG5cdGxldCBjaHVua3MgPSBzdHIuc3BsaXQoL1xccy8pO1xyXG5cdGxldCBjaGFycyA9IFtdO1xyXG5cclxuXHRmb3IobGV0IGk9MDsgaTxjaHVua3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBjaHVuayA9IGNodW5rc1tpXTtcclxuXHJcblx0XHRpZihjaHVuaz09XCJcIikge1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHRjaGFycy5wdXNoKGNodW5rKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjaGFycy5qb2luKFwiIFwiKTtcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyaW1XaGl0ZVNwYWNlOyIsImNvbnN0IEF0dHJpYnV0ZXNFeHRyYWN0b3IgPSByZXF1aXJlKCcuL0F0dHJpYnV0ZXNFeHRyYWN0b3IuanMnKTtcclxuY29uc3QgRGFzaGlmeVNuYWtlQ2FzZSA9IHJlcXVpcmUoJy4vRGFzaGlmeVNuYWtlQ2FzZS5qcycpO1xyXG5jb25zdCBHZW5lcmF0ZVJhbmRvbUlkID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbUlkLmpzJyk7XHJcbmNvbnN0IEdlbmVyYXRlUmFuZG9tTnVtYmVyID0gcmVxdWlyZSgnLi9HZW5lcmF0ZVJhbmRvbU51bWJlci5qcycpO1xyXG5jb25zdCBJbnRlcnBvbGF0ZVRleHQgPSByZXF1aXJlKCcuL0ludGVycG9sYXRlVGV4dC5qcycpO1xyXG5jb25zdCBJc1RoZW5hYmxlID0gcmVxdWlyZSgnLi9Jc1RoZW5hYmxlLmpzJyk7XHJcbmNvbnN0IE1lcmdlT2JqZWN0ID0gcmVxdWlyZSgnLi9NZXJnZU9iamVjdC5qcycpO1xyXG5jb25zdCBTZXREZWZhdWx0Q29uZmlnID0gcmVxdWlyZSgnLi9TZXREZWZhdWx0Q29uZmlnLmpzJyk7XHJcbmNvbnN0IFRyaW1XaGl0ZVNwYWNlID0gcmVxdWlyZSgnLi9UcmltV2hpdGVTcGFjZS5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0QXR0cmlidXRlc0V4dHJhY3RvcixcclxuXHREYXNoaWZ5U25ha2VDYXNlLFxyXG5cdEdlbmVyYXRlUmFuZG9tSWQsXHJcblx0R2VuZXJhdGVSYW5kb21OdW1iZXIsXHJcblx0SW50ZXJwb2xhdGVUZXh0LFxyXG5cdElzVGhlbmFibGUsXHJcblx0TWVyZ2VPYmplY3QsXHJcblx0U2V0RGVmYXVsdENvbmZpZyxcclxuXHRUcmltV2hpdGVTcGFjZSxcclxufSJdfQ==
