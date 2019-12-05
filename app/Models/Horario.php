<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;

class Horario extends Eloquent
{
	use DataFormatting;

	private static $dataKey = 'id_dia_semana';

	private static $valueKey = 'id';

	private static $dataResource = '\\App\\Http\\Resources\\HorarioResource';

	protected $relationNames = ['eventos'];

	protected $table = 'usuario_horario';

	public $timestamps = false;

	protected $casts = [
		'id_usuario' => 'int',
		'id_dia_semana' => 'int'
	];

	protected $fillable = [
		'id_usuario',
		'id_dia_semana',
		'apertura_reserva',
		'cierre_reserva',
		'apertura_atencion',
		'cierre_atencion',
		'id_estado'
	];

	public function getRelationNames(){
      return $this->relationNames;
    }

	public static function validateData($user,$method) {
		$data = request()->post();
		return $user
			? [
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
					'id_dia_semana' => [
						'required',
						'int',
						'exists:dias_semana,id',
						Rule::notIn(self::where('id_usuario',$user)->pluck('id_dia_semana'))
					],
					'eventos' => [
						'required_if:id_estado,1',
						'array',
						Rule::exists('usuario_evento','id')->where('id_usuario',$user)
					],
					'apertura_reserva.minuto' => [
						'required_if:id_estado,1',
						'max:59',
						'min:0',
						'int',
						function ($attribute, $value, $fail) use ($data) {
							if ($value < $data['apertura_atencion']['minuto'] && $data['apertura_reserva']['hora'] === $data['apertura_atencion']['hora'])
							$fail('Las reservas deben abrir después que el horario de atención');
						}
					],
					'cierre_reserva.minuto' => [
						'required_if:id_estado,1',
						'max:59',
						'min:0',
						'int',
						function ($attribute, $value, $fail) use ($data) {
							if ($value > $data['cierre_atencion']['minuto'] && $data['cierre_reserva']['hora'] === $data['cierre_atencion']['hora'])
							$fail('Las reservas deben cerrar antes que el horario de atención');
						}
					],
					'apertura_reserva' => 'required_if:id_estado,1',
					'apertura_reserva.hora' => 'required_if:id_estado,1|max:23|min:1|int|gte:apertura_atencion.hora',
					'cierre_reserva' => 'required_if:id_estado,1',
					'cierre_reserva.hora' => 'required_if:id_estado,1|max:23|min:1|int|lte:cierre_atencion.hora',
					'apertura_atencion' => 'required_if:id_estado,1',
					'apertura_atencion.hora' => 'required_if:id_estado,1|max:23|min:1|int',
					'apertura_atencion.minuto' => 'required_if:id_estado,1|max:59|min:0|int',
					'cierre_atencion.hora' => 'required_if:id_estado,1|max:23|min:1|int',
					'cierre_atencion.minuto' => 'required_if:id_estado,1|max:59|min:0|int',
					'cierre_atencion' => 'required_if:id_estado,1',
					'requestType' => 'required|in:POST,PUT',
	                'id_usuario' => 'required|exists:users,id',
					'id_estado' => 'required|exists:estado_apertura,id'
				],
				'messages' => [
					'id_dia_semana.required' => 'debes especificar a qué día de la semana pertenece el horario',
					'id_dia_semana.exists' => 'El día de la semana debe estar entre lunes y domingo (1-7)',
					'id_dia_semana.int' => 'Tipo de dato inválido',
					'id_dia_semana.not_in' => 'Ya agregaste un horario a este día de la semana',
					'id.required_if' => 'El ID del evento es requerido',
					'id.exists' => 'El Evento no existe',
					'id.int' => 'El ID debe ser un entero positivo',
					'apertura_reserva.required'=> "Debes especificar una hora de apertura de reservas",
					'apertura_reserva.hora.required'=> "Debes especificar una hora de apertura de reservas",
					'apertura_reserva.hora.max'=> "La hora de apertura de reserva no puede exceder las 23 horas",
					'apertura_reserva.hora.min'=> "la hora de apertura de reserva no puede ser menor a 1",
					'apertura_reserva.hora.gte' => 'Las reservas deben abrir después que el horario de atención',
					'apertura_reserva.minuto.required'=> "Debes especificar el minuto de apertura de reserva",
					'apertura_reserva.minuto.max'=> "Los minutos de apertura de reserva deben ser menores a 59",
					'apertura_reserva.minuto.min'=> "Los minutos de apertura de reserva no pueden ser menores a 0",
					'cierre_reserva.required'=> "Debes especificar una hora de cierre de reserva",
					'cierre_reserva.hora.required'=> "Debes especificar una hora de cierre de reserva",
					'cierre_reserva.hora.lte' => 'Las reservas deben cerrar antes que el horario de atención',
					'cierre_reserva.hora.max'=> "La hora de cierre de reserva no puede exceder las 23 horas",
					'cierre_reserva.hora.min'=> "la hora de cierre de reserva no puede ser menor a 1",
					'cierre_reserva.minuto.required'=> "Debes especificar el minuto de cierre de reserva",
					'cierre_reserva.minuto.max'=> "Los minutos de cierre de reserva deben ser menores a 59",
					'cierre_reserva.minuto.min'=> "Los minutos de cierre de reserva no pueden ser menores a 0",
					'apertura_atencion.required'=> "Debes especificar una hora de apertura de atención",
					'apertura_atencion.hora.required'=> "Debes especificar una hora de apertura de atención",
					'apertura_atencion.hora.max'=> "La hora de apertura de atención no puede exceder las 23 horas",
					'apertura_atencion.hora.min'=> "la hora de apertura de atención no puede ser menor a 1",
					'apertura_atencion.minuto.required'=> "Debes especificar el minuto de apertura de atención",
					'apertura_atencion.minuto.max'=> "Los minutos de apertura de atención deben ser menos que 59",
					'apertura_atencion.minuto.min'=> "Los minutos de apertura de atención no pueden ser menores a 0",
					'cierre_atencion.required'=> "Debes especificar una hora de cierre de atención",
					'cierre_atencion.hora.required'=> "Debes especificar la hora de cierre de atención",
					'cierre_atencion.hora.max'=> "La hora de cierre de atención no puede exceder las 23 horas",
					'cierre_atencion.hora.min'=> "la hora de cierre de atención no puede ser menor a 1",
					'cierre_atencion.minuto.required'=> "Debes especificar el minuto de cierre de atención",
					'cierre_atencion.minuto.max'=> "Los minutos de cierre de atención deben ser menos que 59",
					'cierre_atencion.minuto.min'=> "Los minutos de cierre de atención no pueden ser menores a 0",
					'requestType.request' => "no se ha indicado el Tipo de operación",
					'requestType.in' => "El Tipo de operación no se encuentra entre los valores permitidos",
					'eventos.required_if' => 'Tienes que indicar algun evento si el horario es laboral',
					'eventos.array' => 'Formato de eventos inválido',
					'eventos.exists' => 'El evento no existe'
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

	private function splitValue ($hourAttribute){
		$res = explode(':',$hourAttribute);
		return (object) [
			'hora'=>(int)$res[0],
			'minuto'=>(int)$res[1]
		];
	}

	public function getAperturaReservaAttribute ($value){
		return $this->splitValue($value);
	}

	public function getAperturaAtencionAttribute ($value){
		return $this->splitValue($value);
	}

	public function getCierreReservaAttribute ($value){
		return $this->splitValue($value);
	}

	public function getCierreAtencionAttribute ($value){
		return $this->splitValue($value);
	}

	public function setAperturaReservaAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['apertura_reserva'] = "$hora->hora:$hora->minuto:00";
	}

	public function setAperturaAtencionAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['apertura_atencion'] = "$hora->hora:$hora->minuto:00";
	}

	public function setCierreReservaAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['cierre_reserva'] = "$hora->hora:$hora->minuto:00";
	}

	public function setCierreAtencionAttribute ($value) {
		$hora = (object) $value;
		$this->attributes['cierre_atencion'] = "$hora->hora:$hora->minuto:00";
	}

	public static function horariosQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public function dias_semana(){
		return $this->belongsTo(\App\Models\Query\Semana::class, 'id_dia_semana');
	}

	public function user(){
		return $this->belongsTo(\App\Models\User::class, 'id_usuario');
	}

	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoApertura::class, 'id_estado');
	}

	public function eventos(){
		return $this->belongsToMany(\App\Models\Evento::class, 'horario_eventos','id_horario','id_evento');
	}

	public static function dataSeeding($user){
		return [
			self::class,
			7,
			true,
			$user->horariosSemanas(),
			$user->intervalo_reserva
		];
	}

}
