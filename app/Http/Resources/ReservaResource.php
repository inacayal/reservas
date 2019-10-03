<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Suppport\Collection;
use App\Traits\hasDependencies;

class ReservaResource extends JsonResource
{
    use hasDependencies;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public $preserveKeys = true;

    private static $dependencies = [
        'reservas.list' => [
            'ubicacion' => false,
            'evento'    => false,
            'promocion' => false
        ]
    ];

    public function toArray($request)
    {
        $res = collect([]);
        foreach ($this->resource as $el){
            $data = [   
                "id"=> $el->id,
                "email"=> $el->email,
                "nombre"=> $el->nombre,
                "apellido"=> $el->apellido,
                "telefono"=> $el->telefono,
                "personas"=> $el->cantidad_personas,
                "descripcion"=> $el->descripcion_evento,
                "hora_reserva"=>$el->hora_reserva,
                "estado" => $el->estado->descripcion
            ];
            $dependencies = self::getDependencies($request->route()->action['as']);
            $dependencyData = self::formatResults(
                $el,
                $dependencies
            );
            $res->push(array_merge($data,$dependencyData));
        }
        return $res->groupBy('hora_reserva');
    }
}
