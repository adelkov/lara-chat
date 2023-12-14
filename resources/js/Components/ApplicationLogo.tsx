import {SVGAttributes} from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className={'bg-brand h-[54px] w-[54px] rounded-full p-2 flex items-center justify-center'}>
            <div className={'bg-black  text-white leading-[1] text-xs rounded-[4px] font-bold'}>
                TALKY
            </div>
        </div>
    );
}
