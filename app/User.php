<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class User
 * 
 * @property int $id
 * @property string $nombre
 * @property string $razon_social
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property int $id_franquicia
 * @property int $id_provincia
 * @property int $id_rol
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $email_verified_at
 * @property string $intervalo_reserva
 * @property string $correo_adm
 * @property string $telefono_adm
 * @property string $nombre_adm
 * @property string $caida_reserva
 * @property string $cuit_cuil
 * @property string $direccion
 * @property string $telefono_local
 * @property int $id_estado
 * 
 * @property \App\Models\EstadoUsuario $estado_usuario
 * @property \App\Models\User $user
 * @property \App\Models\Provincia $provincia
 * @property \Illuminate\Database\Eloquent\Collection $horarios_semanas
 * @property \Illuminate\Database\Eloquent\Collection $reservas
 * @property \Illuminate\Database\Eloquent\Collection $ubicaciones
 * @property \Illuminate\Database\Eloquent\Collection $users
 * @property \Illuminate\Database\Eloquent\Collection $usuario_eventos
 * @property \Illuminate\Database\Eloquent\Collection $usuario_feriados
 *
 * @package App\Models
 */
class User extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'id_franquicia' => 'int',
		'id_provincia' => 'int',
		'id_rol' => 'int',
		'id_estado' => 'int'
	];

	protected $dates = [
		'email_verified_at'
	];

	protected $hidden = [
		'password',
		'remember_token'
	];

	protected $fillable = [
		'nombre',
		'razon_social',
		'email',
		'password',
		'remember_token',
		'id_franquicia',
		'id_provincia',
		'id_rol',
		'email_verified_at',
		'intervalo_reserva',
		'correo_adm',
		'telefono_adm',
		'nombre_adm',
		'caida_reserva',
		'cuit_cuil',
		'direccion',
		'telefono_local',
		'id_estado'
	];
	/**
	 * list select and option menu when querying desktop panel
	 */
	public function intervaloReserva(){
		return $this->hasOne(\App\Models\Intervalo::class, 'intervalo_reserva');
	}

	public function estado_usuario(){
		return $this->belongsTo(\App\Models\EstadoUsuario::class, 'id_estado');
	}

	public function franquicia(){
		return $this->belongsTo(\App\User::class, 'id_franquicia');
	}

	public function provincia(){
		return $this->belongsTo(\App\Models\Provincia::class, 'id_provincia');
	}

	public function horariosSemana(){
		return $this->hasMany(\App\Models\Horarios::class, 'id_usuario');
	}

	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, 'id_usuario');
	}

	public function ubicaciones(){
		return $this->hasMany(\App\Models\Ubicacion::class, 'id_usuario');
	}

	public function locales(){
		return $this->hasMany(\App\User::class, 'id_franquicia');
	}

	public function eventos(){
		return $this->hasMany(\App\Models\Evento::class, 'id_usuario');
	}

	public function feriados(){
		return $this->hasMany(\App\Models\Feriado::class, 'id_usuario');
	}

	public $options = [
		'id_provincia'=>'\\App\\Models\\Provincia'
	];
	
	public static function formattedOptions(){
		$select = [];
		foreach($options as $field=>$model){
			$select[$field] = $model::getFormattedValues();
		}
		return (object) $select;
	}

}
