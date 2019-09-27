<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventosResource as Resource;
use Carbon\Carbon;
use App\User;

class EventoController extends Controller
{
    protected $model = '\\App\\Models\\Evento';
    public function __construct () {
        $this->middleware('length');
    }
    /**
     * get all eventos by user
     * 
     * @param $id must be an integer in db
     */
    public function list ($id){
        
        $today = new \DateTime();
        $month = (int) $today->format('m');
        $year = (int) $today->format('Y');

        $dependency = $this->model::assignDependencyOptions (
            array('feriados' => [$month,$year]),
            'query'  
        );
        
        $user = User::with(
                $dependency->data    
            )
            ->where('id',$id)
            ->first();
        return response( 
            Resource::collection(
                $user->eventos        
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
