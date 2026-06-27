<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    //

    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'excerpt',
        'mainContent',
        'thumbnail',
        'date',
        'url',
        'view_count'
    ];

    protected $hidden = [
        
    ];

    protected $casts = [

    ];

        protected $appends = ['thumbnail_url'];

    // ✅ Boot method to register model events
    protected static function boot()
    {
        parent::boot();

        // Delete old thumbnail when updating
        static::updating(function ($post) {
            if ($post->isDirty('thumbnail')) {
                $oldThumbnail = $post->getOriginal('thumbnail');
                if ($oldThumbnail) {
                    $post->deleteThumbnailFile($oldThumbnail);
                }
            }
        });

        // Delete thumbnail when deleting the post
        static::deleting(function ($post) {
            if ($post->thumbnail) {
                $post->deleteThumbnailFile($post->thumbnail);
            }
        });
    }

    // Method to delete thumbnail file
    public function deleteThumbnailFile($thumbnailPath)
    {
        try {
            // Skip if it's a URL (external image)
            if (filter_var($thumbnailPath, FILTER_VALIDATE_URL)) {
                Log::info('External URL, skipping deletion', ['url' => $thumbnailPath]);
                return;
            }

            // Clean the path
            $path = ltrim($thumbnailPath, '/');
            if (str_starts_with($path, 'storage/')) {
                $path = str_replace('storage/', '', $path);
            }

            // Delete if exists
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                Log::info('Thumbnail deleted:', ['path' => $path]);
            } else {
                Log::warning('Thumbnail not found for deletion:', ['path' => $path]);
            }

        } catch (\Exception $e) {
            Log::error('Error deleting thumbnail:', [
                'path' => $thumbnailPath,
                'error' => $e->getMessage()
            ]);
        }
    }

    // Accessor for thumbnail URL
    public function getThumbnailUrlAttribute()
    {
        if (!$this->thumbnail) {
            return null;
        }

        if (filter_var($this->thumbnail, FILTER_VALIDATE_URL)) {
            return $this->thumbnail;
        }

        return asset('storage/' . $this->thumbnail);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    // get the comments of the post
    public function comments() {
        return $this->hasMany(Comment::class);
    }

    // gets the category of the post
    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'post_tags', 'post_id', 'tag_id');
    }
    public function bookmarks() {
        return $this->belongsToMany(Bookmark::class, 'bookmarks', 'post_id', 'user_id');
    }

    public function likes() {
        return $this->hasMany(Like::class)->where('type', 'like');
    }

    public function dislikes() {
        return $this->hasMany(Like::class)->where('type', 'dislike');
    }

    public function recordView() {
        $this->increment('view_count');
        return $this;
    }

}
