<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;
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
class UsuarioFeriados extends Eloquent
{
	//use CrudMethods;

	public $timestamps = false;

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

	public function estado_apertura()
	{
		return $this->belongsTo(\App\Models\EstadoApertura::class, 'id_estado');
	}

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class, 'id_usuario');
	}

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
