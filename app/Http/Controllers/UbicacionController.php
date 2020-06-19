<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\hasDependencies;
use App\Traits\ValidatesForm;
use App\Traits\GeneratesResumen;
use App\User;
use Illuminate\Support\Facades\Auth;

class UbicacionController extends Controller {

    use hasDependencies, ValidatesForm, GeneratesResumen;

    protected $model = '\\App\\Models\\Ubicacion';

    private $consult;

    protected $resumenView = "resumen_ubicaciones";

    protected static $dependencies = [
        'list' => [
            'ubicaciones'           => 'key',
            'ubicaciones.estado'    => false
        ],
        'add' => [],
        'single' => [
            'ubicaciones' => false
        ]
    ];

    public function __construct () {
        $this->consult = "App\\Local";
        $this->middleware('length');
    }

    public function getRedirect($id){
        return ['dir' => "/ubicaciones/$id", 'route' => 'ubicaciones'];
    }

    public function list ($route,$id){
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

    public function single (
        $route,
        $uId,
        $id
    ){
        return response (
            $this->getData( (object) [
                "depends" => self::getDependencies($route),
                "scope" => array(
                    'ubicaciones' => (object)[
                        'id'=>$id,
                        'scope' => 'searchId'
                    ]
                ),
                "model" => $this->consult,
                "extra" => array(),
                "uid" => $uId
            ]),
            200
        )->header('Content-Type','application/json');
    }

    public function create (Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType' => 'POST',
            'scope' => 1
        ]);
        return $this->applyValidation($request);
    }

    public function update (Request $request){
        $request->merge([
            'validationType' => 'EditAdd',
            'requestType' => 'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function modifyScope (Request $request) {
        $request->merge([
            'validationType' => 'ScopeUpdate',
            'requestType' => 'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
