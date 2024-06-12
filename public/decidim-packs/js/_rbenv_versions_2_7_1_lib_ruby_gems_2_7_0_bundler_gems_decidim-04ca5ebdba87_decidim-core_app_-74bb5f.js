"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["_rbenv_versions_2_7_1_lib_ruby_gems_2_7_0_bundler_gems_decidim-04ca5ebdba87_decidim-core_app_-74bb5f"],{

/***/ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor.js":
/*!**************************************************************************************************************************************!*\
  !*** ../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor.js ***!
  \**************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createQuillEditor; }
/* harmony export */ });
/* harmony import */ var src_decidim_editor_linebreak_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/editor/linebreak_module */ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/linebreak_module.js");
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
/* eslint-disable require-jsdoc */


var quillFormats = ["bold", "italic", "link", "underline", "header", "list", "video", "image", "alt", "break"];
function createQuillEditor(container) {
  var toolbar = $(container).data("toolbar");
  var disabled = $(container).data("disabled");
  var quillToolbar = [["bold", "italic", "underline", "linebreak"], [{
    list: "ordered"
  }, {
    list: "bullet"
  }], ["link", "clean"]];
  if (toolbar === "full") {
    quillToolbar = [[{
      header: [1, 2, 3, 4, 5, 6, false]
    }]].concat(_toConsumableArray(quillToolbar), [["video"]]);
  } else if (toolbar === "basic") {
    quillToolbar = [].concat(_toConsumableArray(quillToolbar), [["video"]]);
  }
  var $input = $(container).siblings('input[type="hidden"]');
  container.innerHTML = $input.val() || "";
  var quill = new Quill(container, {
    modules: {
      linebreak: {},
      toolbar: {
        container: quillToolbar,
        handlers: {
          "linebreak": src_decidim_editor_linebreak_module__WEBPACK_IMPORTED_MODULE_0__["default"]
        }
      }
    },
    formats: quillFormats,
    theme: "snow"
  });
  if (disabled) {
    quill.disable();
  }
  quill.on("text-change", function () {
    var text = quill.getText();

    // Triggers CustomEvent with the cursor position
    // It is required in input_mentions.js
    var event = new CustomEvent("quill-position", {
      detail: quill.getSelection()
    });
    container.dispatchEvent(event);
    if (text === "\n" || text === "\n\n") {
      $input.val("");
    } else {
      $input.val(quill.root.innerHTML);
    }
  });
  // After editor is ready, linebreak_module deletes two extraneous new lines
  quill.emitter.emit("editor-ready");
  return quill;
}

/***/ }),

/***/ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/attribute_diff.js":
/*!*****************************************************************************************************************************************************!*\
  !*** ../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/attribute_diff.js ***!
  \*****************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ attributeDiff; }
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
/* eslint-disable require-jsdoc */

// ORGINAL: https://github.com/quilljs/delta/blob/ddda3bf088cda3ec03d5dbcc1179679d147f3a02/src/AttributeMap.ts
function attributeDiff(attributes1, attributes2) {
  var alpha = attributes1;
  var beta = attributes2;
  if (_typeof(alpha) !== "object") {
    alpha = {};
  }
  if (_typeof(beta) !== "object") {
    beta = {};
  }
  var attributes = Object.keys(alpha).concat(Object.keys(beta)).reduce(function (attrs, key) {
    // ORGINAL: import isEqual from 'lodash.isequal'; if (!isEqual(a[key], b[key]))
    if (alpha[key] !== beta[key]) {
      attrs[key] = null;
      if (beta[key]) {
        attrs[key] = beta[key];
      }
    }
    return attrs;
  }, {});
  if (Object.keys(attributes).length > 0) {
    return attributes;
  }
  return null;
}

/***/ }),

/***/ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/history_override.js":
/*!*******************************************************************************************************************************************************!*\
  !*** ../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/history_override.js ***!
  \*******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ HistoryOverride; }
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
/* eslint-disable require-jsdoc */

var History = Quill["import"]("modules/history");
History.DEFAULTS = {
  delay: 1000,
  maxStack: 100,
  userOnly: true
};

