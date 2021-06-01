/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Nova/Dialogs/CastBloodmagic/CastBloodmagic.html":
/*!*************************************************************!*\
  !*** ./src/Nova/Dialogs/CastBloodmagic/CastBloodmagic.html ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"<h1>Select spell level</h1>\\n<div>\\n  <label for=\\\"level\\\">Spell level: </label>\\n  <select id=\\\"level\\\" name=\\\"level\\\" required>\\n    ${options}\\n  </select>\\n</div>\\n\\n#{BloodPoints}\\n\\n<h2>costs:</h2>\\n<div>\\n  <label for=\\\"bloodCost\\\">Blood Points: </label>\\n  <output id=\\\"bloodCost\\\"></output>\\n</div>\\n<div>\\n  <label for=\\\"healthCost\\\">HP: </label>\\n  <output id=\\\"healthCost\\\"></output>\\n</div>\\n<div>\\n  <label for=\\\"corruptionCost\\\">Corruption: </label>\\n  <output id=\\\"corruptionCost\\\"></output>\\n</div>\\n\\n<h2>options:</h2>\\n#{SendToChat} #{Update}\\n\");\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Dialogs/CastBloodmagic/CastBloodmagic.html?");

/***/ }),

/***/ "./src/Nova/Dialogs/Test/Test.html":
/*!*****************************************!*\
  !*** ./src/Nova/Dialogs/Test/Test.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"Wooo look at me #{theBox}\\n\");\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Dialogs/Test/Test.html?");

/***/ }),

/***/ "./src/Nova/Dialogs/CastBloodmagic/CastBloodmagic.ts":
/*!***********************************************************!*\
  !*** ./src/Nova/Dialogs/CastBloodmagic/CastBloodmagic.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CastBloodMagic\": () => (/* binding */ CastBloodMagic)\n/* harmony export */ });\n/* harmony import */ var _CastBloodmagic_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CastBloodmagic.html */ \"./src/Nova/Dialogs/CastBloodmagic/CastBloodmagic.html\");\n/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Elements */ \"./src/Nova/Elements/index.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ \"./src/Nova/Dialogs/index.ts\");\n\n\n\nvar cost = [4, 8, 12, 16, 20, 25, 30, 35, 40];\nvar context = {\n    costs: new _Elements__WEBPACK_IMPORTED_MODULE_1__.Elements.Constant(cost),\n    level: new _Elements__WEBPACK_IMPORTED_MODULE_1__.Elements.Dropdown(\"level\", {\n        label: \"Spell Level:\",\n        options: cost.map(function (_, i) {\n            return { label: \"\" + (i + 1), value: i + 1 };\n        }),\n    }),\n    bp: new _Elements__WEBPACK_IMPORTED_MODULE_1__.Elements.Checkbox(\"BloodPoints\", {\n        label: \"Spend blood point to reduce cost?\",\n    }),\n    chat: new _Elements__WEBPACK_IMPORTED_MODULE_1__.Elements.Checkbox(\"SendToChat\", {\n        label: \"Send to chat?\",\n        default: true,\n    }),\n    update: new _Elements__WEBPACK_IMPORTED_MODULE_1__.Elements.Checkbox(\"Update\", {\n        label: \"Send updates to character sheet?\",\n        default: true,\n    }),\n};\nvar castBloodmagic = function (params) {\n    var me = game.user.character;\n    var bpCost = params.bp ? 1 : 0;\n    var hpCost = params.costs[params.level - 1] - bpCost * 3;\n    var cCost = Math.floor(hpCost / 2);\n    var r = new Roll(\"1d20 < @dc\", { dc: params.level });\n    if (r.evaluate()) {\n        ChatMessage.create({\n            user: game.user._id,\n            roll: r,\n            type: CONST.CHAT_MESSAGE_TYPES.ROLL,\n        });\n    }\n    if (params.chat) {\n        ChatMessage.create({\n            user: game.user._id,\n            content: me.name + \" cast a blood magic spell at level \" + params.level + \" by spending \" + hpCost + \" health and \" + bpCost + \" blood points\",\n            type: CONST.CHAT_MESSAGE_TYPES.EMOTE,\n        });\n    }\n};\nvar buttons = {\n    confirm: {\n        icon: \"skull\",\n        label: \"Cast!\",\n        callback: castBloodmagic,\n    },\n};\nvar CastBloodMagic = new ___WEBPACK_IMPORTED_MODULE_2__.NovaDialog({\n    title: \"Blood Magic Cost\",\n    elements: context,\n    buttons: buttons,\n    template: _CastBloodmagic_html__WEBPACK_IMPORTED_MODULE_0__.default,\n});\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Dialogs/CastBloodmagic/CastBloodmagic.ts?");

