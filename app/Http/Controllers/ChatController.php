<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        $chats = \App\Models\Chat::with('messages')->get();
        return inertia('Chats/Index', [
            'chats' => $chats,
        ]);
    }

    public function show(\App\Models\Chat $chat)
    {
        $chat->load('messages')->load('messages.user');
        return inertia('Chats/Show', [
            'chat' => $chat,
        ]);
    }

    public function store(\App\Models\Chat $chat, Request $request)
    {
        $request->validate([
            'body' => 'required|string',
        ]);

        $message = $chat->messages()->create([
            'body' => $request->input('body'),
            'user_id' => auth()->user()->id,
        ]);

        return redirect(route('chats.show', $chat));
    }
}
