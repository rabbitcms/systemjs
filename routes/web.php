<?php
declare(strict_types=1);

use Illuminate\Routing\Router;

/* @var Router $router */


$router->get('config.js', 'ConfigController@make')->name('config');