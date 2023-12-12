import clsx from "clsx";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Chat, PageProps} from "@/types";
import {useForm, usePage} from '@inertiajs/react';
import {formatRelative} from "date-fns";
import {useEffect, useRef} from "react";

type Props = {
    chat: Chat
}

function ChatWindow({chat}: Props) {
    const {post, data, setData, reset} = useForm({
        body: ''
    })
    const {props} = usePage<PageProps>()

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight
        }
    }, [chat.messages])


    return <>
        <div
            ref={ref}
            className={clsx('scroll-smooth max-h-[500px] flex bg-slate-600 flex-col gap-4 p-4 border-white border rounded-3xl overflow-scroll')}>
            {chat.messages.map(message => (
                <div key={message.id} className={clsx('p-4 bg-slate-700 rounded w-2/3', {
                    'self-end': message.user_id === props.auth.user.id,
                })}>
                    {message.body}
                    <p className={'text-gray-400 text-xs'}>
                        {message.user.name} - {message.user.email}   {' '}
                        [<span className={'text-xs text-gray-400'}>Created {formatRelative(new Date(chat.created_at), Date.now())}</span>]
                    </p>

                </div>
            ))}

            <form
                className={'sticky bottom-0'}
                onSubmit={(e) => {
                    e.preventDefault()

                    post('/chats/' + chat.id + '/messages/', {
                        onSuccess: () => {
                            reset()
                        },
                        preserveScroll: true,
                    })
                }}>
                <Input
                    placeholder={'Type your message here...'}
                    type="text"
                    className={'bg-slate-700 w-full p-8 rounded-xl'}
                    onChange={
                        (e) => {
                            setData({body: e.target.value})
                        }
                    } value={data.body}/>

                <Button
                    className={'absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-slate-600 rounded text-white'}
                    type={'submit'}>send</Button>
            </form>
        </div>
    </>
}

export default ChatWindow
