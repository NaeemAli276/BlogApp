<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

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

        return [
            'category_id' => Category::factory(),
            'user_id' => User::factory(),
            'title' => fake()->text(90),
            'excerpt' => fake()->text(),
            'mainContent' => fake()->text(),
            'thumbnail' => "https://picsum.photos/seed/{$random_num}/960/544",
            'is_published' => fake()->randomElement([true, false]),
        ];
    }
}
