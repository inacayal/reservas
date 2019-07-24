<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Reserva
 * 
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property int $id_usuario
 * @property string $email
 * @property string $nombre
 * @property string $apellido
 * @property string $telefono
 * @property int $id_ubicacion
 * @property int $cantidad_personas
 * @property int $id_evento
 * @property string $descripcion_evento
 * @property \Carbon\Carbon $hora_reserva
 * @property int $id_estado
 * 
 * @property \App\Models\EstadoReserva $estado_reserva
 * @property \App\Models\UsuarioEvento $usuario_evento
 * @property \App\Models\Ubicacione $ubicacione
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Reserva extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'id_usuario' => 'int',
		'id_ubicacion' => 'int',
		'cantidad_personas' => 'int',
		'id_evento' => 'int',
		'id_estado' => 'int'
	];

	protected $dates = [
		'hora_reserva'
	];

	protected $fillable = [
		'id_usuario',
		'email',
		'nombre',
		'apellido',
		'telefono',
		'id_ubicacion',
		'cantidad_personas',
		'id_evento',
		'descripcion_evento',
		'hora_reserva',
		'id_estado'
	];

	public function estado_reserva()
	{
		return $this->belongsTo(\App\Models\EstadoReserva::class, 'id_estado');
	}

	public function usuario_evento()
	{
		return $this->belongsTo(\App\Models\UsuarioEvento::class, 'id_evento');
	}

	public function ubicacione()
	{
		return $this->belongsTo(\App\Models\Ubicacione::class, 'id_ubicacion');
	}

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class, 'id_usuario');
	}
}
