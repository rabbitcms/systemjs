System.register(["jquery", "jquery.validation"], function (exports_1, context_1) {
    "use strict";
    var jquery_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            jquery_1.default.validator.addMethod("phoneUA", function (a, b) {
                a = a.replace(/(?!^\+)\D/g, "");
                return this.optional(b) || a.length > 8 && a.match(/^(\+?380|0)[345679]\d\d{3}\d{2}\d{2}$/);
            });
            jquery_1.default.validator.addMethod('email', function (value, element) {
                return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(value);
            });
            jquery_1.default.validator.addMethod('notEqualTo', function (value, element, param) {
                var target = jquery_1.default(param);
                if (this.settings.onfocusout && target.not(".validate-equalTo-blur").length) {
                    target.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                        jquery_1.default(element).valid();
                    });
                }
                return value !== target.val();
            });
            jquery_1.default.validator.addMethod('requiredIf', function (value, element, param) {
                var params = param.split(',');
                return value.length || params[1] !== jquery_1.default(params[0]).val();
            });
        }
    };
});
