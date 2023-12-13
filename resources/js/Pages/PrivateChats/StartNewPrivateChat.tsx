import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useForm, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

function SelectDemo() {
    const {props} = usePage<PageProps>()
    const { post } = useForm()

    const usersToStartChatWith = props.users.filter(user => user.id !== props.auth.user.id)

    return (
        <Select
         onValueChange={

             (e) =>{
                 console.log(e)
                 post(route('privateChats.store', {
                     userId: e
                 }))
             }
         }
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select user to chat with"/>
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                    <SelectLabel>Select user to chat with</SelectLabel>
                    {usersToStartChatWith.map(user => <SelectItem
                        key={user.id}
                        value={user.id.toString()}>{user.name}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}


export default SelectDemo
