<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\hasDependencies;
use App\Models\Evento;

class EventosResource extends JsonResource
{
    use hasDependencies;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dependencies = [
        'reservas.list' => [
            'estado' => false
        ],
        'reservas.add' => [
            'promociones' => 'key',
        ],
        'reservas.single'=>[
            'estado'=>false
        ],
        'horarios.list'=> [],
        'horarios.add'=> [],
        'horarios.single'=> [],
        'feriados.list'=>[],
        'feriados.add'=>[],
        'feriados.single'=>[],
        'eventos.list' => [
            'horarios'      => 'list',
            'promociones'   => 'list'
        ],
        'eventos.single' => [
            'feriados'      => 'list',
            'horarios'      => 'list',
            'promociones'   => 'list'
        ]
    ];
    public $preserveKeys = true;
    public function toArray($request)
    {
        $data = [
            "id" => $this->id,
            "nombre" => $this->nombre,
            "descripcion" =>$this->descripcion,
            "estado" => $this->estado->descripcion
        ];
        $dependencies = self::getDependencies($request->route()->action['as']);
        $dependencyData = self::formatResults(
            $this->resource,
            $dependencies
        );
        return array_merge($data,$dependencyData);
    }
}
