<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PromocionesResource extends JsonResource
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
            'id'=>$this->id,
            'nombre'=>$this->nombre,
            'descripcion'=>$this->descripcion,
            'descuento' => $this->descuento,
            'inicio' => $this->pivot->inicio_promocion,
            'fin' => $this->pivot->fin_promocion
        ];
    }
}
