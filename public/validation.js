System.register(["./common"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (common_1_1) {
                exports_1({
                    "validate": common_1_1["validate"]
                });
            }
        ],
        execute: function () {
            console.log('DEPRECATED: Use validate from @common');
        }
    };
});
