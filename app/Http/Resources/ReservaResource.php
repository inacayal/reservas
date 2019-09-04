<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public $preserveKeys = true;
    public function toArray($request)
    {
        $res = collect([]);
        foreach ($this->resource as $el){
            $res->push(
                [   
                    "id"=> $el->id,
                    "email"=> $el->email,
                    "nombre"=> $el->nombre,
                    "apellido"=> $el->apellido,
                    "telefono"=> $el->telefono,
                    "ubicacion"=> $el->ubicacion->nombre,
                    "personas"=> $el->cantidad_personas,
                    "evento"=> $el->evento->nombre_evento,
                    "descripcion"=> $el->descripcion_evento ,
                    "estado"=> $el->estado->descripcion,
                    "hora_reserva"=>$el->hora_reserva
                ]
            );
        }
        return [
            'reservas' => $res->groupBy('hora_reserva'),
            'show' => false
        ];
    }
}
