<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 23 Jul 2019 19:04:07 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class EstadoUsuario
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $users
 *
 * @package App\Models
 */
class EstadoUsuario extends Eloquent
{
	protected $table = 'estado_usuario';
	public $timestamps = false;

	protected $fillable = [
		'descripcion'
	];

	public function users()
	{
		return $this->hasMany(\App\Models\User::class, 'id_estado');
	}
}
