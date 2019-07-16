<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolPermisosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rol_permisos', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('id_rol')->unsigned();
            $table->integer('id_permiso')->unsigned();
            
            $table->foreign('id_rol','rol_permisos_roles_id_rol')
                ->references('id')->on('roles')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('id_permiso','rol_permisos_permisos_id_permiso')
                ->references('id')->on('permisos')
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
        Schema::table("rol_permisos",function(Blueprint $table){
            $table->dropForeign('rol_permisos_permisos_id_permiso');
            $table->dropForeign('rol_permisos_roles_id_rol');
        });
        Schema::dropIfExists('rol_permisos');
    }
}
