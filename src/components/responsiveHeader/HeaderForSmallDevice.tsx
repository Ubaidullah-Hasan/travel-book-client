"use client"
import React, { useState } from 'react';
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from 'react-icons/ri';
import { ThemeSwitch } from '../ui/theme-switch';
import LeftSidebar from '../sidebar/LeftSidebar';

const HeaderForSmallDevice = () => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    return (
        <div className='relative mb-4'>
            <div className='lg:hidden h-[60px] border-b border-default-600 flex items-center justify-between px-2'>
                {!isOpen ?
                    <RiMenuUnfold3Fill className='border border-default-600 rounded-full p-2 w-10 h-10  bg-default-200' onClick={() => setIsOpen(!isOpen)} size={30} />
                    : <div />
                }
                <ThemeSwitch />
            </div>

            <div className={`fixed z-30 bg-default-50 duration-300 ${isOpen ? "left-0" : "left-[-300px]"} top-0 bottom-0 min-h-screen border-r border-default-600`}>
                <RiMenuUnfold4Fill className='absolute right-[-18px] top-4 border border-default-600 rounded-full p-2 w-10 h-10 bg-default-200' onClick={() => setIsOpen(!isOpen)} size={30} />
                <LeftSidebar />
            </div>
        </div>
    );
};

export default HeaderForSmallDevice;