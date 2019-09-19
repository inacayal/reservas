<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\DataFormatting;
use Illuminate\Support\Collection;
/**
 * Class Horario
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
	use DataFormatting;
	/**
	 * DataFormatting trait constants
	 */
	private static $dataKey = 'id_dia_semana';
	private static $valueKey = '';
	private static $dataResource = '\\App\\Http\\Resources\\HorarioResource';
	/**
	 * when called as main query
	 */
	private static $mainFormatOptions = [
		'keyData'=>'data'
	];
	/**
	 * when called as a dependency
	 */
	private static $dependencyFormatOptions = [
		'keyData'=>'data'
	];
	/**
	 * hasDependencyFormatting trait constants
	 */
	private static $dependencies = [
		'query' => [
			'eventos'=>'\\App\\Models\\Evento',
			'eventos.estado'=>'\\App\\Models\\Query\\EstadoEvento'
		]
	];
	/**
	 * Eloquent constants and castings
	 */
	protected $table = 'usuario_horario';
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
	 * Helper methods
	 */
	private function splitValue ($hourAttribute){
		$res = explode(':',$hourAttribute);
		return (object) [
			'hora'=>(int)$res[0],
			'minuto'=>(int)$res[1]
		];
	}
	/**
	 * Getter methods
	 */
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
	public function dias_semana(){
		return $this->belongsTo(\App\Models\Query\Semana::class, 'id_dia_semana');
	}
	public function user(){
		return $this->belongsTo(\App\Models\User::class, 'id_usuario');
	}
	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoApertura::class, 'id_estado');
	}
	public function eventos(){
		return $this->belongsToMany(\App\Models\Evento::class, 'horario_eventos','id_horario','id_evento');
	}
	/**
	 * Database seeding
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
	
}
