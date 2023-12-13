<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/


Broadcast::channel('private-messages.{chatId}', function () {
    return true;
//    $privateChat = $user->privateChats()->find($chatId);
//
//    if ($privateChat) {
//        return true;
//    } else {
//        return false;
//    }
});
