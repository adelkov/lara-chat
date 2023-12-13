<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PrivateMessage>
 */
class PrivateMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'body' => $this->faker->realTextBetween(100, 200),
            'user_id' => \App\Models\User::factory(),
            'private_chat_id' => \App\Models\PrivateChat::factory(),
        ];
    }
}
