<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Get an array of ONLY the actual, existing tag IDs (e.g., [1, 2, 3...20])
        $tagIds = Tag::pluck('id');

        // 2. Create the posts
        Post::factory()
            ->count(50)
            ->create()
            ->each(function ($post) use ($tagIds) {
                // 3. Take 3 random IDs from our specific array of existing IDs
                $randomTagIds = $tagIds->random(3)->toArray();
                
                $post->tags()->attach($randomTagIds);
            });
    }
}
