<?php

namespace App;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use Illuminate\Validation\Rule;

class User extends Eloquent
{
	use DataFormatting;

	private static $dataKey = "id";

	private static $valueKey = "nombre";

	private static $dataResource = "\\App\\Http\\Resources\\UsuarioResource";

	public $timestamps = false;

	protected $casts = [
		"id_franquicia" => "int",
		"id_provincia" => "int",
		"id_rol" => "int",
		"id_estado" => "int"
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
		"telefono_local",
		"id_estado",
		"username",
		"correo_local",
	];

	protected $relationNames = [];

	public static function validateReservas($data) {
		return [
			"rules" => [
				"intervalo_reserva" => "required|int|max:60|min:1|exists:intervalos,id",
				"antelacion_reserva" => "required|int|min:0",
				"disponibilidad_reservas" => "required|min:0",
				"caida_reserva" => "min:10|max:60|required"
			],
			"messages" => [
				"caida_reserva.min" => "La caída de la reserva no puede ser menor a 10 minutos",
				"caida_reserva.max" => "La caída de la reserva no puede exceder los 60 minutos",
				"caida_reserva.required" => "Es necesario que indiques la Caída de la reserva",
				"disponibilidad_reservas.required" => "Es necesario que indiques el período de disponibilidad de reservas",
				"disponibilidad_reservas.min" => "El período de disponibilidad no puede ser negativo",
				"intervalo_reserva.required" => "Debes seleccionar un intervalo de reserva",
				"intervalo_reserva.int" => "El tipo de intervalo de reserva es inválido",
				"intervalo_reserva.min" => "El intervalo de reserva no puede ser menor a 1",
				"intervalo_reserva.max" => "El intervalo de reserva no puede ser mayor a 60",
				"intervalo_reserva.exists" => "El intervalo de reserva no está entre los valores permitidos",
				"antelacion_reserva.required" => "es necesario que indiques la Antelación de la Reserva",
				"antelacion_reserva.int" => "La antelación de la reserva debe ser numérica y entero",
				"antelacion_reserva.min" => "La antelación de la reserva no puede ser negativa"
			]
		];
	}

	public static function validateEstablecimiento($data) {
		return [
			"rules" => [
				"nombre" => "required|max:100|string",
				"email" => "email|required|max:100",
				"razon_social" => "required|max:100",
				"cuit_cuil" => "required|max:11",
				"telefono_local" => "required|max:20",
				"nombre_adm" => "required|max:100",
				"telefono_adm" => "required|max:20",
				"correo_adm" => "required|max:100|email",
				"id_provincia" => "required|int|exists:provincia:id",
				"direccion_local" => "required|max:150"
			],
			"messages" => [
				"nombre.required" => "El nombre del $data->validationTitle es requerido",
				"nombre.max" => "El $data->validationTitle debe tener hasta 45 caracteres",
				"nombre.string" => "El tipo del nombre es incorrecto",
				"razon_social.required" => "Es necesario que indiques la Razón Social",
				"razon_social.max" => "La Razón Social no puede exceder los 100 caracteres",
				"cuit_cuil.required" => "Es necesario que indiques un CUIT/CUIL del $data->validationTitle",
				"cuit_cuil.max" => " el CUIT/CUIL no puede exceder los 11 caracteres",
				"telefono_local.required" => "Es necesario que indiques el teléfono de contacto del $data->validationTitle",
				"telefono_local.max" => "El teléfono no puede exceder los 20 caracteres",
				"nombre_adm.required" => "Es necesario que indiques el nombre del administrador",
				"nombre_adm.max" => "El nombre del administrador no puede exceder los 100 caracteres",
				"telefono_adm.max" => "El telefono del administrador no puede exceder los 100 caracteres",
				"telefono_adm.required" => "Es necesario que indiques el teléfono del administrador",
				"correo_adm.required" => "Es necesario que indiques el correo del administrador",
				"correo_adm.max" => "Es necesario que el correo del administrador no exceda los 100 caracteres",
				"correo_adm.email" => "El correo del administrador tiene que ser una dirección de correo válida",
				"id_provincia.required" => "Es necesario que indiques una provincia",
				"id_provincia.int" => "tipo de dato inválido",
				"id_provincia.exists" => "La provincia no existe",
				"direccion_local" => "Es necesario que indiques una dirección de local",
				"direccion_local" => "La dirección de local no puede exceder los 150 caracteres"
			]
		];
	}

