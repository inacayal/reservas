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
            "estado"=>$this->estado->descripcion,
            "descripcion"=>$this->descripcion,
            "aperturaReserva"=>[
                'hora'=>$this->apertura_reserva->hora,
                'minuto'=>$this->apertura_reserva->minuto
            ], 
            "cierreReserva"=> [
                'hora'=>$this->cierre_reserva->hora,
                'minuto'=>$this->cierre_reserva->minuto
            ] ,
            "aperturaAtencion"=> [
                'hora'=>$this->apertura_atencion->hora,
                'minuto'=> $this->apertura_atencion->minuto 
            ], 
            "cierreAtencion"=> [
                'hora'=>$this->cierre_atencion->hora,
                'minuto'=>$this->cierre_atencion->minuto
            ]
        ];
    }
}
