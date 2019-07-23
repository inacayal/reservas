<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 23 Jul 2019 19:04:07 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class EstadoSalon
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $ubicaciones
 *
 * @package App\Models
 */
class EstadoSalon extends Eloquent
{
	protected $table = 'estado_salon';
	public $timestamps = false;

	protected $fillable = [
		'descripcion'
	];

	public function ubicaciones()
	{
		return $this->hasMany(\App\Models\Ubicacione::class, 'id_estado');
	}
}
