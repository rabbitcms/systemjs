<?php
/** @var array[] $config */
$main = $config['config'] ?? [];
unset($config['config']);
?>
SystemJS.config({!! \json_encode(
$config,
JSON_PRETTY_PRINT | JSON_UNESCAPED_LINE_TERMINATORS | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_FORCE_OBJECT
)!!});

SystemJS.register('config', [], function(export1) {
    "use strict";
    return {
        setters: [],
        execute: function () {
            export1({!! \json_encode(
            $main,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_LINE_TERMINATORS | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_FORCE_OBJECT
            )!!});
        }
    };
});

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
