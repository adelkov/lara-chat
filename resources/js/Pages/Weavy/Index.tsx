import {Head} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Conversation, ConversationList, MessengerProvider, WeavyClient, WeavyProvider} from '@weavy/uikit-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import "@weavy/uikit-react/dist/css/weavy.css";
import {useState} from "react";
import {formatRelative} from "date-fns";
import StartConversation from "@/Pages/Weavy/StartConversation";


console.log(import.meta.env.WEAVY_APP_URL as string)
const getWeavyClient = (token: string) => new WeavyClient({
    url: 'https://f90f079f5da74215bd132d529c94698b.weavy.io',
    tokenFactory: async (refresh) => token
});

function Index({auth, weavy}: PageProps) {
    const [chatId, setChatId] = useState<number | null>(null)

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
        <Head title="Weavy"/>
        <div className={'grid grid-cols-3 gap-4'}>
            <div>
                {weavy.conversations?.data?.map((conversation) => (
                    <button className={'shadow-2xl group p-3 w-full'} key={conversation.uid}>
                        {conversation.is_unread && <div>UNREAD MESSAGE</div>  }
                        <div
                            className={'text-left'}
                            onClick={() => setChatId(conversation.id)}>

                            <p className={'transition-all text-xl group-hover:text-slate-400 font-bold'}>
                                {conversation.name}</p>
                            <p className={'text-slate-400 text-sm'}>Last message: {conversation.last_message?.plain}</p>
                            {conversation.last_message &&
                                <p className={'text-slate-500 text-xs'}>{formatRelative(new Date(conversation.last_message?.created_at), new Date())}</p>}
                        </div>
                    </button>
                ))}
                <StartConversation/>
            </div>


            <div className={'col-span-2 max-h-[300px] relative h-[500px]'}>
                {chatId && <>
                    <WeavyProvider
                        client={getWeavyClient(weavy.token)}>
                        <div>
                        <ConversationList />
                        </div>
                        <MessengerProvider>
                            {/*<ConversastionList />*/}
                            <Conversation
                                id={+chatId}/>
                        </MessengerProvider>
                    </WeavyProvider>
                </>}
            </div>
        </div>

    </AuthenticatedLayout>
}

export default Index

