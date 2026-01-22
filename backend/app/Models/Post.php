<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    
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
        'slug' => 'string'
    ];

}
