<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\ConfiguracionResource as Resource;
use Illuminate\Http\Request;

class ConfiguracionController extends Controller
{
    public function __construct (){

    }
    /**
     * get all eventos by user
     * 
     * @param $id must be an integer in db
     */
    public function list ($id){
        $user = User::where('id',$id)->first();
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
