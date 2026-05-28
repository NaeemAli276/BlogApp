<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Reaction extends Model
{

    use HasFactory;

    //
    protected $fillable = [
        'reaction'
    ];

    public function Post() {
        return $this->belongsTo(Post::class);
    }

}
