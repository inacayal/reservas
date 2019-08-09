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
 * Class HorariosSemana
 * 
 * @property int $id
 * @property int $id_usuario
 * @property int $id_dia_semana
 * @property \Carbon\Carbon $apertura_reserva
 * @property \Carbon\Carbon $cierre_reserva
 * @property \Carbon\Carbon $apertura_atencion
 * @property \Carbon\Carbon $cierre_atencion
 * 
 * @property \App\Models\DiasSemana $dias_semana
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Horario extends Eloquent
{
	//use CrudMethods;

	protected $table = 'horarios_semana';
	
	private static $key = 'id_dia_semana';

	protected static $keyBy = true;

	private static $modelTable = 'horarios_semana';

	public $timestamps = false;

	protected $casts = [
		'id_usuario' => 'int',
		'id_dia_semana' => 'int'
	];

	protected $fillable = [
		'id_usuario',
		'id_dia_semana',
		'apertura_reserva',
		'cierre_reserva',
		'apertura_atencion',
		'cierre_atencion'
	];
	/**
	 * getters start
	 */
	private function splitValue ($hourAttribute){
		$res = explode(':',$hourAttribute);
		return (object) [
			'hora'=>$res[0],
			'minuto'=>$res[1]
		];
	}

	public function getAperturaReservaAttribute ($value){
		return $this->splitValue($value);
	}

	public function getAperturaAtencionAttribute ($value){
		return $this->splitValue($value);
	}

	public function getCierreReservaAttribute ($value){
		return $this->splitValue($value);
	}

	public function getCierreAtencionAttribute ($value){
		return $this->splitValue($value);
	}
	/**
	 * getters end
	 */
	public function dias_semana()
	{
		return $this->belongsTo(\App\Models\Query\Semana::class, 'id_dia_semana');
	}

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class, 'id_usuario');
	}

	public function estado()
	{
		return $this->belongsTo(\App\Models\Query\EstadoApertura::class, 'id_estado');
	}
	/**
	 * eventos del usuario query builder
	 * @param (string) $id
	 */
	
	public static function dataSeeding($user){
		return [
			self::class,
			7,
			true,
			$user->horariosSemanas(),
			$user->intervalo_reserva
		];
	}
	
	/**
	 * trait
	 */
	private static $dataKey = 'id_dia_semana';
	private static $valueKey = '';
	private static $formatOptions = [
		'keyData'=>'data'
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