/***/ }),

/***/ "./src/Nova/Dialogs/CastBloodmagic/index.ts":
/*!**************************************************!*\
  !*** ./src/Nova/Dialogs/CastBloodmagic/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CastBloodMagic\": () => (/* reexport safe */ _CastBloodmagic__WEBPACK_IMPORTED_MODULE_0__.CastBloodMagic)\n/* harmony export */ });\n/* harmony import */ var _CastBloodmagic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CastBloodmagic */ \"./src/Nova/Dialogs/CastBloodmagic/CastBloodmagic.ts\");\n\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Dialogs/CastBloodmagic/index.ts?");

/***/ }),

/***/ "./src/Nova/Dialogs/NovaDialog.ts":
/*!****************************************!*\
  !*** ./src/Nova/Dialogs/NovaDialog.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NovaDialog\": () => (/* binding */ NovaDialog)\n/* harmony export */ });\nvar NovaDialog = /** @class */ (function () {\n    function NovaDialog(_a) {\n        var _this = this;\n        var title = _a.title, elements = _a.elements, buttons = _a.buttons, template = _a.template;\n        this.buttons = {};\n        this.d = \"\";\n        this.title = title;\n        this.elements = elements;\n        this.html = this.parseElements(elements).reduce(function (t, e) { return e.apply(t); }, template);\n        Object.entries(buttons).forEach(function (_a) {\n            var name = _a[0], button = _a[1];\n            if (button.default) {\n                _this.d = name;\n            }\n            var callback = button.callback\n                ? function (html) {\n                    return button.callback(_this.extract(html));\n                }\n                : undefined;\n            _this.buttons[name] = {\n                icon: \"<i class=\\\"fas fa-\" + button.icon + \"\\\"></i>\",\n                label: button.label,\n                callback: callback,\n            };\n        });\n        this.dialog = new Dialog({\n            title: this.title,\n            content: this.html,\n            buttons: this.buttons,\n            default: this.d,\n        });\n    }\n    NovaDialog.prototype.render = function () {\n        this.dialog.render(true);\n    };\n    NovaDialog.prototype.extract = function (html) {\n        var out = {};\n        Object.entries(this.elements)\n            .map(function (_a) {\n            var key = _a[0], val = _a[1];\n            return ({\n                key: key,\n                val: val,\n            });\n        })\n            .forEach(function (_a) {\n            var key = _a.key, val = _a.val;\n            return (out[key] = val.extract(html));\n        });\n        return out;\n    };\n    NovaDialog.prototype.parseElements = function (e) {\n        return Object.values(e);\n    };\n    return NovaDialog;\n}());\n\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Dialogs/NovaDialog.ts?");

/***/ }),

/***/ "./src/Nova/Dialogs/Test/Test.ts":
/*!***************************************!*\
  !*** ./src/Nova/Dialogs/Test/Test.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Test\": () => (/* binding */ Test)\n/* harmony export */ });\n/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Elements */ \"./src/Nova/Elements/index.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ \"./src/Nova/Dialogs/index.ts\");\n/* harmony import */ var _Test_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Test.html */ \"./src/Nova/Dialogs/Test/Test.html\");\n\n\n\nvar buttons = {\n    yay: {\n        default: true,\n        label: \"The default button\",\n    },\n    echo: {\n        default: true,\n        icon: \"play\",\n        label: \"Echo!\",\n        callback: function (params) {\n            console.log(\"TheBox: \" + (params.theBox ? \"yes\" : \"no\"));\n        },\n    },\n};\nvar elements = {\n    theBox: new _Elements__WEBPACK_IMPORTED_MODULE_0__.Elements.Checkbox(\"theBox\", {\n        label: \"This is a test checkbox\",\n    }),\n};\nvar Test = new ___WEBPACK_IMPORTED_MODULE_1__.NovaDialog({\n    title: \"A test\",\n    elements: elements,\n    buttons: buttons,\n    template: _Test_html__WEBPACK_IMPORTED_MODULE_2__.default,\n});\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Dialogs/Test/Test.ts?");

