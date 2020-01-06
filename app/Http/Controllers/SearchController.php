<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public $modelMapping = [
        'reservas'      => 'App\\Models\\Reserva',
        'horarios'      => 'App\\Models\\Horario',
        'feriados'      => 'App\\Models\\Feriado',
        'ubicaciones'   => 'App\\Models\\Ubicacion',
        'eventos'       => 'App\\Models\\Evento',
        'promociones'   => 'App\\Models\\Promocion'
    ];

    public function __construct(){

    }

    public function buildQuery($query,$term,$names){
        return $query->where(
                function ($query) use ($term,$names){
                    foreach($names as $index=>$name){
                        $query = ($index === 0)
                            ? $query->where($name,'like',"%$term%")
                            : $query->orWhere($name,'like',"%$term%");
                    }
                }
            )
            ->get();
    }

    public function search($term,$route,$field,$user){

        $model = $this->modelMapping[$route];
        $fieldNames = explode(',',$field);
        $query = $model::where('id_usuario',$user);

        return count($fieldNames) > 1
            ? $this->buildQuery($query,$term,$fieldNames)
            : $query->where($field,'like',"%$term%")->get();
    }
}
