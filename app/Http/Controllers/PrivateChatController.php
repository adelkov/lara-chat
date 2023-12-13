<?php

namespace App\Http\Controllers;

use App\Models\PrivateChat;
use App\Models\PrivateMessage;
use Illuminate\Http\Request;

class PrivateChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PrivateChat $privateChat, Request $request)
    {
        $request->validate([
            'body' => 'required|string',
        ]);

        $privateMessage = $privateChat->privateMessages()->create([
            'body' => $request->input('body'),
            'user_id' => auth()->user()->id,
        ]);

        // dispatch message event

        return redirect(route('privateChats.show', $privateChat));
    }

    /**
     * Display the specified resource.
     */
    public function show(PrivateChat $privateChat)
    {
        // get private chat by id with all messages and users
        $privateChat = PrivateChat::with('users')->with('privateMessages')->find($privateChat->id);

        return inertia('PrivateChats/Show', [
            'privateChat' => $privateChat,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PrivateChat $privateChat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PrivateChat $privateChat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PrivateChat $privateChat)
    {
        //
    }
}
