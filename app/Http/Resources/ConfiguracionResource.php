<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConfiguracionResource extends JsonResource
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
            'franquicia'=>$this->franquicia,
            'provincia'=>$this->provincia,
            'intervalo'=>$this->intervalo,
            'email_local'=>$this->email,
            'adm_email'=> $this->correo_adm,
            'adm_nombre'=> $this->nombre_adm,
            'adm_telefono'=> $this->telefono_adm,
            'correo_local'=> $this->email,
            'telefono_local'=> $this->telefono_local,
            'razon_social'=> $this->razon_social,
            'cuit_cuil'=> $this->cuit_cuil
        ];
    }
}
