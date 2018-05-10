System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EventEmitter, StaticEventEmitter;
    return {
        setters: [],
        execute: function () {
            EventEmitter = /** @class */ (function () {
                function EventEmitter() {
                    this._events = {};
                }
                EventEmitter.prototype.onSubscribe = function (eventName, fn) {
                };
                /**
                 * @param {string} eventName
                 * @param {Function} fn
                 * @returns {this}
                 */
                EventEmitter.prototype.subscribe = function (eventName, fn) {
                    if (!this._events[eventName]) {
                        this._events[eventName] = [];
                    }
                    this._events[eventName].push(fn);
                    this.onSubscribe(eventName, fn);
                    return this;
                };
                /**
                 * @param {string} eventName
                 * @param {Function} fn
                 * @returns {this}
                 */
                EventEmitter.prototype.unsubscribe = function (eventName, fn) {
                    if (this._events[eventName]) {
                        this._events[eventName] = this._events[eventName].filter(function (e) {
                            return e !== fn;
                        });
                    }
                    return this;
                };
                /**
                 *
                 * @param {string} eventName
                 * @param {Function} fn
                 * @returns {EventEmitter}
                 */
                EventEmitter.prototype.once = function (eventName, fn) {
                    var _this = this;
                    var func = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.unsubscribe(eventName, func);
                        fn.apply(null, args);
                    };
                    this.subscribe(eventName, func);
                    return this;
                };
                EventEmitter.prototype.emit = function (eventName) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    var event = this._events[eventName];
                    if (event) {
                        event.forEach(function (fn) {
                            fn.apply(null, args);
                        });
                    }
                    return this;
                };
                return EventEmitter;
            }());
            exports_1("EventEmitter", EventEmitter);
            StaticEventEmitter = /** @class */ (function () {
                function StaticEventEmitter() {
                }
                StaticEventEmitter.onSubscribe = function (eventName, fn) {
                };
                /**
                 * @param {string} eventName
                 * @param {Function} fn
                 */
                StaticEventEmitter.subscribe = function (eventName, fn) {
                    if (!this._events[eventName]) {
                        this._events[eventName] = [];
                    }
                    this._events[eventName].push(fn);
                    this.onSubscribe(eventName, fn);
                };
                /**
                 * @param {string} eventName
                 * @param {Function} fn
                 */
                StaticEventEmitter.unsubscribe = function (eventName, fn) {
                    if (this._events[eventName]) {
                        this._events[eventName] = this._events[eventName].filter(function (e) { return e !== fn; });
                    }
                };
                /**
                 *
                 * @param {string} eventName
                 * @param {Function} fn
                 */
                StaticEventEmitter.once = function (eventName, fn) {
                    var _this = this;
                    var func = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.unsubscribe(eventName, func);
                        fn.apply(null, args);
                    };
                    this.subscribe(eventName, func);
                };
                StaticEventEmitter.emit = function (eventName) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    var event = this._events[eventName];
                    if (event) {
                        event.forEach(function (fn) {
                            fn.apply(null, args);
                        });
                    }
                };
                StaticEventEmitter._events = {};
                return StaticEventEmitter;
            }());
            exports_1("StaticEventEmitter", StaticEventEmitter);
        }
    };
});
