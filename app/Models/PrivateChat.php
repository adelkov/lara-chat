<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateChat extends Model
{
    use HasFactory;


    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function privateMessages()
    {
        return $this->hasMany(PrivateMessage::class);
    }
}
