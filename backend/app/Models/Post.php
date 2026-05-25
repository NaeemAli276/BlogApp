<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    
    use HasFactory;

    protected $fillable = [
        'title',
        'thumbnail',
        'excerpt',
        'mainContent',
        'likes',
        'dislikes',
        'views'
    ];

    protected $hidden = [
        
    ];

    protected $casts = [
        
    ];

    // gets the category
    public function Category() {
        
        return $this->hasOne(Category::class);

    }

    // gets all the comments
    public function Comments() {

        return $this->hasMany(Comment::class);

    }

    // gets the tags of the post
    public function Tags() {

        return $this->hasMany(Tag::class);

    }

    // gets all the likes and dislikes of the post
    public function Reactions() {

        return $this->hasMany(Reaction::class);

    }


}
