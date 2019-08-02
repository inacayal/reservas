<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;
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
	
	public $options = [
		'id_provincia'=>'\\App\\Models\\Query\\Provincia'
	];
	
	public static function formattedOptions(){
		$res = [];
		foreach($options as $k=>$op){
			$res[$k] = $op::getFormattedValues();
		}
		return $res;
	}

	public static function dataSeeding($user){
		return [
			self::class,
			7,
			true,
			$user->horariosSemanas(),
			$user->intervalo_reserva
		];
	}
}
