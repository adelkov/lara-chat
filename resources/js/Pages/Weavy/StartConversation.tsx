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

function StartConversation() {
    const {props} = usePage<PageProps>()
    const {post} = useForm()
    return (
        <Select
            onValueChange={
                (e) => {
                    post(route('weavy.start', {
                        userId: e
                    }))
                }
            }
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select user to chat with"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select user to chat with</SelectLabel>
                    {props.weavyUsers.data.map(user => <SelectItem
                        key={user.id}
                        value={user.id.toString()}>{user.display_name}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}


export default StartConversation
