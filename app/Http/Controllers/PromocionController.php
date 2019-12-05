<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PromocionesResource as Resource;
use App\Traits\hasDependencies;
use Carbon\Carbon;
use App\User;
use App\Traits\ValidatesForm;

class PromocionController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Promocion';

    public function __construct () {
        $this->middleware('length');
    }

    protected static $dependencies = [
        'list' => [
            'promociones'        => 'key',
            'promociones.eventos'=> false
        ],
        'add' => [
            'eventos'=> 'list'
        ],
        'single' => [
            'promociones' => false,
            'promociones.eventos'=> false,
            'eventos'=> 'list'
        ],
    ];

    public function list (
        $route,
        $id
    ){
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

    public function add (
        $route,
        $id
    ){
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
            array('promociones' => (object)['id'=>$id,'scope'=>'searchId'])
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
            $store = $this->storeData($request->post(),$method,'Promoción');
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
            $store = $this->storeData($request->post(),$method,'Promoción');
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
