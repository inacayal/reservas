<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LoginController extends Controller {
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/escritorio';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        //$this->middleware('guest')->except('logout');
    }

    private $userResource = [
         "Local" => "\\App\\Http\\Resources\\LocalesResource",
         "Franquicia" => "\\App\\Http\\Resources\\FranquiciaResource",
         "Admin" => "\\App\\Http\\Resources\\AdminResource"
    ];

    public function login( Request $request ){
        $credentials = $request->only('email', 'password');
        if ( Auth::attempt( $credentials ) ) {
            $role = auth()->user()->rol->descripcion;
            $token = auth()->user()->api_token;
            cookie()->queue('Authorization', "Bearer $token", 2);
            cookie()->forget('Authorization');
            return response([
                "user"=> new $this->userResource[$role](auth()->user()->{$role})
            ],200);
        }

        return response([
            "error" => "datos de acceso invalidos"
        ],200);
    }
}
