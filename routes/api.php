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

Route::get('/search/{term}/{route}/{field}/{user}','SearchController@search');

Route::prefix('usuario')->name('usuario.')->group(function (){

    Route::get('{locales}/{id}','UserController@locales')
        ->where('locales','locales')->name('locales');
    Route::get('{franquicias}/{id}','UserController@franquicias')
        ->where('franquicias','franquicias')->name('franquicias');
    Route::get('/{add}/{id}/{role}','UserController@add')
        ->where('add','add')->name('add');
    Route::get('/{local}/{id}','UserController@singleLocal')
        ->where('local','local')->name('local');
    Route::get('/{franquicia}/{id}','UserController@singleFranquicia')
        ->where('franquicia','franquicia')->name('franquicia');
    Route::delete('/delete/{id}','UserController@delete')
        ->name('delete');
    Route::post('/create','UserController@create')
        ->name('create');
    Route::put('/update/establecimiento','UserController@updateEstablecimiento')
        ->name('update.establecimiento');
    Route::put('/update/usuario','UserController@updateUsuario')
        ->name('update.usuario');
    Route::put('/update/reservas','UserController@updateReservas')
        ->name('update.reservas');
    Route::put('/scope','UserController@modifyScope')->name('update.scope');


});

Route::prefix('reservas')->name('reservas.')->group(function (){

    Route::get('{list}/{id}/{month}/{year}','ReservaController@list')
        ->where('list','list')->name('list');
    Route::get('/{add}/{id}/{month}/{year}','ReservaController@add')
        ->where('add','add')->name('add');
    Route::get('{single}/{userId}/{id}','ReservaController@single')
        ->where('single','single')->name('single');
    Route::put('/update','ReservaController@update')
        ->name('update');
    Route::delete('/delete','ReservaController@delete')
        ->name('delete');
    Route::post('/create','ReservaController@create')
        ->name('create');

});

Route::prefix('eventos')->name('eventos.')->group(function (){

    Route::get('{list}/{id}','EventoController@list')
        ->where('list','list')->name('list');
    Route::get('{add}/{id}','EventoController@add')
        ->where('add','add')->name('add');
    Route::get('{single}/{userId}/{id}','EventoController@single')
        ->where('single','single')->name('single');
    Route::put('/update','EventoController@update')
        ->name('update');
    Route::delete('/delete','EventoController@delete')
        ->name('delete');
    Route::post('/create','EventoController@create')
        ->name('create');
    Route::put('/scope','EventoController@modifyScope')
        ->name('update.scope');

});

Route::prefix('promociones')->name('promociones.')->group(function (){

    Route::get('{list}/{id}','PromocionController@list')
        ->where('list','list')->name('list');
    Route::get('{add}/{id}','PromocionController@add')
        ->where('add','add')->name('add');
    Route::get('{single}/{userId}/{id}','PromocionController@single')
        ->where('single','single')->name('single');
    Route::put('/update','PromocionController@update')
        ->name('update');
    Route::delete('/delete','PromocionController@delete')
        ->name('delete');
    Route::put('/disable','PromocionController@disable')
        ->name('disable');
    Route::post('/create','PromocionController@create')
        ->name('create');
    Route::put('/scope','PromocionController@modifyScope')
        ->name('update.scope');

});

Route::prefix('ubicaciones')->name('ubicaciones.')->group(function (){

    Route::get('{list}/{id}','UbicacionController@list')
        ->where('list','list')->name('list');
    Route::get('{single}/{userId}/{id}','UbicacionController@single')
        ->where('single','single')->name('single');
    Route::put('/update','UbicacionController@update')
        ->name('update');
    Route::put('/disable','UbicacionController@disable')
        ->name('disable');
    Route::delete('/delete','UbicacionController@delete')
        ->name('delete');
    Route::post('/create','UbicacionController@create')
        ->name('create');
    Route::put('/update/scope','UbicacionController@modifyScope')
        ->name('update.scope');

});

Route::prefix('horarios')->name('horarios.')->group(function (){

    Route::get('{list}/{id}','HorarioController@list')
        ->where('list','list')->name('list');
    Route::get('{add}/{id}/','HorarioController@add')
        ->where('add','add')->name('add');
    Route::get('{single}/{userId}/{id}','HorarioController@single')
        ->where('single','single')->name('single');
    Route::put('/update','HorarioController@update')
        ->name('update');
    Route::delete('/delete/{id}','HorarioController@delete')
        ->name('delete');
    Route::post('/create','HorarioController@create')
        ->name('create');

});

Route::prefix('feriados')->name('feriados.')->group(function (){

    Route::get('{list}/{id}/{month}/{year}','FeriadoController@list')
        ->where('list','list')->name('list');
    Route::get('{add}/{id}/{month}/{year}','FeriadoController@add')
        ->where('add','add')->name('add');
    Route::get('{single}/{userId}/{id}','FeriadoController@single')
        ->where('single','single')->name('single');
    Route::put('/update','FeriadoController@update')
        ->name('update');
    Route::delete('/delete/{id}','FeriadoController@delete')
        ->name('delete');
    Route::post('/create','FeriadoController@create')
        ->name('create');
    Route::put('/scope','FeriadoController@modifyScope')
        ->name('update.scope');

});
