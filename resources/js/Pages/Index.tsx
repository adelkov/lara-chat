import {Head, Link} from "@inertiajs/react";
import {PageProps} from "@/types";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {formatRelative} from "date-fns";
import StartNewPrivateChat from "@/Pages/PrivateChats/StartNewPrivateChat";


function Index({auth, chats, privateChats, users}: PageProps) {
    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
        <Head title="Dashboard"/>

        <div className={'grid grid-cols-2 gap-4'}>
            <div >
                <h1 className={'text-2xl mb-2'}>Public Chats by Topic</h1>
                <div className={'space-y-4'}>
                    {chats.map(chat => (
                        <div
                            className={'bg-slate-800 transition-all rounded hover:outline hover:outline-4 outline-gray-400 shadow-xl p-3'}
                            key={chat.id}>
                            <Link href={route('chats.show', chat.id)}>
                                <div className={'text-white font-black'}>{chat.topic}</div>
                                <span
                                    className={'text-xs text-gray-400'}>Created {formatRelative(new Date(chat.created_at), Date.now())}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h1 className={'text-2xl mb-2'}>Private Dashboards with Users</h1>
                <div className={'space-y-4'}>
                    {privateChats.map(chat => (
                        <div
                            className={'bg-slate-800 transition-all rounded hover:outline hover:outline-4 outline-gray-400 shadow-xl p-3'}
                            key={chat.id}>
                            <Link href={route('privateChats.show', chat.id)}>
                                <div className={'text-white font-black'}>{chat.users[0].name} - {chat.users[1].name}</div>
                                <span
                                    className={'text-xs text-gray-400'}>Created {formatRelative(new Date(chat.created_at), Date.now())}</span>
                            </Link>
                        </div>
                    ))}
                    <StartNewPrivateChat/>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>


}

export default Index
