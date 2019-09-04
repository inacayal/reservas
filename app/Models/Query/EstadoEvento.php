<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;
/**
 * Class EstadoEvento
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $usuario_eventos
 *
 * @package App\Models
 */
class EstadoEvento extends Eloquent
{
	//use CrudMethods;

	protected $table = 'estado_evento';
	public $timestamps = false;
	protected static $keyBy = false;
	protected $fillable = [
		'descripcion'
	];

	public function eventos()
	{
		return $this->hasMany(\App\Models\Evento::class, 'id_estado');
	}

}
