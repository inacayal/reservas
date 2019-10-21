<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventosResource as Resource;
use App\Traits\hasDependencies;
use Carbon\Carbon;
use App\User;

class EventoController extends Controller
{
    use hasDependencies;

    protected $model = '\\App\\Models\\Evento';
    
    public function __construct () {
        $this->middleware('length');
    }
    
    protected static $dependencies = [
        'list' => [
            'eventos'               => 'key',
            'eventos.horarios'      => false,
            'eventos.promociones'   => false
        ],
        'add' => [
            'feriados' => 'list',
            'promociones'=>	'list',
            'horarios' => 'list'
        ],
        'single' => [
            'eventos'               => false,
            'eventos.feriados'      => false,
            'eventos.horarios'      => false,
            'eventos.promociones'   => false,
            'feriados'              => 'list',
            'horarios'              => 'list',
            'promociones'              => 'list',
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
            array(
                'feriados' => (object) [
                    'date' => new \DateTime(),
                    'operator'=>'>=',
                    'scope'=>'thisDate'
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

    public function single (
        $route,
        $userId,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $feriadoScope = (object) [
            'date' => new \DateTime(),
            'operator'=>'>=',
            'scope'=>'thisDate'
        ];
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'eventos' => (object) [
                    'id'=>$id,
                    'scope'=>'searchId'
                ],
                'eventos.feriados' => $feriadoScope,
                'feriados' => $feriadoScope
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