<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ResumenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public $preserveKeys = true;

    public function generateArray($length){
        $r=[];
        for ( $i=1; $i<= $length; $i++)
            $res[$i] = [$i,0];
        return $res;
    }

    public function formatResults( $request,$data ){
        $coin = [];
        preg_match('/mensual|anual/',$request->path(),$coin);
        return [
            "mensual" => function( $request,$data ) {
                $res = [];
                $monthLength = cal_days_in_month(CAL_GREGORIAN, $request->month, $request->year);
                foreach( $data as $name=>$metr ){
                    $res[$name] = $this->generateArray($monthLength);
                    foreach( $data[$name] as $cont )
                        $res[$name][$cont->dia] = [$cont->dia,$cont->numero_reservas];
                    $res[$name] = array_values($res[$name]);
                }
                return $res;
            },
            "anual" => function () {
                return "";
            }
        ][$coin[0]]( $request,$data );
    }

    public function toArray($request) {
        return $this->formatResults( $request,$this->resource );
    }
}
