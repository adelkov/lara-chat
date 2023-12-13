<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'body',
        'user_id',
        'private_chat_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function privateChat()
    {
        return $this->belongsTo(PrivateChat::class);
    }
}
