<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\ConfiguracionResource as Resource;
use Illuminate\Http\Request;

class ConfiguracionController extends Controller
{
    private $model = '\\App\\User';
    public function __construct (){

    }
    /**
     * get all eventos by user
     * 
     * @param $id must be an integer in db
     */
    public function list ($id){
        
        $dependency = $this->model::assignDependencyOptions(
            [],
            'query'  
        );

        $user = User::with(
                $dependency->data
            )->find($id);

        return response( 
            new Resource($user),
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
