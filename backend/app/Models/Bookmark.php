<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bookmark extends Model
{

    use HasFactory;

    protected $fillable = [
        'post_id',
        'user_id'
    ];

    public function posts() {
        return $this->belongsToMany(Post::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

}
