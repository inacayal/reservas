<?php

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\DataFormatting;
use App\Traits\ValidationMessages;
use Illuminate\Validation\Rule;

class Promocion extends Eloquent {

    use DataFormatting, ValidationMessages;

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
        'scope'
    ];

    public static function validateEditAdd($request) {
        $user = $request->post()['id_usuario'];
        $method = $request->getMethod();
        return [
            'id_usuario' => 'bail|required|exists:usuarios,id',
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
              Rule::exists('usuario_promociones','id')->where('id_usuario',$user)
            ],
            'eventos.*'        => 'int',
            'descuento'        => 'nullable|min:0|max:100',
            'descripcion'      => 'required|max:50',
            'nombre'           => 'required|max:50',
            'requestType' 	 => 'required|in:PUT,POST',
        ];
    }

    public static function validateScopeUpdate($request) {
        return [
            'id_usuario' => 'bail|required|exists:usuarios,id',
            'id' => [
                'required',
                'int',
                Rule::exists('usuario_promociones','id')->where('id_usuario',$request->post()['id_usuario'])
            ],
            'scope' => [
                'required',
                'exists:scope,id',
                function ($attribute, $value, $fail) use ($request) {
                    if (count($request->post())>5)
                        $fail('Solo esta permitido cambiar el estado de la promoción.');
                }
            ]
        ];
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
        return $this->belongsToMany(\App\Models\Evento::class, 'eventos_promociones','id_promocion','id_promocion');
    }

    public function usuario(){
        return $this->belongsTo(\App\User::class, 'id_usuario');
    }

    public function reserva(){
    	return $this->belongsTo(\App\Models\Reserva::class, 'id_promocion');
    }

    public function estado(){
        return $this->belongsTo(\App\Models\Query\Scope::class, 'scope');
    }


	public static function getMonthQuery( $user,$utype,$uid,$month,$year ){
		return (object) [
            "query" => "select a1.*, nombre,count(*) as numero_reservas
	            from (
	                select $utype,DAY(dia_reserva) as dia,id_promocion
	                from usuario_reservas
	                where $utype = $uid
	                and MONTH(dia_reserva)=$month
	                and YEAR(dia_reserva)=$year
	            ) a1 join usuario_promociones a2
	            on a1.id_promocion = a2.id
                group by nombre",
            "group" => "nombre"
		];
	}

	public static function getYearQuery( $user,$utype,$uid,$year ){
		return (object) [
            "query" => "select a1.*, nombre, count(*) as numero_reservas
				from (
					select $utype,MONTHNAME(dia_reserva) as mes,id_promocion
					from usuario_reservas
					where $utype = $uid
					and YEAR(dia_reserva)=$year
				) a1 join usuario_promociones a2
				on a1.id_promocion = a2.id
                group by mes,nombre",
            "group" => "nombre"
		];
	}
}
