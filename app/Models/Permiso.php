<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 23 Jul 2019 19:04:07 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Permiso
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \App\Models\RolPermiso $rol_permiso
 *
 * @package App\Models
 */
class Permiso extends Eloquent
{
	public $timestamps = false;

	protected $fillable = [
		'descripcion'
	];

	public function rol_permiso()
	{
		return $this->hasOne(\App\Models\RolPermiso::class, 'id_permiso');
	}
}
