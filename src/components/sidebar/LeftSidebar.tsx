import { Logo } from '@/src/assets/icons';
import React from 'react';

const LeftSidebar = () => {
    return (
        <div className='w-[25%] px-3 py-4 bg-default-500 fixed top-0 bottom-0 left-0 overflow-y-scroll '>
            <div className='flex gap-1 items-center '>
                <Logo />
                <p className='font-bold uppercase'>TravelBook</p>
            </div>
            Left Sidebar
            
        </div>
    );
};

export default LeftSidebar;