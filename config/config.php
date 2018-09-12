<?php
declare(strict_types=1);

return [
    'systemjs' => true,
    'paths' => [
        'cdnjs/' => env('CDN_CDNJS', 'https://cdnjs.cloudflare.com/ajax/libs/'),
        'jsdelivr/' => env('CDN_JSDELIVR', 'https://cdn.jsdelivr.net/'),
        'npm/' => env('CDN_JSDELIVR_NPM', 'https://cdn.jsdelivr.net/npm/'),
    ],
    'map' => [
        'css' => 'npm/systemjs-plugin-css@0.1.37/css.js',
        'less' => 'npm/systemjs-plugin-less@0.1.2/less.js',
        'text' => 'npm/systemjs-plugin-text@0.0.11/text.js',
        'json' => 'npm/systemjs-plugin-json@0.3.0/json.js',
        'lesscss' => 'npm/less@3/dist/less.min.js',
        'jquery' => 'npm/jquery@3/dist/jquery.min.js',
        'tslib' => 'npm/tslib@1/tslib.min.js',
        'select2' => 'npm/select2@4.0/dist/js/select2.js',
        'jquery.validation' => 'npm/jquery-validation@1.17/dist',
        'bootstrap-datepicker' => 'npm/bootstrap-datepicker@1.8/dist',
        '@common' => '@systemjs/',
        'youtube' => 'https://www.youtube.com/iframe_api',
        'jquery.mb.YTPlayer' => 'npm/jquery.mb.ytplayer@3.2/dist',
    ],
    'depCache' => [
        'select2' => [
            'npm/select2@4.0/dist/css/select2.min.css'
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