/***/ }),

/***/ "./src/Nova/Dialogs/Test/index.ts":
/*!****************************************!*\
  !*** ./src/Nova/Dialogs/Test/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Test\": () => (/* reexport safe */ _Test__WEBPACK_IMPORTED_MODULE_0__.Test)\n/* harmony export */ });\n/* harmony import */ var _Test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Test */ \"./src/Nova/Dialogs/Test/Test.ts\");\n\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Dialogs/Test/index.ts?");

/***/ }),

/***/ "./src/Nova/Dialogs/index.ts":
/*!***********************************!*\
  !*** ./src/Nova/Dialogs/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NovaDialog\": () => (/* reexport safe */ _NovaDialog__WEBPACK_IMPORTED_MODULE_2__.NovaDialog),\n/* harmony export */   \"Dialogs\": () => (/* binding */ Dialogs)\n/* harmony export */ });\n/* harmony import */ var _CastBloodmagic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CastBloodmagic */ \"./src/Nova/Dialogs/CastBloodmagic/index.ts\");\n/* harmony import */ var _Test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Test */ \"./src/Nova/Dialogs/Test/index.ts\");\n/* harmony import */ var _NovaDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NovaDialog */ \"./src/Nova/Dialogs/NovaDialog.ts\");\n\n\n\nvar Dialogs = {\n    CastBloodMagic: _CastBloodmagic__WEBPACK_IMPORTED_MODULE_0__.CastBloodMagic,\n    Test: _Test__WEBPACK_IMPORTED_MODULE_1__.Test,\n};\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Dialogs/index.ts?");

/***/ }),

/***/ "./src/Nova/Elements/Base.ts":
/*!***********************************!*\
  !*** ./src/Nova/Elements/Base.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Base\": () => (/* binding */ Base)\n/* harmony export */ });\nvar Base = /** @class */ (function () {\n    function Base(key) {\n        this.key = key;\n    }\n    Base.prototype.apply = function (template) {\n        if (!this.key)\n            return template;\n        return template.replaceAll(\"#{\" + this.key + \"}\", this.injectHtml());\n    };\n    Base.prototype.getElement = function (html) {\n        return html.find(\"#\" + this.key)[0];\n    };\n    return Base;\n}());\n\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Elements/Base.ts?");

/***/ }),

/***/ "./src/Nova/Elements/Checkbox.ts":
/*!***************************************!*\
  !*** ./src/Nova/Elements/Checkbox.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Checkbox\": () => (/* binding */ Checkbox)\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./src/Nova/Elements/Base.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Checkbox = /** @class */ (function (_super) {\n    __extends(Checkbox, _super);\n    function Checkbox(key, parms) {\n        var _this = _super.call(this, key) || this;\n        _this.label = parms.label;\n        _this.checked = parms.default;\n        return _this;\n    }\n    Checkbox.prototype.injectHtml = function () {\n        return \"<div>\\n    \" + (this.label ? \"<label for=\\\"\" + this.key + \"\\\">\" + this.label + \"</label>\" : \"\") + \"\\n    <input type=\\\"checkbox\\\" id=\\\"\" + this.key + \"\\\" name=\\\"\" + this.key + \" \" + (this.checked ? \"checked\" : \"\") + \"\\\">\\n      </div>\";\n    };\n    Checkbox.prototype.extract = function (html) {\n        return this.getElement(html).checked;\n    };\n    return Checkbox;\n}(_Base__WEBPACK_IMPORTED_MODULE_0__.Base));\n\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Elements/Checkbox.ts?");

/***/ }),

