<?php

namespace App\Http\Controllers;

use App\Http\Resources\UbicacionesResource as Resource;
use App\Traits\hasDependencies;
use Illuminate\Http\Request;
use App\User;
use App\Traits\ValidatesForm;

class UbicacionController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Ubicacion';

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
        $this->middleware('length');
    }

    public function list ($route,$id){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array()
        );
        $user = User::with(
            $relations
        )->find($id);

        $data = self::formatResults(
            $user,
            $dependencies
        );
        return response($data,200)->header('Content-Type','application/json');
    }

    public function single (
        $route,
        $userId,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'ubicaciones' => (object)[
                    'id'=>$id,
                    'scope' => 'searchId'
                ]
            )
        );
        $user = User::with(
            $relations
        )->find($userId);

        $data = self::formatResults(
            $user,
            $dependencies
        );
        return response($data,200)->header('Content-Type','application/json');
    }

    public function create (Request $request){
        $request->request->add([
            'validationType' => 'EditAdd',
            'requestType' => 'POST',
            'scope' => 1
        ]);
        return $this->applyValidation($request);
    }

    public function update (Request $request){
        $request->request->add([
            'validationType' => 'EditAdd',
            'requestType' => 'PUT'
        ]);
        return $this->applyValidation($request);
    }

    public function modifyScope (Request $request) {
        $request->request->add([
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
