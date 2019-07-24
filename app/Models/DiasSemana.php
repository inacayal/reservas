<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class DiasSemana
 * 
 * @property int $id
 * @property string $descripcion
 * 
 * @property \Illuminate\Database\Eloquent\Collection $horarios_semanas
 *
 * @package App\Models
 */
class DiasSemana extends Eloquent
{
	protected $table = 'dias_semana';
	public $timestamps = false;

	protected $fillable = [
		'descripcion'
	];

	public function horarios_semanas()
	{
		return $this->hasMany(\App\Models\HorariosSemana::class, 'id_dia_semana');
	}
}
