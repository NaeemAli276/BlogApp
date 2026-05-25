<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    //
    protected $fillable = [
        'post_id',
        'reaction'
    ];

    public function User() {

        return $this->hasOne(User::class);

    }

    public function 

}
