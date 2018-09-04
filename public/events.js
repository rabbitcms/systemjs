System.register([], function (exports_1, context_1) {
    "use strict";
    var EventEmitter, StaticEventEmitter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            EventEmitter = (function () {
                function EventEmitter() {
                    this._events = {};
                }
                EventEmitter.prototype.onSubscribe = function (eventName, fn) {
                };
                EventEmitter.prototype.subscribe = function (eventName, fn, once) {
                    if (once === void 0) { once = false; }
                    if (!this._events[eventName]) {
                        this._events[eventName] = [];
                    }
                    this._events[eventName].push([fn, once]);
                    this.onSubscribe(eventName, fn);
                    return this;
                };
                EventEmitter.prototype.unsubscribe = function (eventName, fn) {
                    if (this._events[eventName]) {
                        this._events[eventName] = this._events[eventName].filter(function (e) {
                            return e[0] !== fn;
                        });
                    }
                    return this;
                };
                EventEmitter.prototype.once = function (eventName, fn) {
                    return this.subscribe(eventName, fn, true);
                };
                EventEmitter.prototype.emit = function (eventName) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    var event = this._events[eventName];
                    if (event) {
                        this._events[eventName] = event.filter(function (fn) {
                            fn[0].apply(null, args);
                            return !fn[1];
                        });
                    }
                    return this;
                };
                return EventEmitter;
            }());
            exports_1("EventEmitter", EventEmitter);
            StaticEventEmitter = (function () {
                function StaticEventEmitter() {
                }
                StaticEventEmitter.onSubscribe = function (eventName, fn) {
                };
                StaticEventEmitter.subscribe = function (eventName, fn) {
                    if (!this._events[eventName]) {
                        this._events[eventName] = [];
                    }
                    this._events[eventName].push(fn);
                    this.onSubscribe(eventName, fn);
                };
                StaticEventEmitter.unsubscribe = function (eventName, fn) {
                    if (this._events[eventName]) {
                        this._events[eventName] = this._events[eventName].filter(function (e) { return e !== fn; });
                    }
                };
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
