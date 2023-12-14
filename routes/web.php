<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', [App\Http\Controllers\ChatController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/chats/{chat}', [App\Http\Controllers\ChatController::class, 'show'])->middleware(['auth', 'verified'])->name('chats.show');

Route::get('/private-chats/{privateChat}', [App\Http\Controllers\PrivateChatController::class, 'show'])->name('privateChats.show');

Route::post('/chats/{chat}/messages', [App\Http\Controllers\ChatController::class, 'store'])->middleware(['auth', 'verified'])->name("messages.store");

Route::post('/private-chats/{privateChat}/messages', [App\Http\Controllers\PrivateChatController::class, 'sendMessage'])->middleware(['auth', 'verified'])->name("privateChats.sendMessage");

Route::post('/private-chats', [App\Http\Controllers\PrivateChatController::class, 'store'])->middleware(['auth', 'verified'])->name("privateChats.store");

Route::get('/weavy', [
    App\Http\Controllers\WeavyController::class, 'index'
])->middleware(['auth', 'verified'])->name("weavy.index",);

Route::post('/weavy/{userId}', [
    App\Http\Controllers\WeavyController::class, 'start'
])->middleware(['auth', 'verified'])->name("weavy.start",);

require __DIR__.'/auth.php';
