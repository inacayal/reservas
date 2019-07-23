<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 23 Jul 2019 19:04:07 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class EstadoReserva
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $reservas
 *
 * @package App\Models
 */
class EstadoReserva extends Eloquent
{
	protected $table = 'estado_reserva';
	public $timestamps = false;

	protected $fillable = [
		'descripcion'
	];

	public function reservas()
	{
		return $this->hasMany(\App\Models\Reserva::class, 'id_estado');
	}
}
