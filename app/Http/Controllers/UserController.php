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
        'add' => [],
        'single' => [
            'provincia' => false,
            'intervalo' => false
        ]
    ];

    public function __construct () {
        $this->middleware('length');
    }

    public function single (
        $route,
        $type,
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

        $user->type = $type;
        return response([
            'data'=>new Resource($user)
        ],200)->header('Content-Type','application/json'); 
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
