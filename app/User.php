<?php

namespace App;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Validation\Rule;

class User extends Eloquent
{
	use DataFormatting,
		ValidationMessages;

	private static $dataKey = "id";

	protected $table = 'usuarios';

	private static $valueKey = "nombre";

	private static $dataResource = "\\App\\Http\\Resources\\UsuarioResource";

	public $timestamps = false;

	protected $casts = [
		"id_franquicia" => "int",
		"id_provincia" => "int",
		"id_rol" => "int",
		"scope" => "int"
	];

	protected $dates = [
		"email_verified_at"
	];

	protected $hidden = [
		"password",
		"remember_token"
	];

	protected $fillable = [
		"nombre",
		"razon_social",
		"email",
		"password",
		"remember_token",
		"id_franquicia",
		"id_provincia",
		"id_rol",
		"email_verified_at",
		"intervalo_reserva",
		"correo_adm",
		"telefono_adm",
		"nombre_adm",
		"caida_reserva",
		"cuit_cuil",
		"direccion",
		"telefono_contacto",
		"scope",
		"username",
		"correo_contacto",
		"antelacion_reserva",
		"disponibilidad_reservas"
	];

	protected $relationNames = [];

	public static function validateReservas($data) {
		return [
			"id" => "required|exists:usuarios,id",
			"id_usuario" => 'required|exists:usuarios,id',
			"intervalo_reserva" => "required|int|max:60|min:1|exists:intervalos,id",
			"antelacion_reserva" => "required|int|min:0|int",
			"disponibilidad_reservas" => "required|min:0|int",
			"caida_reserva" => "min:10|max:60|required|int"
		];
	}

	public static function validateEstablecimiento($data) {
		return [
			"id" => "required|exists:usuarios,id",
			"id_usuario" => 'required|exists:usuarios,id',
			"nombre" => "required|max:100|string",
			"correo_contacto" => "required|email|max:100",
			"telefono_contacto" => "required|max:20",
			"razon_social" => "required|max:100",
			"cuit_cuil" => "required|max:11",
			"nombre_adm" => "required|max:100",
			"telefono_adm" => "required|max:20",
			"correo_adm" => "required|max:100|email",
			"id_provincia" => "required|int|exists:provincias,id",
			"direccion_local" => "required|max:150"
		];
	}

	public static function validateUsuario($data) {
		$user = self::findOrFail($data->id);
 		return [
			"id" => "required|exists:usuarios,id",
			"id_usuario" => 'required|exists:usuarios,id',
			"username"=>[
				"required",
				"max:100",
				Rule::unique('usuarios')->ignore($user->username,'username')
			],
			"email" => [
				"email",
				"required",
				"max:100",
				Rule::unique('usuarios')->ignore($user->email,'email')
			],
			"password" => "required|max:100|string"
		];
	}

	public static function validateEditAdd($data){
		return [
			"nombre" => "required|max:100|string",
			"username"=>"required|max:100|unique:usuarios",
			"email" => "email|required|max:100|unique:usuarios",
			"password" => "required|max:191",
			"correo_contacto" => "required|email|max:100",
			"id_rol" => "required|exists:roles,id|int",
			"razon_social" => "required|max:100",
			"cuit_cuil" => "required|max:11",
			"telefono_contacto" => "required|max:20",
			"scope" => "required|int|exists:scope,id",
			"id_administrador" => [
				"required",
				"int",
				Rule::exists("usuarios","id")->where("id_rol",1),//exists amongst admins
			],
			"id_franquicia" => [
				"required_if:id_rol,3", // si creo un local necesito la franquicia,
				"int",
				Rule::exists("usuarios","id")->where("id_rol",2), //exists amongst admins,
			]
		];
	}

    public function getRelationNames(){
      return $this->relationNames;
    }

	public static function usuariosQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function scopeSearchFranquicias($query,$params){
		return $query->where("id_rol",2);
	}

	public function scopeSearchLocales($query,$params){
		return $query->where("id_rol",3);
	}

	public function scopeSearchId($query,$params){
		return $query->where("id",$params->id);
	}

	public function horarios(){
		return $this->hasMany(\App\Models\Horario::class, "id_usuario");
	}

	public function eventos(){
		return $this->hasMany(\App\Models\Evento::class, "id_usuario");
	}

	public function feriados(){
		return $this->hasMany(\App\Models\Feriado::class, "id_usuario");
	}

	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, "id_usuario");
	}

	public function promociones(){
		return $this->hasMany(\App\Models\Promocion::class, "id_usuario");
	}

	public function ubicaciones(){
		return $this->hasMany(\App\Models\Ubicacion::class, "id_usuario");
	}

	public function intervalo(){
		return $this->belongsTo(\App\Models\Query\Intervalo::class, "intervalo_reserva");
	}

	public function provincia(){
		return $this->belongsTo(\App\Models\Query\Provincia::class, "id_provincia");
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\Scope::class, "scope");
	}

	public function franquicia(){
		return $this->belongsTo(\App\User::class, "id_franquicia","id");
	}

	public function locales(){
		return $this->hasMany(\App\User::class, "id_franquicia","id");
	}

	public function administrador(){
		return $this->belongsTo(\App\User::class, "id_administrador", "id");
	}

	public function usuarios(){
		return $this->hasMany(\App\User::class, "id_administrador", "id");
	}
}
