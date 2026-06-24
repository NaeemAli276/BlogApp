<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Tag extends Model
{

    use HasFactory;

    protected $fillable = [
        'tag_name'
    ];

    public function posts() {  // Should be plural 'posts'
        return $this->belongsToMany(Post::class, 'post_tags', 'tag_id', 'post_id');
    }


}
