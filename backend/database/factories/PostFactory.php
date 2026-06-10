<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $random_num = rand(1,100);
        $title = fake()->text(90);

        return [
            'category_id' => Category::factory(),
            'user_id' => User::factory(),
            'title' => $title,
            'excerpt' => fake()->text(),
            'mainContent' => fake()->text(),
            'url' => Str::slug($title),
            'thumbnail' => "https://picsum.photos/seed/{$random_num}/960/544",
            'is_published' => fake()->randomElement([true, false]),
            'view_count' => fake()->numberBetween(0, 100000)
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Post $post) {
            // Get existing users or create some if none exist
            $users = User::count() > 0 ? User::all() : User::factory(50)->create();
            
            // Randomly select users to like/dislike
            $numberOfReactions = rand(0, min(100, $users->count()));
            $reactingUsers = $users->random($numberOfReactions);
            
            foreach ($reactingUsers as $user) {
                // Determine if like or dislike (50% like, 50% dislike)
                $type = rand(1, 100) <= 50 ? 'like' : 'dislike';
                
                \App\Models\Like::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'post_id' => $post->id,
                    ],
                    [
                        'type' => $type,
                    ]
                );
            }
        });
    }

}
