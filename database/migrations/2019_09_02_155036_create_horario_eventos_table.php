<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHorarioEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('horario_eventos', function (Blueprint $table) {
            
            $table->integer('id_horario')->unsigned();
            $table->integer('id_evento')->unsigned();
            $table->increments('id_horario_evento');
            $table->string('nombre_evento',50);
            $table->string('descripcion_evento',100);
            $table->string('promocion_evento',100);
            $table->integer('descuento_evento')->unsigned();
            $table->time('inicio_evento');
            $table->time('fin_evento');

            $table->foreign('id_horario','horario_eventos_id_horario')
                ->references('id')->on('horarios_semana')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_evento','horario_eventos_id_evento')
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
        Schema::table('horario_eventos',function(Blueprint $table){
            $table->dropForeign('horario_eventos_id_horario');
            $table->dropForeign('horario_eventos_id_evento');
        });
        Schema::dropIfExists('horario_eventos');
    }
}
