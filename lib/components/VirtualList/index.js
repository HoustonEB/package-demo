"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var height = 60;
var bufferSize = 5;

var VirtualList =
/*#__PURE__*/
function (_Component) {
  _inherits(VirtualList, _Component);

  function VirtualList(props) {
    var _this;

    _classCallCheck(this, VirtualList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VirtualList).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleScroll", (0, _lodash.throttle)(function (e) {
      if (!_this.doc) {
        // 兼容 iOS Safari/Webview
        _this.doc = window.document.body.scrollTop ? window.document.body : window.document.documentElement;
      }

      var scrollTop = _this.doc.scrollTop;

      if (scrollTop > _this.scrollTop) {
        if (scrollTop > _this.anchorItem.bottom) {
          _this.updateBoundaryIndex(scrollTop);

          _this.updateVisibleData();
        }
      } else if (scrollTop < _this.scrollTop) {
        if (scrollTop < _this.anchorItem.top) {
          _this.updateBoundaryIndex(scrollTop);

          _this.updateVisibleData();
        }
      }

      _this.scrollTop = scrollTop;
    }, 30));

    _this.state = {
      startOffset: 0,
      endOffset: 0,
      visibleData: []
    };
    _this.startIndex = 0;
    _this.endIndex = 0;
    _this.scrollTop = 0;
    _this.rowCount = 0;
    _this.doc = null; // 缓存已渲染元素的位置信息

    _this.cache = []; // 缓存锚点元素的位置信息

    _this.anchorItem = {
      index: 0,
      // 锚点元素的索引值
      top: 0,
      // 锚点元素的顶部距离第一个元素的顶部的偏移量(即 startOffset)
      bottom: 0 // 锚点元素的底部距离第一个元素的顶部的偏移量

    };
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.cachePosition = _this.cachePosition.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VirtualList, [{
    key: "cachePosition",
    value: function cachePosition(node, index) {
      var rect = node.getBoundingClientRect();
      var top = rect.top + window.pageYOffset;
      console.log(index);
      this.cache.push({
        index: index,
        top: top,
        bottom: top + 60
      });
    } // 滚动事件处理函数

  }, {
    key: "updateBoundaryIndex",
    // 计算 startIndex 和 endIndex
    value: function updateBoundaryIndex(scrollTop) {
      scrollTop = scrollTop || 0; // 用户正常滚动下，根据 scrollTop 找到新的锚点元素位置

      var anchorItem = this.cache.find(function (item) {
        return item.bottom >= scrollTop;
      }); // console.log(scrollTop, anchorItem);

      if (!anchorItem) {
        // 滚的太快，找不到锚点元素，这个暂不处理
        return;
      }

      this.anchorItem = _objectSpread({}, anchorItem);
      this.startIndex = this.anchorItem.index;
      this.endIndex = this.startIndex + this.rowCount;
    }
  }, {
    key: "updateVisibleData",
    value: function updateVisibleData() {
      var visibleData = this.props.data.slice(this.startIndex, this.endIndex);
      this.setState({
        startOffset: this.anchorItem.top,
        endOffset: (this.props.data.length - this.endIndex) * height,
        visibleData: visibleData
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // 计算可渲染的元素个数
      this.rowCount = Math.ceil(window.innerHeight / height) + bufferSize;
      this.endIndex = this.startIndex + this.rowCount;
      this.updateVisibleData();
      window.addEventListener('scroll', this.handleScroll, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          startOffset = _this$state.startOffset,
          endOffset = _this$state.endOffset,
          visibleData = _this$state.visibleData;
      return _react["default"].createElement("div", {
        className: "wrapper",
        ref: function ref(node) {
          _this2.wrapper = node;
        }
      }, _react["default"].createElement("div", {
        style: {
          paddingTop: "".concat(startOffset, "px"),
          paddingBottom: "".concat(endOffset, "px")
        }
      }, visibleData.map(function (item, index) {
        return _this2.props.renderItem(_this2.cachePosition, _this2.startIndex + index);
      })));
    }
  }]);

  return VirtualList;
}(_react.Component);

exports["default"] = VirtualList;