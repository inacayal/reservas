<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSidebarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     ********************/
    public function up()
    {
        Schema::create('sidebar', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title',50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     ************************/
    public function down()
    {
        Schema::dropIfExists('sidebar');
    }
}