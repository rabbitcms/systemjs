System.register(["tslib", "jquery"], function (exports_1, context_1) {
    "use strict";
    _this = this;
    var __moduleName = context_1 && context_1.id;
    function validate(form, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, validationInitialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, jquery_1.default(form).validate(jquery_1.default.extend({
                                ignore: '',
                                highlight: function (element) {
                                    $(element).closest('.form-group').addClass('has-error');
                                },
                                unhighlight: function (element) {
                                    $(element).closest('.form-group').removeClass('has-error');
                                },
                                errorPlacement: function (error, element) {
                                    var group = element.closest('.input-group');
                                    error.insertAfter(group.length ? group : element);
                                },
                            }, options))];
                }
            });
        });
    }
    exports_1("validate", validate);
    function form(form, ajax) {
        if (ajax === void 0) { ajax = jquery_1.default.ajax; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var $form, lock, validator, options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $form = jquery_1.default(form), lock = false, options = {
                            submitHandler: function (form, e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var data;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            e.preventDefault();
                                            if (lock) {
                                                return [2 /*return*/];
                                            }
                                            lock = true;
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, , 3, 4]);
                                            return [4 /*yield*/, ajax($.extend({
                                                    method: $form.attr('method'),
                                                    url: $form.attr('action'),
                                                    data: $form.serialize(),
                                                    error: function (response) {
                                                        if (response.status === 422) {
                                                            validator.showErrors(Object.keys(response.responseJSON.errors).reduce(function (errors, key) {
                                                                errors[key.split('.')
                                                                    .map(function (value, index) { return index === 0 ? value : '[' + value + ']'; })
                                                                    .join('')] = response.responseJSON.errors[key][0];
                                                                return errors;
                                                            }, {}));
                                                        }
                                                        else {
                                                            $form.trigger('error', response);
                                                        }
                                                    }
                                                }, $form.attr('enctype') === 'multipart/form-data'
                                                    ? {
                                                        data: new FormData(form),
                                                        processData: false,
                                                        contentType: false,
                                                    }
                                                    : {}))];
                                        case 2:
                                            data = _a.sent();
                                            $form.triggerHandler('success', data);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            $form.removeClass('sending');
                                            lock = false;
                                            return [7 /*endfinally*/];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }
                        };
                        $form.triggerHandler('init', options);
                        return [4 /*yield*/, validate(form, options)];
                    case 1: return [2 /*return*/, validator = _a.sent()];
                }
            });
        });
    }
    exports_1("form", form);
    function datepicker(el, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, datepickerInitialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, jquery_1.default(el).datepicker(jquery_1.default.extend(options, {
                                language: locale
                            }))];
                }
            });
        });
    }
    exports_1("datepicker", datepicker);
    function scan(element) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var list, i;
            return tslib_1.__generator(this, function (_a) {
                list = element.querySelectorAll('[data-require]');
                for (i = 0; i < list.length; ++i) {
                    (function (element) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        var module;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, SystemJS.import(element.getAttribute('data-require'))];
                                case 1:
                                    module = _a.sent();
                                    if (element.hasAttribute('data-bind')) {
                                        element.addEventListener('click', function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        e.preventDefault();
                                                        return [4 /*yield*/, module[element.getAttribute('data-bind')]()];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                    if (!element.hasAttribute('data-import')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, module[element.getAttribute('data-import')](element, element.getAttribute('data-param'))];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })(list.item(i)).catch(console.log);
                }
                return [2 /*return*/];
            });
        });
    }
    exports_1("scan", scan);
    var _this, tslib_1, jquery_1, locale, locales, validationInitialize, datepickerInitialize;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }
        ],
        execute: function () {
            exports_1("locale", locale = document.documentElement.getAttribute('lang') || '');
            locales = ['uk', 'ru'], validationInitialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            validationInitialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, void 0];
                            }); }); };
                            return [4 /*yield*/, SystemJS.import("jquery.validation")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, SystemJS.import("@common/validation/methods")];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, SystemJS.import("jquery.validation/localization/messages_" + locale)];
                        case 3:
                            _a.sent();
                            if (!(locales.indexOf(locale) >= 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, SystemJS.import("@common/validation/" + locale)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
            datepickerInitialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            datepickerInitialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, void 0];
                            }); }); };
                            SystemJS.import('bootstrap-datepicker/css/bootstrap-datepicker3.min.css');
                            return [4 /*yield*/, SystemJS.import("bootstrap-datepicker")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, SystemJS.import("bootstrap-datepicker/locales/bootstrap-datepicker." + locale + ".min")];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
        }
    };
});
