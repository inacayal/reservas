<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUbicacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ubicaciones', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('id_usuario')->unsigned();
            $table->string('nombre',45);
            $table->string('descripcion',50);
            $table->integer('cantidad_maxima')->unsigned();
            $table->integer('id_estado')->unsigned();
            
            $table->foreign('id_usuario','ubicaciones_usuario_id_usuario')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_estado','ubicaciones_estado_id_estado')
                ->references('id')->on('estado_salon')
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
        Schema::table("ubicaciones",function(Blueprint $table){
            $table->dropForeign('ubicaciones_usuario_id_usuario');
            $table->dropForeign('ubicaciones_estado_id_estado');
        });
        Schema::dropIfExists('ubicaciones');
    }
}
