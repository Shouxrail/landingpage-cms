<?php

namespace App\Http\Controllers;

use App\Models\LandingPage;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    public function show(string $slug = 'home'): Response|\Illuminate\Http\Response
    {
        $page = LandingPage::where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (!$page) {
            abort(404);
        }

        $settings = SiteSetting::first();

        return Inertia::render('Landing', [
            'page' => $page,
            'settings' => $settings,
        ]);
    }
}
