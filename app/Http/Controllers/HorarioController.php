<?php

namespace App\Http\Controllers;

use App\Http\Resources\HorarioResource as Resource;
use App\Http\Resources\EventosResource as EventoResource;
use Illuminate\Http\Request;
use App\User;

class HorarioController extends Controller
{
    protected $model = '\\App\\Models\\Horario';
    public function __construct () {
        $this->middleware('length');
    }

    public function list ($route,$id){
        $user = User::with('horarios')
            ->find($id);

        return response( 
            Resource::collection(
                $user
                    ->horarios
                    ->keyBy('id_dia_semana')
            ),
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
        $id
    ){
        $dependency = $this->model::assignDependencyOptions(array('eventos'),'query');
        $user = User::with($dependency->data)->find($id);
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
        $user = User::with('eventos')->find($userId);
        $eventos = EventoResource::collection($user->eventos);
        return response(
            [
                'intervalo' => $user->intervalo,
                'data' => new Resource($user->horarios->find($id)),
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
