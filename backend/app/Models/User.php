<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['username', 'email', 'password', 'profileImg'])]
#[Hidden(['password', 'remember_token', 'role'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'username' => 'string',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // gets the users posts
    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function bookmarks() {
        return $this->hasMany(Bookmark::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    protected static function boot()
    {
        parent::boot();

        // Delete old profileImg when updating
        static::updating(function ($user) {
            if ($user->isDirty('profileImg')) {
                $oldProfileImg = $user->getOriginal('profileImg');
                if ($oldProfileImg) {
                    $user->deleteProfileImg($oldProfileImg);
                }
            }
        });

        // Delete profileImg when deleting the post
        static::deleting(function ($user) {
            if ($user->profileImg) {
                $user->deleteProfileImg($user->profileImg);
            }
        });
    }

    // Method to delete profileImg file
    public function deleteProfileImg($profileImgPath)
    {
        try {
            // Skip if it's a URL (external image)
            if (filter_var($profileImgPath, FILTER_VALIDATE_URL)) {
                Log::info('External URL, skipping deletion', ['url' => $profileImgPath]);
                return;
            }

            // Clean the path
            $path = ltrim($profileImgPath, '/');
            if (str_starts_with($path, 'storage/')) {
                $path = str_replace('storage/', '', $path);
            }

            // Delete if exists
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                Log::info('profileImg deleted:', ['path' => $path]);
            } else {
                Log::warning('profileImg not found for deletion:', ['path' => $path]);
            }

        } catch (\Exception $e) {
            Log::error('Error deleting profileImg:', [
                'path' => $profileImgPath,
                'error' => $e->getMessage()
            ]);
        }
    }

    // Accessor for profileImg URL
    public function getProfileImgUrlAttribute()
    {
        if (!$this->profileImg) {
            return null;
        }

        if (filter_var($this->profileImg, FILTER_VALIDATE_URL)) {
            return $this->profileImg;
        }

        return asset('storage/' . $this->profileImg);
    }

}
