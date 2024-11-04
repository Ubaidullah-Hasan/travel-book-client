"use client"
import React, { useState } from 'react';
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import { ThemeSwitch } from '../ui/theme-switch';
import LeftSidebar from '../sidebar/LeftSidebar';
import SearchField from '../form/SearchField';

const HeaderForSmallDevice = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathName = usePathname();
    const pageWithOutHeaderCompo = ["/verify-account", "/my-profile"];
    // console.log(pageWithOutHeaderCompo?.some((path) => pathName.match(path)));

    return (
        <div className='relative mb-4'>
            <div className='lg:hidden h-[60px] border-b border-default-200 flex items-center justify-between gap-8 px-2'>
                {!isOpen ?
                    <RiMenuUnfold3Fill className='border border-default-200 rounded-full p-2 w-10 h-10  bg-default-200' size={30} onClick={() => setIsOpen(!isOpen)} />
                    : <div />
                }
                <div className='flex-1 sm:hidden'>
                    {pathName !== "/my-profile" && <SearchField />}
                </div>
                <ThemeSwitch />
            </div>

            <div className={`fixed z-30 bg-default-50 duration-300 ${isOpen ? "left-0" : "left-[-300px]"} top-0 bottom-0 min-h-screen border-r border-default-200 shadow-lg`}>
                <RiMenuUnfold4Fill className='absolute right-[-18px] top-4 border border-default-200 rounded-full p-2 w-10 h-10 bg-default-200' size={30} onClick={() => setIsOpen(!isOpen)} />
                <LeftSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    );
};

export default HeaderForSmallDevice;