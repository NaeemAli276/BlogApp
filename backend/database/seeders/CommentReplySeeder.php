<?php

namespace Database\Seeders;

use App\Models\CommentReply;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentReplySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CommentReply::factory()->count(100)->create();
    }
}
