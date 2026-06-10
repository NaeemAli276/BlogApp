<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['username', 'email', 'password', 'thumbnail'])]
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

}
