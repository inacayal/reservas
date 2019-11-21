<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 14:46:06 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;

/**
 * Class Ubicacione
 *
 * @property int $id
 * @property int $id_usuario
 * @property string $nombre
 * @property string $descripcion
 * @property int $cantidad_maxima
 * @property int $id_estado
 *
 * @property \App\Models\EstadoSalon $estado_salon
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $reservas
 *
 * @package App\Models
 */
class Ubicacion extends Eloquent
{
	use DataFormatting;
	/**
	 * hasDataFormatting trait constants
	 */
	private static $dataKey = 'id';
	private static $valueKey = 'nombre';
	private static $validation = [
		'nombre'			=> 'required|max:45|alpha_num',
		'descripcion'		=> 'required|max:50|alpha_num',
		'cantidad_maxima'	=> 'required|integer',
		'maximo_personas'	=> 'required|integer'
	];
	private static $dataResource = '\\App\\Http\\Resources\\UbicacionesResource';
	/**
	 * Eloquent constants and castings
	 */
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
	/**
	 * Helper methods
	 */
	public static function ubicacionesQueryCallback ($params) {
		return function ($query) use ($params) {
			return $query->{$params->scope}($params);
		};
	}
	/**
	 * Model Scopes
	 */
	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}
	/**
	 * Getter methods
	 */
	/**
	 * Model relationship methods
	 */
	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoUbicacion::class, 'id_estado');
	}
	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}
	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, 'id_ubicacion');
	}
	/**
	 * Model Scopes
	 */
	public function scopeActive($query){
		return $query->where('id_estado',1);
	}
	/**
	 * Database seeding
	 */
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
