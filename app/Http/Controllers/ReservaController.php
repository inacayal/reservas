<?php

namespace App\Http\Controllers;
use App\Models\Reserva as Reservas;
use App\Http\Resources\ReservaResource as Resource;
use App\User as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservaController extends Controller
{
    protected $model = '\\App\\Models\\Reserva';
    public function __construct () {

    }
    /**
     * get all reservations by user
     * 
     * @param date must be time from javascript divided by 1000.
     *        timezone considerations must be taken
     */
    public function list (
        $id,
        $date
    ){
        $month = date('m',((int)$date));

        $dependency = $this->model::assignDependencyOptions(
            array('reservas' => [$month]),
            'query'  
        );

        $user = User::with(
                $dependency->data
            )->find($id);

        return response( 
            Resource::collection(
                $user
                    ->reservas
                    ->groupBy('dia_reserva')
            ),
            200
        )->header('Content-Type','application/json'); 
    }
    /**
     * this function assigns dependencies and it corresponding callbacks
     * @param dependencies is an associative array with Reservas dependencies to be eagerly loaded
     * @param parameters is an associative array with values passed to eager load constructor
     */
    public function listDependencyData(
        $id,
        $date
    ){
        $month = date('m',((int)$date));
        $dependency = $this->model::assignDependencyOptions (
            [],
            'create'  
        );

        $user = User::with(
                $dependency->data
            )->where('id',$id)
            ->first();
        
        return response( 
            $this->formatDependencyData(
                $dependency->models,
                $user
            ),
            200
        )->header('Content-Type','application/json'); 
    }

    public function formatDependencyData(
        array $dataModels,
        User $user
    ) {
        $res = [];
        foreach($dataModels as $relation=>$model){
            if (!strpos($relation,'.'))
                $res[$relation] = $model::getFormattedData($user->{$relation});
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
