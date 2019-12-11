<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Collection;
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
        ],
        'reservas.single' => [
            'ubicacion' => false,
            'evento'    => false,
            'promocion' => false,
            'estado'    => false
        ]
    ];

    public function singleReserva($el) {
        return [
            "id"=> $el->id,
            "email"=> $el->email,
            "nombre"=> $el->nombre,
            "id_usuario" => $el->id_usuario,
            "apellido"=> $el->apellido,
            "telefono"=> $el->telefono,
            "ubicacion"=>$el->ubicacion,
            "evento"=>$el->evento,
            "promocion"=>$el->promocion,
            "personas"=> $el->cantidad_personas,
            "fechaReserva"=> $el->getAttributes()['dia_reserva'],
            "descripcion"=> $el->descripcion_evento,
            "hora_reserva"=>$el->hora_reserva,
            "estado" => $el->estado->descripcion
        ];
    }

    public function formatData($el,$request){
        $dependencies = self::getDependencies($request->route()->action['as']);
        $dependencyData = self::formatResults(
            $el,
            $dependencies
        );
        return $dependencyData;
    }

    public function formatCollection(Collection $data,$request){
        $res = collect([]);
        foreach ($this->resource as $el){
            $data = $this->singleReserva($el);
            $dependencyData = $this->formatData($el,$request);
            $res->push(array_merge($data,$dependencyData));
        }
        return $res->groupBy('hora_reserva');
    }

    public function toArray($request)
    {
        if ($this->resource instanceof Collection){
            return $this->formatCollection($this->resource,$request);
        } else {
            $el = $this->resource;
            $data = $this->singleReserva($el);
            $dependencyData = $this->formatData($el,$request);
            return array_merge($data,$dependencyData);
        }
    }
}
