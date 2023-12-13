<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\PrivateChat;
use App\Models\PrivateMessage;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adel = User::factory()->create([
            'name' => 'Adel',
            'email' => 'adel@duck.com'
        ]);

        $adelAlterEgo = User::factory()->create([
            'name' => 'Adel Alter Ego',
            'email' => 'adelalter@duck.com'
        ]);

        $users = User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $chats = \App\Models\Chat::factory(10)->create();
        $privateChats = \App\Models\PrivateChat::factory(10)->create();

        // assign two random users to each private chat
        $privateChats->each(function ($privateChat) use ($users) {
            $privateChat->users()->attach($users->random(2));
        });


        // create a private chat between adel and adel alter ego
        $privateChat = PrivateChat::create();
        $privateChat->users()->attach([$adel->id, $adelAlterEgo->id]);

        \App\Models\Message::factory(100)->recycle($chats)->recycle($users)->create();
        \App\Models\Message::factory(25)->recycle($chats)->recycle($adel)->create();
        \App\Models\Message::factory(25)->recycle($chats)->recycle($adelAlterEgo)->create();
    }
}
