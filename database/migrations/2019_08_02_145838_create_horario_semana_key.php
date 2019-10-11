<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHorarioSemanaKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('horarios_semana', function (Blueprint $table) {
            $table->integer('id_estado')->unsigned()->default(1);
            $table->foreign('id_estado','estado_apertura_id_estado')
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
        Schema::table("horarios_semana",function(Blueprint $table){
            $table->dropForeign('estado_apertura_id_estado');
        });
    }
}
