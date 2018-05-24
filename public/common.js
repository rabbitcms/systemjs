System.register(["tslib", "jquery"], function (exports_1, context_1) {
    "use strict";
    _this = this;
    var __moduleName = context_1 && context_1.id;
    function validate(form, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, validationInitialize()];
                    case 1:
                        _a.sent();
                        return [2, jquery_1.default(form).validate(jquery_1.default.extend({
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
                                                return [2];
                                            }
                                            lock = true;
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, , 3, 4]);
                                            return [4, (ajax || jquery_1.default.ajax)($.extend({
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
                                            return [3, 4];
                                        case 3:
                                            $form.removeClass('sending');
                                            lock = false;
                                            return [7];
                                        case 4: return [2];
                                    }
                                });
                            }); }
                        };
                        $form.triggerHandler('init', options);
                        return [4, validate(form, options)];
                    case 1: return [2, validator = _a.sent()];
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
                    case 0: return [4, datepickerInitialize()];
                    case 1:
                        _a.sent();
                        return [2, jquery_1.default(el).datepicker(jquery_1.default.extend(options, {
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
                        var module, param;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, SystemJS.import(element.getAttribute('data-require'))];
                                case 1:
                                    module = _a.sent(), param = element.getAttribute('data-param');
                                    if (element.hasAttribute('data-bind')) {
                                        element.addEventListener('click', function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        e.preventDefault();
                                                        return [4, module[element.getAttribute('data-bind')](param)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2];
                                                }
                                            });
                                        }); });
                                    }
                                    if (!element.hasAttribute('data-import')) return [3, 3];
                                    return [4, module[element.getAttribute('data-import')](element, param)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2];
                            }
                        });
                    }); })(list.item(i)).catch(console.log);
                }
                return [2];
            });
        });
    }
    exports_1("scan", scan);
    function youtubeBackground(el, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var $el;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, youtubeBackgroundInitialize()];
                    case 1:
                        _a.sent();
                        if (!el)
                            return [2];
                        if (!el.id) {
                            el.id = "bgyt" + new Date().getTime();
                        }
                        $el = jquery_1.default("#" + el.id);
                        $el.YTPlayer(options || {});
                        $el.triggerHandler('init');
                        return [2];
                }
            });
        });
    }
    exports_1("youtubeBackground", youtubeBackground);
    function sleep(ms) {
        return new Promise(function (r) { return setTimeout(r, ms); });
    }
    exports_1("sleep", sleep);
    var _this, tslib_1, jquery_1, locale, locales, validationInitialize, datepickerInitialize, youtubeBackgroundInitialize;
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
                var promise;
                return tslib_1.__generator(this, function (_a) {
                    promise = SystemJS.import("jquery.validation")
                        .then(function () { return SystemJS.import("@common/validation/methods"); })
                        .then(function () { return SystemJS.import("jquery.validation/localization/messages_" + locale); })
                        .then(function () { return locales.indexOf(locale) >= 0 && SystemJS.import("@common/validation/" + locale); });
                    validationInitialize = function () { return promise; };
                    return [2, promise];
                });
            }); };
            datepickerInitialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var promise;
                return tslib_1.__generator(this, function (_a) {
                    promise = Promise.all([
                        SystemJS.import('bootstrap-datepicker/css/bootstrap-datepicker3.min.css'),
                        SystemJS.import("bootstrap-datepicker"),
                    ]).then(function () { return SystemJS.import("bootstrap-datepicker/locales/bootstrap-datepicker." + locale + ".min"); });
                    datepickerInitialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        return [2, promise];
                    }); }); };
                    return [2, promise];
                });
            }); };
            youtubeBackgroundInitialize = function () {
                var promise = (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return tslib_1.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4, SystemJS.import('youtube')];
                            case 1:
                                _b = (_a = (_c.sent())).ready;
                                return [4, SystemJS.import('jquery.mb.YTPlayer')];
                            case 2:
                                _b.apply(_a, [_c.sent()]);
                                return [2];
                        }
                    });
                }); })();
                youtubeBackgroundInitialize = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                    return [2, promise];
                }); }); };
                return promise;
            };
        }
    };
});
