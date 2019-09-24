<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\FeriadosResource as Resource;
use App\Http\Resources\EventosResource as EventoResource;
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
        $list,
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
            )->find($id);

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
        $route,
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
            )->find($id);
        
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

    public function getSingle(
        $route, 
        $userId,
        $id
    ){ 
        $user = User::with(
                'feriados',
                'eventos'
            )->find($userId);
        
        $eventos = EventoResource::collection($user->eventos);
        return response(
            [
                'intervalo' => $user->intervalo_reserva,
                'data' => new Resource($user->feriados->find($id)),
                'eventos' => [
                    'data' => $eventos->keyBy('id'),
                    'list' => $eventos->mapWithKeys(
                        function ($item){
                            return array($item['id'] => $item['nombre']);
                        }
                    )
                ]
            ],
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
