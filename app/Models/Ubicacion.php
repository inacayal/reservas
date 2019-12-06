<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;
use Illuminate\Validation\Rule;

class Ubicacion extends Eloquent
{
	use DataFormatting;

    protected $relationNames = [];

	private static $dataKey = 'id';

	private static $valueKey = 'nombre';

	private static $validation = [
		'nombre'			=> 'required|max:45|alpha_num',
		'descripcion'		=> 'required|max:50|alpha_num',
		'cantidad_maxima'	=> 'required|integer',
		'maximo_personas'	=> 'required|integer'
	];

	private static $dataResource = '\\App\\Http\\Resources\\UbicacionesResource';

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
		'id_estado',
		'maximo_personas'
	];

    public static function validateCreacion($request) {
		$user = $request->post()['id_usuario'];
		$method = $request->getMethod();
		return [
			'rules' => [
			  'id_usuario' => 'bail|required|exists:users,id',
			  'id' => [
			      'required_if:requestType,PUT',
			      function ($attribute, $value, $fail) use ($method) {
			          if($method==='POST' && $value)
			              $fail('ID inválido');
			      },
			      'int',
			      Rule::exists('ubicaciones','id')->where('id_usuario',$user)
			  ],
			  'nombre'           => 'required|max:45',
			  'descripcion'      => 'required|max:50',
			  'cantidad_maxima' => 'required|min:1',
			  'maximo_personas'  => 'required|min:1',
			  'requestType' 	 => 'required|in:PUT,POST'
			],
			'messages' => [
			  'id.required_if'   => 'Es necesario el ID de la promoción para modificarla',
			  'id.int'             => 'El ID de la promoción debe ser numérica',
			  'id.exists'         => 'La promoción debe ser creada previamente para modificarla',
			  'eventos.array'     => 'El formato de Eventos es inválido',
			  'eventos.required_if' => 'Es necesario que indiques algún Evento para crear la promoción',
			  'eventos.exists' => 'El Evento debe ser creado previamente para modificarlo',
			  'eventos.*' =>'El Evento debe ser de tipo numérico',
			  'descuento.max'        => 'El descuento no puede exceder el 100%',
			  'descripcion.required' => 'Es necesario una breve descripción de la promoción',
			  'descripcion.max'      => 'La descripción no puede exceder los 50 caracteres',
			  'nombre.max' => 'El nombre de la promoción no puede exceder los 50 caracteres',
			  'nombre.required' => 'Es necesario el nombre de la promocion',
			  'requestType.request'	=> "no se ha indicado el Tipo de operación",
			  'requestType.in'			=> "El Tipo de operación no se encuentra entre los valores permitidos",
			  'id_usuario.required'     => 'No se ha indicado el usuario',
			  'id_usuario.exists'     => 'El usuario debe existir',
			  'id_estado.required'     => 'No se ha indicado el estado',
			  'id_estado.exists'     => 'El estado debe existir',
			  'cantidad_maxima.required' => 'Es necesario que indiques La capacidad máxima de la ubicación',
			  'cantidad_maxima.min' => 'La capacidad máxima debe ser de al menos una persona',
			  'maximo_personas.required'  => 'Es necesario que indiques el máximo de personas por reserva',
			  'maximo_personas.min'  => 'El máximo de personas por reserva debe ser mayor a 1',
			]
		];
    }

	public static function validateDisable($request) {
		return [
			'rules' => [
				'id_usuario' => 'bail|required|exists:users,id',
				'id' => [
					'required',
					'int',
					Rule::exists('ubicaciones','id')->where('id_usuario',$request->post()['id_usuario'])
				],
				'id_estado' => 'required|exists:estado_usuario,id'
			],
			'messages' => [
				'id.required'   => 'Es necesario el ID de la ubicación para modificarla',
				'id.int'             => 'El ID de la promoción debe ser numérica',
				'id.exists'         => 'La ubicación debe ser creada previamente para modificarla',
				'id_usuario.required'     => 'No se ha indicado el usuario',
				'id_usuario.exists'     => 'El usuario debe existir',
				'id_estado.required'     => 'No se ha indicado el estado',
				'id_estado.exists'     => 'El estado debe existir',
			]
		];
	}

	public static function validateData($user,$method) {
		$request = request();
		$data = (object) $request->post();
  		return (isset($data->validationType))
			? call_user_func("self::validate$data->validationType",$request)
			: [
				"rules" => [
					"validationType" => "required|in:Disable,Creacion"
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

	public static function ubicacionesQueryCallback ($params) {
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoUbicacion::class, 'id_estado');
	}

	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}

	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, 'id_ubicacion');
	}

	public function scopeActive($query){
		return $query->where('id_estado',1);
	}

	public static function dataSeeding(
		$user
	){
		return [
			self::class,
			5,
			false,
			$user->ubicaciones(),
			$user->intervalo_reserva
		];
	}
}
