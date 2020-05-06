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

	protected $table = "usuarios";

	private static $valueKey = "nombre";

	private static $dataResource = "\\App\\Http\\Resources\\UsuariosResource";

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
		"email",
		"password",
		"remember_token",
		"id_rol",
		"created_at",
		"email_verified_at",
		"scope",
		"username",
	];

	public static function validateUsuario($data) {
		$user = self::findOrFail($data->id);
 		return [
			"id" => "required|exists:usuarios,id",
			"id_usuario" => 'required|exists:administradores,id',
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
			"password" => "max:100|string"
		];
	}

	public function permisos(){
		return $this->belongsTo(\App\Models\Permiso::class, "id_rol");
	}
}
