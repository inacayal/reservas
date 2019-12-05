<?php

namespace App\Http\Controllers;

use App\Http\Resources\HorarioResource as Resource;
use App\Traits\hasDependencies;
use Illuminate\Http\Request;
use App\User;
use App\Traits\ValidatesForm;

class HorarioController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Horario';

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
        $this->middleware('length');
    }

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

    /**
     * this function assigns dependencies and it corresponding callbacks
     * @param dependencies is an associative array with Reservas dependencies to be eagerly loaded
     * @param parameters is an associative array with values passed to eager load constructor
     */
    public function add(
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
            array('horarios' => (object)['id'=>$id,'scope'=>'searchId'])
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


    public function create (Request $request){
        $method = $request->getMethod();
        if ($method === 'POST'){
            $store = $this->storeData($request->post(),$method,'Horario');
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
            $store = $this->storeData($request->post(),$method,'Horario');
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
