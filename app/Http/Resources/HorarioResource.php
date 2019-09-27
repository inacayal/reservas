<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Models\Horario;

class HorarioResource extends JsonResource
{
    use DataFormatting;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dataKey = 'id';
    private static $valueKey = 'nombre';
    private static $dataResource = 'App\\Http\\Resources\\HorarioEventoResource';
    private static $dependencyFormatOptions = [
        'keyData'=>'data',
        'listData'=>'list'
    ];
    public $preserveKeys = true;
    
    public function toArray($request)
    {
        $models = [
            'promociones' => 'App\\Models\\Promocion'
        ];
        return [
            "id"=>$this->id,
            "diaSemana"=>$this->id_dia_semana,
            "estado"=>$this->estado->descripcion,
            "apertura" => [
                "reserva" => [
                    "hora" => $this->apertura_reserva->hora,
                    "minuto" => $this->apertura_reserva->minuto
                ],
                "atencion"=> [
                    "hora"=>$this->apertura_atencion->hora,
                    "minuto"=> $this->apertura_atencion->minuto 
                ]
            ],
            "cierre" => [
                "reserva" => [
                    "hora" => $this->cierre_reserva->hora,
                    "minuto" => $this->cierre_reserva->minuto
                ],
                "atencion"=> [
                    "hora"=>$this->cierre_atencion->hora,
                    "minuto"=>$this->cierre_atencion->minuto
                ]
            ],
            'eventos' => self::getFormattedData($this->eventos->where('id_estado',1),'dependencyFormatOptions')
        ];
    }
    public function formatDependencyData(
        array $dataModels,
        Horario $horario
    ) {
        $res = [];
        foreach($dataModels as $relation=>$model){
            $opt = $this->model===$model ? 'mainFormatOptions' : 'dependencyFormatOptions';
            if ($model && property_exists($model,$opt)){
                $res[$relation] = $model::getFormattedData($horario->{$relation},$opt);
            }
        }
        return collect($res);
    }
}

