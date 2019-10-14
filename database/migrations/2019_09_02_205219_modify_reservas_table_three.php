<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyReservasTableThree extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reservas', function (Blueprint $table) {
            $table->integer('id_evento')->unsigned()->default(1)->change();
            $table->foreign('id_evento','reservas_id_evento_horario_evento_id')
                ->references('id')->on('horario_eventos')
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
        Schema::table('reservas',function ( Blueprint $table ){
            $table->dropColumn('id_evento');
        });
    }
}
