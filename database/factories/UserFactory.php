<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\User;
use App\Models\Reserva;
use App\Models\Ubicacion;
use App\Models\UsuarioEvento;
use App\Models\HorariosSemana;
use App\Models\UsuarioFeriados;

use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
	return [
		'nombre'=>$faker->name,
		'email'=>$faker->unique()->safeEmail,
		'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'email_verified_at' => now(),
		'remember_token' => Str::random(10),
		'razon_social'=> Str::random(20),
		'id_franquicia'=> rand(5,6),
		'id_provincia'=> rand(1,24),
		'id_rol'=>3,
		'email_verified_at'=>now(),
		'intervalo_reserva'=>rand(0,6)*5,
		'correo_adm'=> $faker->safeEmail,
		'telefono_adm'=>preg_replace("/x[0-9]+/i","",$faker->phoneNumber),
		'nombre_adm'=>$faker->name,
		'caida_reserva'=>rand(6,12)*5,
		'cuit_cuil'=>((string) rand(1000,9999)).((string) rand(1000,9999)),
		'direccion'=>$faker->text(150),
		'telefono_local'=>preg_replace("/x[0-9]+/i","",$faker->phoneNumber),
		'id_estado'=>1
    ];
});

$factory->define(Ubicacion::class, function(Faker $faker){
    return[
		'nombre'=>$faker->firstName,
		'descripcion'=>$faker->text(45),
		'cantidad_maxima'=>rand(15,60),
		'id_estado'=>1
    ];
});

$factory->define(UsuarioEvento::class, function(Faker $faker){
    return[
		'nombre'=>$faker->firstName,
		'descripcion'=>$faker->text(45),
		'promocion'=>$faker->text(50),
		'descuento'=>rand(10,100),
		'id_estado'=>1
    ];
});

$factory->define(HorariosSemana::class, function(Faker $faker){
	$now = new DateTime('now');
	$tomorrow= new DateTime('tomorrow');
	$timeFloorRes = $faker->dateTimeBetween($now,$tomorrow);
	$timeFloorAtn = $faker->dateTimeBetween($now,$tomorrow);
    return[
		'id_dia_semana'=>rand(1,7),
		'apertura_reserva'=>$now,
		'cierre_reserva'=>$timeFloorRes,
		'apertura_atencion'=>$now,
		'cierre_atencion'=>$timeFloorAtn
    ];
});

$factory->define(UsuarioFeriados::class, function(Faker $faker){
	$now = new DateTime('now');
	$tomorrow= new DateTime('tomorrow');
	$timeFloor = $faker->dateTimeBetween($now,$tomorrow);
    return [
		'fecha_feriado'=>$faker->dateTimeThisMonth('now','UTC -3'),
		'apertura'=>$now,
		'cierre'=>$timeFloor,
		'descripcion'=>$faker->text(100),
		'id_estado'=>rand(1,2),
    ];
});
