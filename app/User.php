<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\hasDataFormatting;
use App\Traits\hasDependencyFormatting;
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
	use hasDataFormatting,
		hasDependencyFormatting;
	/**
	 * hasDataFormatting trait constants
	 */
	private static $dataKey = '';
	private static $valueKey = '';
	private static $formatOptions = [];
	/**
	 * hasDependencyFormatting trait constants
	 */
	private static $dependencies = [
		'query' => [
			'provincia'=>'\\App\\Models\\Query\\Provincia',
			'intervalo'=>'\\App\\Models\\Query\\Intervalo',
			'franquicia'=>'\\App\\User'
		] 
	];
	/**
	 * Eloquent constants and castings
	 */
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
		'id_estado',
		'month',
		''
	];
	/**
	 * Model relationship methods
	 */
	public function horarios(){
		return $this->hasMany(\App\Models\Horario::class, 'id_usuario');
	}
	public function eventos(){
		return $this->hasMany(\App\Models\Evento::class, 'id_usuario');
	}
	public function feriados(){
		return $this->hasMany(\App\Models\Feriado::class, 'id_usuario');
	}
	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, 'id_usuario');
	}
	public function ubicaciones(){
		return $this->hasMany(\App\Models\Ubicacion::class, 'id_usuario');
	}
	public function intervalo(){
		return $this->belongsTo(\App\Models\Query\Intervalo::class, 'intervalo_reserva');
	}
	public function provincia(){
		return $this->belongsTo(\App\Models\Query\Provincia::class, 'id_provincia');
	}
	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoUsuario::class, 'id_estado');
	}
	public function franquicia(){
		return $this->belongsTo(\App\User::class, 'id_franquicia');
	}
	public function locales(){
		return $this->hasMany(\App\User::class, 'id_franquicia');
	}
}
