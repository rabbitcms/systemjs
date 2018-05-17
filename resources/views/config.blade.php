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
    var list = element.querySelectorAll('[data-require]'),i;
    for(i = 0; i < list.length; ++i) {
        (function(element) {
            System.import(element.getAttribute('data-require')).then(function(module) {
                if(element.hasAttribute('data-import')){
                    module[element.getAttribute('data-import')](element, element.getAttribute('data-param'));
                }
            });
        })(list.item(i));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    SystemJSScan(document);
});

//Polyfill for IE and JQuery
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}