/**
 * Linebreak module brokes quill's default history class.
 * So here we are moving innerHTML to undo and redo stack
 * instead of deltas.
 */
var HistoryOverride = /*#__PURE__*/function (_History) {
  function HistoryOverride(quill, options) {
    var _this;
    _classCallCheck(this, HistoryOverride);
    _this = _callSuper(this, HistoryOverride, [quill, options]);
    _this.lastRecorded = 0;
    _this.ignoreChange = false;
    _this.init = false;
    _this.quill.emitter.on("editor-ready", function () {
      _this.clear();
      var $input = $(_this.quill.container).siblings('input[type="hidden"]');
      _this.stack.undo.push({
        content: $input.val() || "",
        index: _this.quill.getLength() - 2
      });
      _this.lastLength = _this.quill.getLength();
    });
    /* eslint-disable max-params */
    _this.quill.on(Quill.events.EDITOR_CHANGE, function (eventName, delta, oldDelta, source) {
      if (!delta) {
        return;
      }
      if (!_this.init && eventName === "selection-change") {
        _this.stack.undo[0].index = delta.index;
      }
      if (eventName !== Quill.events.TEXT_CHANGE || _this.ignoreChange) {
        return;
      }
      if (!_this.options.userOnly || source === Quill.sources.USER) {
        _this.record(delta, oldDelta);
      }
    });
    _this.quill.keyboard.addBinding({
      key: "Z",
      shortKey: true
    }, _this.undo.bind(_this));
    _this.quill.keyboard.addBinding({
      key: "Z",
      shortKey: true,
      shiftKey: true
    }, _this.redo.bind(_this));
    if (/Win/i.test(navigator.platform)) {
      _this.quill.keyboard.addBinding({
        key: "Y",
        shortKey: true
      }, _this.redo.bind(_this));
    }
    return _this;
  }
  /* eslint-enable max-params */
  _inherits(HistoryOverride, _History);
  return _createClass(HistoryOverride, [{
    key: "change",
    value: function change(source, dest) {
      if (this.stack[source].length === 0) {
        return;
      }
      var obj = this.updateStacks(source, dest);
      if (!obj.content) {
        return;
      }
      if (!obj.index) {
        obj.index = 0;
      }
      this.lastRecorded = 0;
      this.ignoreChange = true;
      this.quill.setContents(this.quill.clipboard.convert(obj.content));
      this.ignoreChange = false;
      var index = obj.index;
      this.quill.setSelection(index);
    }
  }, {
    key: "updateStacks",
    value: function updateStacks(source, dest) {
      if (source === "undo") {
        if (this.stack.undo.length === 1) {
          return this.stack.undo[0];
        }
        this.stack[dest].push(this.stack.undo.pop());
        return this.stack.undo[this.stack.undo.length - 1];
      }
      var content = this.stack.redo.pop();
      this.stack.undo.push(content);
      return content;
    }
  }, {
    key: "record",
    value: function record(changeDelta) {
      if (changeDelta.ops.length === 0) {
        return;
      } else if (!this.init) {
        this.init = true;
      }
      this.stack.redo = [];
      var timestamp = Date.now();
      // Should not return after length check, because after linebreak a keypress replaces invisible characters with
      // visible characters.
      // For example: <br><br></p> -> [press X] -> <br>X</p>.
      if (Math.abs(this.lastLength === this.quill.getLength()) || this.lastRecorded + this.options.delay > timestamp) {
        if (this.stack.undo.length > 1) {
          this.stack.undo.pop();
        }
      } else {
        this.lastLength = this.quill.getLength();
        if (this.lastRecorded + this.options.delay <= timestamp) {
          this.lastRecorded = timestamp;
        }
      }
      this.stack.undo.push({
        content: this.quill.container.firstChild.innerHTML,
        index: this.quill.getSelection()
      });
    }
  }, {
    key: "transform",
    value: function transform() {
      return;
    }
  }]);
}(History);


/***/ }),

