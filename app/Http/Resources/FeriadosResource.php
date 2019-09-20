<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;

class FeriadosResource extends JsonResource
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
        'keyData'=>'data',
        'listData'=>'list'
    ];
    public $preserveKeys = true;

    public function toArray($request)
    {
        $d = $this->resource->getAttributes()['fecha_feriado'];
        $dI = strtotime($d);
        return (object) [
            "id"=>$this->id,
            "nombre"=>$this->nombre,
            "estado"=>$this->estado->descripcion,
            "descripcion"=>$this->descripcion,
            "fecha" => date('Y-m-d H:i:s',$dI),
            "apertura" => [
                "reserva" => [
                    "hora" => $this->apertura_reserva->hora,
                    "minuto" => $this->apertura_reserva->minuto
                ],
                "atencion"=> [
                    "hora"=>$this->apertura_atencion->hora,
                    "minuto"=> $this->apertura_atencion->minuto 
                ]
            ],
            "cierre" => [
                "reserva" => [
                    "hora" => $this->cierre_reserva->hora,
                    "minuto" => $this->cierre_reserva->minuto
                ],
                "atencion"=> [
                    "hora"=>$this->cierre_atencion->hora,
                    "minuto"=>$this->cierre_atencion->minuto
                ]
            ],
            "eventos" => self::getFormattedData($this->eventos->where('id_estado',1),'dependencyFormatOptions')
        ];
    }
}
