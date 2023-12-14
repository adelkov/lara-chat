<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeavyController extends Controller
{
    /**
     * Displaying current user's conversations.
     */
    public function index(Request $request)
    {
        $weavyUser = Http::withToken(env('WEAVY_APP_API_KEY', 'null'))->get(env('WEAVY_APP_URL') . 'users/' . 'app-user-' . $request->user()->id);
        \Laravel\Prompts\info($weavyUser->status());
        if ($weavyUser->successful()) {
            $weavyUser = $weavyUser->json();
        } else {
            $weavyUser = Http::withToken(env('WEAVY_APP_API_KEY', 'null'))
                ->post(env('WEAVY_APP_URL') . 'users',[
                    'email' => $request->user()->email,
                    'name' => $request->user()->name,
                    'uid' => 'app-user-' . $request->user()->id,
                ]);
        }

        // there is some problem with the ->post method when there is no body in the request 🤷🏻‍
        $weavyToken = Http::withToken(env('WEAVY_APP_API_KEY', 'null'))->send("POST",env('WEAVY_APP_URL') . 'users/app-user-'. $request->user()->id  . '/tokens');

        // could save this so that we don't have to make a request every time and only get it if expired
        $userToken = $weavyToken->json()['access_token'];

        $myConversations = Http::withToken($userToken)->get(env('WEAVY_APP_URL') . 'conversations');

        return inertia('Weavy/Index', [
            'weavy' => [
                'token' => $userToken,
                'conversations' => $myConversations->json(),
            ],
            'users' => User::where('id', '!=', $request->user()->id)->get(),
            'weavyUsers' => Http::withToken(
                env('WEAVY_APP_API_KEY', 'null')
            )->get(env('WEAVY_APP_URL') . 'users')->json(),
            'token' => $userToken
        ]);
    }

    public function start(Request $request, string $userId){
        // get

        // sort the two numbers in ascending order
        $weavyToken = Http::withToken(env('WEAVY_APP_API_KEY', 'null'))->send("POST",env('WEAVY_APP_URL') . 'users/app-user-'. $request->user()->id  . '/tokens');

        // could save this so that we don't have to make a request every time and only get it if expired
        $userToken = $weavyToken->json()['access_token'];
        $ids = [(int) $userId];

        Http::withToken(
            $userToken
        )->post(env('WEAVY_APP_URL') . 'conversations', [
            'name' => 'Conversation with ' . $userId,
            'members' => $ids,
        ]);

        return redirect(route('weavy.index'));
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