/***/ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/linebreak_module.js":
/*!*******************************************************************************************************************************************************!*\
  !*** ../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/linebreak_module.js ***!
  \*******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ lineBreakButtonHandler; }
/* harmony export */ });
/* harmony import */ var src_decidim_editor_modified_enter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/editor/modified_enter */ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_enter.js");
/* harmony import */ var src_decidim_editor_modified_backspace_offset_any__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/decidim/editor/modified_backspace_offset_any */ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_backspace_offset_any.js");
/* harmony import */ var src_decidim_editor_modified_backspace_offset1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/decidim/editor/modified_backspace_offset1 */ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_backspace_offset1.js");
/* harmony import */ var src_decidim_editor_history_override__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/decidim/editor/history_override */ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/history_override.js");
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
/* eslint-disable require-jsdoc */






// Disable warning messages from overwritting modules
Quill.debug("error");

// It all started with these snippets of code: https://github.com/quilljs/quill/issues/252
var Delta = Quill["import"]("delta");
var Break = Quill["import"]("blots/break");
var Embed = Quill["import"]("blots/embed");
var Scroll = Quill["import"]("blots/scroll");
var Parchment = Quill["import"]("parchment");
Quill.register({
  "modules/history": src_decidim_editor_history_override__WEBPACK_IMPORTED_MODULE_3__["default"]
}, true);
var icons = Quill["import"]("ui/icons");
icons.linebreak = "⏎";
var SmartBreak = /*#__PURE__*/function (_Break) {
  function SmartBreak() {
    _classCallCheck(this, SmartBreak);
    return _callSuper(this, SmartBreak, arguments);
  }
  _inherits(SmartBreak, _Break);
  return _createClass(SmartBreak, [{
    key: "length",
    value: function length() {
      return 1;
    }
  }, {
    key: "value",
    value: function value() {
      return "\n";
    }
  }, {
    key: "insertInto",
    value: function insertInto(parent, ref) {
      // Embed.prototype.insertInto.call(this, parent, ref);
      Reflect.apply(Embed.prototype.insertInto, this, [parent, ref]);
    }
  }]);
}(Break);
Quill.register(SmartBreak);

