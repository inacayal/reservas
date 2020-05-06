<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\hasDependencies;
use Illuminate\Support\Collection;
use App\Models\Query\Provincia;
use App\Models\Query\Intervalo;
use App\Http\Resources\UsuarioResource as Resource;
use App\Traits\ValidatesForm;
use App\Franquicia;
use Illuminate\Support\Facades\Hash;

class FranquiciaController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Franquicia';

    public function getRedirect($id){
        return ['dir' => '/configuracion', 'route' => 'configuracion'];
    }

    protected static $dependencies = [
        'list' => [],
        'add' => [
            'usuarios' => 'list'
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
    ];

    public function __construct () {
        $this->middleware('length');
    }
    public function single (
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


}
