<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('reservas')->name('reservas.')->group(function (){
    Route::get('/{id}/{date}','ReservaController@list')->name('list');
    Route::get('/agregar/{id}/{date}','ReservaController@listDependencyData')->name('agregar');
    Route::put('/update/{id}','ReservaController@update')->name('update');
    Route::delete('/delete/{id}','ReservaController@delete')->name('delete');
    Route::post('/create','ReservaController@create')->name('create');
});

Route::prefix('eventos')->name('eventos.')->group(function (){
    Route::get('/{id}','EventoController@list')->name('list');
    Route::put('/update/{id}','EventoController@update')->name('update');
    Route::delete('/delete/{id}','EventoController@delete')->name('delete');
    Route::post('/create','EventoController@create')->name('create');
});

Route::prefix('ubicaciones')->name('ubicaciones.')->group(function (){
    Route::get('/{id}','UbicacionController@list')->name('list');
    Route::put('/update/{id}','UbicacionController@update')->name('update');
    Route::delete('/delete/{id}','UbicacionController@delete')->name('delete');
    Route::post('/create','UbicacionController@create')->name('create');
});

Route::prefix('horarios')->name('horarios.')->group(function (){
    Route::get('/{id}','HorarioController@list')->name('list');
    Route::put('/update/{id}','HorarioController@update')->name('update');
    Route::delete('/delete/{id}','HorarioController@delete')->name('delete');
    Route::post('/create','HorarioController@create')->name('create');
});

Route::prefix('feriados')->name('feriados.')->group(function (){
    Route::get('/{id}/{date}','FeriadoController@list')->name('list');
    Route::put('/update/{id}','FeriadoController@update')->name('update');
    Route::delete('/delete/{id}','FeriadoController@delete')->name('delete');
    Route::post('/create','FeriadoController@create')->name('create');
});

Route::prefix('configuracion')->name('configuracion.')->group(function (){
    Route::get('/{id}','ConfiguracionController@list')->name('list');
    Route::put('/update/{id}','ConfiguracionController@update')->name('update');
});