<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIdAdministradorField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('id_feriado')->unsigned();
            //$table->string('username',100)->unique();
            $table->integer('id_administrador')->unsigned()->default(4);
            $table->foreign('id_administrador','usuario_administrador_id_administrador')
                ->references('id')->on('users')
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
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('usuario_administrador_id_administrador');
            //$table->dropIndex('feriado_evento_id_evento_usuario_eventos_id');
        });
    }
}
