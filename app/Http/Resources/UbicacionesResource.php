<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UbicacionesResource extends JsonResource
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
            "id" => $this->id,
            "nombre" => $this->nombre,
            "descripcion" =>$this->descripcion,
            "capacidad" => $this->cantidad_maxima,
            "estado" => $this->estado_salon->descripcion
        ];
    }
}
