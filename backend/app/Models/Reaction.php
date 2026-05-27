<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    //
    protected $fillable = [
        'reaction'
    ];

    public function Post() {
        return $this->belongsTo(Post::class);
    }

}
