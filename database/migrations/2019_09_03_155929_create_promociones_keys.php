<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePromocionesKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuario_evento', function (Blueprint $table) {
            //$table->integer('id_promocion')->unsigned();
            $table->foreign('id_promocion','usuario_eventos_usuario_promociones_id')
                ->references('id')->on('usuario_promociones')
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
        Schema::table('usuario_evento',function ( Blueprint $table ){
            $table->dropForeign('usuario_eventos_usuario_promociones_id');
        });
    }
}
