<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EscritorioController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->only('index');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('escritorio');
    }
    /**
     * Mostrar formulario de reservas
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function reservas()
    {
        return view('reserva');
    }
}
