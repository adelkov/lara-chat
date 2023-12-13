<?php

namespace App\Events;

use App\Models\PrivateMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewPrivateMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public PrivateMessage $privateMessage;

    /**
     * Create a new event instance.
     */
    public function __construct(
        $privateMessage
    )
    {
        $this->privateMessage = $privateMessage;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $privateMessage = $this->privateMessage;

        return [
            new PrivateChannel('private-messages.' . $privateMessage->private_chat_id),
        ];
    }
}
