(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './models/Hex'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./models/Hex'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Hex);
    global.GridGenerator = mod.exports;
  }
})(this, function (exports, _Hex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Hex2 = _interopRequireDefault(_Hex);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var GridGenerator = function () {
    function GridGenerator() {
      _classCallCheck(this, GridGenerator);
    }

    _createClass(GridGenerator, null, [{
      key: 'getGenerator',
      value: function getGenerator(name) {
        if (GridGenerator.hasOwnProperty(name)) return GridGenerator[name];

        return null;
      }
    }, {
      key: 'parallelogram',
      value: function parallelogram(q1, q2, r1, r2) {
        var hexas = [];
        for (var q = q1; q <= q2; q++) {
          for (var r = r1; r <= r2; r++) {
            hexas.push(new _Hex2.default(q, r, -q - r));
          }
        }

        return hexas;
      }
    }, {
      key: 'triangle',
      value: function triangle(mapSize) {
        var hexas = [];
        for (var q = 0; q <= mapSize; q++) {
          for (var r = 0; r <= mapSize - q; r++) {
            hexas.push(new _Hex2.default(q, r, -q - r));
          }
        }

        return hexas;
      }
    }, {
      key: 'hexagon',
      value: function hexagon(mapRadius) {
        var hexas = [];
        for (var q = -mapRadius; q <= mapRadius; q++) {
          var r1 = Math.max(-mapRadius, -q - mapRadius);
          var r2 = Math.min(mapRadius, -q + mapRadius);
          for (var r = r1; r <= r2; r++) {
            hexas.push(new _Hex2.default(q, r, -q - r));
          }
        }

        return hexas;
      }
    }, {
      key: 'rectangle',
      value: function rectangle(mapWidth, mapHeight) {
        var hexas = [];
        for (var r = 0; r < mapHeight; r++) {
          var offset = Math.floor(r / 2); // or r>>1
          for (var q = -offset; q < mapWidth - offset; q++) {
            hexas.push(new _Hex2.default(q, r, -q - r));
          }
        }

        return hexas;
      }
    }, {
      key: 'orientedRectangle',
      value: function orientedRectangle(mapWidth, mapHeight) {
        var hexas = [];
        for (var q = 0; q < mapWidth; q++) {
          var offset = Math.floor(q / 2); // or q>>1
          for (var r = -offset; r < mapHeight - offset; r++) {
            hexas.push(new _Hex2.default(q, r, -q - r));
          }
        }

        return hexas;
      }
    }]);

    return GridGenerator;
  }();

  exports.default = GridGenerator;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes);
    global.HexGrid = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var HexGrid = function (_Component) {
    _inherits(HexGrid, _Component);

    function HexGrid() {
      _classCallCheck(this, HexGrid);

      return _possibleConstructorReturn(this, (HexGrid.__proto__ || Object.getPrototypeOf(HexGrid)).apply(this, arguments));
    }

    _createClass(HexGrid, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            width = _props.width,
            height = _props.height,
            viewBox = _props.viewBox;

        return _react2.default.createElement(
          'svg',
          { className: 'grid', width: width, height: height, viewBox: viewBox, version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
          this.props.children
        );
      }
    }]);

    return HexGrid;
  }(_react.Component);

  HexGrid.propTypes = {
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    viewBox: _propTypes2.default.string,
    children: _propTypes2.default.node.isRequired
  };
  HexGrid.defaultProps = {
    width: 800,
    height: 600,
    viewBox: "-50 -50 100 100"
  };
  exports.default = HexGrid;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './models/Hex', './models/Point'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./models/Hex'), require('./models/Point'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Hex, global.Point);
    global.HexUtils = mod.exports;
  }
})(this, function (exports, _Hex, _Point) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Hex2 = _interopRequireDefault(_Hex);

  var _Point2 = _interopRequireDefault(_Point);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var HexUtils = function () {
    function HexUtils() {
      _classCallCheck(this, HexUtils);
    }

    _createClass(HexUtils, null, [{
      key: 'equals',
      value: function equals(a, b) {
        return a.q == b.q && a.r == b.r && a.s == b.s;
      }
    }, {
      key: 'add',
      value: function add(a, b) {
        return new _Hex2.default(a.q + b.q, a.r + b.r, a.s + b.s);
      }
    }, {
      key: 'subtract',
      value: function subtract(a, b) {
        return new _Hex2.default(a.q - b.q, a.r - b.r, a.s - b.s);
      }
    }, {
      key: 'multiply',
      value: function multiply(a, k) {
        return new _Hex2.default(a.q * k, a.r * k, a.s * k);
      }
    }, {
      key: 'lengths',
      value: function lengths(hex) {
        return parseInt((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
      }
    }, {
      key: 'distance',
      value: function distance(a, b) {
        return HexUtils.lengths(HexUtils.subtract(a, b));
      }
    }, {
      key: 'direction',
      value: function direction(_direction) {
        return HexUtils.DIRECTIONS[(6 + _direction % 6) % 6];
      }
    }, {
      key: 'neighbour',
      value: function neighbour(hex, direction) {
        return HexUtils.add(hex, HexUtils.direction(direction));
      }
    }, {
      key: 'neighbours',
      value: function neighbours(hex) {
        var array = [];
        for (var i = 0; i < HexUtils.DIRECTIONS.length; i += 1) {
          array.push(HexUtils.neighbour(hex, i));
        }

        return array;
      }
    }, {
      key: 'round',
      value: function round(hex) {
        var rq = Math.round(hex.q);
        var rr = Math.round(hex.r);
        var rs = Math.round(hex.s);

        var qDiff = Math.abs(rq - hex.q);
        var rDiff = Math.abs(rr - hex.r);
        var sDiff = Math.abs(rs - hex.s);

        if (qDiff > rDiff && qDiff > sDiff) rq = -rr - rs;else if (rDiff > sDiff) rr = -rq - rs;else rs = -rq - rr;

        return new _Hex2.default(rq, rr, rs);
      }
    }, {
      key: 'hexToPixel',
      value: function hexToPixel(hex, layout) {
        var s = layout.spacing;
        var M = layout.orientation;
        var x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x;
        var y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y;
        // Apply spacing
        x = x * s;
        y = y * s;
        return new _Point2.default(x + layout.origin.x, y + layout.origin.y);
      }
    }, {
      key: 'pixelToHex',
      value: function pixelToHex(point, layout) {
        var M = layout.orientation;
        var pt = new _Point2.default((point.x - layout.origin.x) / layout.size.x, (point.y - layout.origin.y) / layout.size.y);
        var q = M.b0 * pt.x + M.b1 * pt.y;
        var r = M.b2 * pt.x + M.b3 * pt.y;
        var hex = new _Hex2.default(q, r, -q - r);
        return HexUtils.round(hex);
      }
    }, {
      key: 'lerp',
      value: function lerp(a, b, t) {
        return a + (b - a) * t;
      }
    }, {
      key: 'hexLerp',
      value: function hexLerp(a, b, t) {
        return new _Hex2.default(HexUtils.lerp(a.q, b.q, t), HexUtils.lerp(a.r, b.r, t), HexUtils.lerp(a.s, b.s, t));
      }
    }, {
      key: 'getID',
      value: function getID(hex) {
        return hex.q + ',' + hex.r + ',' + hex.s;
      }
    }]);

    return HexUtils;
  }();

  HexUtils.DIRECTIONS = [new _Hex2.default(1, 0, -1), new _Hex2.default(1, -1, 0), new _Hex2.default(0, -1, 1), new _Hex2.default(-1, 0, 1), new _Hex2.default(-1, 1, 0), new _Hex2.default(0, 1, -1)];
  exports.default = HexUtils;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'classnames', '../models/Hex', '../HexUtils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('classnames'), require('../models/Hex'), require('../HexUtils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.classnames, global.Hex, global.HexUtils);
    global.Hexagon = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _Hex, _HexUtils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _Hex2 = _interopRequireDefault(_Hex);

  var _HexUtils2 = _interopRequireDefault(_HexUtils);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Hexagon = function (_Component) {
    _inherits(Hexagon, _Component);

    function Hexagon(props, context) {
      _classCallCheck(this, Hexagon);

      var _this = _possibleConstructorReturn(this, (Hexagon.__proto__ || Object.getPrototypeOf(Hexagon)).call(this, props, context));

      var q = props.q,
          r = props.r,
          s = props.s;
      var layout = context.layout;

      var hex = new _Hex2.default(q, r, s);
      var pixel = _HexUtils2.default.hexToPixel(hex, layout);
      _this.state = { hex: hex, pixel: pixel };
      return _this;
    }

    // TODO Refactor to reduce duplicate


    _createClass(Hexagon, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var q = nextProps.q,
            r = nextProps.r,
            s = nextProps.s;
        var layout = this.context.layout;

        var hex = new _Hex2.default(q, r, s);
        var pixel = _HexUtils2.default.hexToPixel(hex, layout);
        this.setState({ hex: hex, pixel: pixel });
      }
    }, {
      key: 'onMouseEnter',
      value: function onMouseEnter(e) {
        if (this.props.onMouseEnter) {
          this.props.onMouseEnter(e, this);
        }
      }
    }, {
      key: 'onMouseOver',
      value: function onMouseOver(e) {
        if (this.props.onMouseOver) {
          this.props.onMouseOver(e, this);
        }
      }
    }, {
      key: 'onMouseLeave',
      value: function onMouseLeave(e) {
        if (this.props.onMouseLeave) {
          this.props.onMouseLeave(e, this);
        }
      }
    }, {
      key: 'onClick',
      value: function onClick(e) {
        if (this.props.onClick) {
          this.props.onClick(e, this);
        }
      }
    }, {
      key: 'onDragStart',
      value: function onDragStart(e) {
        if (this.props.onDragStart) {
          var targetProps = _extends({}, this.state, {
            data: this.props.data,
            fill: this.props.fill,
            className: this.props.className
          });
          e.dataTransfer.setData('hexagon', JSON.stringify(targetProps));
          this.props.onDragStart(e, this);
        }
      }
    }, {
      key: 'onDragEnd',
      value: function onDragEnd(e) {
        if (this.props.onDragEnd) {
          e.preventDefault();
          var success = e.dataTransfer.dropEffect !== 'none';
          this.props.onDragEnd(e, this, success);
        }
      }
    }, {
      key: 'onDragOver',
      value: function onDragOver(e) {
        if (this.props.onDragOver) {
          this.props.onDragOver(e, this);
        }
      }
    }, {
      key: 'onDrop',
      value: function onDrop(e) {
        if (this.props.onDrop) {
          e.preventDefault();
          var target = JSON.parse(e.dataTransfer.getData('hexagon'));
          this.props.onDrop(e, this, target);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            fill = _props.fill,
            cellStyle = _props.cellStyle,
            className = _props.className;
        var points = this.context.points;
        var _state = this.state,
            hex = _state.hex,
            pixel = _state.pixel;

        var fillId = fill ? 'url(#' + fill + ')' : null;
        return _react2.default.createElement(
          'g',
          {
            className: (0, _classnames2.default)('hexagon-group', className),
            transform: 'translate(' + pixel.x + ', ' + pixel.y + ')',
            draggable: 'true',
            onMouseEnter: function onMouseEnter(e) {
              return _this2.onMouseEnter(e);
            },
            onMouseOver: function onMouseOver(e) {
              return _this2.onMouseOver(e);
            },
            onMouseLeave: function onMouseLeave(e) {
              return _this2.onMouseLeave(e);
            },
            onClick: function onClick(e) {
              return _this2.onClick(e);
            },
            onDragStart: function onDragStart(e) {
              return _this2.onDragStart(e);
            },
            onDragEnd: function onDragEnd(e) {
              return _this2.onDragEnd(e);
            },
            onDragOver: function onDragOver(e) {
              return _this2.onDragOver(e);
            },
            onDrop: function onDrop(e) {
              return _this2.onDrop(e);
            }
          },
          _react2.default.createElement(
            'g',
            { className: 'hexagon' },
            _react2.default.createElement('polygon', _extends({ points: points, fill: fillId, style: cellStyle }, this.props)),
            this.props.children
          )
        );
      }
    }]);

    return Hexagon;
  }(_react.Component);

  Hexagon.propTypes = {
    q: _propTypes2.default.number.isRequired,
    r: _propTypes2.default.number.isRequired,
    s: _propTypes2.default.number.isRequired,
    fill: _propTypes2.default.string,
    cellStyle: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    onMouseEnter: _propTypes2.default.func,
    onMouseOver: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    onDragStart: _propTypes2.default.func,
    onDragEnd: _propTypes2.default.func,
    onDragOver: _propTypes2.default.func,
    onDrop: _propTypes2.default.func,
    children: _propTypes2.default.node
  };
  Hexagon.contextTypes = {
    layout: _propTypes2.default.object, // TODO Shape
    points: _propTypes2.default.string
  };
  exports.default = Hexagon;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes);
    global.Text = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Text = function (_Component) {
    _inherits(Text, _Component);

    function Text() {
      _classCallCheck(this, Text);

      return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
    }

    _createClass(Text, [{
      key: 'render',
      value: function render() {
        var children = this.props.children;

        return _react2.default.createElement(
          'text',
          { x: '0', y: '0.3em', textAnchor: 'middle' },
          children
        );
      }
    }]);

    return Text;
  }(_react.Component);

  Text.propTypes = {
    children: _propTypes2.default.string
  };
  exports.default = Text;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './models/Orientation', './models/Point'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./models/Orientation'), require('./models/Point'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.Orientation, global.Point);
    global.Layout = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Orientation, _Point) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Orientation2 = _interopRequireDefault(_Orientation);

  var _Point2 = _interopRequireDefault(_Point);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Layout = function (_Component) {
    _inherits(Layout, _Component);

    function Layout() {
      _classCallCheck(this, Layout);

      return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
    }

    _createClass(Layout, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var _props = this.props,
            children = _props.children,
            flat = _props.flat,
            className = _props.className,
            rest = _objectWithoutProperties(_props, ['children', 'flat', 'className']);

        var orientation = flat ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY;
        var cornerCoords = this.calculateCoordinates(orientation);
        var points = cornerCoords.map(function (point) {
          return point.x + ',' + point.y;
        }).join(' ');
        var childLayout = Object.assign({}, rest, { orientation: orientation });

        return {
          layout: childLayout,
          points: points
        };
      }
    }, {
      key: 'getPointOffset',
      value: function getPointOffset(corner, orientation, size) {
        var angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6;
        return new _Point2.default(size.x * Math.cos(angle), size.y * Math.sin(angle));
      }
    }, {
      key: 'calculateCoordinates',
      value: function calculateCoordinates(orientation) {
        var _this2 = this;

        var corners = [];
        var center = new _Point2.default(0, 0);
        var size = this.props.size;


        Array.from(new Array(6), function (x, i) {
          var offset = _this2.getPointOffset(i, orientation, size);
          var point = new _Point2.default(center.x + offset.x, center.y + offset.y);
          corners.push(point);
        });

        return corners;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            children = _props2.children,
            className = _props2.className;

        return _react2.default.createElement(
          'g',
          { className: className },
          children
        );
      }
    }]);

    return Layout;
  }(_react.Component);

  Layout.LAYOUT_FLAT = new _Orientation2.default(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
  Layout.LAYOUT_POINTY = new _Orientation2.default(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
  Layout.propTypes = {
    children: _propTypes2.default.node.isRequired,
    className: _propTypes2.default.string,
    flat: _propTypes2.default.bool,
    origin: _propTypes2.default.object,
    size: _propTypes2.default.object,
    spacing: _propTypes2.default.number
  };
  Layout.defaultProps = {
    size: new _Point2.default(10, 10),
    flat: true,
    spacing: 1.0,
    origin: new _Point2.default(0, 0)
  };
  Layout.childContextTypes = {
    layout: _propTypes2.default.object, // TODO Shape
    points: _propTypes2.default.string
  };
  exports.default = Layout;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './HexUtils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./HexUtils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.HexUtils);
    global.Path = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _HexUtils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _HexUtils2 = _interopRequireDefault(_HexUtils);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Path = function (_Component) {
    _inherits(Path, _Component);

    function Path() {
      _classCallCheck(this, Path);

      return _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).apply(this, arguments));
    }

    _createClass(Path, [{
      key: 'getPoints',
      value: function getPoints() {
        var _props = this.props,
            start = _props.start,
            end = _props.end;
        var layout = this.context.layout;

        if (!start || !end) {
          return '';
        }

        // Get all the intersecting hexes between start and end points
        var distance = _HexUtils2.default.distance(start, end);
        var intersects = [];
        var step = 1.0 / Math.max(distance, 1);
        for (var i = 0; i <= distance; i++) {
          intersects.push(_HexUtils2.default.round(_HexUtils2.default.hexLerp(start, end, step * i)));
        }

        // Construct Path points out of all the intersecting hexes (e.g. M 0,0 L 10,20, L 30,20)
        var points = 'M';
        points += intersects.map(function (hex) {
          var p = _HexUtils2.default.hexToPixel(hex, layout);
          return ' ' + p.x + ',' + p.y + ' ';
        }).join('L');

        return points;
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement('path', { d: this.getPoints() });
      }
    }]);

    return Path;
  }(_react.Component);

  Path.propTypes = {
    start: _propTypes2.default.object,
    end: _propTypes2.default.object,
    layout: _propTypes2.default.object
  };
  Path.contextTypes = {
    layout: _propTypes2.default.object // TODO Shape
  };
  exports.default = Path;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './HexUtils', './models/Point'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./HexUtils'), require('./models/Point'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.HexUtils, global.Point);
    global.Pattern = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _HexUtils, _Point) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _HexUtils2 = _interopRequireDefault(_HexUtils);

  var _Point2 = _interopRequireDefault(_Point);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Pattern = function (_Component) {
    _inherits(Pattern, _Component);

    function Pattern() {
      _classCallCheck(this, Pattern);

      return _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).apply(this, arguments));
    }

    _createClass(Pattern, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            id = _props.id,
            link = _props.link,
            size = _props.size;


        return _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'pattern',
            { id: id, patternUnits: 'objectBoundingBox', x: 0, y: 0, width: size.x, height: size.y },
            _react2.default.createElement('image', { xlinkHref: link, x: 0, y: 0, width: size.x * 2, height: size.y * 2 })
          )
        );
      }
    }]);

    return Pattern;
  }(_react.Component);

  Pattern.propTypes = {
    id: _propTypes2.default.string.isRequired,
    link: _propTypes2.default.string.isRequired,
    size: _propTypes2.default.object
  };
  Pattern.defaultProps = {
    size: new _Point2.default(10, 10)
  };
  exports.default = Pattern;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './GridGenerator', './HexGrid', './HexUtils', './Layout', './Path', './Pattern', './Hexagon/Hexagon', './Hexagon/Text', './models/Hex'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./GridGenerator'), require('./HexGrid'), require('./HexUtils'), require('./Layout'), require('./Path'), require('./Pattern'), require('./Hexagon/Hexagon'), require('./Hexagon/Text'), require('./models/Hex'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.GridGenerator, global.HexGrid, global.HexUtils, global.Layout, global.Path, global.Pattern, global.Hexagon, global.Text, global.Hex);
    global.index = mod.exports;
  }
})(this, function (exports, _GridGenerator, _HexGrid, _HexUtils, _Layout, _Path, _Pattern, _Hexagon, _Text, _Hex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Hex = exports.Text = exports.Hexagon = exports.Pattern = exports.Path = exports.Layout = exports.HexUtils = exports.HexGrid = exports.GridGenerator = undefined;

  var _GridGenerator2 = _interopRequireDefault(_GridGenerator);

  var _HexGrid2 = _interopRequireDefault(_HexGrid);

  var _HexUtils2 = _interopRequireDefault(_HexUtils);

  var _Layout2 = _interopRequireDefault(_Layout);

  var _Path2 = _interopRequireDefault(_Path);

  var _Pattern2 = _interopRequireDefault(_Pattern);

  var _Hexagon2 = _interopRequireDefault(_Hexagon);

  var _Text2 = _interopRequireDefault(_Text);

  var _Hex2 = _interopRequireDefault(_Hex);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.GridGenerator = _GridGenerator2.default;
  exports.HexGrid = _HexGrid2.default;
  exports.HexUtils = _HexUtils2.default;
  exports.Layout = _Layout2.default;
  exports.Path = _Path2.default;
  exports.Pattern = _Pattern2.default;
  exports.Hexagon = _Hexagon2.default;
  exports.Text = _Text2.default;
  exports.Hex = _Hex2.default;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Hex = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Hex = function Hex(q, r, s) {
    _classCallCheck(this, Hex);

    this.q = q;
    this.r = r;
    this.s = s;
  };

  exports.default = Hex;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Orientation = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Orientation = function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
    _classCallCheck(this, Orientation);

    this.f0 = f0;
    this.f1 = f1;
    this.f2 = f2;
    this.f3 = f3;
    this.b0 = b0;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.startAngle = startAngle;
  };

  exports.default = Orientation;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Point = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Point = function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  };

  exports.default = Point;
});
