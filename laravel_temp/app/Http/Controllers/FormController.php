<?php

namespace App\Http\Controllers;

use App\Models\FormSubmission;
use App\Models\LandingPage;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function submit(Request $request, string $slug)
    {
        $page = LandingPage::where('slug', $slug)
            ->where('status', 'published')
            ->first();

        FormSubmission::create([
            'page_id'    => $page?->id,
            'form_id'    => $request->input('formId'),
            'data'       => $request->except(['formId', '_token']),
            'user_agent' => $request->userAgent(),
            'user_ip'    => $request->ip(),
        ]);

        return response()->json(['success' => true]);
    }
}
