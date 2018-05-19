<?php
declare(strict_types=1);

namespace RabbitCMS\SystemJS\Jobs;

use RabbitCMS\Modules\Concerns\BelongsToModule;
use RabbitCMS\Modules\Facades\Modules;
use RabbitCMS\Modules\Module;
use RabbitCMS\Modules\Theme;

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
            'packages' => [$config['packages'] ?? []],
            'packageConfigPaths' => [$config['packageConfigPaths'] ?? []],
        ];
        $prepare = \array_reduce(Modules::enabled(), function (array $config, Module $module) {
            if (!$module->config('systemjs')) {
                return $config;
            }
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
        }, $prepare);

        $prepare = $this->prepareTheme($prepare, Modules::getCurrentTheme());

        $config = \array_map(function (array $arrays) {
            return \array_merge(...$arrays);
        }, $prepare);

        $config = \array_filter($config);

        $config['pluginFirst'] = true;
        $config['warnings'] = true;

        return self::module()->view('config', ['config' => $config])->render();
    }

    /**
     * @param array       $prepared
     * @param null|string $themeName
     *
     * @return array
     */
    private function prepareTheme(array $prepared, ?string $themeName): array
    {
        if ($themeName !== null) {
            $theme = Modules::getThemeByName($themeName);
            $prepared = $this->prepareTheme($prepared, $theme->getExtends());
            $prepared['paths'][] = [
                "@theme-{$theme->getName()}/" =>
                    str_replace(asset(''), '',
                        '/' . asset(Modules::getThemesAssetsRoot() . "/{$theme->getName()}") . '/')
            ];
            $path = $theme->getPath('config/systemjs.php');
            if (!\is_file($path)) {
                return $prepared;
            }
            $moduleConfig = (function (Theme $theme, string $path) {
                return require($path);
            })($theme, $path);
            foreach ($prepared as $node => &$arrays) {
                if (!\array_key_exists($node, $moduleConfig)) {
                    continue;
                }
                $arrays[] = $moduleConfig[$node];
            }
        }
        return $prepared;
    }
}
