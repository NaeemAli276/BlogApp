<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\PostBlock;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin dude',
            'email' => 'adminDude@example.com',
            'user_type' => 'admin',
            'password' => 'adminPass1234'
        ]);

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'johnDoe@example.com',
            'password' => 'password1234'
        ]);

        Category::factory()->count(10)->create();
        Tag::factory()->count(10)->create();

        Post::factory()->count(20)->create();

    }
}
