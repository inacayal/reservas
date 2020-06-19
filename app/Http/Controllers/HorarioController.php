<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\hasDependencies;
use App\Traits\ValidatesForm;
use App\Traits\GeneratesResumen;
use Illuminate\Support\Facades\Auth;
use App\User;

class HorarioController extends Controller {

    use hasDependencies, ValidatesForm, GeneratesResumen;

    protected $model = '\\App\\Models\\Horario';

    protected $resumenView = 'resumen_horarios';

    private $consult;

    protected static $dependencies = [
        'list' => [
            'horarios'          =>	'key',
            'estado'            =>  false,
            'horarios.eventos'  =>  false
        ],
        'add' => [
            'eventos'           =>  'all',
            'intervalo'         =>  false
        ],
        'single' => [
            'horarios'           => false,
            'horarios.eventos'   => false,
            'eventos'            => 'list'
        ]
    ];

    public function __construct () {
        $this->consult = "App\\Local";
        $this->middleware('length');
    }

    public function getRedirect($id){
        return ['dir' => "/horarios/$id", 'route' => 'horarios'];
    }

    public function getResumedData( ){
        $user = Auth::guard("api")->user();
        $role = strtolower($user->rol->descripcion);
        return $this->getResumen(
            "select h1.*, nombre
            from (
                select id_$role,count(*) as numero_reservas,DAYOFWEEK(dia_reserva) dia
                from usuario_reservas
                where id_$role = ".$user->id."
                group by dia,id_$role
            ) h1 join dias_semana h2
            on h1.id_dia_semana = h2.id"
        );
    }

    public function list (
        $route,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(),
                "model" => $this->consult,
                "extra" => array(),
                "uid" => $id
            ]),
            200
        )->header('Content-Type','application/json');
    }

    /**
     * this function assigns dependencies and it corresponding callbacks
     * @param dependencies is an associative array with Reservas dependencies to be eagerly loaded
     * @param parameters is an associative array with values passed to eager load constructor
     */
    public function add(
        $route,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(),
                "model" => $this->consult,
                "extra" => array(
                    'intervalo' => "intervalo"
                ),
                "uid" => $id
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function single(
        $route,
        $uId,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'horarios' => (object)[
                        'id'=>$id,
                        'scope'=>'searchId'
                    ]
                ),
                "model" => $this->consult,
                "extra" => array(
                    'intervalo' => "intervalo"
                ),
                "uid" => $uId
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function create (Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType'=>'POST'
        ]);
        return $this->applyValidation($request);
    }

    public function update (Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType'=>'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
