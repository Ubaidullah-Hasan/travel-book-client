"use client"
import React from 'react';
import "./style.css"
import { usePathname } from 'next/navigation';
import SearchField from '../form/SearchField';
import CreatePost from '../createPost/CreatePostCard';
import { ThemeSwitch } from '../ui/theme-switch';
import FilterCategoryField from '../ui/FilterCategoryField';
import SortByUpVoteBtn from '../ui/SortByUpVoteBtn';

const RightSidebar = () => {
    const pathName = usePathname();

    return (
        <div className='px-3 py-4 fixed top-0 bottom-0 w-[38%] lg:w-[25%] overflow-y-scroll space-y-5'>
            <div className='flex items-center justify-center lg:block hidden'>
                <ThemeSwitch />
            </div>
            {pathName !== "/my-profile" && <SearchField />}
            {pathName !== "/my-profile" && <FilterCategoryField />}
            {pathName !== "/my-profile" && <SortByUpVoteBtn />}
            <div className={`${pathName === "/my-profile" ? "pt-0" : "pt-10"}`}>
                <CreatePost />

            </div>
        </div>
    );
};

export default RightSidebar;