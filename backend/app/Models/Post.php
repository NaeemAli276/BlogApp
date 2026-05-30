<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //

    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'excerpt',
        'mainContent',
        'likes',
        'dislikes',
        'thumbnail',
        'date',
        'url'
    ];

    protected $hidden = [
        
    ];

    protected $casts = [

    ];

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
        return $this->belongsToMany(Tag::class, 'post_tags', 'tag_id', 'post_id');
    }

    public function bookmarks() {
        return $this->belongsToMany(Bookmark::class, 'bookmarks', 'post_id', 'user_id');
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function dislikes() {
        return $this->hasMany(Dislike::class);
    }

}
