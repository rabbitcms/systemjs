SystemJS.config({!!  \json_encode(
$config,
JSON_PRETTY_PRINT | JSON_UNESCAPED_LINE_TERMINATORS | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
)!!});

System.register('locale',[], function($__export) {
    return {
        execute: function() {
            $__export('locale', html.attributes[lang].value);
        }
    };
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-require]').forEach(function (element) {
        System.import(element.attributes['data-require'].value).then(function(module) {
            if(element.attributes.hasOwnProperty('data-import')){
                module[element.attributes['data-import'].value](element);
            }
        });
    });
});