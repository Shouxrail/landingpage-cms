<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LandingPage extends Model
{
    protected $fillable = [
        'slug', 'page_title', 'content', 'status',
        'seo_title', 'seo_description', 'og_image',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function formSubmissions(): HasMany
    {
        return $this->hasMany(FormSubmission::class, 'page_id');
    }
}
