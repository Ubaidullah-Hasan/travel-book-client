import React from 'react';
import { AiOutlineLogin } from "react-icons/ai";
import Link from 'next/link';
import { Logo } from '@/src/assets/icons';

const LeftSidebar = () => {
    return (
        <div className='w-[25%] px-3 py-4 fixed top-0 bottom-0 left-0 overflow-y-scroll '>
            <div className='flex gap-1 items-center '>
                <Logo />
                <p className='font-bold uppercase'>TravelBook</p>
            </div>
            <Link href='/login'>
                <div className='duration-200 bg-default-200 hover:bg-default-100 py-2 px-4 rounded-lg font-semibold flex items-center gap-2'>
                    <AiOutlineLogin />
                    Login
                </div>
            </Link>

        </div>
    );
};

export default LeftSidebar;