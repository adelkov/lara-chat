<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adel = \App\Models\User::factory()->create([
            'name' => 'Adel',
            'email' => 'adel@duck.com'
        ]);

        $adelAlterEgo = \App\Models\User::factory()->create([
            'name' => 'Adel Alter Ego',
            'email' => 'adelalter@duck.com'
        ]);

        $users = \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $chats = \App\Models\Chat::factory(10)->create();

        \App\Models\Message::factory(100)->recycle($chats)->recycle($users)->create();
        \App\Models\Message::factory(25)->recycle($chats)->recycle($adel)->create();
        \App\Models\Message::factory(25)->recycle($chats)->recycle($adelAlterEgo)->create();
    }
}
