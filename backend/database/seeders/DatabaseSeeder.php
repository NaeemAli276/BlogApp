<?php

namespace Database\Seeders;

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

        $this->call([
            UserSeeder::class,
            TagSeeder::class,
            CategorySeeder::class,
            PostSeeder::class,
            BookmarkSeeder::class,
            CommentSeeder::class,
            // LikeSeeder::class,
        ]); 

        User::create([
            'username' => 'adminUser',            
            'email' => 'admin@example.com',
            'password' => bcrypt('pass1234'),
            'role' => 'admin'
        ]);

    }
}
