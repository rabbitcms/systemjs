<?php
declare(strict_types=1);

namespace RabbitCMS\SystemJS\Jobs;

use RabbitCMS\Modules\Concerns\BelongsToModule;
use RabbitCMS\Modules\Facades\Modules;
use RabbitCMS\Modules\Module;

/**
 * Class MakeConfigJob
 * @package RabbitCMS\SystemJS\Jobs
 */
class MakeConfigJob
{
    use BelongsToModule;

    /**
     * @return string
     */
    public function handle(): string
    {
        $config = self::module()->config(null, []);
        $prepare = [
            'map' => [$config['map'] ?? []],
            'paths' => [$config['paths'] ?? []],
            'meta' => [$config['meta'] ?? []],
            'depCache' => [$config['depCache'] ?? []],
            'bundles' => [$config['bundles'] ?? []],
        ];
        $config = \ array_map(function (array $arrays) {
            return \array_merge(...$arrays);
        }, \array_reduce(Modules::enabled(), function (array $config, Module $module) {
            $config['paths'][] = [
                "@{$module->getName()}/" => str_replace(asset(''), '', "/{$module->asset('')}/")
            ];
            $path = $module->getPath('config/systemjs.php');
            if (!\is_file($path)) {
                return $config;
            }
            $moduleConfig = (function (Module $module, string $path) {
                return require($path);
            })($module, $path);
            foreach ($config as $node => &$arrays) {
                if (!\array_key_exists($node, $moduleConfig)) {
                    continue;
                }
                $arrays[] = $moduleConfig[$node];
            }

            return $config;

        }, $prepare));

        return 'SystemJS.config(' . \json_encode(
                $config,
                JSON_PRETTY_PRINT | JSON_UNESCAPED_LINE_TERMINATORS | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
            ) . ');';
    }
}
