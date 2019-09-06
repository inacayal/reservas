<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventosResource as Resource;
use App\User;

class EventoController extends Controller
{
    protected $model = '\\App\\Models\\Evento';
    public function __construct () {

    }
    /**
     * get all eventos by user
     * 
     * @param $id must be an integer in db
     */
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
            [
                'data' => Resource::collection(
                    $user
                        ->eventos
                        ->keyBy('id')
                )
            ],
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
