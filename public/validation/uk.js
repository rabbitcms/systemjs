"use strict";
$.extend($.validator.messages, {
    phoneUA: "Введіть правильний номер телефону",
    notEqualTo: "Введіть інше значення",
    requiredIf: $.validator.messages.required,
});
