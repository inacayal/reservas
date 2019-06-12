<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSemanaUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('semana_usuario', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('id_usuario')->unsigned();
            $table->integer('id_dia_semana')->unsigned();
            $table->time('apertura_reserva');
            $table->time('cierre_reserva');

            $table->foreign('id_usuario','usuario_users_id_usuario')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_dia_semana','usuario_dia_semana_id_dia_semana')
                ->references('id')->on('dias_semana')
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
        Schema::table("usuario_feriados",function(Blueprint $table){
            $table->dropForeign('usuario_dia_semana_id_dia_semana');
            $table->dropForeign('usuario_users_id_usuario');
        });
        Schema::dropIfExists('semana_usuario');
    }
}
