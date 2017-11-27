/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sender, message, level) {
    console.log("[" + new Date().toString() + " - " + sender + " ".repeat(LOG_SENDER_MAX_LENGTH - sender.length) + "] - " + message);
};

var LOG_SENDER_MAX_LENGTH = 18;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    width: 1920,
    height: 1080,

    appOption: {
        background: 0x000000
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assets = {};
var mustload = false;

var Asset = function () {
    function Asset(file, type) {
        _classCallCheck(this, Asset);

        this.file = file;
        this.type = type;
        this.loaded = false;
    }

    _createClass(Asset, [{
        key: 'setResource',
        value: function setResource(res) {
            this.resource = res;
            this.loaded = true;
        }
    }]);

    return Asset;
}();

var Static = function () {
    function Static() {
        _classCallCheck(this, Static);
    }

    _createClass(Static, null, [{
        key: 'add',
        value: function add(name, file) {
            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "image";

            if (!assets[name]) {
                (0, _log2.default)('Static', 'Added static resource ' + file + ' with name ' + name);
                assets[name] = new Asset(file, type);
                PIXI.loader.add(name, file);
                mustload = true;
            }
        }
    }, {
        key: 'getOne',
        value: function getOne(name) {
            return assets[name];
        }
    }, {
        key: 'free',
        value: function free(name) {
            assets[name] && assets[name].loaded && assets[name].resource.texture.destroy();
            delete assets[name];
        }
    }, {
        key: 'load',
        value: function load(done) {
            if (!mustload) {
                (0, _log2.default)('Static', 'Nothing to load, calling back');
                return done();
            }

            (0, _log2.default)('Static', 'Calling loader load method');
            PIXI.loader.load(function (loader, res) {
                Object.keys(res).forEach(function (name) {
                    assets[name].setResource(res[name]);
                });

                mustload = false;

                (0, _log2.default)('Static', 'Done loading static assets, calling back');
                done();
            });
        }
    }]);

    return Static;
}();

exports.default = Static;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = exports.Vector = function () {
    function Vector() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var vx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var vy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var ax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var ay = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

        _classCallCheck(this, Vector);

        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;

        this.ax = ax;
        this.ay = ay;

        this.mx = Number.MAX_SAFE_INTEGER;
        this.my = Number.MAX_SAFE_INTEGER;
        this.minx = Number.MIN_SAFE_INTEGER;
        this.miny = Number.MIN_SAFE_INTEGER;

        this.mvx = Number.MAX_SAFE_INTEGER;
        this.mvy = Number.MAX_SAFE_INTEGER;
        this.minvx = Number.MIN_SAFE_INTEGER;
        this.minvy = Number.MIN_SAFE_INTEGER;

        this.forces = [];
    }

    _createClass(Vector, [{
        key: "setMax",
        value: function setMax() {
            var mx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MAX_SAFE_INTEGER;
            var my = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_SAFE_INTEGER;

            this.mx = mx;
            this.my = my;
        }
    }, {
        key: "setMin",
        value: function setMin() {
            var minx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MIN_SAFE_INTEGER;
            var miny = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MIN_SAFE_INTEGER;

            this.minx = minx;
            this.miny = miny;
        }
    }, {
        key: "setMaxVelocity",
        value: function setMaxVelocity() {
            var mvx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MAX_SAFE_INTEGER;
            var mvy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_SAFE_INTEGER;

            this.mvx = mvx;
            this.mvy = mvy;
        }
    }, {
        key: "setMinVelocity",
        value: function setMinVelocity() {
            var minvx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MIN_SAFE_INTEGER;
            var minvy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MIN_SAFE_INTEGER;

            this.minvx = minvx;
            this.minvy = minvy;
        }
    }, {
        key: "add",
        value: function add(vector) {
            this.x += vector.x;
            this.y += vector.y;
        }
    }, {
        key: "sub",
        value: function sub(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
        }
    }, {
        key: "update",
        value: function update() {
            var _this = this;

            if (this.frozen) {
                return;
            }

            this.vx += this.ax;
            this.vy += this.ay;

            if (this.vx > this.mvx) {
                this.vx = this.mvx;
            } else if (this.vx < this.minvx) {
                this.vx = this.minvx;
            }

            if (this.vy > this.mvy) {
                this.vy = this.mvy;
            } else if (this.vy < this.minvy) {
                this.vy = this.minvy;
            }

            this.x += this.vx;
            this.y += this.vy;

            if (this.x > this.mx) {
                this.x = this.mx;
            } else if (this.x < this.minx) {
                this.x = this.minx;
            }

            if (this.y > this.my) {
                this.y = this.my;
            } else if (this.y < this.miny) {
                this.y = this.miny;
            }

            this.forces.forEach(function (x) {
                return x.update(_this);
            });

            if (this.protoElem) {
                this.protoElem.x = this.x;
                this.protoElem.y = this.y;
            }
        }
    }, {
        key: "freeze",
        value: function freeze() {
            this.frozen = true;
        }
    }, {
        key: "addForce",
        value: function addForce(force) {
            this.forces.push(force);
        }
    }, {
        key: "attach",
        value: function attach(protoElem) {
            this.protoElem = protoElem;
        }
    }]);

    return Vector;
}();

