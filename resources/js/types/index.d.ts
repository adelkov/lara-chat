export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };

    users: User[];

    chat: Chat;

    privateChat: PrivateChat;

    privateChats: PrivateChat[];

    chats:Chat[]
};

type Chat = {
    id: number;
    topic: string;
    updated_at: string;
    created_at: string;
    messages: Message[];
}

export type PrivateChat = {
    id: number;
    created_at: string;
    updated_at: string;
    private_messages: Message[];
    users: [User, User];
}

export type Message = {
    id: number;
    chat_id: number;
    body: string;
    user_id: number;
    message: string;
    created_at: string;
    updated_at: string;
    user: User;
}


