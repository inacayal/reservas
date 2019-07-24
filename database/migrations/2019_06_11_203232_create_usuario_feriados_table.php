<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioFeriadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario_feriados', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('id_usuario')->unsigned();
            $table->date('fecha_feriado');
            $table->integer('id_estado')->unsigned();
            $table->time('apertura');
            $table->time('cierre');
            $table->string('descripcion',100);

            $table->foreign('id_usuario','usuario_feriados_usuario_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_estado','estado_apertura_usuario_feriados_id')
                ->references('id')->on('estado_apertura')
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
            $table->dropForeign('usuario_feriados_usuario_id');
            $table->dropForeign('estado_apertura_usuario_feriados_id');
        });
        Schema::dropIfExists('usuario_feriados');
    }
}
