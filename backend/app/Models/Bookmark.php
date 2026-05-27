<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    
    private $fillable = [
        'post_id',
        'user_id'
    ];

    public function Posts() {
        return $this->belongsToMany(Post::class);
    }

    public function User() {
        return $this->belongsTo(User::class);
    }

}