// Override quill/blots/scroll.js
var ScrollOvderride = /*#__PURE__*/function (_Scroll) {
  function ScrollOvderride() {
    _classCallCheck(this, ScrollOvderride);
    return _callSuper(this, ScrollOvderride, arguments);
  }
  _inherits(ScrollOvderride, _Scroll);
  return _createClass(ScrollOvderride, [{
    key: "optimize",
    value: function optimize() {
      var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.batch === true) {
        return;
      }
      this.parchmentOptimize(mutations, context);
      if (mutations.length > 0) {
        // quill/core/emitter.js, Emitter.events.SCROLL_OPTIMIZE = "scroll-optimize"
        this.emitter.emit("scroll-optimize", mutations, context);
      }
    }

    // Override parchment/src/blot/scroll.ts
  }, {
    key: "parchmentOptimize",
    value: function parchmentOptimize() {
      var _this = this;
      var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // super.optimize(context);
      Reflect.apply(Parchment.Container.prototype.optimize, this, [context]);

      // We must modify mutations directly, cannot make copy and then modify
      // let records = [].slice.call(this.observer.takeRecords());
      var records = _toConsumableArray(this.observer.takeRecords());
      // Array.push currently seems to be implemented by a non-tail recursive function
      // so we cannot just mutations.push.apply(mutations, this.observer.takeRecords());
      while (records.length > 0) {
        mutations.push(records.pop());
      }
      var mark = function mark(blot, markParent) {
        if (!blot || blot === _this) {
          return;
        }
        if (!blot.domNode.parentNode) {
          return;
        }
        if (blot.domNode.__blot && blot.domNode.__blot.mutations === null) {
          blot.domNode.__blot.mutations = [];
        }
        if (markParent) {
          mark(blot.parent);
        }
      };
      var optimize = function optimize(blot) {
        // Post-order traversal
        if (!blot.domNode.__blot) {
          return;
        }
        if (blot instanceof Parchment.Container) {
          blot.children.forEach(optimize);
        }
        blot.optimize(context);
      };
      var remaining = mutations;
      for (var ind = 0; remaining.length > 0; ind += 1) {
        // MAX_OPTIMIZE_ITERATIONS = 100
        if (ind >= 100) {
          throw new Error("[Parchment] Maximum optimize iterations reached");
        }
        remaining.forEach(function (mutation) {
          var blot = Parchment.find(mutation.target, true);
          if (!blot) {
            return;
          }
          if (blot.domNode === mutation.target) {
            if (mutation.type === "childList") {
              mark(Parchment.find(mutation.previousSibling, false));
              mutation.addedNodes.forEach(function (node) {
                var child = Parchment.find(node, false);
                mark(child, false);
                if (child instanceof Parchment.Container) {
                  child.children.forEach(function (grandChild) {
                    mark(grandChild, false);
                  });
                }
              });
            } else if (mutation.type === "attributes") {
              mark(blot.prev);
            }
          }
          mark(blot);
        });
        this.children.forEach(optimize);
        remaining = _toConsumableArray(this.observer.takeRecords());
        records = remaining.slice();
        while (records.length > 0) {
          mutations.push(records.pop());
        }
      }
    }
  }]);
}(Scroll);
;
Quill.register("blots/scroll", ScrollOvderride, true);
Parchment.register(ScrollOvderride);
function lineBreakButtonHandler(quill) {
  var range = quill.selection.getRange()[0];
  var currentLeaf = quill.getLeaf(range.index)[0];
  var nextLeaf = quill.getLeaf(range.index + 1)[0];
  var previousChar = quill.getText(range.index - 1, 1);

  // Insert a second break if:
  // At the end of the editor, OR next leaf has a different parent (<p>)
  if (nextLeaf === null || currentLeaf.parent !== nextLeaf.parent) {
    quill.insertEmbed(range.index, "break", true, "user");
    quill.insertEmbed(range.index, "break", true, "user");
  } else if (previousChar === "\n") {
    var delta = new Delta().retain(range.index).insert("\n");
    quill.updateContents(delta, Quill.sources.USER);
  } else {
    quill.insertEmbed(range.index, "break", true, "user");
  }

  // Now that we've inserted a line break, move the cursor forward
  quill.setSelection(range.index + 1, Quill.sources.SILENT);
}
Quill.register("modules/linebreak", function (quill) {
  quill.getModule("toolbar").addHandler("linebreak", function () {
    lineBreakButtonHandler(quill);
  });
  quill.emitter.on("editor-ready", function () {
    var length = quill.getLength();
    var text = quill.getText(length - 2, 2);

    // Remove extraneous new lines
    if (text === "\n\n") {
      quill.deleteText(quill.getLength() - 2, 2);
    }
  });
  quill.clipboard.addMatcher("BR", function (node) {
    var _node$parentNode;
    if ((node === null || node === void 0 || (_node$parentNode = node.parentNode) === null || _node$parentNode === void 0 ? void 0 : _node$parentNode.tagName) === "A") {
      return new Delta().insert("\n");
    }
    return new Delta().insert({
      "break": ""
    });
  });
  (0,src_decidim_editor_modified_enter__WEBPACK_IMPORTED_MODULE_0__["default"])(quill);
  (0,src_decidim_editor_modified_backspace_offset_any__WEBPACK_IMPORTED_MODULE_1__["default"])(quill);
  (0,src_decidim_editor_modified_backspace_offset1__WEBPACK_IMPORTED_MODULE_2__["default"])(quill);
  return;
});

/***/ }),

/***/ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_backspace_offset1.js":
/*!*****************************************************************************************************************************************************************!*\
  !*** ../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_backspace_offset1.js ***!
  \*****************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ backspaceBindings; }
/* harmony export */ });
/* harmony import */ var src_decidim_editor_attribute_diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/editor/attribute_diff */ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/attribute_diff.js");
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
/* eslint-disable require-jsdoc */


