/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//module slavs {
	var Draw_1 = __webpack_require__(1);
	var Map_1 = __webpack_require__(3);
	var StartUp_1 = __webpack_require__(11);
	var App = (function () {
	    function App() {
	        var map = new Map_1.Map(StartUp_1.StartUp.map());
	        var draw = new Draw_1.Draw(map);
	        draw.start();
	        //
	        //map.add
	    }
	    return App;
	}());
	exports.App = App;
	window.onload = function () {
	    new App();
	};
	//
	//}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var point_1 = __webpack_require__(2);
	var Draw = (function () {
	    function Draw(map) {
	        var _this = this;
	        this.map = map;
	        this.list = [];
	        this._r = 30;
	        this.urbanisticDrawLine = null;
	        this.animation = function () {
	            //setTimeout(()=>{
	            _this.clear();
	            _this.drawUrbanistic();
	            _this.drawCharacter();
	            if (_this.urbanisticDrawLine != null) {
	                _this.ctx.beginPath();
	                _this.ctx.moveTo(_this.urbanisticDrawLine.start.x, _this.urbanisticDrawLine.start.y);
	                _this.ctx.lineTo(_this.urbanisticDrawLine.end.x, _this.urbanisticDrawLine.end.y);
	                _this.ctx.stroke();
	            }
	            requestAnimationFrame(_this.animation);
	            //},1000/60)
	        };
	        var canvas = document.getElementById('canvas');
	        this.ctx = canvas.getContext('2d');
	        this.ctx.canvas.width = 1000;
	        this.ctx.canvas.height = 500;
	        this.setupClick(canvas);
	        this.map = map;
	        //
	        this.animation();
	    }
	    Draw.prototype.clear = function () {
	        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	    };
	    Draw.prototype.drawUrbanistic = function () {
	        for (var i = 0; i < this.map.Urbanistic.length; i++) {
	            var urbanistic = this.map.Urbanistic[i];
	            this.ctx.beginPath();
	            this.ctx.arc(urbanistic.x, urbanistic.y, this._r, 0, 2 * Math.PI, false);
	            this.ctx.fillStyle = 'green';
	            this.ctx.fill();
	            this.ctx.lineWidth = 2;
	            this.ctx.strokeStyle = urbanistic.player.color;
	            this.ctx.stroke();
	            if (urbanistic.showInside === true) {
	                if (urbanistic.armySlotSlot) {
	                    for (var i_1 = 0; i_1 < urbanistic.armySlotSlot.length; i_1++) {
	                        //todo finish this
	                        var position_1 = urbanistic.radius * 2;
	                        var armyPoint = new point_1.Point(urbanistic.x, urbanistic.y + position_1);
	                        this.ctx.beginPath();
	                        this.ctx.rect(armyPoint.x, armyPoint.y, 20, 20);
	                        this.ctx.strokeStyle = "red";
	                        this.ctx.stroke();
	                    }
	                }
	                // this.ctx.beginPath();
	                // this.ctx.arc(urbanistic.x, urbanistic.y, this._r * 2, 0, 2 * Math.PI, false);
	                // this.ctx.fillStyle = 'brown';
	                // this.ctx.fill();
	                this.ctx.beginPath();
	                var position = urbanistic.radius * 2;
	                var btnPoint = new point_1.Point(urbanistic.x, urbanistic.y - position);
	                this.ctx.arc(btnPoint.x, btnPoint.y, 20, 0, 2 * Math.PI, false);
	                this.ctx.fillStyle = 'red';
	                this.ctx.fill();
	                this.ctx.closePath();
	                this.ctx.beginPath();
	                // this.ctx.arc(urbanistic.x - position, urbanistic.y, 10, 0, 2 * Math.PI, false);
	                // this.ctx.fillStyle = 'gold';
	                // this.ctx.fill();
	                // this.ctx.closePath();
	                //todo this.map.buttons.length have to be change to check if button is added or move this logic some other place
	                if (this.map.buttons.length == 0) {
	                    this.map.addButtons(btnPoint, urbanistic.MassMobilization);
	                }
	            }
	            else {
	                this.ctx.fillText(urbanistic.population.toString(), urbanistic.x, urbanistic.y - this._r - 10);
	                this.ctx.fillText(urbanistic.food.toString(), urbanistic.x + 20, urbanistic.y - this._r - 10);
	            }
	        }
	        for (var i = 0; i < this.map.Road.length; i++) {
	            var road = this.map.Road[i];
	            this.ctx.beginPath();
	            this.ctx.moveTo(road.x1, road.y1);
	            this.ctx.strokeStyle = '#795548';
	            this.ctx.lineWidth = 3;
	            this.ctx.bezierCurveTo(road.cx1, road.cy1, road.cx2, road.cy2, road.x2, road.y2);
	            this.ctx.stroke();
	        }
	    };
	    Draw.prototype.drawCharacter = function () {
	        for (var i = 0; i < this.map.Character.length; i++) {
	            var character = this.map.Character[i];
	            var point = character.draw();
	            if (point === null) {
	                this.map.Character.splice(i, 1);
	                i--;
	            }
	            else {
	                this.ctx.beginPath();
	                this.ctx.rect(point.x, point.y, 20, 20);
	                this.ctx.stroke();
	            }
	        }
	    };
	    Draw.prototype.addRoad = function (object) {
	        this.ctx.beginPath();
	        this.ctx.moveTo(object.x1, object.y1);
	        this.ctx.bezierCurveTo(object.cx1, object.cy1, object.cx2, object.cy2, object.x2, object.y2);
	        this.ctx.stroke();
	    };
	    Draw.prototype.setupClick = function (elem) {
	        var _this = this;
	        // Add event listener for `click` events.
	        elem.addEventListener('click', function (event) {
	            for (var i = 0; i < _this.map.buttons.length; i++) {
	                var button = _this.map.buttons[i];
	                if (Math.sqrt(Math.pow(event.pageX - button.point.x, 2) + Math.pow(event.pageY - button.point.y, 2)) < 20) {
	                    button.click();
	                    return;
	                }
	            }
	            _this.map.diactivateUrbanistic();
	            for (var i = 0; i < _this.map.Urbanistic.length; i++) {
	                var urbanistic = _this.map.Urbanistic[i];
	                if (Math.sqrt(Math.pow(event.pageX - urbanistic.x, 2) + Math.pow(event.pageY - urbanistic.y, 2)) < _this._r) {
	                    urbanistic.Clicked();
	                    return;
	                }
	            }
	        }, false);
	        elem.addEventListener('mousedown', function (event) {
	            for (var i = 0; i < _this.map.Urbanistic.length; i++) {
	                var urbanistic = _this.map.Urbanistic[i];
	                if (Math.sqrt(Math.pow(event.pageX - urbanistic.x, 2) + Math.pow(event.pageY - urbanistic.y, 2)) < _this._r) {
	                    _this.urbanisticDrawLine = urbanistic;
	                    _this.urbanisticDrawLine.start = {};
	                    _this.urbanisticDrawLine.end = {};
	                    _this.urbanisticDrawLine.start.x = urbanistic.x;
	                    _this.urbanisticDrawLine.start.y = urbanistic.y;
	                    _this.urbanisticDrawLine.urbanistic = urbanistic;
	                }
	            }
	        }, false);
	        elem.addEventListener('mousemove', function (event) {
	            if (_this.urbanisticDrawLine != null) {
	                _this.urbanisticDrawLine.end.x = event.pageX;
	                _this.urbanisticDrawLine.end.y = event.pageY;
	            }
	        }, false);
	        elem.addEventListener('mouseup', function (event) {
	            for (var i = 0; i < _this.map.Urbanistic.length; i++) {
	                var urbanistic = _this.map.Urbanistic[i];
	                if (Math.sqrt(Math.pow(event.pageX - urbanistic.x, 2) + Math.pow(event.pageY - urbanistic.y, 2)) < _this._r) {
	                    _this.urbanisticDrawLine.Send(_this.urbanisticDrawLine.urbanistic, urbanistic);
	                    break;
	                }
	            }
	            _this.urbanisticDrawLine = null;
	        }, false);
	    };
	    Draw.prototype.drawMap = function () {
	        // ctx.globalCompositeOperation = 'destination-over';
	        // ctx.clearRect(0, 0, 300, 300); // clear canvas
	        var _this = this;
	        // ctx.fillStyle = 'rgba(0,0,0,0.4)';
	        // ctx.strokeStyle = 'rgba(0,153,255,0.4)';
	        // ctx.save();
	        // ctx.translate(150, 150);
	        // // Earth
	        // var time = new Date();
	        // ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
	        // ctx.translate(105, 0);
	        // ctx.fillRect(0, -12, 50, 24); // Shadow
	        // ctx.drawImage(earth, -12, -12);
	        // // Moon
	        // ctx.save();
	        // ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
	        // ctx.translate(0, 28.5);
	        // ctx.drawImage(moon, -3.5, -3.5);
	        // ctx.restore();
	        // ctx.restore();
	        // ctx.beginPath();
	        // ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
	        // ctx.stroke();
	        // ctx.drawImage(sun, 0, 0, 300, 300);
	        window.requestAnimationFrame(function () { return _this.drawMap(); });
	    };
	    Draw.prototype.start = function () {
	        this.drawMap();
	    };
	    return Draw;
	}());
	exports.Draw = Draw;
	//} 


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Point = (function () {
	    function Point(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    Point.prototype.equal = function (point) {
	        if (this.x === point.x && this.y === point.y)
	            return true;
	        return false;
	    };
	    return Point;
	}());
	exports.Point = Point;
	var BezierCordination = (function () {
	    function BezierCordination(x1, y1, x2, y2, cx1, cy1, cx2, cy2) {
	        this.x1 = x1;
	        this.y1 = y1;
	        this.x2 = x2;
	        this.y2 = y2;
	        this.cx1 = cx1;
	        this.cy1 = cy1;
	        this.cx2 = cx2;
	        this.cy2 = cy2;
	    }
	    return BezierCordination;
	}());
	exports.BezierCordination = BezierCordination;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Character_1 = __webpack_require__(4);
	var Road_1 = __webpack_require__(6);
	var village_1 = __webpack_require__(8);
	var player_1 = __webpack_require__(10);
	var Map = (function () {
	    function Map(mapData) {
	        //load map -> maybe json with info about map ???
	        /*
	    MAP 1-* REGIONS *-* PROPERTISES
	        *-*
	        Graphic Element eg forest -
	        */
	        this.buttons = [];
	        this.Road = [];
	        for (var i = 0; i < mapData.roads.length; i++) {
	            //  draw.addRoad(mapData.roads[i])
	            var r = mapData.roads[i];
	            this.Road.push(new Road_1.Road(r.x1, r.y1, r.cx1, r.cy1, r.cx1, r.cy1, r.x2, r.y2));
	        }
	        this.Player = [];
	        for (var i = 0; i < mapData.players.length; i++) {
	            var player = mapData.players[i];
	            this.Player[player.index] = new player_1.Player(player.index, player.color);
	        }
	        this.Urbanistic = [];
	        for (var i = 0; i < mapData.urbanisticLocation.length; i++) {
	            // draw.addCity(mapData.urbanisticLocation[i])
	            var roadList = [];
	            var urbanistic = mapData.urbanisticLocation[i];
	            for (var j = 0; j < this.Road.length; j++) {
	                if (mapData.urbanisticLocation[i].road.indexOf(j) > -1) {
	                    var road = this.Road[j];
	                    roadList.push(road);
	                }
	            }
	            this.Urbanistic.push(new village_1.Village(urbanistic.x, urbanistic.y, roadList, this.Player[urbanistic.player], this));
	        }
	        this.Character = [];
	        var regionList = new Region();
	    }
	    Map.prototype.addCharacter = function (start, end, characterInfo) {
	        //todo this have to be dynamic
	        var map = { '1': { '2': 1 }, '2': { '1': 1, '3': 1 }, '3': { '2': 1, '4': 1 }, '4': { '3': 1 } }, graph = new Graph(map);
	        //todo finish this in good way
	        var list = graph.findShortestPath((this.Urbanistic.indexOf(start) + 1).toString(), (this.Urbanistic.indexOf(end) + 1).toString());
	        var returnList = [];
	        for (var i = 0; i < list.length - 1; i++) {
	            var index = parseInt(list[i]) - 1;
	            var index2 = parseInt(list[i + 1]) - 1;
	            var urbanistic = this.Urbanistic[index];
	            var urbanistic2 = this.Urbanistic[index2];
	            returnList.push(this.roadBetween(urbanistic, urbanistic2));
	        }
	        console.log(list);
	        console.log(returnList);
	        this.Character.push(new Character_1.Character(start, end, returnList, characterInfo));
	    };
	    Map.prototype.roadBetween = function (urbanistic, urbanistic2) {
	        for (var i = 0; i < this.Road.length; i++) {
	            if (this.Road[i].isBetween(urbanistic, urbanistic2) == true) {
	                if (this.Road[i].isFirst(urbanistic) == true) {
	                    return { road: this.Road[i], isFirst: true };
	                }
	                return { road: this.Road[i], isFirst: false };
	            }
	        }
	        return null;
	    };
	    Map.prototype.clearButton = function () {
	        this.buttons = [];
	    };
	    Map.prototype.addButtons = function (point, click) {
	        this.buttons.push({ 'point': point, click: click });
	    };
	    Map.prototype.diactivateUrbanistic = function () {
	        for (var i = 0; i < this.Urbanistic.length; i++) {
	            var urbanistic = this.Urbanistic[i];
	            urbanistic.showInside = false;
	        }
	    };
	    return Map;
	}());
	exports.Map = Map;
	var MapData = (function () {
	    function MapData() {
	    }
	    return MapData;
	}());
	var Region = (function () {
	    function Region() {
	    }
	    return Region;
	}());
	exports.Region = Region;
	//} 


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Point_1 = __webpack_require__(5);
	var CharacterStatus;
	(function (CharacterStatus) {
	    CharacterStatus[CharacterStatus["ACTIVE"] = 0] = "ACTIVE";
	    CharacterStatus[CharacterStatus["DONE"] = 1] = "DONE";
	    CharacterStatus[CharacterStatus["FIGHT"] = 2] = "FIGHT";
	})(CharacterStatus || (CharacterStatus = {}));
	var Character = (function () {
	    function Character(start, end, roadList, characterInfo) {
	        //to do star* to find path
	        //startPoint.findPath(endPoint):Road[];
	        this.start = start;
	        this.end = end;
	        this.roadList = roadList;
	        this.characterInfo = characterInfo;
	        this.status = CharacterStatus.ACTIVE;
	        this.speed = 0.01;
	        this.currentIndex = 0;
	        this.currentRoad = this.roadList[this.currentIndex].road;
	        //check what is begin of 
	        this.setInit();
	        this.timer();
	    }
	    Character.prototype.setInit = function () {
	        if (this.roadList[this.currentIndex].isFirst == true) {
	            this.directionBack = true;
	            this.procentage = .99;
	        }
	        else {
	            this.directionBack = false;
	            this.procentage = 0;
	        }
	    };
	    Character.prototype.draw = function () {
	        if (this.status === CharacterStatus.ACTIVE) {
	            this.getCubicBezierXYatPercent();
	            return new Point_1.Point(this.x, this.y);
	        }
	        else if (this.status === CharacterStatus.DONE) {
	            return null;
	        }
	    };
	    Character.prototype.timer = function () {
	        var _this = this;
	        this.interval = setInterval(function () {
	            if (_this.procentage > 1 || _this.procentage < 0) {
	                if (_this.roadList.length == _this.currentIndex + 1) {
	                    _this.status = CharacterStatus.DONE;
	                    if (_this.characterInfo.type == CharacterType.ATTACK) {
	                        _this.end.raid(_this.start);
	                    }
	                    clearInterval(_this.interval);
	                }
	                else {
	                    _this.currentIndex++;
	                    _this.currentRoad = _this.roadList[_this.currentIndex].road;
	                    _this.setInit();
	                }
	            }
	            if (_this.directionBack) {
	                _this.procentage -= 0.01;
	            }
	            else {
	                _this.procentage += 0.01;
	            }
	        }, 100);
	    };
	    Character.prototype.getCubicBezierXYatPercent = function () {
	        this.x = this.CubicN(this.procentage, this.currentRoad.x1, this.currentRoad.cx1, this.currentRoad.cx2, this.currentRoad.x2);
	        this.y = this.CubicN(this.procentage, this.currentRoad.y1, this.currentRoad.cy1, this.currentRoad.cy2, this.currentRoad.y2);
	        this.x -= 10;
	        this.y -= 10;
	    };
	    Character.prototype.CubicN = function (pct, a, b, c, d) {
	        var t2 = pct * pct;
	        var t3 = t2 * pct;
	        return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) *
	            pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
	    };
	    Character.prototype.getBezierLength = function () {
	        // chord = (p3-p0).Length;
	        // cont_net = (p0 - p1).Length + (p2 - p1).Length + (p3 - p2).Length;
	        // app_arc_length = (cont_net + chord) / 2;
	    };
	    return Character;
	}());
	exports.Character = Character;
	var CharacterInfo = (function () {
	    function CharacterInfo(type, value1, value2, value3) {
	        this.type = type;
	        this.value1 = value1;
	        this.value2 = value2;
	        this.value3 = value3;
	    }
	    return CharacterInfo;
	}());
	exports.CharacterInfo = CharacterInfo;
	(function (CharacterType) {
	    CharacterType[CharacterType["ATTACK"] = 0] = "ATTACK";
	    CharacterType[CharacterType["food"] = 1] = "food";
	    CharacterType[CharacterType["people"] = 2] = "people";
	    CharacterType[CharacterType["money"] = 3] = "money";
	})(exports.CharacterType || (exports.CharacterType = {}));
	var CharacterType = exports.CharacterType;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var Point = (function () {
	    function Point(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    Point.prototype.equal = function (point) {
	        if (this.x === point.x && this.y === point.y)
	            return true;
	        return false;
	    };
	    return Point;
	}());
	exports.Point = Point;
	var BezierCordination = (function () {
	    function BezierCordination(x1, y1, x2, y2, cx1, cy1, cx2, cy2) {
	        this.x1 = x1;
	        this.y1 = y1;
	        this.x2 = x2;
	        this.y2 = y2;
	        this.cx1 = cx1;
	        this.cy1 = cy1;
	        this.cx2 = cx2;
	        this.cy2 = cy2;
	    }
	    return BezierCordination;
	}());
	exports.BezierCordination = BezierCordination;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var point_1 = __webpack_require__(2);
	var Helper_1 = __webpack_require__(7);
	var Road = (function () {
	    function Road(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
	        this.x1 = x1;
	        this.y1 = y1;
	        this.cx1 = cx1;
	        this.cy1 = cy1;
	        this.cx2 = cx2;
	        this.cy2 = cy2;
	        this.x2 = x2;
	        this.y2 = y2;
	        this.FirstUrbanistic = null;
	        this.SeconddUrbanistic = null;
	    }
	    Object.defineProperty(Road.prototype, "beginPoint", {
	        get: function () {
	            return new point_1.Point(this.x1, this.y1);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Road.prototype, "endPoint", {
	        get: function () {
	            return new point_1.Point(this.x2, this.y2);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Road.prototype.equal = function (road) {
	        if (this.beginPoint.equal(road.beginPoint) === true && this.endPoint.equal(road.endPoint) === true)
	            return true;
	        return false;
	    };
	    Road.prototype.addUrbanistic = function (urbanistic) {
	        if (Helper_1.Helper.isInsideCircle(urbanistic.point, this.beginPoint, urbanistic.radius) == false) {
	            this.FirstUrbanistic = urbanistic;
	        }
	        else {
	            this.SeconddUrbanistic = urbanistic;
	        }
	    };
	    Road.prototype.isBetween = function (urbanistic, urbanistic2) {
	        if ((this.FirstUrbanistic.equal(urbanistic) || this.FirstUrbanistic.equal(urbanistic2))
	            && (this.SeconddUrbanistic.equal(urbanistic) || this.SeconddUrbanistic.equal(urbanistic2))) {
	            return true;
	        }
	        return false;
	    };
	    Road.prototype.isFirst = function (urbanistic) {
	        if (this.FirstUrbanistic.equal(urbanistic)) {
	            return true;
	        }
	        return false;
	    };
	    Road.prototype.isInList = function (roadList) {
	        for (var i = 0; i < roadList.length; i++) {
	            if (roadList[i].equal(this))
	                return true;
	        }
	        return false;
	    };
	    return Road;
	}());
	exports.Road = Road;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var Helper = (function () {
	    function Helper() {
	    }
	    Helper.isInsideCircle = function (circleCenter, point, r) {
	        return Math.sqrt(Math.pow(point.x - circleCenter.x, 2) + Math.pow(point.y - circleCenter.y, 2)) < r == true ? true : false;
	    };
	    return Helper;
	}());
	exports.Helper = Helper;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	//import {Urbanistic} from 
	var Urbanistic_1 = __webpack_require__(9);
	var Character_1 = __webpack_require__(4);
	var Village = (function (_super) {
	    __extends(Village, _super);
	    function Village(x, y, road, player, map) {
	        var _this = this;
	        _super.call(this, x, y, road, player, map);
	        this.x = x;
	        this.y = y;
	        this.road = road;
	        this.player = player;
	        this.MassMobilization = function () {
	            console.log("Pospolite ruszenie");
	            var num = _this._population / 2;
	            _this._population = num;
	            //todo remove warrior 
	            _this._warrior = num;
	            //todo this have to be dynamic and it need slot max
	            _this._armySlot[0] = { type: ArmyType.WARRIOR, number: num };
	        };
	        this.Send = function (urbanisticStart, urbanisticEnd) {
	            if (!urbanisticStart.point.equal(urbanisticEnd.point)) {
	                if (urbanisticEnd.player.index != 1) {
	                    if (_this._warrior > 0 || _this._knight > 0)
	                        if (_this._warrior + _this._knight <= _this._food) {
	                            var food = _this._warrior + _this._knight;
	                            _this._food -= food;
	                            _this.map.addCharacter(urbanisticStart, urbanisticEnd, new Character_1.CharacterInfo(Character_1.CharacterType.ATTACK, _this._warrior, _this._knight, food));
	                        }
	                }
	            }
	        };
	        this._population = 12;
	        if (player.index > 0)
	            this.timer();
	    }
	    Village.prototype.Clicked = function () {
	        if (this.player.index == 1) {
	            this._showInside = true;
	        }
	    };
	    Village.prototype.timer = function () {
	        var _this = this;
	        this.interval = setInterval(function () {
	            if (_this._foodMax > _this._food)
	                _this._food += (_this.population * 0.01);
	            if (_this._populationMax > _this._population)
	                _this._population += (_this._population * 0.01);
	        }, 1000);
	    };
	    return Village;
	}(Urbanistic_1.Urbanistic));
	exports.Village = Village;
	(function (ArmyType) {
	    ArmyType[ArmyType["WARRIOR"] = 0] = "WARRIOR";
	    ArmyType[ArmyType["KNIGHT"] = 1] = "KNIGHT";
	})(exports.ArmyType || (exports.ArmyType = {}));
	var ArmyType = exports.ArmyType;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var point_1 = __webpack_require__(2);
	var Urbanistic = (function () {
	    function Urbanistic(x, y, road, player, map) {
	        this.x = x;
	        this.y = y;
	        this.road = road;
	        this.player = player;
	        this.map = map;
	        this.MassMobilization = function () { };
	        this.Send = function (urbanisticStart, urbanisticEnd) {
	        };
	        //todo diffrent radius for diffrent place OR maybe not
	        this.radius = 30;
	        this._food = 10;
	        this._populationMax = 30;
	        this._foodMax = 30;
	        this._warrior = 0;
	        this._knight = 0;
	        this._showInside = false;
	        this._armySlot = [];
	        for (var i = 0; i < road.length; i++) {
	            road[i].addUrbanistic(this);
	        }
	    }
	    Object.defineProperty(Urbanistic.prototype, "population", {
	        get: function () {
	            if (this._population == null)
	                return 0;
	            return parseInt(this._population.toString());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Urbanistic.prototype, "food", {
	        get: function () {
	            if (this._food == null)
	                return 0;
	            return parseInt(this._food.toString());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Urbanistic.prototype, "point", {
	        get: function () {
	            return new point_1.Point(this.x, this.y);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Urbanistic.prototype, "showInside", {
	        get: function () {
	            return this._showInside;
	        },
	        set: function (show) {
	            this._showInside = show;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Urbanistic.prototype, "armySlotSlot", {
	        get: function () {
	            return this._armySlot;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Urbanistic.prototype.equal = function (urbanistic) {
	        return urbanistic.point.equal(this.point) ? true : false;
	    };
	    Urbanistic.prototype.Clicked = function () {
	    };
	    Urbanistic.prototype.raid = function (from) {
	        // if(from.player.index)
	        //todo check if attacker have capitol of region if yes it can be capture else on raid
	        //yes it has capitol
	    };
	    return Urbanistic;
	}());
	exports.Urbanistic = Urbanistic;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var Player = (function () {
	    function Player(index, color) {
	        this.index = index;
	        this.color = color;
	    }
	    return Player;
	}());
	exports.Player = Player;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var StartUp = (function () {
	    function StartUp() {
	    }
	    StartUp.map = function () {
	        return {
	            urbanisticLocation: [{ x: 130, y: 250, road: [0], player: 0, region: 1 }, { x: 300, y: 230, road: [0, 1], player: 0, region: 1 },
	                { x: 260, y: 90, road: [1, 2], player: 1, region: 1 }, { x: 390, y: 100, road: [2], player: 0, region: 1 }],
	            roads: [{ x1: 130, y1: 250, x2: 300, y2: 230, cx1: 200, cy1: 257, cx2: 274, cy2: 344 },
	                { x1: 300, y1: 230, x2: 260, y2: 90, cx1: 200, cy1: 200, cx2: 100, cy2: 80 },
	                { x1: 260, y1: 90, x2: 390, y2: 100, cx1: 300, cy1: 50, cx2: 390, cy2: 100 }
	            ], players: [{ index: 1, color: '#f44336' }, { index: 0, color: '#9e9e9e' }, { index: 2, color: '#ffeb3b' }, { index: 3, color: '#3f51b5' }]
	        };
	    };
	    return StartUp;
	}());
	exports.StartUp = StartUp;
	3;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map