<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeriadoEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feriado_eventos', function (Blueprint $table) {
            $table->integer('id_feriado')->unsigned();
            $table->integer('id_evento')->unsigned();
            $table->foreign('id_feriado','feriado_eventos_id_feriados_usuario_feriados_id')
                ->references('id')->on('usuario_feriados')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_evento','feriado_evento_id_evento_usuario_eventos_id')
                ->references('id')->on('usuario_evento')
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
        Schema::table('feriado_eventos', function (Blueprint $table) {
            $table->dropForeign('feriado_eventos_id_feriados_usuario_feriados_id');
            $table->dropForeign('feriado_evento_id_evento_usuario_eventos_id');
        });
        Schema::dropIfExists('feriado_eventos');
    }
}
