<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;
use Illuminate\Validation\Rule;

class Feriado extends Eloquent
{
	use DataFormatting;

	private static $dataKey = 'fecha_feriado';

	private static $valueKey = 'nombre';

	protected $relationNames = ['eventos'];

	private static $dataResource = '\\App\\Http\\Resources\\FeriadosResource';

	public $timestamps = false;

	protected $table = 'usuario_feriados';

	private static $dateParam = 'fecha_feriado';

	protected $casts = [
		'id_usuario' => 'int',
		'id_estado' => 'int'
	];

	protected $dates = [
		'fecha_feriado',
		'apertura',
		'cierre'
	];

	protected $fillable = [
		'id_usuario',
		'fecha_feriado',
		'id_estado',
		'apertura_reserva',
		'cierre_reserva',
		'apertura_atencion',
		'cierre_atencion',
		'id_estado',
		'descripcion',
		'nombre'
	];

	private function splitValue ($hourAttribute){
		$res = explode(':',$hourAttribute);
		return (object) [
			'hora'=>(int)$res[0],
			'minuto'=>(int)$res[1]
		];
	}

	public function getRelationNames(){
      return $this->relationNames;
    }

	public static function setTimezone($date){
		$tz = new \DateTimeZone("America/Argentina/Buenos_Aires");
		date_timezone_set($date,$tz);
		return $date;
	}

	public static function validateData($user,$method) {
		$data = request()->post();
		$date = self::setTimezone(date_create());
	  	$dateString = date_format($date,'Y-m-d H:i:s');
		return [
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
				'eventos' => [
					'required_if:id_estado,1',
					'array',
					Rule::exists('usuario_evento','id')->where('id_usuario',$user)
				],
				'apertura_reserva.minuto' => [
					'required',
					'max:59',
					'min:0',
					'int',
					function ($attribute, $value, $fail) use ($data) {
						if ($value < $data['apertura_atencion']['minuto'] && $data['apertura_reserva']['hora'] === $data['apertura_atencion']['hora'])
						$fail('Las reservas deben abrir después que el horario de atención');
					}
				],
				'cierre_reserva.minuto' => [
					'required',
					'max:59',
					'min:0',
					'int',
					function ($attribute, $value, $fail) use ($data) {
						if ($value > $data['cierre_atencion']['minuto'] && $data['cierre_reserva']['hora'] === $data['cierre_atencion']['hora'])
						$fail('Las reservas deben cerrar antes que el horario de atención');
					}
				],
				'fecha_feriado' => [
					'required',
					'date',
					'after:today',
					'date_format:Y-m-d',
					function ($attribute, $value, $fail) use ($user) {
						if (self::where('id_usuario',$user)->whereDate('fecha_feriado',$value)->first())
							$fail('No puedes crear dos feriados en la misma fecha');
					}
				],
				'nombre' => 'required|max:50',
				'descripcion' => 'required|max:100',
				'apertura_reserva' => 'required',
				'apertura_reserva.hora' => 'required|max:23|min:1|int|gte:apertura_atencion.hora',
				'cierre_reserva' => 'required',
				'cierre_reserva.hora' => 'required|max:23|min:1|int|lte:cierre_atencion.hora',
				'apertura_atencion' => 'required',
				'apertura_atencion.hora' => 'required|max:23|min:1|int',
				'apertura_atencion.minuto' => 'required|max:59|min:0|int',
				'cierre_atencion' => 'required',
				'cierre_atencion.hora' => 'required|max:23|min:1|int',
				'cierre_atencion.minuto' => 'required|max:59|min:0|int',
				'requestType' => 'required|in:POST,PUT',
                'id_usuario' => 'required|exists:users,id',
				'id_estado' => 'required|exists:estado_apertura,id'
			],
			'messages' => [
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
				'fecha_feriado.date'=> "el feriado debe ser una fecha",
				'fecha_feriado.after'=> "el feriado debe ser luego de la fecha actual: $dateString",
				'fecha_feriado.required'=> "Debes especificar una fecha",
				'fecha_feriado.date_format'=> "La fecha debe tener el formato AAAA-mm-dd",
				'nombre.required' => 'Es necesario que ingreses el nombre del feriado',
				'nombre.max' => 'El nombre no puede exceder los 50 caracteres',
				'descripcion.required' => 'Es necesario que ingreses la descripción del feriado',
				'descripcion.max' => 'El feriado no puede exceder los 100 caracteres',
				'eventos.required_if' => 'Tienes que indicar algun evento si el feriado es laboral',
				'eventos.array' => 'Formato de eventos inválido',
				'eventos.exists' => 'El evento no existe'
			]
		];
	}

	public static function feriadosQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}

	public function getFechaFeriadoAttribute ($value){
		$date = date_create($value);
		return (int) date_format($date,'d');
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

	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoApertura::class, 'id_estado');
	}

	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}

	public function eventos(){
		return $this->belongsToMany(\App\Models\Evento::class, 'feriado_eventos','id_feriado','id_evento');
	}

	public function scopeThisMonth($query,$params){
		return $query->whereMonth('fecha_feriado',$params->operator,$params->month)->whereYear('fecha_feriado',$params->operator,$params->year);
	}

	public function scopeThisDate($query,$params){
		return $query->whereDate('fecha_feriado',$params->operator,$params->date);
	}

	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}

	public static function dataSeeding($user){
		return [
			self::class,
			5,
			true,
			$user->feriados(),
			$user->intervalo_reserva
		];
	}
}
