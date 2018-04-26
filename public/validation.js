System.register(["tslib", "locale"], function (exports_1, context_1) {
    "use strict";
    _this = this;
    var __moduleName = context_1 && context_1.id;
    function validate(form, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, form.validate(options)];
                }
            });
        });
    }
    exports_1("validate", validate);
    var _this, tslib_1, locale_1, locales, initialize;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (locale_1_1) {
                locale_1 = locale_1_1;
            }
        ],
        execute: function () {
            locales = ['uk', 'ru'], initialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            initialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, void 0];
                            }); }); };
                            return [4 /*yield*/, System.import("jquery.validation", __moduleName)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, System.import("./validation/methods", __moduleName)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, System.import("jquery.validation/localization/messages_" + locale_1.locale, __moduleName)];
                        case 3:
                            _a.sent();
                            if (!(locales.indexOf(locale_1.locale) >= 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, System.import("./validation/" + locale_1.locale, __moduleName)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
        }
    };
});
