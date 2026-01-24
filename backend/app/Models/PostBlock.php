<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostBlock extends Model
{
    
    protected $fillable = [
        'post_id',
        'type',
        'sort_order',
        'block_json'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function post() {
        return $this->belongsTo(Post::class);
    }

}
