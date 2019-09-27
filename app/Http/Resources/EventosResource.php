<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\DataFormatting;
use App\Models\Evento;

class EventosResource extends JsonResource
{
    use DataFormatting;
    private $model = "App\\Models\\Evento";
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $models = [
            'promociones' => 'App\\Models\\Promocion',
            'horarios' => 'App\\Models\\Horario',
            'feriados' => 'App\\Models\\Feriado',
        ];
        $data = collect([
            "id" => $this->id,
            "nombre" => $this->nombre,
            "descripcion" =>$this->descripcion,
            "estado" => $this->estado->descripcion
        ]);
        $dependencyData = $this->formatDependencyData(
            $models,
            $this->resource
        );
        return $data->merge($dependencyData);
    }

    public function formatDependencyData(
        array $dataModels,
        Evento $evento
    ) {
        $res = [];
        foreach($dataModels as $relation=>$model){
            $opt = $this->model===$model ? 'mainFormatOptions' : 'dependencyFormatOptions';
            if ($model && property_exists($model,$opt)){
                $res[$relation] = $model::getFormattedData($evento->{$relation},$opt);
            }
        }
        return collect($res);
    }
}
