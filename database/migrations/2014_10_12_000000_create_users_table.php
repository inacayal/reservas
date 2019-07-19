<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('nombre',100);
            $table->string('razon_social',100);
            $table->string('email',100)->unique();
            $table->string('password');
            $table->rememberToken();
            $table->integer('id_franquicia')->unsigned();
            $table->integer('id_provincia')->unsigned();
            $table->integer('id_rol')->unsigned()->index();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('intervalo_reserva',20);
            $table->string('correo_adm',100)->nullable();
            $table->string('telefono_adm',20)->nullable();
            $table->string('nombre_adm',100)->nullable();
            $table->string('caida_reserva',15)->nullable();
            $table->string('cuit_cuil',11)->nullable();
            $table->string('direccion',150)->nullable();
            $table->string('telefono_local',20)->nullable();
            $table->integer('id_estado')->unsigned();
            
            $table->foreign('id_franquicia','usuario_franquicia_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
            $table->foreign('id_provincia','usuario_provincia_id')
                ->references('id')->on('provincias')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_estado','usuario_estado_id')
                ->references('id')->on('estado_usuario')
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
        
        Schema::table("users",function(Blueprint $table){
            $table->dropForeign('usuario_provincia_id');
            $table->dropForeign('usuario_franquicia_id');
            $table->dropForeign('usuario_estado_id');
        });
        Schema::dropIfExists('users');
    }
}
