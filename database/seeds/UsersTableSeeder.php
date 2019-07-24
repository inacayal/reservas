<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 10)->create()->each(function ($user) {
            foreach(factory(\App\Models\HorariosSemana::class,7)->make() as $hr){
                $user->horariosSemanas()->save($hr);
            }
            foreach(factory(\App\Models\Ubicacion::class,5)->make() as $hr){
                $user->ubicaciones()->save($hr);
            }
            foreach(factory(\App\Models\UsuarioEvento::class,8)->make() as $hr){
                $user->eventos()->save($hr);
            }
            foreach(factory(\App\Models\UsuarioFeriados::class,5)->make() as $hr){
                $user->feriados()->save($hr);
            }
        });
    }
}
