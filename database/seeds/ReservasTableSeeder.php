<?php

use Illuminate\Database\Seeder;

class ReservasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(App\User::all() as $usr){
            if(!in_array($usr->id,[4,5,6])){
                $hr = $usr->horariosSemanas;
                $ubcns = $usr->ubicaciones;
                $evnts = $usr->eventos;
                for ($ctr = 0; $ctr<8; $ctr++){
                    $st = DateTime::createFromFormat ("d-m-Y",'01-07-2019');
                    $en = DateTime::createFromFormat ("d-m-Y",'31-08-2019');
                    $rdm_timestamp = mt_rand($st->getTimestamp(), $en->getTimestamp());
                    $rdm_date = new DateTime();
                    $rdm_date->setTimestamp($rdm_timestamp);
                    $usr->reservas()->save(
                        factory(\App\Models\Reserva::class)->make(
                            [
                                'id_ubicacion'=>$ubcns[rand(0,count($ubcns)-1)]->id,
                                'id_evento'=>$evnts[rand(0,count($evnts)-1)]->id,
                                'hora_reserva'=>$rdm_date
                            ]
                        )
                    );
                }
            }
        }
    }
}
