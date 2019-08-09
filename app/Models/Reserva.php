<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;
use Illuminate\Support\Collection;
/**
 * Class Reserva
 * 
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property int $id_usuario
 * @property string $email
 * @property string $nombre
 * @property string $apellido
 * @property string $telefono
 * @property int $id_ubicacion
 * @property int $cantidad_personas
 * @property int $id_evento
 * @property string $descripcion_evento
 * @property \Carbon\Carbon $hora_reserva
 * @property int $id_estado
 * 
 * @property \App\Models\EstadoReserva $estado_reserva
 * @property \App\Models\UsuarioEvento $usuario_evento
 * @property \App\Models\Ubicacione $ubicacione
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Reserva extends Eloquent
{
	//use CrudMethods;

	public $timestamps = false;

	private static $dependencies = [
		'create'=>[
			'eventos'				=>	'\\App\\Models\\Evento',
			'feriados'				=>	'\\App\\Models\\Feriado',
			'horarios'				=>	'\\App\\Models\\Horario',
			'ubicaciones'			=>	'\\App\\Models\\Ubicacion',
			'ubicaciones.estado' 	=>  '\\App\\Models\\Query\\EstadoUbicacion',
			'horarios.estado' 		=>  '\\App\\Models\\Query\\EstadoApertura'
		],
		'query' => [
			'reservas'				=>	'\\App\\Models\\Reserva',
			'reservas.ubicacion' 	=>  '\\App\\Models\\Ubicacion',
			'reservas.evento' 		=>  '\\App\\Models\\Evento',
			'reservas.estado' 		=>  '\\App\\Models\\Query\\EstadoReserva'
		]
	];

	protected $casts = [
		'id_usuario' => 'int',
		'id_ubicacion' => 'int',
		'cantidad_personas' => 'int',
		'id_evento' => 'int',
		'id_estado' => 'int'
	];

	protected $dates = [
		'hora_reserva'
	];

	protected $fillable = [
		'id_usuario',
		'email',
		'nombre',
		'apellido',
		'telefono',
		'id_ubicacion',
		'cantidad_personas',
		'id_evento',
		'descripcion_evento',
		'hora_reserva',
		'id_estado'
	];

	/**
	 * getters
	 */
	public function getHoraReservaAttribute($value)
    {
		$date = date_create($value);
		$date->setTime(
			$date->format("H"),
			$date->format("i"),
			'00'
		);
		$dateStr = date_format($date,'Y-m-d H:i:s');
		return strval(strtotime($dateStr)*1000);
	}
	
	public function getDiaReservaAttribute($value)
    {
        return strval(strtotime($value)*1000);
    }

	public function estado()
	{
		return $this->belongsTo(\App\Models\Query\EstadoReserva::class, 'id_estado');
	}

	public function evento()
	{
		return $this->belongsTo(\App\Models\Evento::class, 'id_evento');
	}

	public function ubicacion()
	{
		return $this->belongsTo(\App\Models\Ubicacion::class, 'id_ubicacion');
	}

	public function user()
	{
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}
	
	public function scopeThisMonth($query,$month){
		return $query->whereMonth('dia_reserva',$month);
	}
	
	private static $dataKey = 'dia_reserva';
	private static $valueKey = '';
	private static $formatOptions = [
		'groupData'=>'data'
	];

	public static function getFormatOptions() {
		return self::$formatOptions;
	}

	public static function getModelKeys(){
		return (object) [
			'key'=>self::$dataKey,
			'value'=>self::$valueKey
		];
	}

	public static function listCallback(
		$modelKeys
	) {
		return function ($item) use ($modelKeys) {
			return array(
				$item[$modelKeys->key] => $item[$modelKeys->value]
			);
		};
	}

    /**
     * gets collection as key value pair
     * @param date must be time from javascript divided by 1000.
     *        timezone considerations must be taken
     */
    public static function listData(
		Collection $data,
		$model,
		$keys
	) {
		return $data->mapWithKeys(
			$model::listCallback($keys)
		);
	}
	
	public static function groupData(
		Collection $data,
		$model,
		$keys
    ) {
		return $data->groupBy($keys->key);
	}

	public static function keyData(
		Collection $data,
		$model,
		$keys
    ) {
		return $data->keyBy($keys->key);
	}

	public static function getFormattedData(
		Collection $data
	){
		$formattedData = collect([]);
		$formatOptions = self::getFormatOptions();
		$modelKeys = self::getModelKeys();
		$class = self::class;
		if (count($formatOptions)>0){
			foreach($formatOptions as $optKey=>$option){
				$formattedData[$option] = call_user_func_array(
					$class.'::'.$optKey,
					[$data,$class,$modelKeys]
				);
			}
			return $formattedData;
		}
		return $data;
	}
	
	/**
	 * configure custom callback for eager loading 
	 * starts with relation name, ends with QueryCallback suffix
	 * @param $month is a month string or month integer
	 */
	public static function reservasQueryCallback($month){
		return function ($query) use ($month) {
			return $query->thisMonth($month);
		};
	}
	/**
	 * get model dependencies when making a custom query
	 */
	public static function getDependencies (
		string $type
	) {
		return self::$dependencies[$type];
	}

	public static function assignDependencyOptions (
		array $parameters,
		string $type
	){
		$dependencies = self::getDependencies($type);
		return (object) [
			'models'=> $dependencies,
			'data'=> self::assignOptions(
				$dependencies,
				$parameters
			)
		];
	}

	private static function assignOptions(
        array $dependencies,
        array $parameters
    ) {
        $res = [];
        foreach ($dependencies as $name=>$model)
        {
            if (method_exists($model,$name.'QueryCallback')){
                if (isset($parameters[$name]))
                    $res[$name] = call_user_func_array(
                        $model.'::'.$name.'QueryCallback',
                        $parameters[$name]
                    );
                else
                    $res[$name] = call_user_func(
                        $model.'::'.$name.'QueryCallback'
                    );
            }    
            else 
                array_push($res,$name);
        }
        return $res;
	}
}
