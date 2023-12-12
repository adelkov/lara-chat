import {Head, Link} from "@inertiajs/react";
import {PageProps} from "@/types";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


function Chat({auth, chats}: PageProps) {
    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
        <Head title="Chat"/>

        <div className={'p-4'}>
            <h1 className={'text-2xl'}>Chats</h1>
            <div className={'space-y-4'}>
                {chats.map(chat => (
                    <div className={'bg-slate-700 rounded shadow-2xl p-3'} key={chat.id}>
                        <Link href={route('chats.show', chat.id)}>
                            <div className={'text-white font-black'}>#{chat.id} - {chat.topic}</div>
                            <div className={'text-xs text-gray-400'}>{chat.created_at}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    </AuthenticatedLayout>


}

export default Chat
