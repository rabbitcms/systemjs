<?php
declare(strict_types=1);

namespace RabbitCMS\SystemJS\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use RabbitCMS\SystemJS\Jobs\MakeConfigJob;

/**
 * Class ConfigController
 * @package RabbitCMS\SystemJS\Http\Controllers
 */
class ConfigController extends Controller
{
    /**
     * @return Response
     */
    public function make(): Response
    {
        return new Response(dispatch_now(new MakeConfigJob()), 200, [
            'Content-Type' => 'application/json'
        ]);
    }
}
