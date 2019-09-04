<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;
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
	//use CrudMethods;

	protected $table = 'estado_usuario';
	public $timestamps = false;
	protected static $keyBy = false;
	protected $fillable = [
		'descripcion'
	];

	public function users()
	{
		return $this->hasMany(\App\User::class, 'id_estado');
	}
}
