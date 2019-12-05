<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;
use Illuminate\Validation\Rule;

class Evento extends Eloquent
{
	use DataFormatting;

	protected $relationNames = [
		'feriados',
		'horarios',
		'promociones'
	];

	private static $dataKey = 'id';

	private static $valueKey = 'nombre';

	private static $dataResource = '\\App\\Http\\Resources\\EventosResource';

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
		'id_estado'
	];

	public static function validateData($user,$method) {
		return $user
			?[
				'rules' => [
				    'id' => [
						'required_if:requestType,PUT',
						function ($attribute, $value, $fail) use ($method) {
							if($method==='POST' && $value)
								$fail('ID inválido');
				        },
						'int',
						Rule::exists('usuario_evento','id')->where('id_usuario',$user)
					],
				    'promociones' => [
						'array',
						'nullable',
						Rule::exists('usuario_promociones','id')->where('id_usuario', $user)
					],
					'horarios' => [
						'array',
						'required_if:requestType,POST',
						Rule::exists('usuario_horario','id')->where('id_usuario', $user)
					],
					'feriados' => [
						'array',
						'nullable',
						Rule::exists('usuario_feriados','id')->where('id_usuario', $user)
					],
					'feriados.*' 	=> 'int',
					'horarios.*' 	=> 'int',
					'promociones.*' => 'int',
				    'descripcion' 	=> 'required|max:100|string',
				    'nombre'		=> 'required|max:45|string',
					'requestType' 	=> 'required|in:POST,PUT',
	                'id_usuario' 	=> 'required|exists:users,id',
					'id_estado' 	=> 'required|exists:estado_evento,id'
				],
				'messages' => [
					'id.required_if' 		=> 'El ID del evento es requerido',
					'id.exists' 			=> 'El Evento no existe',
					'id.int'				=> 'El ID debe ser un entero positivo',
					'promociones.array' 	=> 'El tipo de las promociones es incorrecta',
					'promociones.exists' 	=> 'Las Promociones deben ser creadas previamente',
					'promociones.int'		=> 'Las ID de las promociones deben ser numéricos',
					'feriados.array' 		=> 'El tipo de Feriados es incorrecto',
					'feriados.exists' 		=> 'Los Feriados deben ser creadas previamente',
					'horarios.array' 		=> 'El tipo de Horario es incorrecto',
					'horarios.required_if' 	=> 'Es necesario que el Evento este asociado a al menos un Horario en el momento de la creación',
					'horarios.exists' 		=> 'Los Horarios deben ser creados previamente',
					'horarios.int'			=> 'Las ID de los horarios deben ser numéricos',
					'feriados.array' 		=> 'El tipo de Feriados es incorrecto',
					'feriados.exists' 		=> 'Los Feriados deben ser creados previamente',
					'feriados.int'			=> 'Las ID de los feriados deben ser numéricos',
					'descripcion.max' 		=> 'La Descripción no puede exceder los 100 caracteres',
					'descripcion.required' 	=> 'Es necesario que incluyas una Descripción del evento',
					'descripcion.string' 	=> 'El tipo de Descripción es incorrecto',
					'nombre.required' 		=> 'El nombre del evento es requerido',
					'nombre.max' 			=> 'El Evento debe tener hasta 45 caracteres',
					'nombre.string' 		=> 'El tipo del nombre es incorrecto',
	                'id_usuario.exists' 	=> 'El usuario no existe',
	                'id_usuario.required' 	=> 'No se ha indicado usuario',
					'id_estado.required'	=> 'Debes indicar el estado del Evento (1 activo, visible al momento de reservar. 2 inactivo, invisible al momento de reservar)',
					'id_estado.exists' 		=> 'El estado indicado no es válido',
					'feriados.*' 			=> 'Los ID de los feriados deben ser enteros',
					'horarios.*' 			=> 'Los ID de los horarios deben ser enteros',
					'promociones.*' 		=> 'Los ID de las promociones deben ser enteros',
					'requestType.request'	=> "no se ha indicado el Tipo de operación",
					'requestType.in'			=> "El Tipo de operación no se encuentra entre los valores permitidos",
				]
			]
			: [
                'rules' => [
                    'id_usuario' => 'bail|required|exists:users,id'
                ],
                'messages' => [
                    'id_usuario.required'     => 'No se ha indicado el usuario',
                    'id_usuario.exists'     => 'El usuario debe existir'
                ],
            ];
	}

	public function getRelationNames(){
		return $this->relationNames;
	}

	public static function eventosQueryCallback ($params) {
		return function ($query) use ($params){
			return $query->{$params->scope}($params);
		};
	}

	public function estado(){
		return $this->belongsTo(
			\App\Models\Query\EstadoEvento::class,
			'id_estado'
		);
	}

	public function user(){
		return $this->belongsTo(
			\App\User::class,
			'id_usuario'
		);
	}

	public function horario(){
		return $this->hasMany(
			\App\Models\Query\HorarioEvento::class,
			'id_evento'
		);
	}

	public function promociones(){
		return $this->belongsToMany(
			\App\Models\Promocion::class,
			'eventos_promociones',
			'id_evento',
			'id_promocion'
		)->withPivot(
			'inicio_promocion',
			'fin_promocion'
		);
	}

	public function horarios(){
		return $this->belongsToMany(
			\App\Models\Horario::class,
			'horario_eventos',
			'id_evento',
			'id_horario'
		);
	}

	public function feriados(){
		return $this->belongsToMany(
			\App\Models\Feriado::class,
			'feriado_eventos',
			'id_evento',
			'id_feriado'
		);
	}
	
	public function scopeActive($query){
		return $query->where('id_estado',1);
	}

	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public static function dataSeeding(
		$user
	){
		return [
			self::class,
			8,
			false,
			$user->eventos(),
			$user->intervalo_reserva
		];
	}

}
