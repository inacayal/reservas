<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;

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
class Promocion extends Eloquent
{
  use DataFormatting;

  protected $table = 'usuario_promociones';
  private static $dataKey = 'id';
	private static $valueKey = 'nombre';
  private static $dataResource = '\\App\\Http\\Resources\\PromocionesResource';

  protected $primaryKey = 'id';
  public $timestamps = false;
  protected $fillable = [
    'id_usuario',
    'nombre',
    'descripcion',
    'descuento',
    'id_estado'
  ];   
  /**
	 * Helper methods
	 */
	public static function promocionesQueryCallback ($params) {
		return function ($query) use ($params){
			return $query->{$params->scope}($params);
		};
	}
  /**
	 * Model Scopes
	 */
	public function scopeActive($query){
		return $query->where('id_estado',1);
  }
  public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
  }
  /**
   * End Scopes
   */
  public function eventos(){
    return $this->belongsToMany(\App\Models\Evento::class, 'eventos_promociones','id_promocion','id_evento');
  }
  public function usuario(){
    return $this->belongsTo(\App\User::class, 'id_usuario');
  }
  public function reserva(){
		return $this->belongsTo(\App\Models\Reserva::class, 'id_promocion');
	}
  public function estado(){
    return $this->belongsTo(\App\Models\Query\EstadoEvento::class, 'id_estado');
  }
}