var Delta = Quill["import"]("delta");
var previousChar = function previousChar(quill, range) {
  return quill.getText(range.index - 1, 1);
};
var beforePreviousChar = function beforePreviousChar(quill, range) {
  return quill.getText(range.index - 2, 1);
};
var nextChar = function nextChar(quill, range) {
  return quill.getText(range.index, 1);
};
var handleListSelection = function handleListSelection(quill, range) {
  var lastCharacterOfPreviousLine = quill.getText(range.index - 3, 1);
  if (nextChar(quill, range) === "\n" || lastCharacterOfPreviousLine !== "\n") {
    quill.setSelection(range.index - 1, Quill.sources.SILENT);
  } else {
    quill.setSelection(range.index - 3, Quill.sources.SILENT);
  }
};
var moveSelectionToPreviousLine = function moveSelectionToPreviousLine(quill, range) {
  var lastCharacterOfPreviousLine = quill.getText(range.index - 3, 1);
  if (nextChar(quill, range) === "\n" || lastCharacterOfPreviousLine !== "\n") {
    quill.setSelection(range.index - 1, Quill.sources.SILENT);
  } else {
    quill.setSelection(range.index - 3, Quill.sources.SILENT);
  }
};
function backspaceBindings(quill) {
  quill.keyboard.addBinding({
    key: 8,
    offset: 1,
    collapsed: true
  }, function (range, context) {
    var length = 1;
    if (/[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix)) {
      length = 2;
    }
    if (range.index === 0 || quill.getLength() <= 1) {
      return;
    }
    var formats = {};
    var _quill$getLine = quill.getLine(range.index),
      _quill$getLine2 = _slicedToArray(_quill$getLine, 1),
      line = _quill$getLine2[0];
    var delta = new Delta().retain(range.index - length)["delete"](length);
    if (context.offset === 1 && previousChar(quill, range) === "\n") {
      var _quill$getLine3 = quill.getLine(range.index - 2),
        _quill$getLine4 = _slicedToArray(_quill$getLine3, 1),
        prev = _quill$getLine4[0];
      if (prev && prev.statics.blotName === "list-item") {
        formats = handleListSelection(quill, range);
        if (prev !== null && prev.length() > 1) {
          var curFormats = line.formats();
          var prevFormats = quill.getFormat(range.index - 2, 1);
          formats = (0,src_decidim_editor_attribute_diff__WEBPACK_IMPORTED_MODULE_0__["default"])(curFormats, prevFormats) || {};
          length += 1;
        }
        delta = new Delta().retain(range.index - 2)["delete"](2);
        moveSelectionToPreviousLine(quill, range);
      } else {
        delta = new Delta().retain(range.index - 1)["delete"](1);
        if (range.index < 2) {
          delta = new Delta()["delete"](1).retain(range.index + line.length() - 1);
        } else if (previousChar(quill, range) === "\n" && beforePreviousChar(quill, range) === "\n") {
          delta = new Delta().retain(range.index - 2)["delete"](2);
        }
      }
    } else {
      var _quill$getLine5 = quill.getLine(range.index - 1),
        _quill$getLine6 = _slicedToArray(_quill$getLine5, 1),
        _prev = _quill$getLine6[0];
      if (_prev) {
        var isPrevLineEmpty = _prev.statics.blotName === "block" && _prev.length() <= 1;
        if (!isPrevLineEmpty) {
          var _curFormats = line.formats();
          var _prevFormats = quill.getFormat(range.index - 1, 1);
          formats = (0,src_decidim_editor_attribute_diff__WEBPACK_IMPORTED_MODULE_0__["default"])(_curFormats, _prevFormats) || {};
          if (Object.keys(formats).length > 0) {
            // line.length() - 1 targets \n in line, another -1 for newline being deleted
            var formatDelta = new Delta().retain(range.index + line.length() - 2).retain(1, formats);
            delta = delta.compose(formatDelta);
          }
        }
      }
    }
    quill.updateContents(delta, Quill.sources.USER);
    if (Object.keys(formats).length > 0) {
      quill.formatLine(range.index - length, length, formats, Quill.sources.USER);
    }
    quill.focus();
  });

  // Put this backspace binding to second
  quill.keyboard.bindings[8].splice(1, 0, quill.keyboard.bindings[8].pop());
}

