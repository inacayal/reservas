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
class Promociones extends Eloquent
{
  //use CrudMethods;
  protected $table = 'usuario_promociones';
  protected $primaryKey = 'id';
  public $timestamps = false;
  protected $fillable = [
    'id_usuario',
    'nombre',
        'descripcion',
        'descuento',
        'id_estado'
  ];   

  public function eventos(){
    return $this->belongsToMany(\App\Models\Evento::class, 'eventos_promociones','id_promocion','id');
  }
  public function usuario(){
    return $this->belongsTo(\App\User::class, 'id_usuario');
  }
  public function estado(){
    return $this->belongsTo(\App\Models\Query\EstadoEvento::class, 'id_estado');
  }
}
