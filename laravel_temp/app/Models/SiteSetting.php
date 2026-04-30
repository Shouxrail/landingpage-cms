<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'site_name', 'site_description', 'base_url', 'seo_title_template',
        'og_image_url', 'logo_url', 'favicon_url', 'ga_id', 'fb_pixel_id',
        'custom_head_scripts', 'navigation_menu',
    ];

    protected $casts = [
        'navigation_menu' => 'array',
    ];
}
