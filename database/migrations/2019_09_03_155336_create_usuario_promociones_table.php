<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioPromocionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario_promociones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre',50);
            $table->string('descripcion',50);
            $table->integer('descuento')->unsigned();
            $table->integer('id_estado')->unsigned();
            $table->integer('id_usuario')->unsigned();

            $table->foreign('id_usuario','usuario_promociones_promociones_id_users_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_estado','usuario_promociones_id_estado_estado_evento_id')
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
        Schema::table('usuario_promociones', function (Blueprint $table) {
            $table->dropForeign('usuario_promociones_id_estado_estado_evento_id');
            $table->dropForeign('usuario_promociones_promociones_id_users_id');
        });
        Schema::dropIfExists('usuario_promociones');
    }
}
