<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    
    use HasFactory;

    protected $fillable = [
        'comment'
    ];

    public function Post() {
        return $this->belongsTo(Post::class);
    }

    public function User() {
        return $this->belongsTo(User::class);
    }

}
