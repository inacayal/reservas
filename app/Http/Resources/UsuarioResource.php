<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\hasDependencies;

class UsuarioResource extends JsonResource
{
    use hasDependencies;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dependencies = [
        'usuario.add'=>[],
        'usuario.local'=>[],
        'usuario.locales'=>[],
        'usuario.franquicia'=>[
            'locales' => 'list'
        ],
        'usuario.franquicias'=>[],
    ];
    public $preserveKeys = true;

    public function toArray($request)
    {
        $user = $this->resource;
        $data = [
            'id'=>$user->id,
            'administrador'=>$user->administrador->nombre,
            'franquicia' => $user->franquicia ? $user->franquicia->nombre : "",
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
            'username' => $user->username,
            'email'=> $user->email,
            'intervalo'=> $user->intervalo,
            'caida'=> $user->caida_reserva,
            'antelacionReserva'=> $user->antelacion_reserva
        ]; 
        $dependencies = self::getDependencies($request->route()->action['as']);
        $dependencyData = self::formatResults(
            $this->resource,
            $dependencies
        );
        return array_merge($data,$dependencyData);
    }
}
