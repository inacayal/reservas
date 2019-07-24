<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

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
	protected $table = 'estado_evento';
	public $timestamps = false;

	protected $fillable = [
		'descripcion'
	];

	public function usuario_eventos()
	{
		return $this->hasMany(\App\Models\UsuarioEvento::class, 'id_estado');
	}
}
