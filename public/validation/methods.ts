import $ from "jquery";
import 'jquery.validation';

$.validator.addMethod("phoneUA", function (a, b) {
    a = a.replace(/(?!^\+)\D/g, "");
    return this.optional(b) || a.length > 8 && a.match(/^(\+?380|0)[345679]\d\d{3}\d{2}\d{2}$/)
});

$.validator.addMethod('email', function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(value);
});

$.validator.addMethod('notEqualTo', function (value, element, param) {
    // Bind to the blur event of the target in order to revalidate whenever the target field is updated
    let target = $(param);
    if (this.settings.onfocusout && target.not(".validate-equalTo-blur").length) {
        target.addClass("validate-equalTo-blur").on("blur.validate-equalTo", () => {
            $(element).valid();
        });
    }
    return value !== target.val();
});

$.validator.addMethod('requiredIf', function (value, element, param) {
    let params = param.split(',');
    return value.length || params[1] !== $(params[0]).val();
});