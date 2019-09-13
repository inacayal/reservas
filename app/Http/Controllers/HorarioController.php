<?php

namespace App\Http\Controllers;

use App\Http\Resources\HorarioResource as Resource;
use Illuminate\Http\Request;
use App\User;

class HorarioController extends Controller
{
    protected $model = '\\App\\Models\\Horario';
    public function __construct () {
        $this->middleware('length');
    }

    public function list ($id){
        $user = User::with('horarios')
            ->where('id',$id)
            ->first();

        return response( 
            Resource::collection(
                $user
                    ->horarios
                    ->keyBy('id_dia_semana')
            ),
            200
        )->header('Content-Type','application/json');
    }

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
