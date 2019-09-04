<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 02 Sep 2019 18:52:21 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\hasDataFormatting;
use App\Traits\hasDependencyFormatting;

/**
 * Class HorarioEvento
 * 
 * @property int $id_horario
 * @property int $id_evento
 * @property int $id_horario_evento
 * @property string $nombre_evento
 * @property string $descripcion_evento
 * @property string $promocion_evento
 * @property int $descuento_evento
 * @property \Carbon\Carbon $inicio_evento
 * @property \Carbon\Carbon $fin_evento
 * @property int $estado_evento
 * 
 * @property \App\Models\UsuarioEvento $usuario_evento
 * @property \App\Models\HorariosSemana $horarios_semana
 *
 * @package App\Models
 */
class HorarioEvento extends Eloquent
{
	use hasDataFormatting,
		hasDependencyFormatting;

	protected $primaryKey = 'id';
	public $timestamps = false;
	protected $casts = [
		'id_horario' => 'int',
		'id_evento' => 'int',
		'descuento_evento' => 'int',
		'estado_evento' => 'int'
	];

	protected $fillable = [
		'id_horario',
		'id_evento',
		'nombre_evento',
		'descripcion_evento',
		'promocion_evento',
		'descuento_evento',
		'inicio_evento',
		'fin_evento',
		'estado_evento'
	];

	public function getInicioEventoAttribute($value){
		return $this->formatHour(explode(':',$value));
	}

	public function getFinEventoAttribute($value){
		return $this->formatHour(explode(':',$value));
	}

	public function formatHour($hour){
		return (object)[
			"hora"=>(int)$hour[0],
			"minuto"=>(int)$hour[1]
		];
	}

	public function eventos(){
		return $this->belongsTo(\App\Models\Evento::class, 'id_evento');
	}
	public function horario(){
		return $this->belongsTo(\App\Models\Horario::class, 'id_horario');
	}
	public function reserva(){
		return $this->hasMany(\App\Models\Reserva::class, 'id');
	}
}
