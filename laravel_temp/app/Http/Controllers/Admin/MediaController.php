<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $media = Media::orderBy('created_at', 'desc')->get()->map(function ($m) {
            // Strip legacy "/storage/" prefix if present, then generate correct public URL
            $path = Str::replaceFirst('/storage/', '', $m->storage_path);
            return array_merge($m->toArray(), [
                'url' => Storage::url($path),
            ]);
        });

        return Inertia::render('Admin/Media', ['media' => $media]);
    }

    public function store(Request $request)
    {
        $request->validate(['file' => 'required|file|max:256000']);

        $file = $request->file('file');
        $relativePath = $file->store('uploads', 'public'); // e.g. "uploads/filename.jpg"

        $media = Media::create([
            'file_name'    => $file->getClientOriginalName(),
            'storage_path' => $relativePath,
            'mime_type'    => $file->getMimeType(),
            'size'         => $file->getSize(),
        ]);

        return response()->json([
            'url'   => Storage::url($relativePath),
            'media' => $media,
        ]);
    }

    public function destroy(int $id)
    {
        $media = Media::findOrFail($id);

        // Support legacy records stored with "/storage/" prefix
        $relativePath = Str::replaceFirst('/storage/', '', $media->storage_path);
        Storage::disk('public')->delete($relativePath);

        $media->delete();
        return response()->json(['success' => true]);
    }

    // For the React MediaPicker — returns JSON list
    public function list()
    {
        $media = Media::orderBy('created_at', 'desc')->get()->map(fn($m) => [
            ...$m->toArray(),
            'url' => Storage::url(Str::replaceFirst('/storage/', '', $m->storage_path)),
        ]);
        return response()->json($media);
    }
}
