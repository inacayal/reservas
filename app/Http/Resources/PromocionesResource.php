<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\hasDependencies;
class PromocionesResource extends JsonResource
{
    use hasDependencies;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dependencies = [
        'reservas.list' => [],
        'reservas.add' => [
            'eventos' => 'list',
        ],
        'reservas.single'=>[
            'estado'=>false
        ],
        'promociones.list'=>[
            'eventos' => 'list'
        ],
        'promociones.add'=>[],
        'promociones.single'=>[
            'eventos'=>'list'
        ]
    ];
    public $preserveKeys = true;
    public function toArray($request)
    {
        $data = [
            'id'=>$this->id,
            'nombre'=>$this->nombre,
            'descripcion'=>$this->descripcion,
            'descuento' => $this->descuento
        ];
        $dependencies = self::getDependencies($request->route()->action['as']);
        $dependencyData = self::formatResults(
            $this->resource,
            $dependencies
        );
        return array_merge($data,$dependencyData);
    }
}
