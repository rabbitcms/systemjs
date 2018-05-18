SystemJS.config({!!  \json_encode(
$config,
JSON_PRETTY_PRINT | JSON_UNESCAPED_LINE_TERMINATORS | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
)!!});

document.addEventListener('DOMContentLoaded', function() {
    SystemJS.import('@common').then(function(common) {
        common.scan(document);
    });
});

//Polyfill for IE and JQuery
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}