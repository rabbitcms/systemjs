<?php
declare(strict_types=1);

return [
    'paths' => [
        'unpkg/' => 'https://unpkg.com/',
        'cdnjs/' => 'https://cdnjs.cloudflare.com/ajax/libs/'
    ],
    'map' => [
        'css' => 'unpkg/systemjs-plugin-css@0.1.37/css.js',
        'less' => 'unpkg/systemjs-plugin-less/less.js',
        'text' => 'unpkg/systemjs-plugin-text/text.js',
        'json' => 'unpkg/systemjs-plugin-json/json.js',
        'lesscss' => 'cdnjs/less.js/3.0.1/less.min.js',
        'jquery' => 'cdnjs/jquery/2.2.4/jquery.min.js',
        'tslib' => 'cdnjs/tslib/1.9.0/tslib.min.js',
        'select2' => 'cdnjs/select2/4.0.3/js/select2.min.js'
    ],
    'depCache' => [
        'select2' => [
            'cdnjs/select2/4.0.3/css/select2.min.css'
        ]
    ],
    'meta' => [
        '*.less' => ['loader' => 'less'],
        '*.css' => ['loader' => 'css'],
        '*.json' => ['loader' => 'json']
    ]
];
