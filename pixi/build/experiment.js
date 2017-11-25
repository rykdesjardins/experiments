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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _landing = __webpack_require__(5);

var _landing2 = _interopRequireDefault(_landing);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _stage = __webpack_require__(7);

var _stage2 = _interopRequireDefault(_stage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

global.frames = 0;

var Experiment = function () {
    function Experiment() {
        _classCallCheck(this, Experiment);

        global.addEventListener('resize', this.handleResize.bind(this));

        this.app = new PIXI.Application(_config2.default.width, _config2.default.height, _config2.default.appOption);
        this.canvasElement = this.app.view;
        this.stage = new _stage2.default(this.app, PIXI);

        this.stage.addScene('landing', new _landing2.default(this.app));
    }

    _createClass(Experiment, [{
        key: 'handleResize',
        value: function handleResize() {
            var ratio = _config2.default.width / _config2.default.height;

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
                global.fps = global.frames;
                global.frames = 0;
            }, 1000);
        }
    }, {
        key: 'run',
        value: function run() {
            var _this = this;

            document.body.appendChild(this.stage.renderer.view);

            this.handleResize();
            this.bindFrameRate();
            this.stage.setCurrentScene('landing', false, function () {
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

var _experiment = new Experiment();
_experiment.run();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scene = __webpack_require__(6);

var _scene2 = _interopRequireDefault(_scene);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _static = __webpack_require__(3);

var _static2 = _interopRequireDefault(_static);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_CLOUDS = 10;
var MAX_STARS = 10000;

var Landing = function (_Scene) {
    _inherits(Landing, _Scene);

    function Landing(app) {
        _classCallCheck(this, Landing);

        return _possibleConstructorReturn(this, (Landing.__proto__ || Object.getPrototypeOf(Landing)).call(this, app, [{ name: "fluffycloud", file: "assets/cloud.png" }]));
    }

    _createClass(Landing, [{
        key: 'setup',
        value: function setup(stage) {
            this.background = new PIXI.Graphics();
            this.background.beginFill(0x001122);
            this.background.moveTo(0, 0);
            this.background.lineTo(0, _config2.default.height);
            this.background.lineTo(_config2.default.width, _config2.default.height);
            this.background.lineTo(_config2.default.width, 0);
            this.background.lineTo(0, 0);
            this.background.endFill();

            this.stars = new Array(MAX_STARS);
            for (var i = 0; i < MAX_STARS; i++) {
                this.stars[i] = { x: Math.random() * _config2.default.width, y: Math.random() * _config2.default.height, size: Math.random() * 2 };

                this.background.beginFill(0xFFFFFF, Math.random());
                this.background.drawRect(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
            }

            this.container.addChild(this.background);

            this.container.filters = [new PIXI.filters.AlphaFilter()];
            this.container.filterArea = new PIXI.Rectangle(0, 0, _config2.default.width, _config2.default.height);

            this.clouds = new Array(MAX_CLOUDS);
            (0, _log2.default)('Landing', 'Creating ' + MAX_CLOUDS + ' clouds');
            for (var _i = 0; _i < MAX_CLOUDS; _i++) {
                this.clouds[_i] = new PIXI.extras.PictureSprite(_static2.default.getOne("fluffycloud").resource.texture);
                this.clouds[_i].pluginName = "picture";

                this.clouds[_i].x = Math.random() * _config2.default.width - this.clouds[_i].width / 2;
                this.clouds[_i].y = Math.random() * _config2.default.height - this.clouds[_i].height / 2;
                this.clouds[_i].vx = Math.random();
                this.clouds[_i].blendMode = PIXI.BLEND_MODES.OVERLAY;
                this.clouds[_i].alpha = Math.random();

                this.container.addChild(this.clouds[_i]);
            }

            var clouds = this.clouds;
            global.setBlend = function (b) {
                clouds.forEach(function (x) {
                    x.blendMode = b;
                });
            };
        }
    }, {
        key: 'update',
        value: function update() {
            this.clouds.forEach(function (cloud) {
                cloud.x += cloud.vx;

                if (cloud.x > _config2.default.width) {
                    cloud.x = -cloud.width;
                }
            });
        }
    }]);

    return Landing;
}(_scene2.default);

exports.default = Landing;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _static = __webpack_require__(3);

var _static2 = _interopRequireDefault(_static);

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
        this.dependencies = dependencies;
    }

    _createClass(Scene, [{
        key: 'addDependency',
        value: function addDependency(name, file) {
            var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "image";

            this.dependencies.push({ name: name, file: file, type: type });
        }
    }, {
        key: 'setup',
        value: function setup() {}
    }, {
        key: 'update',
        value: function update() {}
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
/* 7 */
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
            this.renderer.render(this.currentScene.container);
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