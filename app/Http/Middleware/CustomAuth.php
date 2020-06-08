<?php

namespace App\Http\Middleware;

use Closure;

class CustomAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->hasCookie('Authorization')) {
            //$request->headers->set('Authorization', $request->cookie('Authorization'));
            return $next($request);
        }
        return response(["error"=>"No autenticado"],401);
    }
}
