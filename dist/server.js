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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar LENGTH = exports.LENGTH = 20;\nvar POINT_TO_WIN = exports.POINT_TO_WIN = 3;\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\nvar app = express();\nvar server = __webpack_require__(/*! http */ \"http\").Server(app);\nvar io = __webpack_require__(/*! socket.io */ \"socket.io\")(server, { serveClient: false });\nvar config = {\n    port: Object({\"NODE_ENV\":'development'}).PORT || 3000\n};\n\napp.set('view engine', 'ejs');\napp.set('views', path.resolve('src/client'));\n\napp.use(express.json());\napp.use(express.urlencoded({ extended: false }));\napp.use(cookieParser());\n\napp.use('/assets', express.static('assets'));\napp.use('/dist', express.static('dist'));\n\n/* Routing */\napp.get('/', function (req, res) {\n    res.render('index', { title: 'Express' });\n});\n\napp.get('/room/:roomId', function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n        var pattern, roomId;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n                switch (_context.prev = _context.next) {\n                    case 0:\n                        pattern = Math.floor(Math.random() * 5 + 1);\n                        roomId = req.params.roomId;\n\n                        res.render('room', {\n                            pattern: pattern,\n                            roomId: roomId\n                        });\n\n                    case 3:\n                    case 'end':\n                        return _context.stop();\n                }\n            }\n        }, _callee, undefined);\n    }));\n\n    return function (_x, _x2) {\n        return _ref.apply(this, arguments);\n    };\n}());\n\n// attach the .equals method to Array's prototype to call it on any array\nArray.prototype.equals = function (array) {\n    // if the other array is a false value, return\n    if (!array) return false;\n\n    // compare lengths - can save a lot of time\n    if (this.length !== array.length) return false;\n\n    for (var i = 0, l = this.length; i < l; i++) {\n        // Check if we have nested arrays\n        if (this[i] instanceof Array && array[i] instanceof Array) {\n            // recurse into the nested arrays\n            if (!this[i].equals(array[i])) return false;\n        } else if (this[i] !== array[i]) {\n            // Warning - two different object instances will never be equal: {x:20} != {x:20}\n            return false;\n        }\n    }\n    return true;\n};\n\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\nvar constants = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\nvar m = constants.LENGTH;\nvar pointToWin = constants.POINT_TO_WIN;\nvar boardMap = {};\n\nfunction createData() {\n    var i = void 0,\n        j = void 0,\n        arr = [];\n    for (i = 0; i < m; i++) {\n        arr[i] = [];\n        for (j = 0; j < m; j++) {\n            arr[i][j] = '';\n        }\n    }\n    return arr;\n}\n\nio.of('/room').on('connection', function (socket) {\n    socket.on('join', function (_ref2) {\n        var roomId = _ref2.roomId,\n            session = _ref2.session;\n\n        socket.join(roomId);\n        socket.roomId = roomId;\n        socket.session = session;\n        boardMap[roomId] = boardMap[roomId] || {\n            version: [createData()],\n            count: 0,\n            data: createData(),\n            player1: '',\n            player2: '',\n            stepX: 0,\n            stepY: 0,\n            color: [],\n            messages: []\n        };\n        var roomInfo = boardMap[roomId];\n        roomInfo.players = roomInfo.players || {}; // Khoi tao player = {} neu chua co\n        roomInfo.players[session] = roomInfo.players[session] || { session: session }; //Khoi tao session = { } trong player neu chua co.\n        var playerInfo = roomInfo.players[session]; //Khoi tao thong tin nguoi choi = session {}\n        playerInfo.playerName = playerInfo.playerName || 'P' + Date.now().toString().substr(-10); // Them playerName vao thong tin nguoi choi\n        io.of('/room').in(roomId).emit('refreshBoard');\n    });\n    /*socket.on('leave', ({roomId}) => {\r\n        console.log('leave');\r\n        socket.leave(roomId);\r\n        socket.session = '';\r\n    });*/\n    socket.on('getBoardInfo', function (data, cb) {\n        var roomInfo = boardMap[socket.roomId];\n        cb({\n            version: roomInfo.version,\n            count: roomInfo.count,\n            data: roomInfo.data,\n            playerName: roomInfo.players[socket.session].playerName,\n            listPlayer: _.values(roomInfo.players),\n            player1: roomInfo.player1,\n            player2: roomInfo.player2,\n            stepX: roomInfo.stepX,\n            stepY: roomInfo.stepY,\n            color: createObject(roomInfo.color),\n            isWin: roomInfo.color.length > 0,\n            messages: roomInfo.messages\n        });\n    });\n    socket.on('changeUsername', function (_ref3) {\n        var playerName = _ref3.playerName;\n\n        var roomInfo = boardMap[socket.roomId];\n        var player = roomInfo.players[socket.session];\n        player.playerName = playerName;\n        io.of('/room').in(socket.roomId).emit('refreshBoard');\n    });\n    socket.on('setPlayer', function (_ref4) {\n        var type = _ref4.type;\n\n        var roomInfo = boardMap[socket.roomId];\n        if (roomInfo.count > 0) {\n            return;\n        }\n        var player = roomInfo.players[socket.session];\n        var currentPlayer = roomInfo['player' + type];\n        var currentOtherPlayer = roomInfo['player' + (parseInt(type) === 1 ? 2 : 1)];\n        if (currentPlayer) {\n            if (currentPlayer.session === socket.session) {\n                roomInfo['player' + type] = '';\n                io.of('/room').in(socket.roomId).emit('refreshBoard');\n            }\n            return;\n        }\n        if (currentOtherPlayer && currentOtherPlayer.session === socket.session) {\n            return;\n        }\n        roomInfo['player' + type] = player;\n        io.of('/room').in(socket.roomId).emit('refreshBoard');\n    });\n    /*socket.on('playGame', () => {\r\n        io.of('/room').in(socket.roomId).emit('refreshBoard');\r\n    });*/\n    socket.on('touch', function (_ref5) {\n        var x = _ref5.x,\n            y = _ref5.y,\n            version = _ref5.version;\n\n        var roomInfo = boardMap[socket.roomId];\n        if (roomInfo.color.length) {\n            return;\n        }\n        if (!roomInfo.player1 || !roomInfo.player2) {\n            return;\n        }\n        if (roomInfo.count % 2 === 0 && roomInfo.player1 && roomInfo.player1.session === socket.session) {\n            roomInfo.data = matchData(roomInfo.count, roomInfo.version, roomInfo.data);\n            roomInfo.count++;\n            roomInfo.data[x][y] = '✘';\n            roomInfo.version[roomInfo.count] = roomInfo.data;\n            var color = checkResult(roomInfo.data, x, y);\n            if (color) {\n                roomInfo.color = color;\n            }\n            io.of('/room').in(socket.roomId).emit('refreshBoard');\n        }\n        if (roomInfo.count % 2 === 1 && roomInfo.player2 && roomInfo.player2.session === socket.session) {\n            roomInfo.data = matchData(roomInfo.count, roomInfo.version, roomInfo.data);\n            roomInfo.count++;\n            roomInfo.data[x][y] = 'O';\n            roomInfo.version[roomInfo.count] = roomInfo.data;\n            var _color = checkResult(roomInfo.data, x, y);\n            if (_color) {\n                roomInfo.color = _color;\n            }\n            io.of('/room').in(socket.roomId).emit('refreshBoard');\n        }\n    });\n    socket.on('newGame', function () {\n        var roomInfo = boardMap[socket.roomId];\n        if (!roomInfo.color.length) {\n            return;\n        }\n        if (socket.session !== roomInfo.player1.session && socket.session !== roomInfo.player2.session) {\n            return;\n        }\n        roomInfo.version = [createData()];\n        roomInfo.data = createData();\n        roomInfo.color = [];\n        roomInfo.count = 0;\n        io.of('/room').in(socket.roomId).emit('refreshBoard');\n    });\n    socket.on('chat', function (_ref6) {\n        var message = _ref6.message;\n\n        var roomInfo = boardMap[socket.roomId];\n        var player = roomInfo.players[socket.session];\n        roomInfo.messages.push({\n            name: player.playerName,\n            message: message\n        });\n        if (roomInfo.messages.length > 20) {\n            roomInfo.messages.shift();\n        }\n        io.of('/room').in(socket.roomId).emit('refreshBoard');\n    });\n    socket.emit('ready');\n});\n\nvar matchData = function matchData(count, versionData, data) {\n    if (versionData[count].equals(data) === false) {\n        data = typeof versionData[count--] !== \"undefined\" ? versionData[count--] : data;\n        matchData(count, versionData, data);\n    }\n    return data;\n};\n\nfunction nextStep(row, column, srow, scolumn, times) {\n    var nextRow = row + srow * times;\n    var nextColumn = column + scolumn * times;\n    if (m <= nextRow || nextRow < 0 || m <= nextColumn || nextColumn < 0) return null;else return { x: nextRow, y: nextColumn };\n}\n\nfunction checkDirections(data, row, column, sRow, sColumn) {\n    var t = void 0;\n    var check = [{ x: row, y: column }];\n    var currentPointValue = data[row][column];\n    var nextPoint = void 0;\n    for (t = 1; t < 5; t++) {\n        nextPoint = nextStep(row, column, sRow, sColumn, t);\n        if (!nextPoint || data[nextPoint.x][nextPoint.y] !== currentPointValue) {\n            break;\n        }\n        check.push(nextPoint);\n    }\n\n    for (t = 1; t < 5; t++) {\n        nextPoint = nextStep(row, column, -sRow, -sColumn, t);\n        if (!nextPoint || data[nextPoint.x][nextPoint.y] !== currentPointValue) {\n            break;\n        }\n        check.push(nextPoint);\n    }\n\n    return check;\n}\n\nfunction checkResult(data, row, column) {\n    var directions = [{ stepX: 0, stepY: 1 }, { stepX: 1, stepY: 1 }, { stepX: 1, stepY: 0 }, { stepX: 1, stepY: -1 }];\n    for (var i = 0; i < directions.length; i++) {\n        var d = directions[i];\n        var check = checkDirections(data, row, column, d.stepX, d.stepY);\n        if (check.length === pointToWin) {\n            return check;\n        }\n    }\n    return false;\n}\n\nfunction createObject(color) {\n    var m = {};\n    var i = void 0,\n        x = void 0,\n        y = void 0;\n    for (i = 0; i < color.length; i++) {\n        x = color[i].x;\n        y = color[i].y;\n        if (!(x in m)) {\n            m[x] = {};\n        }\n        m[x][y] = true;\n    }\n    return m;\n}\n\nserver.listen(config.port, function () {\n    console.info('Server running on port ' + config.port);\n});\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi babel-polyfill ./src/server.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! ./src/server.js */\"./src/server.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./src/server.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ })

/******/ });