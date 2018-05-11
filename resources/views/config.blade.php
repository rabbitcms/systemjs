SystemJS.config({!!  \json_encode(
$config,
JSON_PRETTY_PRINT | JSON_UNESCAPED_LINE_TERMINATORS | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
)!!});

System.register('locale',[], function($__export) {
    return {
        execute: function() {
            $__export('locale', document.documentElement.getAttribute('lang'));
        }
    };
});

function SystemJSScan(element) {
    element.querySelectorAll('[data-require]').forEach(function (element) {
        System.import(element.getAttribute('data-require')).then(function(module) {
            if(element.hasAttribute('data-import')){
                module[element.getAttribute('data-import')](element, element.getAttribute('data-param'));
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    SystemJSScan(document);
});