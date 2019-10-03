<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Resources\FeriadosResource as Resource;
use App\Traits\hasDependencies;
use Illuminate\Http\Request;

class FeriadoController extends Controller
{
    use hasDependencies;

    protected $model = '\\App\\Models\\Feriado';

    protected static $dependencies = [
        'list' => [
            'feriados'          =>	'key',
            'intervalo'         => false,
            'feriados.eventos'  =>  false
        ],
        'add' => [
            'feriados' => 'list',
            'eventos'=>	'all',
            'intervalo' => false
        ],
        'single' => [
            'feriados'           => false,
            'feriados.eventos'   => false,
            'intervalo'          => false,
            'eventos'            => 'list'
        ]
    ];

    public function __construct (){
        $this->middleware('length');
    }
    /**
     * get all eventos by user
     * 
     * @param $id must be an integer in db
     */
    public function list (
        $route,
        $id,
        $month,
        $year
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'feriados' => (object) [
                    'month'=>$month,
                    'operator'=>'=',
                    'year'=>$year,
                    'scope'=>'thisMonth'
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
        $extra = [
            'intervalo' => $user->intervalo->id
        ];

        return response(array_merge($data,$extra),200)->header('Content-Type','application/json');
    }
    /**
     * this function assigns dependencies and it corresponding callbacks
     * @param dependencies is an associative array with Reservas dependencies to be eagerly loaded
     * @param parameters is an associative array with values passed to eager load constructor
     */
    public function add(
        $route,
        $id,
        $month,
        $year
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array(
                'feriados' => (object) [
                    'month'=>$month,
                    'operator'=>'=',
                    'year'=>$year,
                    'scope'=>'thisMonth'
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

        $extra = [
            'intervalo' => $user->intervalo->id
        ];

        return response(array_merge($data,$extra),200)->header('Content-Type','application/json'); 
    }

    public function single(
        $route, 
        $userId,
        $id
    ){ 
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array('feriados' => (object)['id'=>$id,'scope'=>'searchId'])
        );

        $user = User::with(
            $relations
        )->find($userId);
        
        $data = self::formatResults(
            $user,
            $dependencies
        );

        $extra = [
            'intervalo' => $user->intervalo->id
        ];

        return response(array_merge($data,$extra),200)->header('Content-Type','application/json'); 
    }

    public function formatDependencyData(
        array $dataModels,
        User $user
    ) {
        $res = [];
        foreach($dataModels as $relation=>$model){
            $opt = $this->model===$model ? 'mainFormatOptions' : 'dependencyFormatOptions';
            if ($model && property_exists($model,$opt)){
                $res[$relation] = $model::getFormattedData($user->{$relation},$opt);
            }
        }
        return collect($res);
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
