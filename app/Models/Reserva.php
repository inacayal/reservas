<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;
/**
 * Class Reserva
 * 
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property int $id_usuario
 * @property string $email
 * @property string $nombre
 * @property string $apellido
 * @property string $telefono
 * @property int $id_ubicacion
 * @property int $cantidad_personas
 * @property int $id_evento
 * @property string $descripcion_evento
 * @property \Carbon\Carbon $hora_reserva
 * @property int $id_estado
 * 
 * @property \App\Models\EstadoReserva $estado_reserva
 * @property \App\Models\UsuarioEvento $usuario_evento
 * @property \App\Models\Ubicacione $ubicacione
 * @property \App\Models\User $user
 *
 * @package App\Models
 */
class Reserva extends Eloquent
{
	use DataFormatting;
	/**
	 * hasDataFormatting trait constants
	 */
	private static $dataKey = 'dia_reserva';
	private static $valueKey = '';
	private static $dataResource = '\\App\\Http\\Resources\\ReservaResource';
	/**
	 * Eloquent constants and castings
	 */
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
		'cantidad_personas',
		'id_evento',
		'descripcion_evento',
		'hora_reserva',
		'id_estado'
	];
	/**
	 * Helper methods
	 */
	public static function reservasQueryCallback($params){
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}
	
	/**
	 * Model scopes
	 */
	public function scopeThisMonth($query,$params){
		return $query
			->whereMonth('dia_reserva',$params->operator,$params->month)
			->whereYear('dia_reserva',$params->operator,$params->year);
	}
	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}
	/**
	 * Getter methods
	 */
	public function getHoraReservaAttribute($value){
		$date = date_create($value);
		$date->setTime(
			$date->format("H"),
			$date->format("i"),
			'00'
		);
		$tz = new \DateTimeZone("America/Argentina/Buenos_Aires");
		date_timezone_set($date,$tz);
		$dateStr = date_format($date,'H:i');
		
		return (int) str_replace(':','',$dateStr);
	}
	
	public function getDiaReservaAttribute($value){
		$date = date_create($value);
		return (int) date_format($date,'d');
	}
	/**
	 * Model relationship methods
	 */
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
	/**
	 * Database seeding
	 */
}
