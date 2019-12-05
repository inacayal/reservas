<?php

namespace App\Http\Controllers;
use App\User as User;
use Illuminate\Support\Collection;
use App\Traits\hasDependencies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Traits\ValidatesForm;

class ReservaController extends Controller
{
    use hasDependencies,
        ValidatesForm;

    protected $model = '\\App\\Models\\Reserva';
    /**
     * start trait information
     */
    protected static $dependencies = [
        'list' => [
            'reservas'              =>  'group',
            'horarios'              =>	'key',
            'estado'                =>  false,
            'reservas.ubicacion'    =>  false,
            'reservas.evento'       =>  false,
            'reservas.evento.estado'=>  false,
            'reservas.promocion'    =>  false,
            'intervalo'             =>  false
        ],
        'add' => [
            'horarios'				=>	'key',
            'feriados'              =>  'key',
            'ubicaciones' 			=>  'all',
            'feriados.eventos'      =>  false,
            'horarios.eventos'		=>	false,
            'feriados.eventos.promociones' => false,
            'horarios.eventos.promociones' => false,
            'intervalo' 			=> false
        ],
        'single' => [
            'reservas'           => false,
            'reservas.ubicacion' => false,
            'reservas.evento'    => false,
            'reservas.promocion' => false,
            'reservas.estado'    => false
        ]
    ];

    public function __construct () {
        $this->middleware('length');
    }

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
                'reservas' => (object) [
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
            'intervalo' => $user->intervalo,
            'antelacion' => $user->antelacion_reserva
        ];
        return response(array_merge($data,$extra),200)->header('Content-Type','application/json');
    }

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
            'intervalo' => $user->intervalo,
            'antelacion' => $user->antelacion_reserva
        ];
        return response(array_merge($data,$extra) ,200)->header('Content-Type','application/json');
    }

    public function single(
        $route,
        $userId,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array('reservas' => (object)['id'=>$id,'scope'=>'searchId'])
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
            $store = $this->storeData($request->post(),$method,'Reserva');
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
            $store = $this->storeData($request->post(),$method,'Reserva');
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