/***/ }),

/***/ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_backspace_offset_any.js":
/*!********************************************************************************************************************************************************************!*\
  !*** ../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_backspace_offset_any.js ***!
  \********************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ backspaceBindingsRangeAny; }
/* harmony export */ });
/* harmony import */ var src_decidim_editor_attribute_diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/decidim/editor/attribute_diff */ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/attribute_diff.js");
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
/* eslint-disable require-jsdoc */


function backspaceBindingsRangeAny(quill) {
  quill.keyboard.addBinding({
    key: 8,
    altKey: null,
    ctrlKey: null,
    metaKey: null,
    shiftKey: null,
    collapsed: true
  }, function (range, context) {
    var length = 1;
    if (range.index === 0 || quill.getLength() <= 1) {
      return;
    }
    var _quill$getLine = quill.getLine(range.index),
      _quill$getLine2 = _slicedToArray(_quill$getLine, 1),
      line = _quill$getLine2[0];
    var formats = {};
    if (context.offset === 0) {
      var _quill$getLine3 = quill.getLine(range.index - 1),
        _quill$getLine4 = _slicedToArray(_quill$getLine3, 1),
        prev = _quill$getLine4[0];
      if (prev !== null && prev.length() > 1) {
        var curFormats = line.formats();
        var prevFormats = quill.getFormat(range.index - 1, 1);
        formats = (0,src_decidim_editor_attribute_diff__WEBPACK_IMPORTED_MODULE_0__["default"])(curFormats, prevFormats) || {};
        var previousLineLength = quill.getLine(range.index - 1)[1];
        var previousChar = quill.getText(range.index - 1, 1);
        var beforePreviousChar = quill.getText(range.index - 2, 1);
        if (previousLineLength && previousLineLength === 1 && beforePreviousChar === "\n") {
          if (prevFormats && prevFormats.list) {
            quill.setSelection(range.index - 2, Quill.sources.SILENT);
          } else if (previousChar === "\n" && beforePreviousChar === "\n") {
            length += 1;
          }
        }
      }
    }
    if (/[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix)) {
      length += 1;
    }
    quill.deleteText(range.index - length, length, Quill.sources.USER);
    if (Object.keys(formats).length > 0) {
      quill.formatLine(range.index - length, length, formats, Quill.sources.USER);
    }
    quill.focus();
  });

  // Put this backspace binding to second (after backspce_offset1 it's going to be third)
  quill.keyboard.bindings[8].splice(1, 0, quill.keyboard.bindings[8].pop());
}

/***/ }),

/***/ "../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_enter.js":
/*!*****************************************************************************************************************************************************!*\
  !*** ../../.rbenv/versions/2.7.1/lib/ruby/gems/2.7.0/bundler/gems/decidim-04ca5ebdba87/decidim-core/app/packs/src/decidim/editor/modified_enter.js ***!
  \*****************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ addEnterBindings; }
/* harmony export */ });
/* eslint-disable require-jsdoc */

