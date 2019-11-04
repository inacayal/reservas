<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\hasDependencies;
use Illuminate\Support\Collection;
use App\User;
use App\Models\Query\Provincia;
use App\Models\Query\Intervalo;
use App\Http\Resources\UsuarioResource as Resource;

class UserController extends Controller
{
    use hasDependencies;

    protected $model = '\\App\\User';

    protected static $dependencies = [
        'list' => [],
        'add' => [
            'usuarios' => 'list'
        ],
        'local' => [
            'provincia' => false,
            'intervalo' => false,
            'locales.franquicia' => false,
            'locales.administrador'=>false
        ],
        'locales'=>[
            'locales' => 'key',
            'intervalo' => false,
            'locales.franquicia' => false,
            'locales.administrador'=>false
        ],
        'franquicia' => [
            'franquicia.locales' => false,
            'franquicia.administrador'=>false
        ],
        'franquicias'=>[
            'usuarios' => 'key',
            'intervalo' => false,
            'franquicia.administrador'=>false
        ]
    ];

    public function __construct () {
        $this->middleware('length');
    }

    public function singleLocal (
        $route,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'usuarios' => (object)[
                    'scope' => 'searchLocales'
                ]
            )
        );
        $user = User::with(
            $relations
        )->find($id);
        return response([
            'data'=>new Resource($user)
        ],200)->header('Content-Type','application/json');
    }

    public function singleFranquicia (
        $route,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'usuarios' => (object)[
                    'scope' => 'searchFranquicias'
                ]
            )
        );

        $user = User::with(
            $relations
        )->find($id);

        return response([
            'data'=>new Resource($user)
        ],200)->header('Content-Type','application/json');
    }

    public function locales (
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

    public function franquicias (
        $route,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'usuarios' => (object)[
                    'scope' => 'searchFranquicias'
                ]
            )
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
        $id,
        $role
    ){
        $dependencies = self::getDependencies($route);
        $scope = $role != 1
        ?
            (object)[
                'id' => $id,
                'scope'=>'searchId'
            ]
        :
            (object)[
                'scope' => 'searchFranquicias'
            ];
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'usuarios' => $scope
            )
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

    public function create (){
        return response(['respuesta'=>'create'],200)
            ->header('Content-Type','application/json');
    }
    public function update (){
        return response(['respuesta'=>'update'],200)
            ->header('Content-Type','application/json');
    }
    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}
