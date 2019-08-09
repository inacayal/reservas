<?php

namespace App\Http\Controllers;

use App\Http\Resources\UbicacionesResource as Resource;
use Illuminate\Http\Request;
use App\User;

class UbicacionController extends Controller
{
    protected $model = '\\App\\Models\\Ubicacion';
    public function __construct () {

    }
    public function list ($id){

        $dependency = $this->model::assignDependencyOptions (
            [],
            'query'  
        );
        
        $user = User::with(
                $dependency->data
            )
            ->where('id',$id)
            ->first();
        
        return response( 
            Resource::collection(
                $user
                    ->ubicaciones
                    ->keyBy('id')
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
