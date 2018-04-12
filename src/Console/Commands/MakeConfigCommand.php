<?php
declare(strict_types=1);

namespace RabbitCMS\SystemJS\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use RabbitCMS\SystemJS\Jobs\MakeConfigJob;

/**
 * Class MakeConfigCommand
 * @package RabbitCMS\SystemJS\Console\Commands
 */
class MakeConfigCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'systemjs:make';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make SystemJS config.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $config = dispatch_now(new MakeConfigJob());
        $path = public_path('systemjs/config.js');
        File::makeDirectory(dirname($path), 0777, true, true);
        file_put_contents($path, $config);
    }
}
