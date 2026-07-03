<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\CommentReply;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CommentReply>
 */
class CommentReplyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first() ?? User::factory(),
            'comment_id' => Comment::inRandomOrder()->first() ?? Comment::factory(),
            'content' => fake()->paragraph()
        ];
    }
}
