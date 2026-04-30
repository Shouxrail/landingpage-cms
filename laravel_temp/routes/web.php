<?php

use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\EditorController;
use App\Http\Controllers\Admin\PagesController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\SubmissionsController;
use Illuminate\Support\Facades\Route;

// ─── Public ────────────────────────────────────────────────────────────
Route::post('/forms/{slug}/submit', [FormController::class, 'submit']);

// ─── Admin Auth ─────────────────────────────────────────────────────────
Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout'])->middleware('auth');

// ─── Admin (Protected) ──────────────────────────────────────────────────
Route::middleware(['auth'])->prefix('admin')->group(function () {
    // Pages list
    Route::get('/', [PagesController::class, 'index'])->name('admin.pages');
    Route::post('/pages', [PagesController::class, 'create'])->name('admin.pages.create');
    Route::delete('/pages/{slug}', [PagesController::class, 'destroy'])->name('admin.pages.destroy');

    // Editor
    Route::get('/editor/{slug}', [EditorController::class, 'show'])->name('admin.editor');
    Route::post('/editor/{slug}', [EditorController::class, 'save'])->name('admin.editor.save');

    // Media
    Route::get('/media', [MediaController::class, 'index'])->name('admin.media');
    Route::post('/media', [MediaController::class, 'store'])->name('admin.media.store');
    Route::delete('/media/{id}', [MediaController::class, 'destroy'])->name('admin.media.destroy');
    Route::get('/api/media', [MediaController::class, 'list'])->name('admin.media.list');

    // Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('admin.settings');
    Route::post('/settings', [SettingsController::class, 'save'])->name('admin.settings.save');

    // Submissions
    Route::get('/submissions', [SubmissionsController::class, 'index'])->name('admin.submissions');
});

// ─── Public catch-all (Landing Pages) ──────────────────────────────────
Route::get('/{slug?}', [LandingPageController::class, 'show'])
    ->where('slug', '^(?!admin).*')
    ->name('landing');
