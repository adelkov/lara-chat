import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatWindow from "@/Components/ChatWindow";
import {formatRelative} from "date-fns";

function Show({auth, privateChat}: PageProps) {
    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
        <Head title="Chat"/>
        <div className={'max-h-[500px] max-w-3xl mx-auto space-y-10'}>
            <div className={'space-y-4'}>
                <h1 className={'text-4xl'}>Private chat between {privateChat.users.map(u => u.name).join(' and ')} </h1>
                <p className={'text-xs text-gray-400'}>Created {formatRelative(new Date(privateChat.created_at), Date.now())}</p>
            </div>

            <ChatWindow chat={privateChat}/>
        </div>

    </AuthenticatedLayout>
}

export default Show
