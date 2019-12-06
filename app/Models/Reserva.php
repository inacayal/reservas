<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;
use Illuminate\Validation\Rule;

class Reserva extends Eloquent
{
	use DataFormatting;

	protected $relationNames = [];

	private static $dataKey = 'dia_reserva';

	private static $valueKey = '';

	private static $dataResource = '\\App\\Http\\Resources\\ReservaResource';

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
		'id_promocion',
		'dia_reserva',
		'cantidad_personas',
		'id_evento',
		'descripcion_evento',
		'hora_reserva',
		'id_estado'
	];

	public static function setTimezone($date){
		$tz = new \DateTimeZone("America/Argentina/Buenos_Aires");
		date_timezone_set($date,$tz);
		return $date;
	}

	public static function validateCreacion($request) {
	  $date = self::setTimezone(date_create());
	  $dateString = date_format($date,'Y-m-d H:i:s');
	  $user = $request->post()['id_usuario'];
	  $method = $request->getMethod();
      return [
          'rules' => [
              'id_usuario' => 'bail|required|exists:users,id',
			  'email' => 'email|required|max:100',
              'nombre' => 'required|max:100',
			  'apellido' => 'required|max:100',
			  'dia_reserva' => 'required|date|after_or_equal:today',
			  'telefono' => 'required|max:20',
			  'hora_reserva' => 'required',
			  'hora_reserva.hora' => 'required|max:23|min:1|int',
			  'hora_reserva.minuto' => 'required|max:59|min:0|int',
			  'descripcion_evento' => 'required',
			  'cantidad_personas' => 'required|min:1',
			  'id_promocion' => [
                  'nullable',
                  'int',
                  Rule::exists('usuario_promociones','id')->where('id_usuario',$user)
              ],
			  'id_evento' => [
                  'required',
                  'int',
                  Rule::exists('usuario_evento','id')->where('id_usuario',$user)
              ],
			  'id_ubicacion' => [
                  'required',
                  'int',
                  Rule::exists('ubicaciones','id')->where('id_usuario',$user)
              ],
			  'id_estado' => 'required|int|exists:estado_reserva,id',
              'requestType' => 'required|in:PUT,POST'
          ],
          'messages' => [
			  'id_estado.required' => 'No se ha indicado el estado',
			  'id_estado.exists' => 'El estado debe existir',
			  'email.email' => 'El email tiene un formato incorrecto',
			  'email.required' => 'Es necesario que indiques una dirección de correo',
			  'email.max' => 'El correo no puede tener más de 100 caracteres',
              'id_evento.int' => 'El Evento debe ser un número entero',
              'id_evento.exists' => 'El evento no ha sido creado previamente',
			  'id_evento.required' => 'Tienes que indicar el evento de la reserva',
		      'id_promocion.exists' => 'La promoción no ha sido creado previamente',
			  'id_promocion.int' => 'la promoción debe ser numérica',
			  'id_ubicacion.exists' => 'La ubicación no ha sido creado previamente',
			  'id_ubicacion.int' => 'la ubicación debe ser numérica',
			  'id_estado.required' =>'Debes indicar el estado de la reserva',
			  'id_estado.int' => 'el estado debe ser de tipo entero',
			  'id_estado.exists' => 'El estado no ha sido creado previamente ',
			  'descripcion.required' => 'Es necesario una breve descripción de la promoción',
			  'descripcion.max' => 'La descripción no puede exceder los 50 caracteres',
			  'nombre.max' => 'El nombre de la promoción no puede exceder los 50 caracteres',
			  'nombre.required' => 'Es necesario el nombre de la promocion',
			  'requestType.required'	=> "no se ha indicado el Tipo de operación",
			  'requestType.in' => "El Tipo de operación no se encuentra entre los valores permitidos",
			  'hora_reserva.required'=> "Debes especificar una hora de reserva",
			  'hora_reserva.hora.required'=> "Debes especificar una hora de reserva",
			  'hora_reserva.hora.max'=> "La hora de reserva no puede exceder las 23 horas",
			  'hora_reserva.hora.min'=> "la hora de reserva no puede ser menor a 1",
			  'hora_reserva.minuto.required'=> "Debes especificar un minuto de reserva",
			  'hora_reserva.minuto.max'=> "Los minutos de la reserva deben ser menores a 59",
			  'hora_reserva.minuto.min'=> "Los minutos de la reserva no pueden ser menores a 0",
			  'dia_reserva.date'=> "el dia de reserva debe ser una fecha",
			  'dia_reserva.after'=> "el dia de reserva debe ser luego de la fecha actual: $dateString",
			  'dia_reserva.required'=> "Debes especificar un día de reserva",
			  'cantidad_personas.required' => "Debes indicar la cantidad de personas de la reserva",
			  'cantidad_personas.min' => "La reserva debete tener más de un participante"
          ]
      ];
    }

	public static function validateUpdate($request) {
		return [
			'rules' => [
				'id_usuario' => 'bail|required|exists:users,id',
				'id' => [
					'required',
					'int',
					Rule::exists('reservas','id')->where('id_usuario',$request->post()['id_usuario'])
				],
				'id_estado' => 'required|exists:estado_usuario,id'
			],
			'messages' => [
				'id.required'   => 'Es necesario el ID de la Reserva para modificarla',
				'id.int'             => 'El ID de la Reserva debe ser numérica',
				'id.exists'         => 'La Reserva debe ser creada previamente para modificarla',
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
                    "validationType" => "required|in:Update,Creacion"
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

	public static function reservasQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function scopeThisMonth($query,$params){
		return $query
			->whereMonth('dia_reserva',$params->operator,$params->month)
			->whereYear('dia_reserva',$params->operator,$params->year);
	}
	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public function getHoraReservaAttribute($value){
		$date = date_create($value);
		$date->setTime(
			$date->format("H"),
			$date->format("i"),
			'00'
		);
		$dateStr = date_format($date,'H:i');
		return (int) str_replace(':','',$dateStr);
	}

	public function getDiaReservaAttribute($value){
		$date = date_create($value);
		return (int) date_format($date,'d');
	}

	public function setHoraReservaAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['hora_reserva'] = "$hora->hora:$hora->minuto:00";
	}

	public function setDiaReservaAttribute ($value) {
		$date = date_create($value);
		$this->attributes['dia_reserva'] = date_format($date,'Y-m-d');
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoReserva::class, 'id_estado');
	}

	public function evento(){
		return $this->belongsTo(\App\Models\Evento::class, 'id_evento');
	}

	public function ubicacion(){
		return $this->belongsTo(\App\Models\Ubicacion::class, 'id_ubicacion');
	}

	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}

	public function promocion(){
		return $this->hasOne(\App\Models\Promocion::class, 'id','id_promocion');
	}
}
