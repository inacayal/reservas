<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HorarioEventoResource extends JsonResource
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
        return [
            'evento'=>$this->id_evento,
            'id'=>$this->id,
            'nombre'=>$this->nombre_evento,
            'descripcion'=>$this->descripcion_evento,
            'promocion'=>$this->promocion_evento,
            'descuento'=>$this->descuento_evento,
            "inicio"=>$this->inicio_evento,
            "fin"=>$this->fin_evento,
        ];
    }
}
