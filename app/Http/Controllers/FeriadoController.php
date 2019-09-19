<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\FeriadosResource as Resource;
use Illuminate\Http\Request;

class FeriadoController extends Controller
{
    protected $model = '\\App\\Models\\Feriado';
    public function __construct (){
        $this->middleware('length');
    }
    /**
     * get all eventos by user
     * 
     * @param $id must be an integer in db
     */
    public function list (
        $id,
        $month,
        $year
    ){

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
    /**
     * this function assigns dependencies and it corresponding callbacks
     * @param dependencies is an associative array with Reservas dependencies to be eagerly loaded
     * @param parameters is an associative array with values passed to eager load constructor
     */
    public function listDependencyData(
        $id,
        $month,
        $year
    ){
        $dependency = $this->model::assignDependencyOptions (
            array(
                'feriados'=>[$month,$year]
            ),
            'create'  
        );
        
        $user = User::with(
                $dependency->data
            )->where('id',$id)
            ->first();
        
        return response(
            $this->formatDependencyData(
                $dependency->models,
                $user
            )->merge([
                'intervalo' => [
                    "data" => $user->intervalo
                ]
            ]),
            200
        )->header('Content-Type','application/json'); 
    }

    public function formatDependencyData(
        array $dataModels,
        User $user
    ) {
        $res = [];
        foreach($dataModels as $relation=>$model){
            $opt = $this->model===$model ? 'mainFormatOptions' : 'dependencyFormatOptions';
            if ($model && property_exists($model,$opt)){
                $res[$relation] = $model::getFormattedData($user->{$relation},$opt);
            }
        }
        return collect($res);
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
