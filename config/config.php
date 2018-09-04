<?php
declare(strict_types=1);

return [
    'systemjs' => true,
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
        'jquery' => 'cdnjs/jquery/3.3.1/jquery.min.js',
        'tslib' => 'cdnjs/tslib/1.9.0/tslib.min.js',
        'select2' => 'cdnjs/select2/4.0.3/js/select2.min.js',
        'jquery.validation' => 'cdnjs/jquery-validate/1.17.0',
        'bootstrap-datepicker' => 'cdnjs/bootstrap-datepicker/1.8.0',
        '@common' => '@systemjs/',
        'youtube' => 'https://www.youtube.com/iframe_api',
        'jquery.mb.YTPlayer' => 'cdnjs/jquery.mb.YTPlayer/3.2.1',
    ],
    'depCache' => [
        'select2' => [
            'cdnjs/select2/4.0.3/css/select2.min.css'
        ]
    ],
    'meta' => [
        '*.less' => ['loader' => 'less'],
        '*.css' => ['loader' => 'css'],
        '*.json' => ['loader' => 'json'],
        'youtube' => ['scriptLoad' => true, 'format' => 'global', 'exports' => 'YT'],
        'jquery.mb.YTPlayer/jquery.mb.YTPlayer.min.js' => [
            'exports' => 'onYouTubeIframeAPIReady',
            'format' => 'global',
            'deps' => [
                'youtube',
                'jquery',
                'jquery.mb.YTPlayer/css/jquery.mb.YTPlayer.min.css',

            ]
        ]
    ],
    'packages' => [
        'jquery.validation' => [
            'main' => 'jquery.validate.min',
            'defaultExtension' => 'js',
            'format' => 'amd',
            'map' => [
                './additional-methods' => './additional-methods.min'
            ],
            'meta' => [
                'localization/*' => [
                    'format' => 'global'
                ]
            ]
        ],
        'bootstrap-datepicker' => [
            'main' => 'js/bootstrap-datepicker.min',
            'defaultExtension' => 'js',
            'format' => 'amd',
            'meta' => [
                'locales/*' => [
                    'format' => 'global'
                ]
            ]
        ],
        'jquery.mb.YTPlayer' => [
            'main' => 'jquery.mb.YTPlayer.min',
            'defaultExtension' => 'js',
            'format' => 'global'
        ],
        '@common' => [
            'main' => 'common',
            'defaultExtension' => 'js?' . time(),
            'meta' => [
                'validation/localization/*' => [
                    'format' => 'global'
                ]
            ]
        ]
    ]
];
