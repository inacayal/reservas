<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;
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
	public $timestamps = false;

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

	public static function getOptions(){
		
	}
	
	public static function dataSeeding($user){
		return [
			self::class,
			8,
			false,
			$user->eventos(),
			$user->intervalo_reserva
		];
	}
}
