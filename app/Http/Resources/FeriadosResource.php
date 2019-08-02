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
        $first = $this[0];
        return (object) [
            "id"=>$first->id,
            "estado"=>$first->estado->descripcion,
            "descripcion"=>$first->descripcion,
            "aperturaReserva"=>[
                'hora'=>$first->apertura_reserva->hora,
                'minuto'=>$first->apertura_reserva->minuto
            ], 
            "cierreReserva"=> [
                'hora'=>$first->cierre_reserva->hora,
                'minuto'=>$first->cierre_reserva->minuto
            ] ,
            "aperturaAtencion"=> [
                'hora'=>$first->apertura_atencion->hora,
                'minuto'=> $first->apertura_atencion->minuto 
            ], 
            "cierreAtencion"=> [
                'hora'=>$first->cierre_atencion->hora,
                'minuto'=>$first->cierre_atencion->minuto
            ]
        ];
    }
}