var Parchment = Quill["import"]("parchment");
var Delta = Quill["import"]("delta");
var getLineFormats = function getLineFormats(context) {
  return Object.keys(context.format).reduce(function (formats, format) {
    // See Parchment registry.ts => (1 << 3) | ((1 << 2) - 1) = 8 | 3 = 11
    var blockScope = 11;
    if (Parchment.query(format, blockScope) && !Array.isArray(context.format[format])) {
      formats[format] = context.format[format];
    }
    return formats;
  }, {});
};
var continueFormats = function continueFormats(quill, context, lineFormats) {
  Object.keys(context.format).forEach(function (name) {
    if (typeof lineFormats[name] !== "undefined" && lineFormats[name] !== null) {
      return;
    }
    if (Array.isArray(context.format[name])) {
      return;
    }
    if (name === "link") {
      return;
    }
    quill.format(name, context.format[name], Quill.sources.USER);
  });
};
var lineBreakHandler = function lineBreakHandler(quill, range, context) {
  var _currentLeaf$next, _nextLeaf$parent;
  var currentLeaf = quill.getLeaf(range.index)[0];
  var nextLeaf = quill.getLeaf(range.index + 1)[0];
  var previousChar = quill.getText(range.index - 1, 1);
  var formats = quill.getFormat(range.index);
  if ((currentLeaf === null || currentLeaf === void 0 || (_currentLeaf$next = currentLeaf.next) === null || _currentLeaf$next === void 0 || (_currentLeaf$next = _currentLeaf$next.domNode) === null || _currentLeaf$next === void 0 ? void 0 : _currentLeaf$next.tagName) === "A" || (nextLeaf === null || nextLeaf === void 0 || (_nextLeaf$parent = nextLeaf.parent) === null || _nextLeaf$parent === void 0 || (_nextLeaf$parent = _nextLeaf$parent.domNode) === null || _nextLeaf$parent === void 0 ? void 0 : _nextLeaf$parent.tagName) === "A") {
    quill.insertEmbed(range.index, "break", true, "user");
    quill.removeFormat(range.index, 1, Quill.sources.SILENT);
  } else {
    quill.insertEmbed(range.index, "break", true, "user");
  }
  if (nextLeaf === null) {
    quill.insertEmbed(range.index, "break", true, "user");
  } else if (context.offset === 1 && previousChar === "\n") {
    var delta = new Delta().retain(range.index).insert("\n");
    quill.updateContents(delta, Quill.sources.USER);
  }
  Object.keys(formats).forEach(function (format) {
    quill.format(format, context.format[format], Quill.sources.USER);
  });
  quill.setSelection(range.index + 1, Quill.sources.SILENT);
  var lineFormats = getLineFormats(context);
  continueFormats(quill, context, lineFormats);
};
function addEnterBindings(quill) {
  quill.keyboard.addBinding({
    key: 13,
    shiftKey: true
  }, function (range, context) {
    lineBreakHandler(quill, range, context);
  });

  // HAX: make our SHIFT+ENTER binding the second (first is added below) in order to override Quill defaults
  quill.keyboard.bindings[13].unshift(quill.keyboard.bindings[13].pop());
  quill.keyboard.addBinding({
    key: 13,
    shiftKey: false
  }, function (range, context) {
    var lineFormats = getLineFormats(context);
    var previousChar = quill.getText(range.index - 1, 1);
    var nextChar = quill.getText(range.index, 1);
    var delta = new Delta().retain(range.index).insert("\n", lineFormats);
    // const length = context.prefix.length;
    if (previousChar === "" || previousChar === "\n") {
      if (lineFormats.list && nextChar === "\n") {
        if (quill.getLength() - range.index > 2) {
          var endFormatDelta = new Delta().retain(range.index - 1)["delete"](1);
          quill.updateContents(endFormatDelta, Quill.sources.USER);
        } else {
          // Delete empty list item and end the list
          var _endFormatDelta = new Delta().retain(range.index - 1)["delete"](1).retain(range.index).insert("\n");
          quill.updateContents(_endFormatDelta, Quill.sources.USER);
          quill.setSelection(range.index + 1, Quill.sources.SILENT);
        }
      } else {
        quill.updateContents(delta, Quill.sources.USER);
        if (context.offset === 1 && previousChar === "\n") {
          quill.setSelection(range.index + 1, Quill.sources.SILENT);
        } else {
          quill.setSelection(range.index + 2, Quill.sources.SILENT);
        }
      }
    } else {
      quill.updateContents(delta, Quill.sources.USER);
      quill.setSelection(range.index + 1, Quill.sources.SILENT);
    }
    quill.focus();
    continueFormats(quill, context, lineFormats);
  });

  // Replace the default enter handling because we have modified the break element
  quill.keyboard.bindings[13].unshift(quill.keyboard.bindings[13].pop());
  return;
}

/***/ })

}]);
//# sourceMappingURL=_rbenv_versions_2_7_1_lib_ruby_gems_2_7_0_bundler_gems_decidim-04ca5ebdba87_decidim-core_app_-74bb5f.js.map