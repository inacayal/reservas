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
        $method = $request->getMethod();
        if ($method === 'POST'){
            $store = $this->storeData($request->post(),$method,'Ubicación');
            return response($store,$store['status']);
        } else
            return response([
                'type'=>'failure',
                'title'=>'Método inváido',
                'errors'=> [],
                'status'=> 422,
                'mensaje' => "El método usado es inválido"
            ],422);
    }

    public function update (Request $request){
        $method = $request->getMethod();
        if ($method === 'PUT'){
            $store = $this->storeData($request->post(),$method,'Ubicación');
            return response($store,$store['status']);
        } else
            return response([
                'type'=>'failure',
                'title'=>'Método inválido',
                'errors'=> [],
                'status'=> 422,
                'mensaje' => "El método usado es inválido"
            ],422);
    }

    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
