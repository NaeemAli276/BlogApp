<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'date',
        'category_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'title' => 'string',
        'slug' => 'string',
    ];

    // relationships
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function bookmark() {
        return $this->belongsToMany(Bookmark::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function comment() {
        return $this->hasMany(Comment::class);
    }

    public function postBlock() {
        return $this->hasMany(PostBlock::class);
    }

    public function reaction() {
        return $this->hasMany(Reaction::class);
    }

    public function tag() {
        return $this->belongsToMany(Tag::class);
    }

}
