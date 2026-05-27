<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //

    protected $fillable = [
        'category_id',
        'title',
        'excerpt',
        'mainContent',
        'likes',
        'dislikes',
        'thumbnail',
        'date'
    ];

    protected $hidden = [
        
    ];

    protected $casts = [

    ];

    // get the comments of the post
    public function Comments() {
        return $this->hasMany(Comment::class);
    }

    // gets the category of the post
    public function Category() {
        return $this->hasOne(Category::class);
    }

    // gets the reactions of the post
    public function Reactions() {
        return $this->hasMany(Reaction::class);
    }

    public function Tags() {
        return $this->belongsToMany(Tag::class, 'post_tags', 'post_id', 'tag_id');
    }

    public function Bookmarks() {
        return $this->belongsToMany(Bookmark::class, 'bookmarks', 'post_id', 'user_id');
    }



}
