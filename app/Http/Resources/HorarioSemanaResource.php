<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class HorarioSemanaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id"=>$this->id,
            "diaSemana"=>$this->id_dia_semana,
            "estado"=>$this->estado->descripcion,
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
