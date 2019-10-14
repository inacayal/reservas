<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyUsuarioHorarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuario_horario', function (Blueprint $table) {
            //$table->integer('id_eventos')->unsigned()->default(81);
            $table->foreign('id_eventos','horario_semana_id_eventos_horario_eventos_id')
                ->references('id')->on('usuario_horario')
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
        /*Schema::table('horarios_semana', function (Blueprint $table) {
            $table->dropForeign('horario_semana_id_eventos_horario_eventos_id');
        });*/
    }
}
