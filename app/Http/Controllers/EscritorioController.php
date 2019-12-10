<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\UsuarioResource;

class EscritorioController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth')->only('index');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = json_encode([
            'data'=> new UsuarioResource(
                User::where('id',27)->first()
            )
        ]);
        return view('escritorio',compact('user'));
    }
    /**
     * Mostrar formulario de reservas
     *
     * @return \Illuminate\Contracts\Support\Renderable
     **/
    public function reservas()
    {
        return view('reserva');
    }
}
