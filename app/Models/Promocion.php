<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;
use Illuminate\Validation\Rule;

class Promocion extends Eloquent
{
    use DataFormatting;

    protected $relationNames = ['eventos'];

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

    public static function validateData($user,$method) {
      return $user
          ? [
              'rules' => [
                  'id_usuario' => 'bail|required|exists:users,id',
                  'id' => [
                      'required_if:requestType,PUT',
                      function ($attribute, $value, $fail) use ($method) {
                          if($method==='POST' && $value)
                              $fail('ID inválido');
                      },
                      'int',
                      Rule::exists('usuario_promociones','id')->where('id_usuario',$user)
                  ],
                  'eventos' => [
                      'array',
                      'required_if:requestType,POST',
                      Rule::exists('usuario_evento','id')->where('id_usuario',$user)
                  ],
                  'eventos.*'        => 'int',
                  'descuento'        => 'nullable|min:0|max:100',
                  'descripcion'      => 'required|max:50',
                  'nombre'           => 'required|max:50',
                  'requestType' 	 => 'required|in:PUT,POST',
                  'id_estado' 	     => 'required|exists:estado_evento,id'
              ],
              'messages' => [
                  'id.required_if'   => 'Es necesario el ID de la promoción para modificarla',
                  'id.int'             => 'El ID de la promoción debe ser numérica',
                  'id.exists'         => 'La promoción debe ser creada previamente para modificarla',
                  'eventos.array'     => 'El formato de Eventos es inválido',
                  'eventos.required_if' => 'Es necesario que indiques algún Evento para crear la promoción',
                  'eventos.exists' => 'El Evento debe ser creado previamente para modificarlo',
                  'eventos.*' =>'El Evento debe ser de tipo numérico',
                  'descuento.min'        => 'El descuento no puede ser menor al 0%',
                  'descuento.max'        => 'El descuento no puede exceder el 100%',
                  'descripcion.required' => 'Es necesario una breve descripción de la promoción',
                  'descripcion.max'      => 'La descripción no puede exceder los 50 caracteres',
                  'nombre.max' => 'El nombre de la promoción no puede exceder los 50 caracteres',
                  'nombre.required' => 'Es necesario el nombre de la promocion',
                  'requestType.request'	=> "no se ha indicado el Tipo de operación",
                  'requestType.in'			=> "El Tipo de operación no se encuentra entre los valores permitidos",
                  'id_usuario.required'     => 'No se ha indicado el usuario',
                  'id_usuario.exists'     => 'El usuario debe existir',
                  'id_estado.required'     => 'No se ha indicado el estado',
                  'id_estado.exists'     => 'El estado debe existir'
              ]
          ]
          : [
              'rules' => [
                  'id_usuario' => 'bail|required|exists:users,id'
              ],
              'messages' => [
                  'id_usuario.required'     => 'No se ha indicado el usuario',
                  'id_usuario.exists'     => 'El usuario debe existir'
              ],
          ];
    }

    public function getRelationNames(){
      return $this->relationNames;
    }

    public static function promocionesQueryCallback ($params) {
    	return function ($query) use ($params){
    		return $query->{$params->scope}($params);
    	};
    }

    public function scopeActive($query){
    	return $query->where('id_estado',1);
    }

    public function scopeSearchId($query,$params){
    	return $query->where('id',$params->id);
    }

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
