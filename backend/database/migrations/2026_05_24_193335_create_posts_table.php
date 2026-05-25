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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 90);
            $table->string('thumbnail');
            $table->text('excerpt');
            $table->longText('mainContent');
            $table->text('metaDesc');
            $table->decimal('likes')->default(0);
            $table->decimal('dislikes')->default(0);
            $table->decimal('views')->default(0);
            $table->boolean('published')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
