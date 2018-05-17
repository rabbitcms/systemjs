System.register(["tslib", "jquery", "./validation"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function form(form, ajax) {
        if (ajax === void 0) { ajax = jquery_1.default.ajax; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lock, validator, options;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = jquery_1.default(form);
                        lock = false, options = {
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
                            submitHandler: function (f, e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var data, e_1;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!form.data('ajax')) {
                                                f.submit();
                                                return [2 /*return*/];
                                            }
                                            e.preventDefault();
                                            if (lock) {
                                                return [2 /*return*/];
                                            }
                                            lock = true;
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, 4, 5]);
                                            return [4 /*yield*/, ajax($.extend(true, {
                                                    method: form.attr('method'),
                                                    url: form.attr('action'),
                                                    data: form.serialize(),
                                                    error: function (response) {
                                                        if (response.status === 422) {
                                                            validator.showErrors(Object.keys(response.responseJSON.errors).reduce(function (errors, key) {
                                                                errors[key.split('.').map(function (value, index) {
                                                                    return index === 0 ? value : '[' + value + ']';
                                                                }).join('')] = response.responseJSON.errors[key][0];
                                                                return errors;
                                                            }, {}));
                                                        }
                                                        else {
                                                            form.trigger('error', response.responseJSON);
                                                        }
                                                    }
                                                }, form.attr('enctype') === 'multipart/form-data'
                                                    ? {
                                                        data: new FormData(f),
                                                        processData: false,
                                                        contentType: false,
                                                    }
                                                    : {}))];
                                        case 2:
                                            data = _a.sent();
                                            form.triggerHandler('success', data);
                                            return [3 /*break*/, 5];
                                        case 3:
                                            e_1 = _a.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            form.removeClass('sending');
                                            lock = false;
                                            return [7 /*endfinally*/];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); }
                        };
                        form.triggerHandler('init', options);
                        return [4 /*yield*/, validation_1.validate(form, options)];
                    case 1: return [2 /*return*/, validator = _a.sent()];
                }
            });
        });
    }
    exports_1("form", form);
    var tslib_1, jquery_1, validation_1;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (validation_1_1) {
                validation_1 = validation_1_1;
            }
        ],
        execute: function () {
        }
    };
});
