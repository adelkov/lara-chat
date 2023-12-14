import {SVGAttributes} from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className={'bg-brand h-[50px] w-[50px] rounded-full p-2 flex items-center justify-center'}>
            <div className={'bg-black  text-white leading-snug text-sm rounded font-bold'}>
                Talky
            </div>
        </div>
    );
}
