<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;

class HorarioEventoResource extends JsonResource
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
	private static $dataResource = 'App\\Http\\Resources\\PromocionesResource';
	private static $formatOptions = [
        'keyData'=>'data',
        'listData'=>'list'
	];
    public $preserveKeys = true;
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'nombre'=>$this->nombre,
            'descripcion'=>$this->descripcion,
            'promociones' => self::getFormattedData($this->promociones->where('id_estado',1))
        ];
    }
}
