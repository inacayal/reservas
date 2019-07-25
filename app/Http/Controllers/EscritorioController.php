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
        //$this->middleware('auth')->only('index');
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

    public function mail()
    {
        ini_set( 'display_errors', 1 );
        ini_set('SMTP','inacayal.com.ar');
        ini_set('username','soporte@inacayal.com.ar');
        ini_set('password','Soporte1769*il*');
        ini_set('sendmail_from', 'soporte@inacayal.com.ar'); 
        ini_set('smtp_port',25);
        error_reporting( E_ALL );
        $from = "soporte@inacayal.com.ar";
        $to = "geneyelit@gmail.com";
        $subject = "Checking PHP mail";
        $message = "PHP mail works just fine";
        $headers = "From:" . $from;
        mail($to,$subject,$message, $headers);
        echo "The email message was sent.";
    }
}
