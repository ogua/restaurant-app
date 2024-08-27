<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->string('logo')->nullable();
            $table->string('name');
            $table->text('description');
            $table->string('region');
            $table->string('location');
            $table->string('landmark')->nullable();
            $table->text('address')->nullable();
            $table->text('phone');
            $table->float('latitude', 10, 6)->nullable();
            $table->float('longitude', 10, 6)->nullable();
            $table->text('hours_of_operation', 10, 6);
            $table->text('payment_options', 10, 6);
            $table->decimal('lowest_price', 10, 2);
            $table->decimal('highest_price', 10, 6);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
