<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\hasDataFormatting;
/**
 * Class UsuarioEvento
 * 
 * @property int $id
 * @property int $id_usuario
 * @property string $nombre
 * @property string $descripcion
 * @property string $promocion
 * @property int $descuento
 * @property int $id_estado
 * 
 * @property \App\Models\EstadoEvento $estado_evento
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $reservas
 *
 * @package App\Models
 */
class Evento extends Eloquent
{
	use hasDataFormatting;
	/**
	 * hasDataFormatting trait constants
	 */
	private static $dataKey = 'id';
	private static $valueKey = 'nombre';
	private static $formatOptions = [
		'keyData'=>'data',
		'listData'=>'list'
	];
	/**
	 * Eloquent constants and castings
	 */
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
		'promocion',
		'descuento',
		'id_estado'
	];
	/**
	 * Helper methods
	 */
	public static function eventosQueryCallback () {
		return function ($query) {
			return $query->active();
		};
	}
	/**
	 * Getter methods
	 */
	/**
	 * Model relationship methods
	 */
	public function estado(){
		return $this->belongsTo(\App\Models\Query\EstadoEvento::class, 'id_estado');
	}
	public function user(){
		return $this->belongsTo(\App\User::class, 'id_usuario');
	}
	public function reservas(){
		return $this->hasMany(\App\Models\Reserva::class, 'id_evento');
	}
	/**
	 * Model Scopes
	 */
	public function scopeActive($query){
		return $query->where('id_estado',1);
	}
	/**
	 * Seeding database
	 * @param (User) $user
	 */
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
