<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('poems', function (Blueprint $table) {
            $table->id();
            $table->string('penName');
            $table->string('privacy');
            $table->boolean('isDraft');
            $table->integer('comments')->nullable();
            $table->integer('likes')->nullable();
            $table->string('title');
            $table->string('url')->nullable();
            $table->string('firstStanza');
            $table->string('secondStanza')->nullable();
            $table->string('thirdStanza')->nullable();
            $table->string('fourthStanza')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('poems');
    }
};
