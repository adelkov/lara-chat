<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        $chats = Chat::with('messages')->get();
        $privateChats = auth()->user()->privateChats()->with('users')->get();

        return inertia('Index', [
            'users' => User::all(),
            'chats' => $chats,
            'privateChats' => $privateChats,
        ]);
    }

    public function show(Chat $chat)
    {
        $chat->load('messages')->load('messages.user');
        return inertia('Chats/Show', [
            'chat' => $chat,
        ]);
    }

    public function store(Chat $chat, Request $request)
    {
        $request->validate([
            'body' => 'required|string',
        ]);

        $message = $chat->messages()->create([
            'body' => $request->input('body'),
            'user_id' => auth()->user()->id,
        ])->load('user');

        // dispatch message event
        event(new NewMessage($message));

        return redirect(route('chats.show', $chat));
    }
}
