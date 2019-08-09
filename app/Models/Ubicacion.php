<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 14:46:06 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;
use Illuminate\Support\Collection;
/**
 * Class Ubicacione
 * 
 * @property int $id
 * @property int $id_usuario
 * @property string $nombre
 * @property string $descripcion
 * @property int $cantidad_maxima
 * @property int $id_estado
 * 
 * @property \App\Models\EstadoSalon $estado_salon
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $reservas
 *
 * @package App\Models
 */
class Ubicacion extends Eloquent
{
	//use CrudMethods;
	
	public $timestamps = false;

	protected $table = 'ubicaciones';

	
	private static $key = 'id';
	
	private static $modelTable = 'ubicaciones';
	

	protected $casts = [
		'id_usuario' => 'int',
		'cantidad_maxima' => 'int',
		'id_estado' => 'int'
	];

	protected $fillable = [
		'id_usuario',
		'nombre',
		'descripcion',
		'cantidad_maxima',
		'id_estado'
	];

	public function estado()
	{
		return $this->belongsTo(\App\Models\Query\EstadoUbicacion::class, 'id_estado');
	}

	public function user()
	{
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}

	public function reservas()
	{
		return $this->hasMany(\App\Models\Reserva::class, 'id_ubicacion');
	}
	/**
	 * db operations
	 */
	public static function dataSeeding(
		$user
	){
		return [
			self::class,
			5,
			false,
			$user->ubicaciones(),
			$user->intervalo_reserva
		];
	}

	/**
	 * traits
	 */
	private static $dataKey = 'id';
	private static $valueKey = 'nombre';
	private static $formatOptions = [
		'keyData'=>'data',
		'listData'=>'list'
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
}
