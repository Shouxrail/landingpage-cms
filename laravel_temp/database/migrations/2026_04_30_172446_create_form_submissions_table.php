<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('form_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->nullable()->constrained('landing_pages')->cascadeOnDelete();
            $table->string('form_id')->nullable();
            $table->json('data');
            $table->text('user_agent')->nullable();
            $table->string('user_ip', 50)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
    }
};
