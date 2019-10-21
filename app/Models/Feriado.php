<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;
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
	use DataFormatting;
	/**
	 * HasDataFormatting trait constants
	 */
	private static $dataKey = 'fecha_feriado';
	private static $valueKey = 'nombre';
	private static $dataResource = '\\App\\Http\\Resources\\FeriadosResource';

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
			'hora'=>(int)$res[0],
			'minuto'=>(int)$res[1]
		];
	}
	public static function feriadosQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}
	/**
	 * Getter methods
	 */
	public function getFechaFeriadoAttribute ($value){
		$date = date_create($value);
		return (int) date_format($date,'d');
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
	public function eventos(){
		return $this->belongsToMany(\App\Models\Evento::class, 'feriado_eventos','id_feriado','id_evento');
	}
	/**
	 * Model Scopes
	 */
	public function scopeThisMonth($query,$params){
		return $query->whereMonth('fecha_feriado',$params->operator,$params->month)->whereYear('fecha_feriado',$params->operator,$params->year);
	}
	public function scopeThisDate($query,$params){
		return $query->whereDate('fecha_feriado',$params->operator,$params->date);
	}
	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
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