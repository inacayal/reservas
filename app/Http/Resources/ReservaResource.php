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
                    "email"=> "isadore.gerhold@example.org",
                    "nombre"=> "Brandon",
                    "apellido"=> "Herman",
                    "telefono"=> "+1-934-779-4987",
                    "ubicacion"=> $el->ubicacion->nombre,
                    "personas"=> 3,
                    "evento"=> $el->evento->nombre,
                    "descripcion"=> "Sapiente iusto qui commodi quibusdam quas.",
                    "estado"=> $el->estado->descripcion,
                    "hora_reserva"=>$el->hora_reserva
                ]
            );
        }
        return $res->groupBy('hora_reserva');
    }
}
