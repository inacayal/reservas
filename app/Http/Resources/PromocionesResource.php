<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\DataFormatting;
class PromocionesResource extends JsonResource
{
    use DataFormatting;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dataKey = 'id';
    private static $valueKey = 'nombre';
    private static $dataResource = 'App\\Http\\Resources\\HorarioEventoResource';
    private static $dependencyFormatOptions = [
        'listData'=>'list',
        //'keyData' => 'data'
    ];
    public $preserveKeys = true;
    public function toArray($request)
    {
        $eventos = $this->eventos->where('id_usuario',$this->id_usuario);
        return [
            'id'=>$this->id,
            'nombre'=>$this->nombre,
            'descripcion'=>$this->descripcion,
            'descuento' => $this->descuento,
            'eventos' => self::getFormattedData($eventos,'dependencyFormatOptions')
        ];
    }
}
