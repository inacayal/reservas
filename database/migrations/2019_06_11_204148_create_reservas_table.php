<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReservasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->timestamp('created_at');
            $table->integer('id_usuario')->unsigned();
            $table->string('email',100);
            $table->string('nombre',100);
            $table->string('apellido',100);
            $table->string('telefono',20);
            $table->integer('id_ubicacion')->unsigned();
            $table->integer('cantidad_personas')->unsigned();
            $table->integer('id_evento')->unsigned();
            $table->text('descripcion_evento');
            $table->timestamp('hora_reserva')->nullable();
            $table->integer('id_estado')->unsigned();
            $table->date('dia_reserva');
            
            $table->foreign('id_usuario','reservas_users_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_ubicacion','reservas_ubicacion_id_ubicacion')
                ->references('id')->on('ubicaciones')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('id_estado','reservas_estado_reserva_id_estado')
                ->references('id')->on('estado_reserva')
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
        Schema::table("reservas",function(Blueprint $table){
            $table->dropForeign('reservas_ubicacion_id_ubicacion');
            $table->dropForeign('reservas_users_id');
            $table->dropForeign('reservas_estado_reserva_id_estado');
        });
        Schema::dropIfExists('reservas');
    }
}
