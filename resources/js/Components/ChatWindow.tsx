import clsx from "clsx";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Chat, Message, PageProps, PrivateChat} from "@/types";
import {router, useForm, usePage} from '@inertiajs/react';
import {formatRelative} from "date-fns";
import {useEffect, useRef, useState} from "react";
import pusher from "@/lib/pusher";

type Props = {
    chat: Chat | PrivateChat
}

function isPrivateChat(chat: Chat | PrivateChat): chat is PrivateChat {
    return (chat as Chat).topic === undefined
}

function ChatWindow({chat}: Props) {

    const messages = isPrivateChat(chat) ? chat.private_messages : chat.messages

    const [scrollTop, setScrollTop] = useState<number>(0)

    useEffect(() => {
        if (isPrivateChat(chat)) {
            window.Echo.private('private-messages.' + chat.id).listen('NewPrivateMessage', (data: Message) => {
                console.log('new private message', data)
                router.visit(route('privateChats.show', chat), {
                    preserveScroll: true,
                    preserveState: true,
                })
            })
        } else {
            window.Echo.channel('messages.' + chat.id).listen('NewMessage', (data: Message) => {
                console.log('new message', data)
                router.visit(route('chats.show', chat), {
                    preserveScroll: true,
                    preserveState: true,
                })
            })
        }
    }, [])


    const {post, processing, data, errors, setData, reset} = useForm({
        body: ''
    })
    const {props} = usePage<PageProps>()

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            setScrollTop(ref.current.scrollHeight)
        }
    }, [messages])

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = scrollTop
        }
    }, [scrollTop])


    return <>
        <div
            ref={ref}
            className={clsx('scroll-smooth max-h-[500px] outline outline-4 outline-gray-400 flex bg-slate-600 flex-col gap-4 p-4 rounded-3xl overflow-scroll')}>
            {messages?.map(message => (
                <div key={message.id} className={clsx('p-4 rounded-3xl w-2/3 bg-slate-700 space-y-4', {
                    'self-end ': message.user_id === props.auth.user.id,
                })}>
                    {message.user_id !== props.auth.user.id && (
                        <div className={'mb-2 space-y-2'}>
                            <p className={'text-gray-100 font-bold inline px-2 py-1 bg-slate-600 rounded-3xl'}>
                                {message.user?.name}
                            </p>
                        </div>

                    )}
                    {message.body}
                    <p className={'text-gray-400 text-xs'}>
                        <span
                            className={'text-xs text-gray-400'}>Created {formatRelative(new Date(chat.created_at), Date.now())}</span>
                    </p>

                </div>
            ))}

            <form
                className={'sticky bottom-0'}
                onSubmit={(e) => {
                    e.preventDefault()

                    const pathname  = isPrivateChat(chat) ? '/private-chats/' : '/chats/'
                    post(pathname + chat.id + '/messages/', {
                        preserveScroll: true,
                        onSuccess: () => {
                            reset()
                        }
                    })
                }}>
                <Input
                    placeholder={'Type your message here...'}
                    type="text"
                    className={clsx('bg-slate-700 w-full p-8 rounded-xl', {
                        'border border-red-500': errors && errors.body
                    })}
                    onChange={
                        (e) => {
                            setData({body: e.target.value})
                        }
                    } value={data.body}/>

                {errors && errors.body && (
                    <p className={'text-red-500 text-xs absolute'}>{errors.body}</p>
                )}

                <Button
                    disabled={processing}
                    className={'absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-slate-600 rounded text-white'}
                    type={'submit'}>send</Button>
            </form>
        </div>
    </>
}

export default ChatWindow
