<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('card_id');
            $table->date('release_date');
            $table->time('release_hour');
            $table->string('establishment');
            $table->foreignId('category_id');
            $table->decimal('latitude_establishment', 12, 8);
            $table->decimal('longitude_establishment', 12, 8);
            $table->decimal('score_rate', 3, 1);
            $table->decimal('release_value', 7, 2);
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
        Schema::dropIfExists('transactions');
    }
}
