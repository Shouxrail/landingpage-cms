<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => SiteSetting::first(),
        ]);
    }

    public function save(Request $request)
    {
        $settings = SiteSetting::first();
        $settings->update($request->only([
            'site_name', 'site_description', 'base_url', 'seo_title_template',
            'og_image_url', 'logo_url', 'favicon_url', 'ga_id', 'fb_pixel_id',
            'custom_head_scripts', 'navigation_menu',
        ]));

        return response()->json(['success' => true]);
    }
}
