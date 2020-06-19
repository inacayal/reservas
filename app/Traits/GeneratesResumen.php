<?php

namespace App\Traits;
use Illuminate\Support\Collection;
use App\Http\Resources\ResumenResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

trait GeneratesResumen {

    private $locale = [
        "January"=>"Enero",
        "February"=>"Febrero",
        "March"=>"Marzo",
        "April"=>"Abril",
        "May"=>"Mayo",
        "June"=>"Junio",
        "July"=>"Julio",
        "August"=>"Agosto",
        "September"=>"Septiembre",
        "November"=>"Noviembre",
        "December"=>"Diciembre"
    ];

    public function getYearData( $type,$year ){
		$user = Auth::guard("api")->user();
		$utype = "id_".strtolower($user->rol->descripcion);
		$uid = $user->id;
        return $this->getResumen(
            $this->model::getYearQuery(
                $user,
                $utype,
                $uid,
                $year
            )
        );
    }

    public function getMonthData( $type,$month,$year ){
		$user = Auth::guard("api")->user();
		$utype = "id_".strtolower($user->rol->descripcion);
		$uid = $user->id;
        return $this->getResumen(
            $this->model::getMonthQuery(
                $user,
                $utype,
                $uid,
                $month,
                $year
            )
        );
    }

    public function getResumen( $queryObject ) {
        return response(
            collect( DB::select( $queryObject->query ) )
                ->groupBy( $queryObject->group )
        ,200);
    }
}
