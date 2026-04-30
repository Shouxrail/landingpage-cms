<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LandingPage;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EditorController extends Controller
{
    public function show(string $slug)
    {
        $page = LandingPage::where('slug', $slug)->firstOrFail();
        $settings = SiteSetting::first();

        return Inertia::render('Admin/Editor', [
            'page' => $page,
            'settings' => $settings,
        ]);
    }

    public function save(Request $request, string $slug)
    {
        $page = LandingPage::where('slug', $slug)->firstOrFail();

        $page->update([
            'page_title'      => $request->input('pageTitle'),
            'slug'            => $request->input('slug'),
            'content'         => $request->input('content'),
            'mobile_content'  => $request->input('mobileContent'),
            'status'          => $request->input('status'),
            'seo_title'       => $request->input('seoTitle'),
            'seo_description' => $request->input('seoDescription'),
            'og_image'        => $request->input('ogImage'),
        ]);

        // If slug changed, return new slug so the frontend can redirect
        return response()->json([
            'success' => true,
            'newSlug' => $page->slug,
        ]);
    }
}
