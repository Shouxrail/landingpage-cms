<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LandingPage;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index()
    {
        $pages = LandingPage::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Pages', ['pages' => $pages]);
    }

    public function create(Request $request)
    {
        $request->validate(['slug' => 'required|string|unique:landing_pages,slug']);

        $page = LandingPage::create([
            'slug'       => $request->slug,
            'page_title' => $request->slug,
            'content'    => ['blocks' => [], 'settings' => ['backgroundColor' => '#ffffff']],
            'status'     => 'draft',
        ]);

        return redirect("/admin/editor/{$page->slug}");
    }

    public function destroy(string $slug)
    {
        LandingPage::where('slug', $slug)->delete();
        return back();
    }
}
