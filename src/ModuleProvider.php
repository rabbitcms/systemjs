<?php
declare(strict_types=1);

namespace RabbitCMS\SystemJS;

use Illuminate\Support\ServiceProvider;
use RabbitCMS\SystemJS\Console\Commands\MakeConfigCommand;

/**
 * Class ModuleProvider
 * @package RabbitCMS\SystemJS
 */
class ModuleProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->commands(MakeConfigCommand::class);
    }
}
