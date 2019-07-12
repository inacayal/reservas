<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioEventoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario_evento', function (Blueprint $table) {
            $table->integer('id_usuario')->unsigned();
            $table->increments('id_evento');
            $table->string('nombre',45);
            $table->string('descripcion',45);
            $table->string('promocion');

            $table->foreign('id_usuario','usuario_evento_users_id_usuario_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_evento','usuario_evento_tipo_evento_id_evento_id')
                ->references('id')->on('tipo_evento')
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
        Schema::table("usuario_evento",function(Blueprint $table){
            $table->dropForeign('usuario_evento_tipo_evento_id_evento_id');
            $table->dropForeign('usuario_evento_users_id_usuario_id');
        });
        Schema::dropIfExists('usuario_evento');
    }
}
