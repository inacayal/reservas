<?php

namespace App\Http\Controllers;
use App\Models\Reserva as Reservas;
use App\Http\Resources\ReservaResource as Resource;
use App\User as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservaController extends Controller
{
    protected $model = '\\App\\Models\\Reserva';
    public function __construct () {
        
    }
    /**
     * get all reservations by user
     * 
     * @param date must be time from javascript divided by 1000.
     *        timezone considerations must be taken
     */
    public function list (
        $id,
        $date
    ){
        $d = date('m',((int)$date));
        $res = Reservas::where('id_usuario',$id)
            ->get(
                [
                    "id",
                    "created_at",
                    "id_usuario",
                    "email",
                    "nombre",
                    "apellido",
                    "telefono",
                    "id_ubicacion",
                    "cantidad_personas",
                    "id_evento",
                    "descripcion_evento",
                    "hora_reserva",
                    "id_estado",
                    "dia_reserva",
                ]
            )
            ->groupBy('dia_reserva');
        return response( 
            Resource::collection($res),
            200
        )->header('Content-Type','application/json'); 
    }
    /**
     * get all reservations by user
     * 
     * @param date must be time from javascript divided by 1000.
     *        timezone considerations must be taken
     */
    public function create (){
        return response(['respuesta'=>'create'],200)
            ->header('Content-Type','application/json');
    }
    public function update (){
        return response(['respuesta'=>'update'],200)
            ->header('Content-Type','application/json');
    }
    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
