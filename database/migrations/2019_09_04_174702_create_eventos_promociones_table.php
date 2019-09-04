<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventosPromocionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eventos_promociones', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_evento')->unsigned();
            $table->integer('id_promocion')->unsigned();
            $table->integer('id_estado')->unsigned();
            
            $table->time('fin_promocion');
            $table->time('inicio_promocion');

            $table->foreign('id_evento','evento_promocion_id_evento')
                ->references('id')->on('usuario_evento')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_promocion','evento_promocion_id_promocion')
                ->references('id')->on('usuario_promociones')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_estado','eventos_promociones_id_estado_estado_evento_id')
                ->references('id')->on('estado_evento')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('eventos_promociones', function (Blueprint $table) {
            $table->dropForeign('evento_promocion_id_evento');
            $table->dropForeign('evento_promocion_id_promocion');
            $table->dropForeign('eventos_promociones_id_estado_estado_evento_id');
        });
        Schema::dropIfExists('eventos_promociones');
    }
}
