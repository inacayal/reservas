<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubSidebarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_sidebar', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_elemento')->unsigned();
            $table->string('title',50);

            $table->foreign('id_elemento','sidebar_sub_elementos_foreign')
                ->references('id')->on('sidebar')
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
        Schema::table("sub_sidebar",function(Blueprint $table){
            //$table->dropForeign('sidebar_sub_elementos_foreign');
        });
        Schema::dropIfExists('sub_sidebar');
    }
}