	public static function validateUsuario($data) {
 		return [
			"rules" => [
				"nombre" => "required|max:100|string",
				"username"=>"required|max:100|unique:users",
				"email" => "email|required|max:100"
			],
			"messages" => [
				"username.required" => "Es necesario que indiques un nombre de usuario para el $data->validationTitle",
				"username.max" => "el nombre de usuario no puede exceder los 100 caracteres",
				"username.unique" => "El username ya existe",
				"email.email" => "El email tiene un formato incorrecto",
				"email.required" => "Es necesario que indiques un correo del $data->validationTitle",
				"email.max" => "El email no puede exceder los 100 caracteres",
				"password" => "Es necesario que indiques una contraseña",
				"password" => "La contraseña no puede exceder los 100 caracteres",
			]
		];
	}

	public static function validateCreacion($data){
		return [
			"rules" => [
				"nombre" => "required|max:100|string",
				"username"=>"required|max:100|unique:users",
				"email" => "email|required|max:100",
				"password" => "required|max:191",
				"correo_local" => "required|email|max:100",
				"id_rol" => "required|exists:roles,id|int",
				"razon_social" => "required|max:100",
				"cuit_cuil" => "required|max:11",
				"telefono_local" => "required|max:20",
				"id_estado" => "required|int|exists:estado_usuario,id",
				"id_administrador" => [
					"required",
					"int",
					Rule::exists("users","id")->where("id_rol",1),//exists amongst admins
				],
				"id_franquicia" => [
					"required_if:id_rol,3", // si creo un local necesito la franquicia,
					"int",
					Rule::exists("users","id")->where("id_rol",2), //exists amongst admins,
				]
			],
			"messages" => [
				"nombre.required" => "El nombre del $data->validationTitle es requerido",
				"nombre.max" => "El $data->validationTitle debe tener hasta 45 caracteres",
				"nombre.string" => "El tipo del nombre es incorrecto",
				"username.required" => "Es necesario que indiques un nombre de usuario para el $data->validationTitle",
				"username.max" => "el nombre de usuario no puede exceder los 100 caracteres",
				"username.unique" => "El username ya existe",
				"email.email" => "El email tiene un formato incorrecto",
				"email.required" => "Es necesario que indiques un correo del $data->validationTitle",
				"email.max" => "El email no puede exceder los 100 caracteres",
				"password" => "Es necesario que indiques una contraseña",
				"password" => "La contraseña no puede exceder los 100 caracteres",
				"id_rol.required" => "Es necesario que indiques el rol del $data->validationTitle",
				"id_rol.exists" => "El rol no existe",
				"id_rol.int" => "El rol tiene un tipo de dato inválido",
				"razon_social.required" => "Es necesario que indiques la Razón Social",
				"razon_social.max" => "La Razón Social no puede exceder los 100 caracteres",
				"cuit_cuil.required" => "Es necesario que indiques un CUIT/CUIL del $data->validationTitle",
				"cuit_cuil.max" => " el CUIT/CUIL no puede exceder los 11 caracteres",
				"telefono_local.required" => "Es necesario que indiques el teléfono de contacto del $data->validationTitle",
				"telefono_local.max" => "El teléfono no puede exceder los 20 caracteres",
				"id_estado.required" => "Es necesario que indiques el estado del usuario",
				"id_estado.int" => "tipo de estado inválido",
				"id_estado.exists " => "El estado no existe",
				"id_administrador.required" => "debes indicar un administrador",
				"id_administrador.int" => "El tipo de dato del administrador es inválido",
				"id_administrador.exists" => "No se ha encontrado el administrador",
				"id_franquicia.required_if"=> "debes indicar una franquicia", // si creo un local necesito la franquicia,
				"id_franquicia.int" => "el tipo de dato de la franquicia es inválido",
				"id_franquicia.exists" => "la franquicia no existe",
				"correo_local.required" => "Es necesario que indiques el correo del local",
				"correo_local.email" => "El correo del local no es una dirección válida",
				"correo_local.max" => "El correo del local no puede exceder los 100 caracteres"
			]
		];
	}

	public static function validateData($user,$method) {
		$createdBy = self::find($user);
		$data = (object) request()->post();
  		return (isset($data->validationType))
			? call_user_func("self::validate$data->validationType",$data)
			: [
				"rules" => [
					"validationType" => "required|in:Reservas,Usuario,Establecimiento,Creacion"
				],
				"messages" => [
					"validationType.required" => "Debes indicar un tipo de validacion",
					"validationType.in" => "El tipo de validacion debe estar entre los valores permitidos"
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
		return $this->belongsTo(\App\Models\Query\EstadoUsuario::class, "id_estado");
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
