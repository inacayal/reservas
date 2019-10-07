<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function dataByChunks ($user) {
        $chunks = [
            'r' => [
                'intervalo'=> $user->intervalo->id,
                'caida'=> $user->caida_reserva,
                'antelacionReserva'=> $user->antelacion_reserva
            ],
            'a' => [
                'franquicia' => $user->franquicia->nombre,
                'nombre' => $user->nombre,
                'admEmail'=> $user->correo_adm,
                'admNombre'=> $user->nombre_adm,
                'admTelefono'=> $user->telefono_adm,
                'correoLocal'=> $user->correo_local,
                'telefonoLocal'=> $user->telefono_local,
                'razonSocial'=> $user->razon_social,
                'cuitCuil'=> $user->cuit_cuil,
                'provincia'=> $user->provincia->nombre,
                'direccionLocal'=> $user->direccion,
                'username' => $user->username,
                'email'=> $user->email,
                'intervalo'=> $user->intervalo->description,
                'caida'=> $user->caida_reserva,
                'antelacionReserva'=> $user->antelacion_reserva
            ],
            'u' => [
                'username' => $user->username,
                'email'=> $user->email,
            ],
            'e' => [
                'nombre' => $user->nombre,
                'admEmail'=> $user->correo_adm,
                'admNombre'=> $user->nombre_adm,
                'admTelefono'=> $user->telefono_adm,
                'correoLocal'=> $user->correo_local,
                'telefonoLocal'=> $user->telefono_local,
                'razonSocial'=> $user->razon_social,
                'cuitCuil'=> $user->cuit_cuil,
                'provincia'=> $user->provincia,
                'direccionLocal'=> $user->direccion,
            ]
        ];
        return $chunks[$user->type];   
    }

    public function toArray($request)
    {
        return $this->dataByChunks($this->resource);
    }
}
