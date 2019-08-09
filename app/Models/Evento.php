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
 * Class UsuarioEvento
 * 
 * @property int $id
 * @property int $id_usuario
 * @property string $nombre
 * @property string $descripcion
 * @property string $promocion
 * @property int $descuento
 * @property int $id_estado
 * 
 * @property \App\Models\EstadoEvento $estado_evento
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $reservas
 *
 * @package App\Models
 */
class Evento extends Eloquent
{
	//use CrudMethods;

	protected $table = 'usuario_evento';

	private static $key = 'id';

	public $timestamps = false;

	private static $modelTable = 'usuario_evento';

	

	protected $casts = [
		'id_usuario' => 'int',
		'descuento' => 'int',
		'id_estado' => 'int'
	];

	protected $fillable = [
		'id_usuario',
		'nombre',
		'descripcion',
		'promocion',
		'descuento',
		'id_estado'
	];

	public function estado()
	{
		return $this->belongsTo(\App\Models\Query\EstadoEvento::class, 'id_estado');
	}

	public function user()
	{
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}

	public function reservas()
	{
		return $this->hasMany(\App\Models\Reserva::class, 'id_evento');
	}
	/**
	 * seeding database
	 * @param (User) $user
	 */
	

	public function scopeActivo($query){
		return $query->where('id_estado',1);
	}

	public static function eventosQueryCallback () {
		return function ($query) {
			return $query->activo();
		};
	}

	public static function dataSeeding(
		$user
	){
		return [
			self::class,
			8,
			false,
			$user->eventos(),
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
