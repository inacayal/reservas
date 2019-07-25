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
class HorariosSemana extends Eloquent
{
	//use CrudMethods;

	protected $table = 'horarios_semana';
	public $timestamps = false;

	protected $casts = [
		'id_usuario' => 'int',
		'id_dia_semana' => 'int'
	];

	protected $dates = [
		'apertura_reserva',
		'cierre_reserva',
		'apertura_atencion',
		'cierre_atencion'
	];

	protected $fillable = [
		'id_usuario',
		'id_dia_semana',
		'apertura_reserva',
		'cierre_reserva',
		'apertura_atencion',
		'cierre_atencion'
	];

	public function dias_semana()
	{
		return $this->belongsTo(\App\Models\DiasSemana::class, 'id_dia_semana');
	}

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class, 'id_usuario');
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
