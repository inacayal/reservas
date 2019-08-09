<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\hasDataFormatting;
use Illuminate\Support\Collection;
/**
 * Class UsuarioFeriado
 * 
 * @property int $id
 * @property int $id_usuario
 * @property \Carbon\Carbon $fecha_feriado
 * @property int $id_estado
 * @property \Carbon\Carbon $apertura
 * @property \Carbon\Carbon $cierre
 * 
 * @property \App\Models\EstadoApertura $estado_apertura
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Feriado extends Eloquent
{
	use hasDataFormatting;
	/**
	 * HasDataFormatting trait constants
	 */
	private static $dataKey = 'fecha_feriado';
	private static $valueKey = '';
	private static $formatOptions = [
		'groupData'=>'data'
	];
	/**
	 * Eloquent constants and castings
	 */
	public $timestamps = false;
	protected $table = 'usuario_feriados';
	private static $dateParam = 'fecha_feriado';
	protected $casts = [
		'id_usuario' => 'int',
		'id_estado' => 'int'
	];
	protected $dates = [
		'fecha_feriado',
		'apertura',
		'cierre'
	];
	protected $fillable = [
		'id_usuario',
		'fecha_feriado',
		'id_estado',
		'apertura',
		'cierre'
	];
	/**
	 * Helper methods
	 */
	private function splitValue ($hourAttribute){
		$res = explode(':',$hourAttribute);
		return (object) [
			'hora'=>$res[0],
			'minuto'=>$res[1]
		];
	}
	/**
	 * Getter methods
	 */
	public function getFechaFeriadoAttribute ($value){
		return strval(strtotime($value)*1000);
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
	 * Model relationship methods
	 */
	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoApertura::class, 'id_estado');
	}
	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}
	/**
	 * Model Scopes
	 */
	public function scopeThisMonth($query,$month){
		return $query->whereMonth('fecha_feriado',$month);
	}
	/**
	 * Database Seeding
	 */
	public static function dataSeeding($user){
		return [
			self::class,
			5,
			true,
			$user->feriados(),
			$user->intervalo_reserva
		];
	}

}
