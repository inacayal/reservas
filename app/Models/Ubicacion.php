<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 14:46:06 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;
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

	public function estado_salon()
	{
		return $this->belongsTo(\App\Models\EstadoSalon::class, 'id_estado');
	}

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class, 'id_usuario');
	}

	public function reservas()
	{
		return $this->hasMany(\App\Models\Reserva::class, 'id_ubicacion');
	}
	
	public static function dataSeeding($user){
		return [
			self::class,
			5,
			false,
			$user->ubicaciones(),
			$user->intervalo_reserva
		];
	}
}
