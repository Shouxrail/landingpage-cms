<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FormSubmission;
use Inertia\Inertia;

class SubmissionsController extends Controller
{
    public function index()
    {
        $submissions = FormSubmission::with('page')
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        return Inertia::render('Admin/Submissions', [
            'submissions' => $submissions,
        ]);
    }
}
