<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeriadosResource extends JsonResource
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
        return (object) [
            "id"=>$this->id,
            "nombre"=>$this->nombre,
            "estado"=>$this->estado->descripcion,
            "descripcion"=>$this->descripcion,
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
            ]
        ];
    }
}
