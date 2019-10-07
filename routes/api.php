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


Route::prefix('usuario')->name('usuario.')->group(function (){
    Route::get('{list}/{id}/{month}/{year}','UserController@list')
        ->where('list','list')    
        ->name('list');

    Route::get('/{add}/{id}/{month}/{year}','UserController@add')
        ->where('add','add')
        ->name('add');

    Route::get('/{single}/{type}/{id}','UserController@single')
        ->where('single','single')
        ->name('single');

    Route::put('/update/{id}','UserController@update')->name('update');
    Route::delete('/delete/{id}','UserController@delete')->name('delete');
    Route::post('/create','UserController@create')->name('create');
});

Route::prefix('reservas')->name('reservas.')->group(function (){
    Route::get('{list}/{id}/{month}/{year}','ReservaController@list')
        ->where('list','list')    
        ->name('list');

    Route::get('/{add}/{id}/{month}/{year}','ReservaController@add')
        ->where('add','add')
        ->name('add');
        
    Route::put('/update/{id}','ReservaController@update')->name('update');
    Route::delete('/delete/{id}','ReservaController@delete')->name('delete');
    Route::post('/create','ReservaController@create')->name('create');
});

Route::prefix('eventos')->name('eventos.')->group(function (){
    Route::get('{list}/{id}','EventoController@list')
        ->where('list','list')
        ->name('list');

    Route::get('{add}/{id}','EventoController@add')
        ->where('add','add')
        ->name('add');

    Route::get('{single}/{userId}/{id}','EventoController@single')
        ->where('single','single')
        ->name('single');

    Route::put('/update/{id}','EventoController@update')->name('update');
    Route::delete('/delete/{id}','EventoController@delete')->name('delete');
    Route::post('/create','EventoController@create')->name('create');
});

Route::prefix('promociones')->name('promociones.')->group(function (){
    Route::get('{list}/{id}','PromocionController@list')
        ->where('list','list')
        ->name('list');

    Route::get('{add}/{id}','PromocionController@add')
        ->where('add','add')
        ->name('add');

    Route::get('{single}/{userId}/{id}','PromocionController@single')
        ->where('single','single')
        ->name('single');

    Route::put('/update/{id}','PromocionController@update')->name('update');
    Route::delete('/delete/{id}','PromocionController@delete')->name('delete');
    Route::post('/create','PromocionController@create')->name('create');
});

Route::prefix('ubicaciones')->name('ubicaciones.')->group(function (){
    Route::get('{list}/{id}','UbicacionController@list')
        ->where('list','list')
        ->name('list');
        
    Route::get('{single}/{userId}/{id}','UbicacionController@single')
        ->where('single','single')
        ->name('single');
        
    Route::put('/update/{id}','UbicacionController@update')->name('update');
    Route::delete('/delete/{id}','UbicacionController@delete')->name('delete');
    Route::post('/create','UbicacionController@create')->name('create');
});

Route::prefix('horarios')->name('horarios.')->group(function (){
    Route::get('{list}/{id}','HorarioController@list')
        ->where('list','list')    
        ->name('list');

    Route::get('{add}/{id}/','HorarioController@add')
        ->where('add','add')
        ->name('add');

    Route::get('{single}/{userId}/{id}','HorarioController@single')
        ->where('single','single')
        ->name('single');

    Route::put('/update/{id}','HorarioController@update')->name('update');
    Route::delete('/delete/{id}','HorarioController@delete')->name('delete');
    Route::post('/create','HorarioController@create')->name('create');
});

Route::prefix('feriados')->name('feriados.')->group(function (){
    Route::get('{list}/{id}/{month}/{year}','FeriadoController@list')
        ->where('list','list')    
        ->name('list');

    Route::get('{add}/{id}/{month}/{year}','FeriadoController@add')
        ->where('add','add')
        ->name('add');

    Route::get('{single}/{userId}/{id}','FeriadoController@single')
        ->where('single','single')
        ->name('single');

    Route::put('/update/{id}','FeriadoController@update')->name('update');
    Route::delete('/delete/{id}','FeriadoController@delete')->name('delete');
    Route::post('/create','FeriadoController@create')->name('create');
});

Route::prefix('configuracion')->name('configuracion.')->group(function (){
    Route::get('/{id}','ConfiguracionController@list')->name('list');
    Route::put('/update/{id}','ConfiguracionController@update')->name('update');
});