/***/ "./src/Nova/Elements/Constant.ts":
/*!***************************************!*\
  !*** ./src/Nova/Elements/Constant.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Constant\": () => (/* binding */ Constant)\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./src/Nova/Elements/Base.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Constant = /** @class */ (function (_super) {\n    __extends(Constant, _super);\n    function Constant(value) {\n        var _this = _super.call(this) || this;\n        _this.value = value;\n        return _this;\n    }\n    Constant.prototype.injectHtml = function () {\n        return \"\";\n    };\n    Constant.prototype.extract = function (_) {\n        return this.value;\n    };\n    return Constant;\n}(_Base__WEBPACK_IMPORTED_MODULE_0__.Base));\n\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Elements/Constant.ts?");

/***/ }),

/***/ "./src/Nova/Elements/Dropdown.ts":
/*!***************************************!*\
  !*** ./src/Nova/Elements/Dropdown.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Dropdown\": () => (/* binding */ Dropdown)\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./src/Nova/Elements/Base.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Dropdown = /** @class */ (function (_super) {\n    __extends(Dropdown, _super);\n    function Dropdown(key, parms) {\n        var _this = _super.call(this, key) || this;\n        _this.parms = parms;\n        return _this;\n    }\n    Dropdown.prototype.injectHtml = function () {\n        return \"\\n    \" + (this.parms.label\n            ? \"<label for=\\\"\" + this.key + \"\\\">\" + this.parms.label + \"</label>\"\n            : \"\") + \"\\n    <select id=\\\"\" + this.key + \"\\\" name=\\\"\" + this.key + \"\\\">\" + this.parms.options.map(function (option) {\n            return \"<option>\" + option.label + \"</option>\";\n        }) + \"</select>\\n    \";\n    };\n    Dropdown.prototype.extract = function (html) {\n        return this.parms.options[this.getElement(html).selectedIndex].value;\n    };\n    return Dropdown;\n}(_Base__WEBPACK_IMPORTED_MODULE_0__.Base));\n\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Elements/Dropdown.ts?");

/***/ }),

/***/ "./src/Nova/Elements/index.ts":
/*!************************************!*\
  !*** ./src/Nova/Elements/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Elements\": () => (/* binding */ Elements)\n/* harmony export */ });\n/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Checkbox */ \"./src/Nova/Elements/Checkbox.ts\");\n/* harmony import */ var _Constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constant */ \"./src/Nova/Elements/Constant.ts\");\n/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dropdown */ \"./src/Nova/Elements/Dropdown.ts\");\n\n\n\nvar Elements = {\n    Dropdown: _Dropdown__WEBPACK_IMPORTED_MODULE_2__.Dropdown,\n    Constant: _Constant__WEBPACK_IMPORTED_MODULE_1__.Constant,\n    Checkbox: _Checkbox__WEBPACK_IMPORTED_MODULE_0__.Checkbox,\n};\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/Elements/index.ts?");

/***/ }),

/***/ "./src/Nova/hooks/index.ts":
/*!*********************************!*\
  !*** ./src/Nova/hooks/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registerHooks\": () => (/* binding */ registerHooks)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/Nova/index.ts\");\n\nvar registerHooks = function () {\n    Hooks.once(\"ready\", function () {\n        game.Nova = ___WEBPACK_IMPORTED_MODULE_0__.Nova;\n    });\n};\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/hooks/index.ts?");

/***/ }),

/***/ "./src/Nova/index.ts":
/*!***************************!*\
  !*** ./src/Nova/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Nova\": () => (/* binding */ Nova)\n/* harmony export */ });\n/* harmony import */ var _Dialogs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dialogs */ \"./src/Nova/Dialogs/index.ts\");\n/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Elements */ \"./src/Nova/Elements/index.ts\");\n/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks */ \"./src/Nova/hooks/index.ts\");\n\n\n\nvar Nova = {\n    Dialogs: _Dialogs__WEBPACK_IMPORTED_MODULE_0__.Dialogs,\n    Elements: _Elements__WEBPACK_IMPORTED_MODULE_1__.Elements,\n};\n(0,_hooks__WEBPACK_IMPORTED_MODULE_2__.registerHooks)();\n\n\n//# sourceURL=webpack://foundry-nova/./src/Nova/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Nova__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Nova */ \"./src/Nova/index.ts\");\n\n\n\n//# sourceURL=webpack://foundry-nova/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;