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
            $table->string('Stanza1Line1');
            $table->string('Stanza1Line2');
            $table->string('Stanza1Line3')->nullable();
            $table->string('Stanza1Line4')->nullable();
            $table->string('Stanza2Line1')->nullable();
            $table->string('Stanza2Line2')->nullable();
            $table->string('Stanza2Line3')->nullable();
            $table->string('Stanza2Line4')->nullable();
            $table->string('Stanza3Line1')->nullable();
            $table->string('Stanza3Line2')->nullable();
            $table->string('Stanza3Line3')->nullable();
            $table->string('Stanza3Line4')->nullable();
            $table->string('Stanza4Line1')->nullable();
            $table->string('Stanza4Line2')->nullable();
            $table->string('Stanza4Line3')->nullable();
            $table->string('Stanza4Line4')->nullable();
            $table->string('penName');
            $table->string('privacy');
            $table->boolean('isDraft');
            $table->integer('likes')->nullable();
            $table->integer('comments')->nullable();
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