var Force = exports.Force = function () {
    _createClass(Force, null, [{
        key: "fromFunction",
        value: function fromFunction(up) {
            return { update: up };
        }
    }]);

    function Force() {
        var vx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var vy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var ax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var ay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        _classCallCheck(this, Force);

        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
    }

    _createClass(Force, [{
        key: "update",
        value: function update(vector) {
            this.vx += this.ax;
            this.vy += this.ay;

            vector.x += this.vx;
            vector.y += this.vy;
        }
    }]);

    return Force;
}();

var Range = exports.Range = function () {
    function Range() {
        _classCallCheck(this, Range);
    }

    _createClass(Range, null, [{
        key: "random",
        value: function random(min, max) {
            return Math.random() * (max - min) + min;
        }
    }]);

    return Range;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _landing = __webpack_require__(6);

var _landing2 = _interopRequireDefault(_landing);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _stage = __webpack_require__(8);

var _stage2 = _interopRequireDefault(_stage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var downloadFonts = function downloadFonts(gotFont) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", gotFont);
    oReq.open("GET", "assets/Source_Sans_Pro/ssplight.woff2");
    oReq.send();
};

global.frames = 0;

var Experiment = function () {
    function Experiment() {
        _classCallCheck(this, Experiment);

        global.addEventListener('resize', this.handleResize.bind(this));

        this.app = new PIXI.Application(_config2.default.width, _config2.default.height, _config2.default.appOption);
        this.stage = new _stage2.default(this.app, PIXI);

        this.stage.addScene('landing', new _landing2.default(this.app));
    }

    _createClass(Experiment, [{
        key: 'handleResize',
        value: function handleResize() {
            var ratio = _config2.default.width / _config2.default.height;

            this.canvasElement = this.stage.renderer.view;
            this.canvasElement.style.position = "relative";
            this.canvasElement.style.display = "block";

            if (global.innerWidth >= _config2.default.width) {
                this.canvasElement.style.width = global.innerHeight * ratio + "px";
                this.canvasElement.style.height = "100%";
                this.canvasElement.style.left = (global.innerWidth - global.innerHeight * ratio) / 2 + "px";
                this.canvasElement.style.top = 0;
            } else {
                this.canvasElement.style.width = "100%";
                this.canvasElement.style.height = global.innerWidth / ratio + "px";
                this.canvasElement.style.left = 0;
                this.canvasElement.style.top = (global.innerHeight - global.innerWidth / ratio) / 2 + "px";
            }
        }
    }, {
        key: 'update',
        value: function update() {
            global.frames++;
            this.stage.update();
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.stage.draw();
        }
    }, {
        key: 'bindFrameRate',
        value: function bindFrameRate() {
            (0, _log2.default)('Experiment', "Bound fps counter");
            setInterval(function () {
                global.fps = global.frames * 2;
                document.title = global.fps + " FPS";
                global.frames = 0;
            }, 500);
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.app.ticker.stop();
        }
    }, {
        key: 'resume',
        value: function resume() {
            this.app.ticker.start();
        }
    }, {
        key: 'run',
        value: function run() {
            var _this = this;

            document.body.appendChild(this.stage.renderer.view);

            this.bindFrameRate();
            this.stage.setCurrentScene('landing', false, function () {
                _this.handleResize();

                (0, _log2.default)('Experiment', 'Binding ticker with update function');
                _this.app.ticker.add(function () {
                    _this.update();
                    _this.draw();
                });
            });
        }
    }]);

    return Experiment;
}();

;

downloadFonts(function () {
    global._experiment = new Experiment();
    _experiment.run();
});

document.addEventListener('keydown', function () {
    _experiment.app.ticker.started ? _experiment.pause() : _experiment.resume();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scene = __webpack_require__(7);

var _scene2 = _interopRequireDefault(_scene);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _static = __webpack_require__(2);

var _static2 = _interopRequireDefault(_static);

var _physics = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_CLOUDS = 5;
var MAX_STARS = 20000;

var SCENE_HEIGHT = 2500;
var SCENE_WIDTH = _config2.default.width;

var Landing = function (_Scene) {
    _inherits(Landing, _Scene);

    function Landing(app) {
        _classCallCheck(this, Landing);

        return _possibleConstructorReturn(this, (Landing.__proto__ || Object.getPrototypeOf(Landing)).call(this, app, [{ name: "fluffycloud", file: "assets/cloud.png" }, { name: "fog", file: "assets/fog.png" }, { name: "blueglow", file: "assets/blueglow.png" }, { name: "glow", file: "assets/glow.png" }, { name: "pixel", file: "assets/pixel.png" }]));
    }

    _createClass(Landing, [{
        key: 'setup',
        value: function setup() {
            this.clouds = new Array(MAX_CLOUDS);
            this.stars = new Array(MAX_STARS);
            this.fwparticles = [];

            // Text
            this.welcome = new PIXI.Text("WebGL experiment with Pixi, determination and a lot of caffeine.", {
                fontFamily: "Source Sans Pro",
                fill: 0xFFFFFF,
                fontSize: "28px",
                fontWeight: 300
            });

            this.welcome.vector = new _physics.Vector(_config2.default.width / 2 - this.welcome.width / 2, _config2.default.height / 2 - 28);
            this.welcome.alpha = 0;
            this.welcome.vector.attach(this.welcome);
            this.welcome.vector.update();

            this.container.addChild(this.welcome);

            this.vars.halfpan = -(SCENE_HEIGHT - _config2.default.height) / 2;
            this.vars.panning = false;
            this.vars.fading = false;
            this.vars.presenting = true;

            this.vars.texttimer = performance.now() + 5000;
        }
    }, {
        key: 'createBridge',
        value: function createBridge() {
            var bridgeContainer = new PIXI.Container();
            var bridge = new PIXI.Graphics();
            var mask = new PIXI.Graphics();
            var pady = 1800;

            [bridge, mask].forEach(function (bridge) {
                // Contour
                bridge.lineStyle(40, 0x181B18, 1);
                bridge.moveTo(-100, 300 + pady);
                bridge.quadraticCurveTo(200, 200 + pady, 300, 100 + pady);
                bridge.quadraticCurveTo(1000, 300 + pady, 1700, 100 + pady);
                bridge.quadraticCurveTo(1800, 200 + pady, 2100, 300 + pady);
                bridge.moveTo(2100, 400 + pady);
                bridge.quadraticCurveTo(1000, 380 + pady, -100, 400 + pady);

                // Mid curve
                bridge.lineStyle(10, 0x181B18, 1);
                bridge.moveTo(-100, 400 + pady);
                bridge.quadraticCurveTo(100, 400 + pady, 300, 250 + pady);
                bridge.quadraticCurveTo(1000, 400 + pady, 1700, 250 + pady);
                bridge.quadraticCurveTo(1900, 400 + pady, 2000, 400 + pady);

                // Beams
                bridge.moveTo(300, 400 + pady);
                for (var i = 300; i <= 900; i += 100) {
                    bridge.lineTo(i, 100 + pady + (i - 300) / 10 + Math.sqrt(i) + 12);
                    bridge.lineTo(i + 100, 385 + pady);
                }

                bridge.moveTo(1700, 400 + pady);
                for (var _i = 1700; _i >= 1100; _i -= 100) {
                    bridge.lineTo(_i, 100 + pady + (1650 - _i) / 10 + Math.sqrt(_i) + 12);
                    bridge.lineTo(_i - 100, 385 + pady);
                }
                bridge.lineTo(1000, 200 + pady);
            });

            bridgeContainer.addChild(bridge);
            this.bridge = bridge;

            bridge.mask = mask;
            bridgeContainer.addChild(mask);

            var glow = new PIXI.extras.PictureSprite(_static2.default.getOne("glow").resource.texture);
            glow.blendMode = PIXI.BLEND_MODES.OVERLAY;
            glow.x = _config2.default.width / 2;
            glow.y = SCENE_HEIGHT;
            glow.anchor.x = .5;
            glow.anchor.y = .5;
            glow.scale.x = 8;
            glow.scale.y = 4;
            bridgeContainer.addChild(glow);

            var bridgelights = [];
            for (var i = 300; i > 1700; i += 100) {
                var light = new PIXI.extras.PictureSprite(_static2.default.getOne('glow').resource.texture);
                bridgelights.push(light);
                light.anchor.x = .5;
                light.anchor.y = .5;

                light.x = i;
                light.y = pady + 350;
                light.scale.x = .3;
                light.scale.y = .3;
                light.blendMode = PIXI.BLEND_MODES.OVERLAY;
                bridgeContainer.addChild(light);
            }

            return bridgeContainer;
        }
    }, {
        key: 'updateText',
        value: function updateText() {
            if (this.vars.texttimer > performance.now()) {
                this.welcome.alpha += 0.02;
                if (this.welcome.alpha >= 1) {
                    this.welcome.alpha = 1;
                }
            } else {
                this.welcome.alpha -= 0.05;
                if (this.welcome.alpha <= 0) {
                    var _container;

                    this.background = new PIXI.Graphics();
                    this.background.beginFill(0x001122);
                    this.background.moveTo(0, 0);
                    this.background.lineTo(0, SCENE_HEIGHT);
                    this.background.lineTo(SCENE_WIDTH, SCENE_HEIGHT);
                    this.background.lineTo(SCENE_WIDTH, 0);
                    this.background.lineTo(0, 0);
                    this.background.endFill();

                    this.overlay = new PIXI.Graphics();
                    this.overlay.beginFill(0);
                    this.overlay.moveTo(0, 0);
                    this.overlay.lineTo(0, SCENE_HEIGHT);
                    this.overlay.lineTo(SCENE_WIDTH, SCENE_HEIGHT);
                    this.overlay.lineTo(SCENE_WIDTH, 0);
                    this.overlay.lineTo(0, 0);
                    this.overlay.endFill();
                    this.overlay.alpha = 1;

                    var startexture = _static2.default.getOne("pixel").resource.texture;
                    this.starsContainer = new PIXI.particles.ParticleContainer(MAX_STARS, { alpha: true });
                    this.starsContainer.width = SCENE_WIDTH;
                    this.starsContainer.height = SCENE_HEIGHT;
                    for (var i = 0; i < MAX_STARS; i++) {
                        this.stars[i] = new PIXI.Sprite(startexture);
                        this.stars[i].x = Math.random() * SCENE_WIDTH;
                        this.stars[i].y = Math.random() * SCENE_HEIGHT;
                        this.stars[i].width = Math.random() * 2;
                        this.stars[i].height = this.stars[i].width;

                        this.starsContainer.addChild(this.stars[i]);
                    }

                    (0, _log2.default)('Landing', 'Creating ' + MAX_CLOUDS + ' clouds');
                    for (var _i2 = 0; _i2 < MAX_CLOUDS; _i2++) {
                        this.clouds[_i2] = new PIXI.extras.PictureSprite(_static2.default.getOne("fluffycloud").resource.texture);
                        this.clouds[_i2].pluginName = "picture";

                        this.clouds[_i2].vector = new _physics.Vector(Math.random() * SCENE_WIDTH - this.clouds[_i2].width / 2, Math.random() * _config2.default.height - this.clouds[_i2].height / 2, Math.random());
                        this.clouds[_i2].vector.setMax(_config2.default.width);
                        this.clouds[_i2].vector.attach(this.clouds[_i2]);
                        this.clouds[_i2].blendMode = PIXI.BLEND_MODES.OVERLAY;
                        this.clouds[_i2].alpha = Math.random();
                    }

                    this.container.vector.setMinVelocity(0, -15.7);
                    this.container.vector.setMaxVelocity(0, 0);
                    this.container.vector.setMin(0, -(SCENE_HEIGHT - _config2.default.height));

                    this.container.filters = [new PIXI.filters.AlphaFilter()];
                    this.container.filterArea = new PIXI.Rectangle(0, 0, _config2.default.width, _config2.default.height);
                    (_container = this.container).addChild.apply(_container, [this.background, this.starsContainer, this.createBridge()].concat(_toConsumableArray(this.clouds), [this.overlay]));

                    // End phase
                    this.vars.presenting = false;
                    this.vars.outing = false;
                    this.vars.fading = true;
                }
            }
        }
    }, {
        key: 'launchFirework',
        value: function launchFirework() {
            var PX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
            var PY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
            var CTN = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
            var velmod = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 35;
            var pcolor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xdb9a4a;

            var FIREWORK_COUNT = CTN;
            this.firework = new PIXI.particles.ParticleContainer(FIREWORK_COUNT, { position: true, scale: true });
            this.firework.width = SCENE_WIDTH;
            this.firework.height = SCENE_HEIGHT;

            var color = pcolor;
            var texture = _static2.default.getOne('pixel').resource.texture;
            for (var i = 0; i < FIREWORK_COUNT; i++) {
                var p = new PIXI.Sprite(texture);
                p.x = PX;
                p.y = PY;
                p.width = Math.random() * 8;
                p.height = p.width;
                p.tint = color++;

                var angle = Math.random() * Math.PI * 2;
                var velocity = Math.cos(Math.random() * Math.PI / 2) * velmod;

                p.vector = new _physics.Vector(PX, PY, Math.cos(angle) * velocity, Math.sin(angle) * velocity);
                p.vector.attach(p);
                p.vector.addForce(_physics.Force.fromFunction(function (vector) {
                    vector.y += .1;
                    vector.vx *= .95;
                    vector.vy *= .95;
                    vector.protoElem.scale.x *= .99;
                    vector.protoElem.scale.y *= .99;
                }));

                this.fwparticles.push(p);
                this.firework.addChild(p);
            }

            this.container.addChildAt(this.firework, 2);
        }
    }, {
        key: 'fireworksCheck',
        value: function fireworksCheck() {
            if (!this.vars.fw1 && this.container.vector.y < this.vars.halfpan + 100) {
                this.vars.fw1 = true;
                this.launchFirework(450, 800, 1000);
            } else if (!this.vars.fw2 && this.container.vector.y < this.vars.halfpan - 100) {
                this.vars.fw2 = true;
                this.launchFirework(1450, 1100, 1000, 25, 0xc854f9);
            } else if (!this.vars.fw3 && this.container.vector.y < this.vars.halfpan - 200) {
                this.vars.fw3 = true;
                this.launchFirework(1000, 1300, 1000, 42, 0x59f96f);
            } else if (!this.vars.fw4 && this.container.vector.y < this.vars.halfpan - 250) {
                this.vars.fw4 = true;
                this.launchFirework(700, 1500, 1000, 20, 0x99a9af);
            } else if (!this.vars.fw5 && this.container.vector.y < this.vars.halfpan - 300) {
                this.vars.fw5 = true;
                this.launchFirework(1200, 1550, 1000, 30, 0x69f96f);
            }
        }
    }, {
        key: 'updateFade',
        value: function updateFade() {
            this.overlay.alpha -= 0.02;
            if (this.overlay.alpha <= 0) {
                this.overlay.alpha = 0;
                this.container.vector.ay = -.1;

                // End phase
                this.vars.panning = true;
                this.vars.fading = false;
            }
        }
    }, {
        key: 'fadeOut',
        value: function fadeOut() {
            this.overlay.alpha += 0.01;
            if (this.overlay.alpha >= 1) {
                _experiment.pause();
            }
        }
    }, {
        key: 'updatePan',
        value: function updatePan() {
            if (this.container.vector.y < this.vars.halfpan) {
                this.container.vector.ay = .1;
            }

            if (!this.vars.outing && this.container.vector.y <= -1400) {
                this.overlay.alpha = 0;
                this.vars.outing = true;
            }

            this.container.vector.update();
        }
    }, {
        key: 'update',
        value: function update() {
            this.vars.presenting && this.updateText();
            this.vars.fading && this.updateFade();
            this.vars.panning && this.updatePan();
            this.vars.outing && this.fadeOut();

            this.clouds.forEach(function (cloud) {
                cloud.vector.update();
            });

            this.fireworksCheck();
            this.stars.forEach(function (x) {
                x.alpha = Math.random();
            });
            this.rippleSprite && this.rippleSprite.vector.update();
            this.fwparticles.forEach(function (x) {
                return x.vector.update();
            });
        }
    }]);

    return Landing;
}(_scene2.default);

exports.default = Landing;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _static = __webpack_require__(2);

var _static2 = _interopRequireDefault(_static);

var _physics = __webpack_require__(3);

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
    function Scene(app) {
        var dependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        _classCallCheck(this, Scene);

        this.app = app;

        this.container = new PIXI.Container();
        this.camera = new PIXI.Container();

        this.container.vector = new _physics.Vector();
        this.camera.vector = new _physics.Vector();

        this.container.vector.attach(this.container);
        this.camera.vector.attach(this.camera);

        this.dependencies = dependencies;

        this.camera.addChild(this.container);
        this.vars = {};
    }

    _createClass(Scene, [{
        key: 'addDependency',
        value: function addDependency(name, file) {
            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "image";

            this.dependencies.push({ name: name, file: file, type: type });
        }
    }, {
        key: 'setup',
        value: function setup() {
            throw new Error("setup() method not implemented");
        }
    }, {
        key: 'update',
        value: function update() {
            throw new Error("update() method not implemented");
        }

        // Can be overridden using super.load(() => { stuff; done(); })
        // Might be useful for async setup

    }, {
        key: 'load',
        value: function load(done) {
            (0, _log2.default)('Scene', 'Dependencies are being converted to static assets');
            this.dependencies.forEach(function (dep) {
                _static2.default.add(dep.name, dep.file, dep.type);
            });

            (0, _log2.default)('Scene', 'Loading static assets');
            _static2.default.load(done);
        }
    }]);

    return Scene;
}();

exports.default = Scene;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stage = function () {
    function Stage(app) {
        _classCallCheck(this, Stage);

        this.scenes = {};
        this.renderer = PIXI.autoDetectRenderer(_config2.default.width, _config2.default.height, { antialias: false });
        this.app = app;
        this.currentScene;
    }

    _createClass(Stage, [{
        key: 'setCurrentScene',
        value: function setCurrentScene(name, transition, done) {
            var _this = this;

            // TODO: Add second background scene to transition between old and new
            this.currentScene = this.scenes[name];
            this.app.stage = this.currentScene.container;
            this.currentScene.load(function () {
                _this.currentScene.setup();
                done();
            });
        }
    }, {
        key: 'update',
        value: function update() {
            this.currentScene.update();
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.renderer.render(this.currentScene.camera);
        }
    }, {
        key: 'addScene',
        value: function addScene(name, scene, current) {
            this.scenes[name] = scene;
            current && this.setCurrentScene(name);
        }
    }]);

    return Stage;
}();

exports.default = Stage;

/***/ })
/******/ ]);
//# sourceMappingURL=experiment.js.map