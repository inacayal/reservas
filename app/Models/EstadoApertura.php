<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class EstadoApertura
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $usuario_feriados
 *
 * @package App\Models
 */
class EstadoApertura extends Eloquent
{
	protected $table = 'estado_apertura';
	public $timestamps = false;

	protected $fillable = [
		'descripcion'
	];

	public function usuario_feriados()
	{
		return $this->hasMany(\App\Models\UsuarioFeriado::class, 'id_estado');
	}
}
