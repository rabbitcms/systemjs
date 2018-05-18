System.register(["./common"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (common_1_1) {
                exports_1({
                    "form": common_1_1["form"]
                });
            }
        ],
        execute: function () {
            console.log('DEPRECATED: Use form from @common');
        }
    };
});
