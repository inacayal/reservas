<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\FeriadosResource as Resource;
use Illuminate\Http\Request;

class FeriadoController extends Controller
{
    protected $model = '\\App\\Models\\Feriado';
    public function __construct (){

    }
    /**
     * get all eventos by user
     * 
     * @param $id must be an integer in db
     */
    public function list (
        $id,
        $date
    ){
        $month = date('m',((int)$date));

        $dependency = $this->model::assignDependencyOptions (
            array('feriados' => [$month]),
            'query'  
        );

        $user = User::with(
                $dependency->data
            )
            ->where('id',$id)
            ->first();

        return response( 
            [ 
                'intervalo' => $user->intervalo,
                'data' => Resource::collection(
                    $user
                        ->feriados
                        ->keyBy('fecha_feriado')
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
