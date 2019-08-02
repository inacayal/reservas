<?php

namespace App\Http\Controllers;

use App\Http\Resources\HorarioSemanaResource as Resource;
use Illuminate\Http\Request;
use App\User;

class HorariosController extends Controller
{
    protected $model = '\\App\\Models\\HorariosSemana';
    public function __construct () {

    }

    public function list ($id){
        $user = User::where('id',$id)->first();
        return response( 
            Resource::collection($user->horariosSemana),
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
