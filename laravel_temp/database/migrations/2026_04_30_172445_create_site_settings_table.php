<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('My Landing Page');
            $table->text('site_description')->nullable();
            $table->string('base_url')->nullable();
            $table->string('seo_title_template')->default('%s | My Site');
            $table->string('og_image_url')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('favicon_url')->nullable();
            $table->string('ga_id', 50)->nullable();
            $table->string('fb_pixel_id', 50)->nullable();
            $table->text('custom_head_scripts')->nullable();
            $table->json('navigation_menu')->nullable();
            $table->timestamps();
        });

        // Seed a default settings row
        DB::table('site_settings')->insert([
            'site_name' => 'My Landing Page',
            'seo_title_template' => '%s | My Site',
            'navigation_menu' => json_encode(['items' => []]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
